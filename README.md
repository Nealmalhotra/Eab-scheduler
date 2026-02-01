# Interview Scheduler

A specialized interview scheduling application for managing multiple interview types across different rooms and interviewers.

## Features

- **3 Interview Types:**
  - Non-Technical (Behavioral and fit interviews)
  - Technical Hardware (Hardware and embedded systems)
  - Technical Software (Software development)

- **6 Rooms:**
  - Chou n150 (Non-technical only)
  - Chou n258 (Hardware & Software)
  - Chou n115 (Software only)
  - Haas Library 206 (Software only)
  - Haas Library 207 (Software only)
  - Haas Courtyard (Software only)

- **Instant Booking:** Bookings are automatically confirmed upon submission
- **Admin Dashboard:** View all bookings, filter by status, and search
- **Smart Scheduling:** Prevents double-booking and shows only available slots
- **Interviewer Pairs:** Each interview slot has 2 interviewers working together

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database

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

# App URL (optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

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
3. Choose an available time slot and room
4. Enter your name and email
5. Click "Book Interview"
6. Your interview is instantly confirmed!

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
- `interviewer`: Interviewer pair (e.g., "Shivam & Juhi")
- `date`: Interview date
- `time_slot`: Time slot (e.g., "9:00 AM")
- `applicant_name`: Applicant's name
- `applicant_email`: Applicant's email
- `confirmed`: Boolean confirmation status (auto-set to true)
- `confirmation_token`: Unique token (for database schema compatibility)
- `created_at`: Timestamp

### `time_slots` Table

- `id`: Serial primary key
- `room`: Room name
- `interviewer`: Interviewer pair (e.g., "Neal & Deeya")
- `day_of_week`: Day of week (0-6, where 1 = Monday)
- `time_slot`: Time slot (e.g., "10:00 AM")
- `interview_types`: Array of supported interview types

## Customization

### Adding New Rooms or Interviewers

1. Update the database by adding new entries to the `time_slots` table
2. Modify the home page (`app/page.tsx`) if you want to add new interview type categories

### Changing the Schedule

Edit `scripts/init-db.sql` and re-run it to update available time slots.


## Troubleshooting

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
