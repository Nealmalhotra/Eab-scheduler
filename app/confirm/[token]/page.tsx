'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ConfirmPage() {
  const params = useParams();
  const token = params.token as string;
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    confirmBooking();
  }, []);

  const confirmBooking = async () => {
    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm booking');
      }

      setConfirmed(true);
      setBooking(data.booking);
    } catch (err: any) {
      setError(err.message || 'Failed to confirm booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full border-2 border-black p-8">
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-700">Confirming your booking...</p>
          </div>
        )}

        {!loading && error && (
          <div>
            <h2 className="text-2xl font-bold text-black text-center mb-2">
              Confirmation Failed
            </h2>
            <p className="text-gray-700 text-center mb-6">{error}</p>
          </div>
        )}

        {!loading && confirmed && booking && (
          <div>
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              Booking Confirmed!
            </h2>

            <div className="border-2 border-black p-6 mb-6 space-y-3">
              <div>
                <span className="text-sm text-gray-700">Name:</span>
                <p className="font-semibold text-black">{booking.applicant_name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-700">Interview Type:</span>
                <p className="font-semibold text-black">
                  {booking.interview_type === 'non-technical' ? 'Non-Technical Interview' : 'Technical Interview'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-700">Date:</span>
                <p className="font-semibold text-black">
                  {new Date(booking.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-700">Time:</span>
                <p className="font-semibold text-black">{booking.time_slot}</p>
              </div>
              <div>
                <span className="text-sm text-gray-700">Room:</span>
                <p className="font-semibold text-black">{booking.room}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 text-center">
              You'll receive a confirmation email with all the details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
