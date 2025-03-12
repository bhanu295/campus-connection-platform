
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateEvent = () => {
  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Title</label>
              <input 
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter event title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input 
                type="date"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                className="w-full p-2 border rounded-md h-32"
                placeholder="Enter event description"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary/90"
            >
              Create Event
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
