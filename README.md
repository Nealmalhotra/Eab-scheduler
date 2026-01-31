# Interview Scheduler

A specialized interview scheduling application for managing multiple interview types across different rooms and interviewers.

## Features

- **3 Interview Types:**
  - Non-Technical (Behavioral and fit interviews with Shivam)
  - Technical Hardware (Hardware and embedded systems with Neal)
  - Technical Software (Software development with Neal or Aryaman)

- **4 Rooms:**
  - Chou n150 (Non-technical only)
  - Chou n258 (Hardware & Software)
  - Chou n115 (Software only)
  - Haas Library 206 (Software only)

- **Email Confirmation System:** Applicants receive confirmation emails and must confirm their booking
- **Admin Dashboard:** View all bookings, filter by status, and search
- **Smart Scheduling:** Prevents double-booking and shows only available slots

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL (without Prisma)
- Nodemailer (for email confirmations)

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- SMTP credentials for sending emails (e.g., Gmail)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd Eab-scheduler
npm install
```

### 2. Database Setup

Create a PostgreSQL database and run the initialization script:

```bash
# Connect to your PostgreSQL instance
psql -U your_username -d your_database

# Run the initialization script
\i scripts/init-db.sql
```

Or using the command line:

```bash
psql -U your_username -d your_database -f scripts/init-db.sql
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Email (for confirmation emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note for Gmail users:** You need to create an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular Gmail password.

### 4. Customize Time Slots (Optional)

The default time slots are configured in `scripts/init-db.sql`. You can modify them to match your actual schedule:

- Edit the `INSERT INTO time_slots` statements
- Change `day_of_week` (0 = Sunday, 1 = Monday, etc.)
- Adjust time slots and rooms as needed

After making changes, re-run the SQL script.

### 5. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### For Applicants

1. Visit the home page
2. Select your interview type (Non-technical, Tech Hardware, or Tech Software)
3. Choose a date and available time slot
4. Enter your name and email
5. Click "Book Interview"
6. Check your email and click the confirmation link

### For Admins

1. Visit `/admin` to see all bookings
2. Filter by confirmation status (All, Confirmed, Pending)
3. Search by name, email, room, or interviewer
4. View bookings organized by date and time

## Database Schema

### `bookings` Table

- `id`: Serial primary key
- `interview_type`: Type of interview
- `room`: Room name
- `interviewer`: Interviewer name
- `date`: Interview date
- `time_slot`: Time slot (e.g., "9:00 AM")
- `applicant_name`: Applicant's name
- `applicant_email`: Applicant's email
- `confirmed`: Boolean confirmation status
- `confirmation_token`: Unique token for email confirmation
- `created_at`: Timestamp

### `time_slots` Table

- `id`: Serial primary key
- `room`: Room name
- `interviewer`: Interviewer name
- `day_of_week`: Day of week (0-6)
- `time_slot`: Time slot
- `interview_types`: Array of supported interview types

## Customization

### Adding New Rooms or Interviewers

1. Update the database by adding new entries to the `time_slots` table
2. Modify the home page (`app/page.tsx`) if you want to add new interview type categories

### Changing the Schedule

Edit `scripts/init-db.sql` and re-run it to update available time slots.

### Email Templates

Edit `lib/email.ts` to customize the confirmation email template.

## Troubleshooting

### Email not sending

- Check your SMTP credentials in `.env`
- For Gmail, ensure you're using an App Password
- Check your SMTP host and port settings
- Look at the server logs for detailed error messages

### Database connection issues

- Verify your `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Check that the database exists and the user has proper permissions

### Slots not showing

- Verify that time slots are configured for the correct day of week
- Check that the interview type matches the slots in the database
- Ensure no bookings exist that would conflict

## Project Structure

```
Eab-scheduler/
├── app/
│   ├── api/              # API routes
│   │   ├── slots/        # Get available slots
│   │   ├── book/         # Create bookings
│   │   ├── confirm/      # Confirm bookings
│   │   └── admin/        # Admin endpoints
│   ├── book/[type]/      # Booking pages
│   ├── confirm/[token]/  # Confirmation page
│   ├── admin/            # Admin dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── db.ts            # Database connection
│   ├── email.ts         # Email sending
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
├── scripts/
│   └── init-db.sql      # Database initialization
├── .env.example         # Environment variables template
└── README.md
```

## License

MIT
