
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ForumPost = () => {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Study Tips for Finals</CardTitle>
          <div className="text-sm text-muted-foreground">Posted by John Doe • 2 hours ago</div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Here are some effective study techniques that helped me prepare for finals...
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Replies</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <p className="mt-2">Thanks for sharing these tips! Very helpful.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Add Reply</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea 
            className="w-full p-2 border rounded-md h-32"
            placeholder="Write your reply..."
          />
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
            Post Reply
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumPost;
