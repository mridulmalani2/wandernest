# WanderNest - NextAuth University Email Authentication

A Next.js application with NextAuth authentication that validates university email addresses and implements student verification workflow.

## Features

- **Google OAuth Integration**: Sign in with Google using NextAuth
- **University Email Validation**: Automatic validation of `.edu`, `.ac.*`, and other university domains
- **Manual Verification Flow**: For non-standard university emails
- **Student Status Management**: Tracks PENDING_APPROVAL, APPROVED, and SUSPENDED states
- **Session Management**: Database sessions with Prisma adapter
- **Toast Notifications**: User feedback with Sonner
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js 4.24
- **Database ORM**: Prisma with PostgreSQL
- **Styling**: Tailwind CSS
- **Notifications**: Sonner
- **Language**: TypeScript

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/wandernest"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

#### Generating NextAuth Secret

```bash
openssl rand -base64 32
```

### 3. Database Setup

```bash
# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
wandernest/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth API route
│   │   └── student/
│   │       └── manual-verification/
│   │           └── route.ts          # Manual verification API
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx             # Sign in page
│   │   └── error/
│   │       └── page.tsx             # Auth error page
│   ├── student/
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Student dashboard
│   │   ├── manual-verification/
│   │   │   └── page.tsx             # Manual verification form
│   │   └── pending-approval/
│   │       └── page.tsx             # Pending approval page
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Global styles
├── components/
│   └── providers/
│       └── SessionProvider.tsx      # NextAuth session provider
├── lib/
│   ├── auth.ts                      # NextAuth configuration
│   └── prisma.ts                    # Prisma client
├── prisma/
│   └── schema.prisma                # Database schema
├── types/
│   └── next-auth.d.ts              # NextAuth type extensions
└── package.json
```

## Authentication Flow

### 1. University Email Sign-In

1. User clicks "Sign in with Google"
2. Google OAuth flow authenticates user
3. Email domain is validated against university patterns
4. If valid:
   - Student record created with `PENDING_APPROVAL` status
   - User redirected to dashboard
5. If invalid:
   - User redirected to manual verification form

### 2. Email Domain Validation

Valid university email patterns:
- `.edu` (US universities)
- `.edu.[country]` (e.g., `.edu.au`, `.edu.in`)
- `.ac.[country]` (e.g., `.ac.uk`, `.ac.fr`)
- `.university`

Validation regex:
```typescript
/\.edu$|\.edu\.[a-z]{2}$|\.ac\.[a-z]{2}$|\.university$/
```

### 3. Manual Verification

For non-standard university emails:

1. User fills out verification form with:
   - Email, name, institute, nationality, city
   - Student ID card upload
   - Cover letter
2. Form submitted to `/api/student/manual-verification`
3. Student record created with `PENDING_APPROVAL` status
4. Admin reviews and approves/rejects

## Database Schema

### Student Model

```prisma
model Student {
  id                String          @id @default(cuid())
  email             String          @unique
  googleId          String?         @unique
  name              String
  status            StudentStatus   @default(PENDING_APPROVAL)
  // ... other fields
}

enum StudentStatus {
  PENDING_APPROVAL
  APPROVED
  SUSPENDED
}
```

### NextAuth Models

- `Account`: OAuth provider accounts
- `Session`: User sessions
- `VerificationToken`: Email verification tokens

## Frontend Implementation

### Using NextAuth Session

```typescript
'use client';

import { useSession, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <p>Logged in as: {session?.user?.email}</p>
      <p>Status: {session?.user?.status}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
```

### Toast Notifications

```typescript
import { toast } from 'sonner';

// Success
toast.success('Application submitted!');

// Error
toast.error('Something went wrong');

// Info
toast.info('Account pending approval');
```

## API Routes

### POST /api/student/manual-verification

Submit manual verification application.

**Request Body** (FormData):
- `email`: string
- `name`: string
- `institute`: string
- `nationality`: string
- `city`: string
- `coverLetter`: string
- `idCardFile`: File

**Response**:
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "studentId": "clxxx..."
}
```

## Development

### Database Management

```bash
# Open Prisma Studio
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset
```

### Type Generation

```bash
# Generate Prisma types
npx prisma generate
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` to version control
2. **Email Validation**: Server-side validation prevents bypassing client checks
3. **Session Security**: Database sessions with secure cookies
4. **CSRF Protection**: Built-in NextAuth CSRF protection
5. **OAuth Scopes**: Minimal Google OAuth scopes requested

## Deployment

### Environment Variables

Set these in your production environment:
- `DATABASE_URL`
- `NEXTAUTH_URL` (production URL)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Database Migration

```bash
npx prisma migrate deploy
```

### Build

```bash
npm run build
npm start
```

## Troubleshooting

### Prisma Client Not Found

```bash
npx prisma generate
```

### Session Not Persisting

Check that:
1. `DATABASE_URL` is correct
2. Database is accessible
3. Migrations are applied
4. Session table exists

### Google OAuth Errors

Verify:
1. Redirect URIs match in Google Console
2. OAuth consent screen is configured
3. Credentials are correct in `.env`

## Next Steps

- [ ] Implement file upload to cloud storage (AWS S3, Cloudinary)
- [ ] Add email notifications (SendGrid, Resend)
- [ ] Create admin panel for approval workflow
- [ ] Add profile completion flow
- [ ] Implement availability scheduling
- [ ] Add tourist request matching

## License

MIT
