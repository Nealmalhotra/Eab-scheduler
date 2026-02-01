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

-- 9:00 AM - 9:30 AM: Only Chou n150 (Shivam, Juhi)
INSERT INTO time_slots (room, interviewer, day_of_week, time_slot, interview_types) VALUES
('Chou n150', 'Shivam', 1, '9:00 AM', ARRAY['non-technical']),
('Chou n150', 'Juhi', 1, '9:00 AM', ARRAY['non-technical']),
('Chou n150', 'Shivam', 1, '9:30 AM', ARRAY['non-technical']),
('Chou n150', 'Juhi', 1, '9:30 AM', ARRAY['non-technical']),

-- 10:00 AM: n150 (Shivam, Juhi), n258 (Neal, Deeya), 206 (Aryaman, Leon)
('Chou n150', 'Shivam', 1, '10:00 AM', ARRAY['non-technical']),
('Chou n150', 'Juhi', 1, '10:00 AM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '10:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Deeya', 1, '10:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman', 1, '10:00 AM', ARRAY['tech-software']),
('Haas Library 206', 'Leon', 1, '10:00 AM', ARRAY['tech-software']),

-- 10:30 AM: Same as 10:00 AM
('Chou n150', 'Shivam', 1, '10:30 AM', ARRAY['non-technical']),
('Chou n150', 'Juhi', 1, '10:30 AM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '10:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Deeya', 1, '10:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman', 1, '10:30 AM', ARRAY['tech-software']),
('Haas Library 206', 'Leon', 1, '10:30 AM', ARRAY['tech-software']),

-- 11:00 AM: n258 (Neal, Deeya), 206 (Aryaman, Leon)
('Chou n258', 'Neal', 1, '11:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Deeya', 1, '11:00 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman', 1, '11:00 AM', ARRAY['tech-software']),
('Haas Library 206', 'Leon', 1, '11:00 AM', ARRAY['tech-software']),

-- 11:30 AM: Same as 11:00 AM
('Chou n258', 'Neal', 1, '11:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Deeya', 1, '11:30 AM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 206', 'Aryaman', 1, '11:30 AM', ARRAY['tech-software']),
('Haas Library 206', 'Leon', 1, '11:30 AM', ARRAY['tech-software']),

-- 12:00 PM: n150 (Shivam, Juhi), n258 (Neal, Deeya), 207 (Aryaman, Leon)
('Chou n150', 'Shivam', 1, '12:00 PM', ARRAY['non-technical']),
('Chou n150', 'Juhi', 1, '12:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '12:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Deeya', 1, '12:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman', 1, '12:00 PM', ARRAY['tech-software']),
('Haas Library 207', 'Leon', 1, '12:00 PM', ARRAY['tech-software']),

-- 12:30 PM: n150 (Shivam, Rishi), n258 (Neal, Deeya), 207 (Aryaman, Leon)
('Chou n150', 'Shivam', 1, '12:30 PM', ARRAY['non-technical']),
('Chou n150', 'Rishi', 1, '12:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '12:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Deeya', 1, '12:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman', 1, '12:30 PM', ARRAY['tech-software']),
('Haas Library 207', 'Leon', 1, '12:30 PM', ARRAY['tech-software']),

-- 1:00 PM: n150 (Shivam, Rishi), n258 (Neal, Leon), 207 (Aryaman, Deeya)
('Chou n150', 'Shivam', 1, '1:00 PM', ARRAY['non-technical']),
('Chou n150', 'Rishi', 1, '1:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '1:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '1:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman', 1, '1:00 PM', ARRAY['tech-software']),
('Haas Library 207', 'Deeya', 1, '1:00 PM', ARRAY['tech-software']),

-- 1:30 PM: Same as 1:00 PM
('Chou n150', 'Shivam', 1, '1:30 PM', ARRAY['non-technical']),
('Chou n150', 'Rishi', 1, '1:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '1:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '1:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Haas Library 207', 'Aryaman', 1, '1:30 PM', ARRAY['tech-software']),
('Haas Library 207', 'Deeya', 1, '1:30 PM', ARRAY['tech-software']),

-- 2:00 PM: n150 (Shivam, Rishi), n258 (Neal, Leon), n115 (Aryaman, Deeya)
('Chou n150', 'Shivam', 1, '2:00 PM', ARRAY['non-technical']),
('Chou n150', 'Rishi', 1, '2:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '2:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '2:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman', 1, '2:00 PM', ARRAY['tech-software']),
('Chou n115', 'Deeya', 1, '2:00 PM', ARRAY['tech-software']),

-- 2:30 PM: Same as 2:00 PM
('Chou n150', 'Shivam', 1, '2:30 PM', ARRAY['non-technical']),
('Chou n150', 'Rishi', 1, '2:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '2:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '2:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman', 1, '2:30 PM', ARRAY['tech-software']),
('Chou n115', 'Deeya', 1, '2:30 PM', ARRAY['tech-software']),

-- 3:00 PM: n150 (Shivam, Casey), n258 (Neal, Leon), n115 (Aryaman, Deeya)
('Chou n150', 'Shivam', 1, '3:00 PM', ARRAY['non-technical']),
('Chou n150', 'Casey', 1, '3:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '3:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '3:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman', 1, '3:00 PM', ARRAY['tech-software']),
('Chou n115', 'Deeya', 1, '3:00 PM', ARRAY['tech-software']),

-- 3:30 PM: Same as 3:00 PM
('Chou n150', 'Shivam', 1, '3:30 PM', ARRAY['non-technical']),
('Chou n150', 'Casey', 1, '3:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '3:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '3:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n115', 'Aryaman', 1, '3:30 PM', ARRAY['tech-software']),
('Chou n115', 'Deeya', 1, '3:30 PM', ARRAY['tech-software']),

-- 4:00 PM: n150 (Shivam, Casey), n258 (Neal, Leon)
('Chou n150', 'Shivam', 1, '4:00 PM', ARRAY['non-technical']),
('Chou n150', 'Casey', 1, '4:00 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '4:00 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '4:00 PM', ARRAY['tech-hardware', 'tech-software']),

-- 4:30 PM: Same as 4:00 PM
('Chou n150', 'Shivam', 1, '4:30 PM', ARRAY['non-technical']),
('Chou n150', 'Casey', 1, '4:30 PM', ARRAY['non-technical']),
('Chou n258', 'Neal', 1, '4:30 PM', ARRAY['tech-hardware', 'tech-software']),
('Chou n258', 'Leon', 1, '4:30 PM', ARRAY['tech-hardware', 'tech-software']);
