import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST() {
  try {
    // Create bookings table
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        interview_type VARCHAR(50) NOT NULL,
        room VARCHAR(100) NOT NULL,
        interviewer VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        time_slot VARCHAR(20) NOT NULL,
        applicant_name VARCHAR(255) NOT NULL,
        applicant_email VARCHAR(255) NOT NULL,
        confirmed BOOLEAN DEFAULT FALSE,
        confirmation_token VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(room, date, time_slot)
      );
    `, []);

    // Create time_slots table
    await query(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id SERIAL PRIMARY KEY,
        room VARCHAR(100) NOT NULL,
        interviewer VARCHAR(100) NOT NULL,
        day_of_week INTEGER NOT NULL,
        time_slot VARCHAR(20) NOT NULL,
        interview_types TEXT[] NOT NULL,
        UNIQUE(room, day_of_week, time_slot)
      );
    `, []);

    // Check if time_slots has data
    const existingSlots = await query('SELECT COUNT(*) FROM time_slots', []);
    const count = parseInt(existingSlots.rows[0].count);

    let slotsInserted = 0;

    if (count === 0) {
      // Insert actual schedule for Monday (day = 1)
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
        
        // 4:00 PM: 2 slots
        { room: 'Chou n150', interviewer: 'Shivam & Casey', day: 1, time: '4:00 PM', types: ['non-technical'] },
        { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '4:00 PM', types: ['tech-hardware', 'tech-software'] },
        
        // 4:30 PM: 2 slots
        { room: 'Chou n150', interviewer: 'Shivam & Casey', day: 1, time: '4:30 PM', types: ['non-technical'] },
        { room: 'Chou n258', interviewer: 'Neal & Leon', day: 1, time: '4:30 PM', types: ['tech-hardware', 'tech-software'] },
      ];

      for (const slot of slots) {
        await query(
          `INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types)
           VALUES ($1, $2, $3, $4, $5)`,
          [slot.room, slot.interviewer, slot.day, slot.time, slot.types]
        );
      }

      slotsInserted = slots.length;
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tablesCreated: ['bookings', 'time_slots'],
      slotsInserted,
    });
  } catch (error: any) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
