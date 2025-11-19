# Student Registration Implementation Status

## ✅ Completed

### 1. Database Schema (Prisma)
- ✅ Added all personal details fields (DOB, phone, campus)
- ✅ Added academic details (program, year of study, expected graduation)
- ✅ Added identity verification fields (government ID, selfie, profile photo, expiry dates)
- ✅ Added profile information (skills, preferred guide style)
- ✅ Added service preferences (services offered, hourly rate, online availability)
- ✅ Added availability fields (timezone, preferred durations)
- ✅ Created UnavailabilityException model for one-time exceptions
- ✅ Added safety/compliance fields (3 separate checkboxes, emergency contact)
- ✅ Added profileCompleteness field

### 2. Frontend Components
- ✅ Updated OnboardingFormData type with all new fields
- ✅ Updated BasicProfileStep component (all personal + academic details)
- ✅ Updated StudentVerificationStep component (4 uploads + 2 consent checkboxes)
- ✅ Updated CoverLetterStep/ProfileInformationStep (skills + guide style)
- ✅ Updated AvailabilityStep (timezone + exceptions + durations)
- ✅ Created ServicePreferencesStep component
- ✅ Created SafetyComplianceStep component
- ✅ Extended OnboardingWizard from 5 to 7 steps
- ✅ Updated validation logic for all 7 steps
- ✅ Integrated all new step components

## 🚧 Remaining Tasks

### 1. File Upload Handler (OnboardingWizard.tsx)
**Location:** `components/student/OnboardingWizard.tsx` - `handleSubmit` function

**Current Issue:** Only uploads student ID. Needs to upload:
- Government ID
- Selfie
- Profile photo

**Required Changes:**
```typescript
// In handleSubmit function, upload all files sequentially:
const files = [
  { file: formData.studentIdFile, type: 'student_id' },
  { file: formData.governmentIdFile, type: 'government_id' },
  { file: formData.selfieFile, type: 'selfie' },
  { file: formData.profilePhotoFile, type: 'profile_photo' },
];

// Upload each file and collect URLs
const uploadedUrls = await Promise.all(files.map(async ({ file, type }) => {
  if (!file) return null;
  const uploadFormData = new FormData();
  uploadFormData.append('file', file);
  uploadFormData.append('type', type);
  const response = await fetch('/api/student/upload', {
    method: 'POST',
    body: uploadFormData,
  });
  const data = await response.json();
  return { type, url: data.url };
}));
```

### 2. API Route Update
**Location:** `app/api/student/onboarding/route.ts`

**Required Changes:**
1. Update Zod validation schema to include all new fields:
   ```typescript
   const onboardingSchema = z.object({
     // Personal Details
     dateOfBirth: z.string().transform(str => new Date(str)),
     phoneNumber: z.string().min(1),
     campus: z.string().min(1),

     // Academic Details
     programDegree: z.string().min(1),
     yearOfStudy: z.string().min(1),
     expectedGraduation: z.string().min(1),

     // Identity Verification
     studentIdUrl: z.string().min(1),
     studentIdExpiry: z.string().transform(str => new Date(str)),
     governmentIdUrl: z.string().min(1),
     governmentIdExpiry: z.string().transform(str => new Date(str)),
     selfieUrl: z.string().min(1),
     profilePhotoUrl: z.string().min(1),
     documentsOwnedConfirmation: z.boolean(),
     verificationConsent: z.boolean(),

     // Profile Information
     skills: z.array(z.string()).min(1),
     preferredGuideStyle: z.string().optional(),

     // Availability
     timezone: z.string().min(1),
     preferredDurations: z.array(z.string()).min(1),
     unavailabilityExceptions: z.array(z.object({
       date: z.string().transform(str => new Date(str)),
       reason: z.string().optional(),
     })).optional(),

     // Service Preferences
     servicesOffered: z.array(z.string()).min(1),
     hourlyRate: z.number().positive(),
     onlineServicesAvailable: z.boolean(),

     // Safety & Compliance
     termsAccepted: z.boolean(),
     safetyGuidelinesAccepted: z.boolean(),
     independentGuideAcknowledged: z.boolean(),
     emergencyContactName: z.string().optional(),
     emergencyContactPhone: z.string().optional(),

     // Existing fields...
     email: z.string().email(),
     googleId: z.string(),
     name: z.string().min(1),
     gender: z.enum(['male', 'female', 'prefer_not_to_say']),
     nationality: z.string().min(1),
     institute: z.string().min(1),
     city: z.string().min(1),
     coverLetter: z.string().min(200),
     languages: z.array(z.string()).min(1),
     interests: z.array(z.string()).min(1),
     bio: z.string().min(50),
     availability: z.array(z.object({
       dayOfWeek: z.number().min(0).max(6),
       startTime: z.string(),
       endTime: z.string(),
       note: z.string().optional(),
     })).min(1),
   });
   ```

