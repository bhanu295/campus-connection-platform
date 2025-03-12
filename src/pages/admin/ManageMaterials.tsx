
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ManageMaterials = () => {
  const materials = [
    {
      id: 1,
      title: "Introduction to React",
      subject: "Web Development",
      uploadedBy: "Prof. Smith",
      date: "2024-02-20"
    },
    // Add more mock materials...
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Study Materials</h1>
      <Card>
        <CardHeader>
          <CardTitle>Study Materials List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Subject</th>
                  <th className="text-left p-2">Uploaded By</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map(material => (
                  <tr key={material.id} className="border-b">
                    <td className="p-2">{material.title}</td>
                    <td className="p-2">{material.subject}</td>
                    <td className="p-2">{material.uploadedBy}</td>
                    <td className="p-2">{material.date}</td>
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

export default ManageMaterials;
