import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    // Drop old constraints
    await query(`
      ALTER TABLE bookings 
      DROP CONSTRAINT IF EXISTS bookings_room_date_time_slot_key;
    `, []);

    await query(`
      ALTER TABLE time_slots 
      DROP CONSTRAINT IF EXISTS time_slots_room_day_of_week_time_slot_key;
    `, []);

    // Add new constraints
    await query(`
      ALTER TABLE bookings 
      ADD CONSTRAINT bookings_interviewer_date_time_slot_key 
      UNIQUE (interviewer, date, time_slot);
    `, []);

    await query(`
      ALTER TABLE time_slots 
      ADD CONSTRAINT time_slots_room_interviewer_day_of_week_time_slot_key 
      UNIQUE (room, interviewer, day_of_week, time_slot);
    `, []);

    return NextResponse.json({
      success: true,
      message: 'Database schema migrated successfully. Now run /api/reset-db to populate with correct data.',
    });
  } catch (error: any) {
    console.error('Database migration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
