# WanderNest - Student-Led Tourism Platform

A platform connecting international tourists with local students for authentic travel experiences.

## Features

### Safety & Reporting System

This implementation includes a comprehensive safety and reporting system:

#### 1. Report System
- **Report Types**: SAFETY_CONCERN, INAPPROPRIATE_BEHAVIOR, PAYMENT_DISPUTE, HARASSMENT, NO_SHOW, OTHER
- **Immediate Actions**: Automatic admin notification and temporary suspension for critical reports (Safety Concerns, Harassment)
- **Pattern Detection**: Automatic flagging when a user receives 3+ reports within 6 months
- **API Endpoint**: `/api/reports` for submitting reports

#### 2. Safety Guidelines Page
- Comprehensive safety guidelines in accordion format for easy scanning
- Emergency contact numbers by city (searchable table)
- Required "I understand" checkbox before first booking
- Covers topics: pre-trip preparation, meeting hosts, financial safety, personal safety, health, and cultural respect

#### 3. Database Schema
- Enhanced `Report` model with structured fields
- `ReportType` enum for categorization
- Safety acknowledgment tracking in `Student` model
- Automatic timestamps and status tracking

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- SMTP email service (for admin notifications)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wandernest
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database and email configuration:
```
DATABASE_URL="postgresql://user:password@localhost:5432/wandernest"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
ADMIN_EMAIL="admin@wandernest.com"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
wandernest/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   ├── reports/              # Report submission endpoint
│   │   └── safety/               # Safety acknowledgment endpoint
│   ├── safety-guidelines/        # Safety guidelines page
│   ├── report/                   # Report form page
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── SafetyAccordion.tsx       # Accordion for safety tips
│   ├── EmergencyContactsTable.tsx # Emergency contacts table
│   └── ReportForm.tsx            # Report submission form
├── lib/                          # Utilities and services
│   ├── prisma.ts                 # Prisma client
│   ├── email.ts                  # Email notification service
│   ├── reportHandler.ts          # Report handling logic
│   └── emergencyContacts.ts      # Emergency contacts data
└── prisma/
    └── schema.prisma             # Database schema
```

## API Endpoints

### POST /api/reports
Submit a new report.

**Request Body:**
```json
{
  "type": "SAFETY_CONCERN",
  "reportedUserId": "user-id",
  "reportedBy": "reporter@email.com",
  "description": "Detailed description of the incident"
}
```

**Response:**
```json
{
  "success": true,
  "reportId": "report-id",
  "message": "Report submitted successfully",
  "immediateAction": true
}
```

### POST /api/safety/acknowledge
Acknowledge safety guidelines.

**Request Body:**
```json
{
  "studentId": "student-id"
}
```

## Report Handling Logic

The system automatically:

1. **For SAFETY_CONCERN or HARASSMENT reports:**
   - Sends immediate email notification to admins
   - Temporarily suspends the reported user
   - Updates report status to "under_review"

2. **For all reports:**
   - Stores the report in the database
   - Checks for patterns (3+ reports in 6 months)
   - Flags users with multiple reports for manual review

3. **Pattern Detection:**
   - Automatically counts reports per user
   - Sends admin notification when threshold is reached
   - Updates user status for review

## Safety Features

- **Comprehensive Guidelines**: 8 categories of safety information
- **Emergency Contacts**: Pre-loaded contacts for 10 major cities
- **Acknowledgment Tracking**: Required checkbox before first booking
- **Report System**: Multiple report types with appropriate escalation
- **Admin Notifications**: Immediate alerts for critical issues
- **User Suspension**: Automatic temporary suspension for serious reports

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Email**: Nodemailer

## Development

### Database Changes

After modifying the Prisma schema:

```bash
npx prisma generate
npx prisma db push
```

### Running in Production

```bash
npm run build
npm start
```

## Contributing

This is an educational project. Contributions are welcome!

## License

MIT
