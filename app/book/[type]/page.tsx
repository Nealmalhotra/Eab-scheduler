'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { InterviewType } from '@/lib/types';

interface AvailableSlot {
  room: string;
  interviewer: string;
  time_slot: string;
}

const interviewTypeConfig = {
  'non-technical': {
    title: 'Non-Technical Interview',
  },
  'tech-hardware': {
    title: 'Technical Interview',
  },
  'tech-software': {
    title: 'Technical Interview',
  },
};

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const interviewType = params.type as InterviewType;
  const config = interviewTypeConfig[interviewType];

  // Fixed date: Monday, February 2, 2026
  const INTERVIEW_DATE = '2026-02-02';

  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(
        `/api/slots?type=${interviewType}&date=${INTERVIEW_DATE}`
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
          date: INTERVIEW_DATE,
          timeSlot: selectedSlot.time_slot,
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book slot');
      }

      setSuccess(`${selectedSlot.time_slot} at ${selectedSlot.room}`);
      
      // Reset form and refresh available slots
      setName('');
      setEmail('');
      setSelectedSlot(null);
      fetchAvailableSlots();
    } catch (err: any) {
      setError(err.message || 'Failed to book slot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="border-2 border-black p-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            {config.title}
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            All interviews are on <strong>Monday, February 2, 2026</strong>
          </p>

          {success && (
            <div className="bg-black text-white px-4 py-3 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg mb-1">Booking Confirmed!</p>
                  <p className="text-sm">{success}</p>
                </div>
                <button
                  onClick={() => {
                    setSuccess('');
                    setSelectedSlot(null);
                    setName('');
                    setEmail('');
                    fetchAvailableSlots();
                  }}
                  className="text-white hover:text-gray-300 ml-4"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="border-2 border-black bg-white px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - Time Slot Selection */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Select Time Slot
                </label>
                {availableSlots.length === 0 ? (
                  <p className="text-gray-600 text-sm">
                    No slots available
                  </p>
                ) : (
                  <div className="grid gap-3">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 border-2 text-left transition-all ${
                          selectedSlot === slot
                            ? 'border-black bg-black text-white'
                            : 'border-black bg-white hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-semibold">
                          {slot.time_slot}
                        </div>
                        <div className="text-sm">
                          {slot.room}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side - Personal Information */}
              <div>
                {selectedSlot ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-black focus:outline-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                      {loading ? 'Booking...' : 'Book Interview'}
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">
                    Select a time slot to continue
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
