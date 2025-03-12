
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Notices = () => {
  const notices = [
    {
      id: 1,
      title: "Semester End Examination Schedule",
      date: "2024-03-01",
      priority: "high"
    },
    // Add more mock notices...
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notice Board</h1>
        <Link 
          to="/notices/create" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Post Notice
        </Link>
      </div>

      <div className="space-y-4">
        {notices.map(notice => (
          <Card key={notice.id}>
            <CardHeader>
              <CardTitle>{notice.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Posted on: {notice.date}</span>
                <span className="capitalize">Priority: {notice.priority}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notices;
