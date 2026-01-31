# Customization Guide

This guide will help you customize the interview scheduler to match your specific schedule.

## Understanding Your Schedule

Based on the screenshot you provided, you have:

- **4 Rooms:**
  - Chou n150 (Nontechnical) - Shivam
  - Chou n258 (Software & Hardware) - Neal
  - Chou n115 (Software) - Aryaman
  - Haas Library 206 (Software) - Aryaman

- **3 Interview Types:**
  - Non-technical (can only book Shivam's room)
  - Tech Hardware (can only book Neal's room)
  - Tech Software (can book Neal or Aryaman - 3 rooms total)

## Step 1: Update Your Schedule in the Database

The default schedule is configured for **Mondays** (day_of_week = 1) with these time slots:
- 9:00 AM, 10:00 AM, 11:00 AM, 12:00 PM
- 2:00 PM, 3:00 PM, 4:00 PM, 5:00 PM

### To customize the schedule:

1. Open `scripts/init-db.sql`

2. Find the `INSERT INTO time_slots` sections

3. Modify according to your needs:

```sql
-- Example: Adding a Tuesday 1:00 PM slot for Shivam
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 2, '1:00 PM', ARRAY['non-technical']);
-- day_of_week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
```

4. If you need to add more interviewers or rooms:

```sql
-- Example: Adding a new interviewer "John" in a new room
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Engineering Hall 101', 'John', 1, '9:00 AM', ARRAY['tech-software']);
```

5. Re-run the database initialization:

```bash
psql $DATABASE_URL -f scripts/init-db.sql
```

## Step 2: Parse Your Existing Schedule

If you have a specific schedule (like the one in your screenshot), here's how to interpret it:

### Reading the Schedule

Looking at your screenshot:
- Rows with "AM" or "PM" indicate time periods
- Names in cells indicate who's conducting interviews at that time
- Some slots may be blocked out (shown as black in the screenshot)

### Example Schedule Mapping

If your schedule shows:
- Row 2: AM, Shivam (Column B) → This means Shivam has a morning slot in Chou n150
- Row 6: AM, Shivam (B), Neal (C), Aryaman (E) → All three are available at this time

You would add these as:

```sql
-- Assuming this is a 9:00 AM slot on Monday
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 1, '9:00 AM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '9:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman', 1, '9:00 AM', ARRAY['tech-software']);
```

## Step 3: Update Time Slot Labels

If you want to use different time formats (e.g., "9:00-9:30" instead of "9:00 AM"):

1. Update the SQL inserts in `scripts/init-db.sql`
2. The time_slot field is just a string, so you can use any format

## Step 4: Block Specific Slots

If certain rooms are unavailable at specific times:

1. Simply don't add those slots to the database
2. Or, create a separate table for blocked slots (advanced)

## Step 5: Add Multiple Days

If you're running interviews on multiple days:

```sql
-- Monday slots
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 1, '9:00 AM', ARRAY['non-technical']);

-- Tuesday slots
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 2, '9:00 AM', ARRAY['non-technical']);

-- And so on...
```

## Step 6: Test Your Configuration

1. Start the dev server: `npm run dev`
2. Visit the booking page for each interview type
3. Select a date and verify the correct slots appear
4. Try booking a slot to ensure it works end-to-end

## Common Scenarios

### Scenario 1: Interviewer Has Different Availability on Different Days

```sql
-- Shivam only available mornings on Monday
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 1, '9:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '10:00 AM', ARRAY['non-technical']);

-- Shivam available all day on Wednesday
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 3, '9:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 3, '11:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 3, '2:00 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 3, '4:00 PM', ARRAY['non-technical']);
```

### Scenario 2: Room Changes Purpose on Different Days

```sql
-- Chou n115 is for software interviews on Monday
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n115', 'Aryaman', 1, '9:00 AM', ARRAY['tech-software']);

-- Same room used for hardware on Wednesday by a different interviewer
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n115', 'Neal', 3, '9:00 AM', ARRAY['tech-hardware']);
```

### Scenario 3: 30-Minute Slots Instead of 1-Hour

```sql
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 1, '9:00 AM - 9:30 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '9:30 AM - 10:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '10:00 AM - 10:30 AM', ARRAY['non-technical']);
```

## Advanced: Using Your Actual Data

If you have your schedule in a spreadsheet or want to bulk import:

1. Export your schedule to CSV
2. Create a script to generate SQL INSERT statements
3. Or use PostgreSQL's COPY command to bulk import

Example Python script to generate SQL:

```python
import csv

# Read your CSV
with open('schedule.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types)")
        print(f"VALUES ('{row['room']}', '{row['interviewer']}', {row['day']}, '{row['time']}', ARRAY['{row['type']}']);")
```

## Need Help?

If you're having trouble configuring your schedule, check:

1. Database logs for any constraint violations
2. The admin dashboard to see what slots are being created
3. Browser console for any API errors

The most common issues:
- Forgetting to re-run the SQL after changes
- Using the wrong day_of_week number
- Typos in interview_types (must match exactly: 'non-technical', 'tech-hardware', 'tech-software')
