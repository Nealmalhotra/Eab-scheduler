'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
  id: number;
  interview_type: string;
  room: string;
  interviewer: string;
  date: string;
  time_slot: string;
  applicant_name: string;
  applicant_email: string;
  confirmed: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    // Apply confirmation filter
    if (filter === 'confirmed' && !booking.confirmed) return false;
    if (filter === 'pending' && booking.confirmed) return false;

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        booking.applicant_name.toLowerCase().includes(search) ||
        booking.applicant_email.toLowerCase().includes(search) ||
        booking.room.toLowerCase().includes(search) ||
        booking.interviewer.toLowerCase().includes(search)
      );
    }

    return true;
  });

  // Group bookings by date
  const bookingsByDate = filteredBookings.reduce((acc, booking) => {
    const date = new Date(booking.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="border-2 border-black p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <button
              onClick={fetchBookings}
              className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Refresh
            </button>
          </div>

          {error && (
            <div className="border-2 border-black px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by name, email, room, or interviewer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[300px] px-4 py-2 border-2 border-black focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 border-2 border-black transition-colors ${
                  filter === 'all'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-4 py-2 border-2 border-black transition-colors ${
                  filter === 'confirmed'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                Confirmed ({bookings.filter((b) => b.confirmed).length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 border-2 border-black transition-colors ${
                  filter === 'pending'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                Pending ({bookings.filter((b) => !b.confirmed).length})
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-700">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-700">
              No bookings found
            </div>
          ) : (
            <div className="space-y-8">
              {Object.keys(bookingsByDate)
                .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                .map((date) => (
                  <div key={date}>
                    <h2 className="text-xl font-semibold text-black mb-4 pb-2 border-b-2 border-black">
                      {date}
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-2 border-black">
                        <thead className="bg-black text-white">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                              Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                              Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                              Room
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                              Interviewer
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {bookingsByDate[date]
                            .sort((a, b) => {
                              const timeA = a.time_slot.toLowerCase();
                              const timeB = b.time_slot.toLowerCase();
                              return timeA.localeCompare(timeB);
                            })
                            .map((booking) => (
                              <tr key={booking.id} className="hover:bg-gray-100 border border-black">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-black border border-black">
                                  {booking.time_slot}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-black border border-black">
                                  <span className="px-2 py-1 border border-black text-xs">
                                    {booking.interview_type
                                      .split('-')
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() + word.slice(1)
                                      )
                                      .join(' ')}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-black border border-black">
                                  {booking.applicant_name}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-black border border-black">
                                  {booking.applicant_email}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-black border border-black">
                                  {booking.room}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-black border border-black">
                                  {booking.interviewer}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm border border-black">
                                  {booking.confirmed ? (
                                    <span className="px-2 py-1 border border-black text-xs">
                                      Confirmed
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 border border-black text-xs">
                                      Pending
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
