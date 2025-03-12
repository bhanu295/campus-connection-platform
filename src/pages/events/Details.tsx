
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EventDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Campus Tech Festival 2024</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Date & Time</h3>
            <p>March 15, 2024 - 10:00 AM</p>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>Main Auditorium</p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground">
              Join us for a day of technology demonstrations, workshops, and networking opportunities.
              This event features presentations from industry experts and showcases student projects.
            </p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
            Register for Event
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;
