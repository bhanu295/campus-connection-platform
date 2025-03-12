
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ManageNotices = () => {
  const notices = [
    {
      id: 1,
      title: "Exam Schedule",
      postedBy: "Admin",
      date: "2024-02-20",
      priority: "high"
    },
    // Add more mock notices...
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Notices</h1>
      <Card>
        <CardHeader>
          <CardTitle>Notices List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Posted By</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Priority</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map(notice => (
                  <tr key={notice.id} className="border-b">
                    <td className="p-2">{notice.title}</td>
                    <td className="p-2">{notice.postedBy}</td>
                    <td className="p-2">{notice.date}</td>
                    <td className="p-2 capitalize">{notice.priority}</td>
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

export default ManageNotices;
