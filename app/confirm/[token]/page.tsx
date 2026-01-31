'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Confirming your booking...</p>
          </div>
        )}

        {!loading && error && (
          <div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Confirmation Failed
            </h2>
            <p className="text-red-600 text-center mb-6">{error}</p>
            <Link
              href="/"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}

        {!loading && confirmed && booking && (
          <div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Booking Confirmed!
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-semibold text-gray-900">{booking.applicant_name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Interview Type:</span>
                <p className="font-semibold text-gray-900">
                  {booking.interview_type.split('-').map((word: string) =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Date:</span>
                <p className="font-semibold text-gray-900">
                  {new Date(booking.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Time:</span>
                <p className="font-semibold text-gray-900">{booking.time_slot}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Room:</span>
                <p className="font-semibold text-gray-900">{booking.room}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Interviewer:</span>
                <p className="font-semibold text-gray-900">{booking.interviewer}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center mb-6">
              You'll receive a confirmation email with all the details.
            </p>

            <Link
              href="/"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
