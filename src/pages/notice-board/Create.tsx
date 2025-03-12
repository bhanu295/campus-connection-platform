
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateNotice = () => {
  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input 
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter notice title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea 
                className="w-full p-2 border rounded-md h-32"
                placeholder="Enter notice content"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className="w-full p-2 border rounded-md">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary/90"
            >
              Post Notice
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNotice;
