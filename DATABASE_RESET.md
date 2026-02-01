# Database Reset Instructions

The database needs to be reset to remove the "(Software)" and "(Hardware)" labels from room names and ensure 30-minute time intervals.

## Option 1: Use the Reset API (Recommended)

Visit this URL in your browser or use curl:

```bash
curl -X POST https://eab-scheduler.vercel.app/api/reset-db
```

This will:
1. Delete all existing bookings and time slots
2. Re-insert clean time slots with proper room names
3. Set up 30-minute intervals (9:00 AM, 9:30 AM, 10:00 AM, etc.)

## Option 2: Manual SQL Reset

If you prefer to reset manually, run this SQL:

```sql
DELETE FROM bookings;
DELETE FROM time_slots;
```

Then run the initialization:

```bash
curl -X POST https://eab-scheduler.vercel.app/api/init-db
```

## What Gets Fixed

- ✅ Room names: "Chou n150", "Chou n258", "Chou n115", "Haas Library 206" (no labels)
- ✅ 30-minute time intervals from 9:00 AM to 5:00 PM
- ✅ 17 slots per room = 68 total available time slots
- ✅ No "(Software)" or "(Hardware)" visible to users

## After Reset

Refresh the booking page and you should see clean room names without any labels.
