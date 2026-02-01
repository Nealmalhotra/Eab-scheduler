import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    // Delete all existing data
    await query('DELETE FROM bookings', []);
    await query('DELETE FROM time_slots', []);

    // Re-insert actual schedule for Monday (day = 1)
    const slots = [
      // 9:00 AM - 9:30 AM: Only Chou n150 (Shivam, Juhi)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '9:00 AM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Juhi', day: 1, time: '9:00 AM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '9:30 AM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Juhi', day: 1, time: '9:30 AM', types: ['non-technical'] },
      
      // 10:00 AM: n150 (Shivam, Juhi), n258 (Neal, Deeya), 206 (Aryaman, Leon)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '10:00 AM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Juhi', day: 1, time: '10:00 AM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '10:00 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Deeya', day: 1, time: '10:00 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman', day: 1, time: '10:00 AM', types: ['tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Leon', day: 1, time: '10:00 AM', types: ['tech-software'] },
      
      // 10:30 AM: Same as 10:00 AM
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '10:30 AM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Juhi', day: 1, time: '10:30 AM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '10:30 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Deeya', day: 1, time: '10:30 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman', day: 1, time: '10:30 AM', types: ['tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Leon', day: 1, time: '10:30 AM', types: ['tech-software'] },
      
      // 11:00 AM: n258 (Neal, Deeya), 206 (Aryaman, Leon)
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '11:00 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Deeya', day: 1, time: '11:00 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman', day: 1, time: '11:00 AM', types: ['tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Leon', day: 1, time: '11:00 AM', types: ['tech-software'] },
      
      // 11:30 AM: Same as 11:00 AM
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '11:30 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Deeya', day: 1, time: '11:30 AM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Aryaman', day: 1, time: '11:30 AM', types: ['tech-software'] },
      { room: 'Haas Library 206', interviewer: 'Leon', day: 1, time: '11:30 AM', types: ['tech-software'] },
      
      // 12:00 PM: n150 (Shivam, Juhi), n258 (Neal, Deeya), 207 (Aryaman, Leon)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '12:00 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Juhi', day: 1, time: '12:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '12:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Deeya', day: 1, time: '12:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman', day: 1, time: '12:00 PM', types: ['tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Leon', day: 1, time: '12:00 PM', types: ['tech-software'] },
      
      // 12:30 PM: n150 (Shivam, Rishi), n258 (Neal, Deeya), 207 (Aryaman, Leon)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '12:30 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Rishi', day: 1, time: '12:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '12:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Deeya', day: 1, time: '12:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman', day: 1, time: '12:30 PM', types: ['tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Leon', day: 1, time: '12:30 PM', types: ['tech-software'] },
      
      // 1:00 PM: n150 (Shivam, Rishi), n258 (Neal, Leon), 207 (Aryaman, Deeya)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '1:00 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Rishi', day: 1, time: '1:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '1:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '1:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman', day: 1, time: '1:00 PM', types: ['tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Deeya', day: 1, time: '1:00 PM', types: ['tech-software'] },
      
      // 1:30 PM: Same as 1:00 PM
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '1:30 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Rishi', day: 1, time: '1:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '1:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '1:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Aryaman', day: 1, time: '1:30 PM', types: ['tech-software'] },
      { room: 'Haas Library 207', interviewer: 'Deeya', day: 1, time: '1:30 PM', types: ['tech-software'] },
      
      // 2:00 PM: n150 (Shivam, Rishi), n258 (Neal, Leon), n115 (Aryaman, Deeya)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '2:00 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Rishi', day: 1, time: '2:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '2:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '2:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman', day: 1, time: '2:00 PM', types: ['tech-software'] },
      { room: 'Chou n115', interviewer: 'Deeya', day: 1, time: '2:00 PM', types: ['tech-software'] },
      
      // 2:30 PM: Same as 2:00 PM
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '2:30 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Rishi', day: 1, time: '2:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '2:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '2:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman', day: 1, time: '2:30 PM', types: ['tech-software'] },
      { room: 'Chou n115', interviewer: 'Deeya', day: 1, time: '2:30 PM', types: ['tech-software'] },
      
      // 3:00 PM: n150 (Shivam, Casey), n258 (Neal, Leon), n115 (Aryaman, Deeya)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '3:00 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Casey', day: 1, time: '3:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '3:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '3:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman', day: 1, time: '3:00 PM', types: ['tech-software'] },
      { room: 'Chou n115', interviewer: 'Deeya', day: 1, time: '3:00 PM', types: ['tech-software'] },
      
      // 3:30 PM: Same as 3:00 PM
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '3:30 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Casey', day: 1, time: '3:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '3:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '3:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n115', interviewer: 'Aryaman', day: 1, time: '3:30 PM', types: ['tech-software'] },
      { room: 'Chou n115', interviewer: 'Deeya', day: 1, time: '3:30 PM', types: ['tech-software'] },
      
      // 4:00 PM: n150 (Shivam, Casey), n258 (Neal, Leon)
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '4:00 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Casey', day: 1, time: '4:00 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '4:00 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '4:00 PM', types: ['tech-hardware', 'tech-software'] },
      
      // 4:30 PM: Same as 4:00 PM
      { room: 'Chou n150', interviewer: 'Shivam', day: 1, time: '4:30 PM', types: ['non-technical'] },
      { room: 'Chou n150', interviewer: 'Casey', day: 1, time: '4:30 PM', types: ['non-technical'] },
      { room: 'Chou n258', interviewer: 'Neal', day: 1, time: '4:30 PM', types: ['tech-hardware', 'tech-software'] },
      { room: 'Chou n258', interviewer: 'Leon', day: 1, time: '4:30 PM', types: ['tech-hardware', 'tech-software'] },
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
