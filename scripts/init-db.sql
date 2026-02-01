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
  UNIQUE(room, date, time_slot)
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
  interview_types TEXT[] NOT NULL
);

-- Time slots - 30 minute intervals for Monday, Feb 2, 2026

-- Shivam - Non-technical
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 1, '9:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '9:30 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '10:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '10:30 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '11:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '11:30 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '12:00 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '12:30 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '1:00 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '1:30 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '2:00 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '2:30 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '3:00 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '3:30 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '4:00 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '4:30 PM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '5:00 PM', ARRAY['non-technical']);

-- Neal - Technical
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n258', 'Neal', 1, '9:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '9:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '10:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '10:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '11:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '11:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '12:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '12:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '1:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '1:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '2:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '2:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '3:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '3:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '4:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '4:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Neal', 1, '5:00 PM', ARRAY['tech-hardware', 'tech-software']);

-- Aryaman - Technical
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n115', 'Aryaman', 1, '9:00 AM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '9:30 AM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '10:00 AM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '10:30 AM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '11:00 AM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '11:30 AM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '12:00 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '12:30 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '1:00 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '1:30 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '2:00 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '2:30 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '3:00 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '3:30 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '4:00 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '4:30 PM', ARRAY['tech-software']),
('Chou n115', 'Aryaman', 1, '5:00 PM', ARRAY['tech-software']);

-- Aryaman - Technical
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Haas Library 206', 'Aryaman', 1, '9:00 AM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '9:30 AM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '10:00 AM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '10:30 AM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '11:00 AM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '11:30 AM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '12:00 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '12:30 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '1:00 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '1:30 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '2:00 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '2:30 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '3:00 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '3:30 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '4:00 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '4:30 PM', ARRAY['tech-software']),
('Haas Library 206', 'Aryaman', 1, '5:00 PM', ARRAY['tech-software']);
