import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Calendar, Users, CheckCircle, XCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  max_volunteers: number;
}

interface RSVP {
  event_id: string;
  status: string;
}

export function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [rsvps, setRsvps] = useState<Record<string, RSVP>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchUserRSVPs();
    }
  }, [user]);

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('end_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserRSVPs() {
    try {
      const { data, error } = await supabase
        .from('event_rsvps')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;

      const rsvpMap: Record<string, RSVP> = {};
      data?.forEach((rsvp) => {
        rsvpMap[rsvp.event_id] = rsvp;
      });
      setRsvps(rsvpMap);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    }
  }

  async function handleRSVP(eventId: string, status: string) {
    try {
      if (!user) return;

      const existingRSVP = rsvps[eventId];
      if (existingRSVP) {
        // Update existing RSVP
        const { error } = await supabase
          .from('event_rsvps')
          .update({ status })
          .eq('event_id', eventId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new RSVP
        const { error } = await supabase
          .from('event_rsvps')
          .insert([
            {
              event_id: eventId,
              user_id: user.id,
              status,
            },
          ]);

        if (error) throw error;
      }

      await fetchUserRSVPs();
    } catch (error) {
      console.error('Error updating RSVP:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-600">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>

      {events.length > 0 ? (
        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {event.title}
                </h2>
                <p className="mt-2 text-gray-600">{event.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-500">
                  
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    {new Date(event.start_time).toLocaleDateString()},{' '}
                    {new Date(event.start_time).toLocaleTimeString()} -{' '}
                    {new Date(event.end_time).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max Volunteers: {event.max_volunteers}</span>
                </div>
              </div>

              {user && (
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleRSVP(event.id, 'approved')}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                      rsvps[event.id]?.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {rsvps[event.id]?.status === 'approved'
                      ? "You're Going!"
                      : 'RSVP Yes'}
                  </button>
                  <button
                    onClick={() => handleRSVP(event.id, 'declined')}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                      rsvps[event.id]?.status === 'declined'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {rsvps[event.id]?.status === 'declined'
                      ? 'Not Going'
                      : 'RSVP No'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No upcoming events
          </h3>
          <p className="mt-1 text-gray-500">
            Check back later for new volunteer opportunities.
          </p>
        </div>
      )}
    </div>
  );
}