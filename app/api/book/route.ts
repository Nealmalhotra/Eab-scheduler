import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interviewType, room, interviewer, date, timeSlot, name, email } = body;

    // Validate required fields
    if (!interviewType || !room || !interviewer || !date || !timeSlot || !name || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if slot is still available
    const existingBooking = await query(
      'SELECT id FROM bookings WHERE room = $1 AND date = $2 AND time_slot = $3',
      [room, date, timeSlot]
    );

    if (existingBooking.rows.length > 0) {
      return NextResponse.json(
        { error: 'This slot has already been booked' },
        { status: 409 }
      );
    }

    // Generate confirmation token (still needed for database schema)
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    // Create booking - auto-confirmed
    const result = await query(
      `INSERT INTO bookings
       (interview_type, room, interviewer, date, time_slot, applicant_name, applicant_email, confirmation_token, confirmed)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
       RETURNING id`,
      [interviewType, room, interviewer, date, timeSlot, name, email, confirmationToken]
    );

    return NextResponse.json({
      success: true,
      bookingId: result.rows[0].id,
      message: 'Interview booked successfully!',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
