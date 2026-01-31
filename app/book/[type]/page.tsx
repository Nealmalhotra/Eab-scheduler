'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { InterviewType } from '@/lib/types';

interface AvailableSlot {
  room: string;
  interviewer: string;
  time_slot: string;
}

const interviewTypeConfig = {
  'non-technical': {
    title: 'Non-Technical Interview',
    description: 'Behavioral and fit interviews',
    color: 'blue',
  },
  'tech-hardware': {
    title: 'Technical Hardware Interview',
    description: 'Hardware and embedded systems',
    color: 'purple',
  },
  'tech-software': {
    title: 'Technical Software Interview',
    description: 'Software development and coding',
    color: 'green',
  },
};

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const interviewType = params.type as InterviewType;
  const config = interviewTypeConfig[interviewType];

  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(
        `/api/slots?type=${interviewType}&date=${selectedDate}`
      );
      if (!response.ok) throw new Error('Failed to fetch slots');
      const data = await response.json();
      setAvailableSlots(data);
      setSelectedSlot(null);
    } catch (err) {
      setError('Failed to load available slots');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewType,
          room: selectedSlot.room,
          interviewer: selectedSlot.interviewer,
          date: selectedDate,
          timeSlot: selectedSlot.time_slot,
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book slot');
      }

      setSuccess(data.message);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to book slot');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {config.title}
          </h1>
          <p className="text-gray-600 mb-8">{config.description}</p>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time Slot
                </label>
                {availableSlots.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No slots available for this date
                  </p>
                ) : (
                  <div className="grid gap-3">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedSlot === slot
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">
                          {slot.time_slot}
                        </div>
                        <div className="text-sm text-gray-600">
                          {slot.room} - {slot.interviewer}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Personal Information */}
            {selectedSlot && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Booking...' : 'Book Interview'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
