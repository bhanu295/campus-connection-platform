
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ManageEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tech Workshop",
      date: "2024-03-15",
      location: "Main Hall",
      status: "upcoming"
    },
    // Add more mock events...
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>
      <Card>
        <CardHeader>
          <CardTitle>Events List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Location</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-b">
                    <td className="p-2">{event.title}</td>
                    <td className="p-2">{event.date}</td>
                    <td className="p-2">{event.location}</td>
                    <td className="p-2 capitalize">{event.status}</td>
                    <td className="p-2">
                      <button className="text-primary hover:underline">Edit</button>
                      <button className="text-destructive hover:underline ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageEvents;
