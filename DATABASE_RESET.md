# Database Update Instructions

The database schema and data need to be updated to match the actual schedule with:
- Multiple interviewers per room at the same time
- Correct time slot availability per interviewer
- 5 rooms total (n150, n258, n115, Library 206, Library 207)
- 7 interviewers (Shivam, Juhi, Neal, Deeya, Leon, Rishi, Casey, Aryaman)

## Step 1: Migrate Database Schema

First, update the database constraints:

```bash
curl -X POST https://eab-scheduler.vercel.app/api/migrate-db
```

This will:
1. Drop old UNIQUE constraint on `(room, date, time_slot)` from bookings
2. Add new UNIQUE constraint on `(interviewer, date, time_slot)` to bookings
3. Update time_slots table constraints to allow multiple interviewers per room

## Step 2: Reset Data

Then, populate with the correct schedule:

```bash
curl -X POST https://eab-scheduler.vercel.app/api/reset-db
```

This will:
1. Delete all existing bookings and time slots
2. Re-insert the actual schedule with correct interviewer availability
3. Set up 30-minute intervals matching the provided schedule

## What Gets Fixed

- ✅ **Schema**: Unique constraints changed from room-based to interviewer-based
- ✅ **Multiple interviewers**: Same room can have multiple interview slots at same time
- ✅ **Correct schedule**: Neal has NO 9:00 AM or 9:30 AM slots
- ✅ **5 rooms**: Chou n150, n258, n115, Haas Library 206, 207
- ✅ **7 interviewers**: All interviewers with their correct time slots
- ✅ **Interview types**: Shivam/Juhi/Rishi/Casey = non-technical only, Neal/Deeya/Leon = both technical types, Aryaman = software only

## After Update

Refresh the booking page and verify:
- 9:00 AM shows only Shivam and Juhi (in n150) - NO Neal or other tech interviewers
- 10:00 AM shows correct distribution across all available rooms
- Tech-software interviews at 10:00 AM show Neal, Deeya, Aryaman, and Leon as options
- Non-technical interviews only show the correct interviewers (no technical-only people)
