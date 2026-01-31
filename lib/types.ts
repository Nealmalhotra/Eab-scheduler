export type InterviewType = 'non-technical' | 'tech-hardware' | 'tech-software';

export interface TimeSlot {
  id: number;
  room: string;
  interviewer: string;
  day_of_week: number;
  time_slot: string;
  interview_types: string[];
}

export interface Booking {
  id: number;
  interview_type: string;
  room: string;
  interviewer: string;
  date: Date;
  time_slot: string;
  applicant_name: string;
  applicant_email: string;
  confirmed: boolean;
  confirmation_token: string;
  created_at: Date;
}

export interface AvailableSlot {
  room: string;
  interviewer: string;
  time_slot: string;
  date: string;
}