2. Update database create operation to include all new fields

3. Create unavailability exceptions if provided:
   ```typescript
   if (validatedData.unavailabilityExceptions && validatedData.unavailabilityExceptions.length > 0) {
     await prisma.unavailabilityException.createMany({
       data: validatedData.unavailabilityExceptions.map((exception) => ({
         studentId: student.id,
         date: exception.date,
         reason: exception.reason,
       })),
     });
   }
   ```

4. Calculate and set profileCompleteness:
   ```typescript
   // Calculate profile completeness (0-100)
   const calculateCompleteness = (data: any): number => {
     const requiredFields = [
       'name', 'dateOfBirth', 'gender', 'nationality', 'phoneNumber',
       'city', 'campus', 'institute', 'programDegree', 'yearOfStudy',
       'expectedGraduation', 'studentIdUrl', 'governmentIdUrl', 'selfieUrl',
       'profilePhotoUrl', 'bio', 'coverLetter', 'hourlyRate'
     ];
     const arrayFields = ['languages', 'skills', 'interests', 'servicesOffered', 'preferredDurations'];
     const booleanFields = ['documentsOwnedConfirmation', 'verificationConsent', 'termsAccepted', 'safetyGuidelinesAccepted', 'independentGuideAcknowledged'];

     let completed = 0;
     const total = requiredFields.length + arrayFields.length + booleanFields.length + 1; // +1 for availability

     requiredFields.forEach(field => { if (data[field]) completed++; });
     arrayFields.forEach(field => { if (data[field]?.length > 0) completed++; });
     booleanFields.forEach(field => { if (data[field]) completed++; });
     if (data.availability?.length > 0) completed++;

     return Math.round((completed / total) * 100);
   };

   const completeness = calculateCompleteness(validatedData);
   ```

### 3. ReviewSubmitStep Component
**Location:** `components/student/ReviewSubmitStep.tsx`

**Required Changes:**
Display all new fields in organized sections:
- Personal details (including DOB, phone)
- Academic details (program, year, graduation)
- Identity verification status (show uploaded file names, not images)
- Profile information (bio, skills, guide style)
- Availability (timezone, slots, exceptions, durations)
- Service preferences (services, rate, online availability)
- Safety compliance (checkboxes status, emergency contact)

### 4. Database Migration
**Command to run:**
```bash
npx prisma migrate dev --name add_comprehensive_student_fields
npx prisma generate
```

This will:
- Create migration files
- Update the database schema
- Generate new Prisma client with updated types

### 5. Testing Checklist
- [ ] Test each step individually
- [ ] Test validation on all required fields
- [ ] Test file uploads (all 4 types)
- [ ] Test availability exceptions
- [ ] Test service preferences
- [ ] Test complete flow end-to-end
- [ ] Verify data is correctly saved to database
- [ ] Test backward navigation between steps
- [ ] Test form data persistence when navigating back/forth

## 📝 Notes

- **File Upload API**: The existing `/api/student/upload` route should handle all file types. Verify it supports `government_id`, `selfie`, and `profile_photo` types.

- **Backwards Compatibility**: Keep `idCardUrl` field in database for backwards compatibility with any existing data.

- **Profile Completeness**: This calculated field helps admins and the system understand how complete a student's profile is.

- **Validation**: All validation is currently client-side + Zod schema on server. Consider adding database-level constraints for critical fields.

- **Future Enhancements**: Consider adding:
  - Profile photo cropping/resizing
  - Document compression before upload
  - Real-time availability calendar view
  - Pricing suggestions based on location/experience

## 🎯 Priority Order
1. **Database Migration** (Required to test anything)
2. **File Upload Handler** (Needed for verification step)
3. **API Route Update** (Backend validation and persistence)
4. **ReviewSubmitStep** (UX improvement)
5. **End-to-end Testing** (Quality assurance)
