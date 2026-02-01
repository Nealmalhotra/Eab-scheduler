# Interview Scheduler Fix Summary

## The Problem

The scheduler had incorrect time slots showing:
- Neal appeared at 9:00 AM and 9:30 AM (he doesn't work those times)
- Wrong rooms and interviewer pairs at various times

## The Misunderstanding (Now Fixed!)

I initially misunderstood your schedule. You clarified:
- **Each interview has 2 interviewers working TOGETHER as a pair**
- Shivam & Juhi interview together (not separately)
- At 10:00 AM, there are only 3 interview slots total, not 6

## The Solution

### Database Structure
- **Constraint**: `UNIQUE(room, date, time_slot)` - only one interview per room at a time
- **Interviewer field**: Stores pairs like "Shivam & Juhi" or "Neal & Deeya"
- **Total slots**: 47 interview slots across the week

### Schedule Details

**9:00 AM - 9:30 AM** (2 slots total):
- Chou n150: Shivam & Juhi (non-technical)

**10:00 AM - 10:30 AM** (3 slots each):
- Chou n150: Shivam & Juhi (non-technical)
- Chou n258: Neal & Deeya (tech-hardware, tech-software)
- Haas Library 206: Aryaman & Leon (tech-software)

**11:00 AM - 11:30 AM** (2 slots each):
- Chou n258: Neal & Deeya (tech-hardware, tech-software)
- Haas Library 206: Aryaman & Leon (tech-software)

**12:00 PM** (3 slots):
- Chou n150: Shivam & Juhi (non-technical)
- Chou n258: Neal & Deeya (tech-hardware, tech-software)
- Haas Library 207: Aryaman & Leon (tech-software)

**12:30 PM - 1:30 PM** (3 slots each):
- Chou n150: Shivam & Rishi (non-technical)
- Chou n258: Neal & Deeya at 12:30, Neal & Leon at 1:00-1:30 (tech-hardware, tech-software)
- Haas Library 207: Aryaman & Leon at 12:30, Aryaman & Deeya at 1:00-1:30 (tech-software)

**2:00 PM - 3:30 PM** (3 slots each):
- Chou n150: Shivam & Rishi, then Shivam & Casey from 3:00 (non-technical)
- Chou n258: Neal & Leon (tech-hardware, tech-software)
- Chou n115: Aryaman & Deeya (tech-software)

**4:00 PM - 4:30 PM** (3 slots each):
- Chou n150: Shivam & Casey (non-technical)
- Chou n258: Neal & Leon (tech-hardware, tech-software)
- Haas Courtyard: Aryaman & Deeya (tech-software)

## Files Changed

1. `app/api/init-db/route.ts` - Correct schema and 47 interview slots
2. `app/api/reset-db/route.ts` - Reset with correct data
3. `app/api/slots/route.ts` - Filter by room (not interviewer)
4. `app/book/[type]/page.tsx` - Show only room names (no interviewer names)
5. `scripts/init-db.sql` - SQL script with correct data
6. `DATABASE_RESET.md` - Updated instructions

## Latest Update

Added 2 new time slots at Haas Courtyard (4:00 PM and 4:30 PM) with Aryaman & Deeya for tech-software interviews.

## Deployment Steps

1. **Commit and push**:
```bash
git add .
git commit -m "Fix: Update schedule with correct interviewer pairs and time slots"
git push
```

2. **Reset the database** (after deployment):
```bash
curl -X POST https://eab-scheduler.vercel.app/api/reset-db
```

3. **Verify**: 
   - 9:00 AM: Shows only 1 option (Chou n150)
   - 10:00 AM tech-software: Shows 2 options (Chou n258, Haas Library 206)
   - No interviewer names visible to students
   - Neal does NOT appear at 9:00 AM or 9:30 AM
