import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    // Delete all existing data
    await query('DELETE FROM bookings', []);
    await query('DELETE FROM time_slots', []);

    // Re-insert actual schedule for Monday (day = 1)
    // Each slot has 2 interviewers working together as a pair
    const slots = [
      // 9:00 AM - 9:30 AM: Only Chou n150 (Shivam & Juhi)
      { room: 'Chou n150', interviewer: 'Shivam & Juhi', day: 1, time: '9:00 AM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Shivam & Juhi', day: 1, time: '9:30 AM', types: ['non-technical'] },
      
      // 10:00 AM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Juhi', day: 1, time: '10:00 AM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Deeya', day: 1, time: '10:00 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman & Leon', day: 1, time: '10:00 AM', types: ['tech-software'] },
      
      // 10:30 AM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Juhi', day: 1, time: '10:30 AM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Deeya', day: 1, time: '10:30 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman & Leon', day: 1, time: '10:30 AM', types: ['tech-software'] },
      
      // 11:00 AM: 2 slots
      { room: 'Chou n258', interviewer: 'Neal & Deeya', day: 1, time: '11:00 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman & Leon', day: 1, time: '11:00 AM', types: ['tech-software'] },
      
      // 11:30 AM: 2 slots
      { room: 'Chou n258', interviewer: 'Neal & Deeya', day: 1, time: '11:30 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman & Leon', day: 1, time: '11:30 AM', types: ['tech-software'] },
      
      // 12:00 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Juhi', day: 1, time: '12:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Deeya', day: 1, time: '12:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman & Leon', day: 1, time: '12:00 PM', types: ['tech-software'] },
      
      // 12:30 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Rishi', day: 1, time: '12:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Deeya', day: 1, time: '12:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman & Leon', day: 1, time: '12:30 PM', types: ['tech-software'] },
      
      // 1:00 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Rishi', day: 1, time: '1:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '1:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman & Deeya', day: 1, time: '1:00 PM', types: ['tech-software'] },
      
      // 1:30 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Rishi', day: 1, time: '1:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '1:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman & Deeya', day: 1, time: '1:30 PM', types: ['tech-software'] },
      
      // 2:00 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Rishi', day: 1, time: '2:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '2:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman & Deeya', day: 1, time: '2:00 PM', types: ['tech-software'] },
      
      // 2:30 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Rishi', day: 1, time: '2:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '2:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman & Deeya', day: 1, time: '2:30 PM', types: ['tech-software'] },
      
      // 3:00 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Casey', day: 1, time: '3:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '3:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman & Deeya', day: 1, time: '3:00 PM', types: ['tech-software'] },
      
      // 3:30 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Casey', day: 1, time: '3:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '3:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman & Deeya', day: 1, time: '3:30 PM', types: ['tech-software'] },
      
      // 4:00 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Casey', day: 1, time: '4:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '4:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Courtyard', interviewer: 'Aryaman & Deeya', day: 1, time: '4:00 PM', types: ['tech-software'] },
      
      // 4:30 PM: 3 slots
      { room: 'Chou n150', interviewer: 'Shivam & Casey', day: 1, time: '4:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '4:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Courtyard', interviewer: 'Aryaman & Deeya', day: 1, time: '4:30 PM', types: ['tech-software'] },
    ];

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
