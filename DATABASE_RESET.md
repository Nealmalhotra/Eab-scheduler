# Database Reset Instructions

The database needs to be reset to match the actual schedule with correct interviewer pairs and time slots.

## Understanding the Schedule

- Each interview has **2 interviewers working together as a pair**
- Example: "Shivam & Juhi" is ONE interview slot (they interview together)
- 6 rooms: Chou n150, n258, n115, Haas Library 206, 207, Haas Courtyard
- Interviewer pairs work different times in different rooms

## Reset the Database

```bash
curl -X POST https://eab-scheduler.vercel.app/api/reset-db
```

This will:
1. Delete all existing bookings and time slots
2. Re-insert 47 interview slots with correct interviewer pairs
3. Set up 30-minute intervals matching your schedule

## What Gets Fixed

- ✅ **Correct schedule**: Neal has NO 9:00 AM or 9:30 AM slots
- ✅ **Interviewer pairs**: Each slot shows the pair working together (e.g., "Shivam & Juhi")
- ✅ **Room-based booking**: Only one interview per room at a time
- ✅ **Interview types**: 
  - Shivam/Juhi/Rishi/Casey pairs = non-technical only
  - Neal/Deeya/Leon pairs = both tech-hardware and tech-software
  - Aryaman/Deeya/Leon pairs = tech-software only

## Expected Schedule (47 total slots)

- **9:00 AM - 9:30 AM**: 1 slot (Chou n150 only)
- **10:00 AM - 10:30 AM**: 3 slots each
- **11:00 AM - 11:30 AM**: 2 slots each  
- **12:00 PM - 3:30 PM**: 3 slots each
- **4:00 PM - 4:30 PM**: 3 slots each (added Haas Courtyard)

## After Reset

Refresh the booking page and verify:
- 9:00 AM shows only 1 option: Chou n150 (non-technical)
- 10:00 AM tech-software shows 2 options: Chou n258, Haas Library 206
- 10:00 AM non-technical shows 1 option: Chou n150
- Interviewer names are NOT shown to students (only room names)
