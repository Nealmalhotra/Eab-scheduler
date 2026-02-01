# Database Migration Summary

## Problem
The original database schema couldn't support multiple interviewers in the same room at the same time, and the schedule data didn't match the actual availability:
- Neal incorrectly appeared at 9:00 AM and 9:30 AM slots
- Shivam incorrectly appeared as an option for technical interviews
- Missing interviewers: Juhi, Deeya, Leon, Rishi, Casey
- Missing room: Haas Library 207

## Solution
Changed the database schema to be interviewer-centric rather than room-centric, and populated with the actual schedule.

## Changes Made

### 1. Database Schema Updates
- **bookings table**: Changed `UNIQUE(room, date, time_slot)` to `UNIQUE(interviewer, date, time_slot)`
  - This allows multiple interviews in the same room at the same time (different interviewers)
  
- **time_slots table**: Changed `UNIQUE(room, day_of_week, time_slot)` to `UNIQUE(room, interviewer, day_of_week, time_slot)`
  - This allows multiple interviewers to be available in the same room at the same time

### 2. Updated Files
- `app/api/init-db/route.ts` - Updated schema and populated with actual schedule (106 time slots)
- `app/api/reset-db/route.ts` - Updated to match the actual schedule
- `app/api/slots/route.ts` - Changed booking check from room-based to interviewer-based
- `app/api/migrate-db/route.ts` - NEW: Migration route to update existing databases
- `app/book/[type]/page.tsx` - Added interviewer name to slot display
- `scripts/init-db.sql` - Updated schema and data to match API routes
- `DATABASE_RESET.md` - Updated with new migration instructions

### 3. Actual Schedule Implemented
All time slots now match your provided schedule exactly:

**9:00 AM - 9:30 AM**: Only Chou n150
- Shivam (non-technical)
- Juhi (non-technical)

**10:00 AM - 10:30 AM**: 
- n150: Shivam, Juhi (non-technical)
- n258: Neal, Deeya (tech-hardware, tech-software)
- Library 206: Aryaman, Leon (tech-software)

**11:00 AM - 11:30 AM**: 
- n258: Neal, Deeya (tech-hardware, tech-software)
- Library 206: Aryaman, Leon (tech-software)

**12:00 PM**: 
- n150: Shivam, Juhi (non-technical)
- n258: Neal, Deeya (tech-hardware, tech-software)
- Library 207: Aryaman, Leon (tech-software)

**12:30 PM**: 
- n150: Shivam, Rishi (non-technical)
- n258: Neal, Deeya (tech-hardware, tech-software)
- Library 207: Aryaman, Leon (tech-software)

**1:00 PM - 1:30 PM**: 
- n150: Shivam, Rishi (non-technical)
- n258: Neal, Leon (tech-hardware, tech-software)
- Library 207: Aryaman, Deeya (tech-software)

**2:00 PM - 3:30 PM**: 
- n150: Shivam, Rishi/Casey (non-technical)
- n258: Neal, Leon (tech-hardware, tech-software)
- n115: Aryaman, Deeya (tech-software)

**4:00 PM - 4:30 PM**: 
- n150: Shivam, Casey (non-technical)
- n258: Neal, Leon (tech-hardware, tech-software)

## Deployment Steps

### For Deployed Application (Vercel)

1. **Deploy the code changes**:
```bash
git add .
git commit -m "Fix: Update database schema and schedule data to match actual availability"
git push
```

2. **Run the migration** (after deployment completes):
```bash
curl -X POST https://eab-scheduler.vercel.app/api/migrate-db
```

3. **Reset the data**:
```bash
curl -X POST https://eab-scheduler.vercel.app/api/reset-db
```

4. **Verify**: Visit the booking pages and check:
   - ✅ 9:00 AM shows only Shivam and Juhi (NO Neal)
   - ✅ 10:00 AM tech-software shows Neal, Deeya, Aryaman, Leon (NO Shivam)
   - ✅ All slots show "Room - Interviewer" format

### For Local Development

1. Set up `.env` file with your DATABASE_URL
2. Run: `npm run dev`
3. Visit: `http://localhost:3000/api/migrate-db` (POST)
4. Visit: `http://localhost:3000/api/reset-db` (POST)

## Total Slots Created
- **106 individual interviewer time slots** across 5 rooms and 7 interviewers
- Each slot represents one interviewer's availability at a specific time and location
