import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Confirmation token is required' },
        { status: 400 }
      );
    }

    // Find booking by token
    const result = await query(
      'SELECT * FROM bookings WHERE confirmation_token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid confirmation token' },
        { status: 404 }
      );
    }

    const booking = result.rows[0];

    if (booking.confirmed) {
      return NextResponse.json({
        success: true,
        message: 'This booking has already been confirmed',
        booking,
      });
    }

    // Update booking to confirmed
    await query(
      'UPDATE bookings SET confirmed = true WHERE confirmation_token = $1',
      [token]
    );

    return NextResponse.json({
      success: true,
      message: 'Booking confirmed successfully!',
      booking,
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    return NextResponse.json(
      { error: 'Failed to confirm booking' },
      { status: 500 }
    );
  }
}
