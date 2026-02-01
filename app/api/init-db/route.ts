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

    if (count === 0) {
      // Insert default time slots (Monday = 1)
      const slots = [
        // Shivam - Non-technical only (Chou n150)
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '9:00 AM', types: ['non-technical'] },
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '10:00 AM', types: ['non-technical'] },
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '11:00 AM', types: ['non-technical'] },
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '12:00 PM', types: ['non-technical'] },
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '2:00 PM', types: ['non-technical'] },
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '3:00 PM', types: ['non-technical'] },
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '4:00 PM', types: ['non-technical'] },
        { room: 'Chou n150 (Nontechnical)', interviewer: 'Shivam', day: 1, time: '5:00 PM', types: ['non-technical'] },

        // Neal - Hardware & Software (Chou n258)
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '9:00 AM', types: ['tech-hardware', 'tech-software'] },
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '10:00 AM', types: ['tech-hardware', 'tech-software'] },
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '11:00 AM', types: ['tech-hardware', 'tech-software'] },
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '12:00 PM', types: ['tech-hardware', 'tech-software'] },
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '2:00 PM', types: ['tech-hardware', 'tech-software'] },
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '3:00 PM', types: ['tech-hardware', 'tech-software'] },
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '4:00 PM', types: ['tech-hardware', 'tech-software'] },
        { room: 'Chou n258 (Software & Hardware)', interviewer: 'Neal', day: 1, time: '5:00 PM', types: ['tech-hardware', 'tech-software'] },

        // Aryaman - Software only (Chou n115)
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '9:00 AM', types: ['tech-software'] },
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '10:00 AM', types: ['tech-software'] },
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '11:00 AM', types: ['tech-software'] },
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '12:00 PM', types: ['tech-software'] },
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '2:00 PM', types: ['tech-software'] },
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '3:00 PM', types: ['tech-software'] },
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '4:00 PM', types: ['tech-software'] },
        { room: 'Chou n115 (Software)', interviewer: 'Aryaman', day: 1, time: '5:00 PM', types: ['tech-software'] },

        // Aryaman - Software only (Haas Library 206)
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '9:00 AM', types: ['tech-software'] },
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '10:00 AM', types: ['tech-software'] },
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '11:00 AM', types: ['tech-software'] },
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '12:00 PM', types: ['tech-software'] },
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '2:00 PM', types: ['tech-software'] },
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '3:00 PM', types: ['tech-software'] },
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '4:00 PM', types: ['tech-software'] },
        { room: 'Haas Library 206 (Software)', interviewer: 'Aryaman', day: 1, time: '5:00 PM', types: ['tech-software'] },
      ];

      for (const slot of slots) {
        await query(
          `INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types)
           VALUES ($1, $2, $3, $4, $5)`,
          [slot.room, slot.interviewer, slot.day, slot.time, slot.types]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tablesCreated: ['bookings', 'time_slots'],
      slotsInserted: count === 0 ? 32 : 0,
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
