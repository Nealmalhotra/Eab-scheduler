import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { InterviewType } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const interviewType = searchParams.get('type') as InterviewType;
    const date = searchParams.get('date');

    if (!interviewType || !date) {
      return NextResponse.json(
        { error: 'Interview type and date are required' },
        { status: 400 }
      );
    }

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    // Get all time slots that support this interview type for this day of week
    const slotsResult = await query(
      `SELECT DISTINCT room, interviewer, time_slot
       FROM time_slots
       WHERE $1 = ANY(interview_types) AND day_of_week = $2
       ORDER BY time_slot`,
      [interviewType, dayOfWeek]
    );

    // Get already booked slots for this date
    const bookedResult = await query(
      `SELECT room, time_slot
       FROM bookings
       WHERE date = $1`,
      [date]
    );

    const bookedSlots = new Set(
      bookedResult.rows.map((b: any) => `${b.room}-${b.time_slot}`)
    );

    // Filter out booked slots
    const availableSlots = slotsResult.rows.filter((slot: any) =>
      !bookedSlots.has(`${slot.room}-${slot.time_slot}`)
    );

    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}
