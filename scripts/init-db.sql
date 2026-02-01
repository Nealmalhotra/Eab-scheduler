-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  interview_type VARCHAR(50) NOT NULL,
  room VARCHAR(100) NOT NULL,
  interviewer VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time_slot VARCHAR(20) NOT NULL,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(interviewer, date, time_slot)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date, time_slot);
CREATE INDEX IF NOT EXISTS idx_bookings_confirmation_token ON bookings(confirmation_token);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(applicant_email);

-- Create time_slots configuration table
CREATE TABLE IF NOT EXISTS time_slots (
  id SERIAL PRIMARY KEY,
  room VARCHAR(100) NOT NULL,
  interviewer VARCHAR(50) NOT NULL,
  day_of_week INTEGER NOT NULL,
  time_slot VARCHAR(20) NOT NULL,
  interview_types TEXT[] NOT NULL,
  UNIQUE(room, interviewer, day_of_week, time_slot)
);

-- Time slots - Actual schedule for Monday, Feb 2, 2026
-- Each slot has 2 interviewers working together as a pair

INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
-- 9:00 AM - 9:30 AM: Only Chou n150 (Shivam & Juhi)
('Chou n150', 'Shivam & Juhi', 1, '9:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam & Juhi', 1, '9:30 AM', ARRAY['non-technical']),

-- 10:00 AM: 3 slots
('Chou n150', 'Shivam & Juhi', 1, '10:00 AM', ARRAY['non-technical']),
('Chou n258', 'Neal & Deeya', 1, '10:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman & Leon', 1, '10:00 AM', ARRAY['tech-software']),

-- 10:30 AM: 3 slots
('Chou n150', 'Shivam & Juhi', 1, '10:30 AM', ARRAY['non-technical']),
('Chou n258', 'Neal & Deeya', 1, '10:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman & Leon', 1, '10:30 AM', ARRAY['tech-software']),

-- 11:00 AM: 2 slots
('Chou n258', 'Neal & Deeya', 1, '11:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman & Leon', 1, '11:00 AM', ARRAY['tech-software']),

-- 11:30 AM: 2 slots
('Chou n258', 'Neal & Deeya', 1, '11:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman & Leon', 1, '11:30 AM', ARRAY['tech-software']),

-- 12:00 PM: 3 slots
('Chou n150', 'Shivam & Juhi', 1, '12:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Deeya', 1, '12:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman & Leon', 1, '12:00 PM', ARRAY['tech-software']),

-- 12:30 PM: 3 slots
('Chou n150', 'Shivam & Rishi', 1, '12:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Deeya', 1, '12:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman & Leon', 1, '12:30 PM', ARRAY['tech-software']),

-- 1:00 PM: 3 slots
('Chou n150', 'Shivam & Rishi', 1, '1:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '1:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman & Deeya', 1, '1:00 PM', ARRAY['tech-software']),

-- 1:30 PM: 3 slots
('Chou n150', 'Shivam & Rishi', 1, '1:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '1:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman & Deeya', 1, '1:30 PM', ARRAY['tech-software']),

-- 2:00 PM: 3 slots
('Chou n150', 'Shivam & Rishi', 1, '2:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '2:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman & Deeya', 1, '2:00 PM', ARRAY['tech-software']),

-- 2:30 PM: 3 slots
('Chou n150', 'Shivam & Rishi', 1, '2:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '2:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman & Deeya', 1, '2:30 PM', ARRAY['tech-software']),

-- 3:00 PM: 3 slots
('Chou n150', 'Shivam & Casey', 1, '3:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '3:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman & Deeya', 1, '3:00 PM', ARRAY['tech-software']),

-- 3:30 PM: 3 slots
('Chou n150', 'Shivam & Casey', 1, '3:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '3:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman & Deeya', 1, '3:30 PM', ARRAY['tech-software']),

-- 4:00 PM: 3 slots
('Chou n150', 'Shivam & Casey', 1, '4:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '4:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Courtyard', 'Aryaman & Deeya', 1, '4:00 PM', ARRAY['tech-software']),

-- 4:30 PM: 3 slots
('Chou n150', 'Shivam & Casey', 1, '4:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal & Leon', 1, '4:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Courtyard', 'Aryaman & Deeya', 1, '4:30 PM', ARRAY['tech-software']);
