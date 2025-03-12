
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ManageForum = () => {
  const posts = [
    {
      id: 1,
      title: "Study Tips",
      author: "John Doe",
      date: "2024-02-20",
      status: "active"
    },
    // Add more mock posts...
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Forum</h1>
      <Card>
        <CardHeader>
          <CardTitle>Forum Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Author</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b">
                    <td className="p-2">{post.title}</td>
                    <td className="p-2">{post.author}</td>
                    <td className="p-2">{post.date}</td>
                    <td className="p-2 capitalize">{post.status}</td>
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

export default ManageForum;
