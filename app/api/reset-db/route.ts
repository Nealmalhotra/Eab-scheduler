import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    // Delete all existing data
    await query('DELETE FROM bookings', []);
    await query('DELETE FROM time_slots', []);

    // Re-insert clean time slots - 30 minute intervals
    const timeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];

    const slots = [];

    // Shivam - Non-technical only
    for (const time of timeSlots) {
      slots.push({
        room: 'Chou n150',
        interviewer: 'Shivam',
        day: 1,
        time,
        types: ['non-technical']
      });
    }

    // Neal - Hardware & Software
    for (const time of timeSlots) {
      slots.push({
        room: 'Chou n258',
        interviewer: 'Neal',
        day: 1,
        time,
        types: ['tech-hardware', 'tech-software']
      });
    }

    // Aryaman - Software only
    for (const time of timeSlots) {
      slots.push({
        room: 'Chou n115',
        interviewer: 'Aryaman',
        day: 1,
        time,
        types: ['tech-software']
      });
    }

    // Aryaman - Software only
    for (const time of timeSlots) {
      slots.push({
        room: 'Haas Library 206',
        interviewer: 'Aryaman',
        day: 1,
        time,
        types: ['tech-software']
      });
    }

    for (const slot of slots) {
      await query(
        `INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types)
         VALUES ($1, $2, $3, $4, $5)`,
        [slot.room, slot.interviewer, slot.day, slot.time, slot.types]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Database reset successfully',
      slotsInserted: slots.length,
    });
  } catch (error: any) {
    console.error('Database reset error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
