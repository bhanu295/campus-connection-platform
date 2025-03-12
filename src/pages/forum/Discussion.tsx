
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ForumDiscussion = () => {
  const discussions = [
    {
      id: 1,
      title: "Study Tips for Finals",
      author: "John Doe",
      replies: 15,
      lastUpdate: "2 hours ago"
    },
    // Add more mock discussions...
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Forum Discussions</h1>
        <Link 
          to="/forum/create" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          New Discussion
        </Link>
      </div>

      <div className="space-y-4">
        {discussions.map(discussion => (
          <Card key={discussion.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>
                <Link to={`/forum/post/${discussion.id}`} className="hover:text-primary">
                  {discussion.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>By {discussion.author}</span>
                <span>{discussion.replies} replies</span>
                <span>{discussion.lastUpdate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumDiscussion;
