import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/email';
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

    // Generate confirmation token
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    // Create booking
    const result = await query(
      `INSERT INTO bookings
       (interview_type, room, interviewer, date, time_slot, applicant_name, applicant_email, confirmation_token, confirmed)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)
       RETURNING id`,
      [interviewType, room, interviewer, date, timeSlot, name, email, confirmationToken]
    );

    // Send confirmation email
    const emailResult = await sendConfirmationEmail(
      email,
      name,
      interviewType,
      room,
      interviewer,
      new Date(date).toLocaleDateString(),
      timeSlot,
      confirmationToken
    );

    let message = 'Booking created! Please check your email to confirm.';

    if (emailResult.skipped) {
      message = `Booking created! Please visit this link to confirm: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirm/${confirmationToken}`;
    } else if (!emailResult.success) {
      console.error('Failed to send confirmation email');
      message = `Booking created! Please visit this link to confirm: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirm/${confirmationToken}`;
    }

    return NextResponse.json({
      success: true,
      bookingId: result.rows[0].id,
      message,
      confirmationUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirm/${confirmationToken}`,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
