
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, Flag, Reply, User, Clock } from 'lucide-react';

const ForumPost = () => {
  const { id } = useParams();

  // Sample post data
  const post = {
    id: id,
    title: "Study Tips for Finals",
    content: "Here are some effective study techniques that helped me prepare for finals:\n\n1. Create a study schedule and stick to it\n2. Use active recall techniques instead of passive reading\n3. Take regular breaks using the Pomodoro technique (25 min study, 5 min break)\n4. Join or form study groups for difficult subjects\n5. Get enough sleep and stay hydrated\n\nWhat techniques have worked for you? Let's share our experiences!",
    author: "John Doe",
    role: "Student",
    postedAt: "2 hours ago",
    likes: 24,
    views: 156
  };

  // Sample replies
  const replies = [
    {
      id: 1,
      author: "Jane Smith",
      role: "Student",
      content: "Thanks for sharing these tips! I've found that explaining concepts to others (even if just to myself) helps me understand the material better. Also, summarizing key points in my own words reinforces my understanding.",
      postedAt: "1 hour ago",
      likes: 8
    },
    {
      id: 2,
      author: "Dr. Williams",
      role: "Faculty",
      content: "These are excellent suggestions. I'd also recommend reviewing past exam questions if available. This helps you understand the format and types of questions that might appear on your exams.",
      postedAt: "45 minutes ago",
      likes: 15
    },
    {
      id: 3,
      author: "Alex Johnson",
      role: "Student",
      content: "I've been using the Cornell note-taking method this semester and it's been a game-changer for organizing information. Definitely trying the Pomodoro technique for my next study session!",
      postedAt: "30 minutes ago",
      likes: 5
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author} ({post.role})</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.postedAt}</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.likes} likes</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-line">
            {post.content}
          </p>
          <div className="flex gap-2 mt-4">
            <button className="flex items-center text-sm text-muted-foreground hover:text-primary">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Like
            </button>
            <button className="flex items-center text-sm text-muted-foreground hover:text-primary">
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </button>
            <button className="flex items-center text-sm text-muted-foreground hover:text-destructive">
              <Flag className="h-4 w-4 mr-1" />
              Report
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold">Replies ({replies.length})</h2>
        {replies.map(reply => (
          <Card key={reply.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{reply.author} <span className="text-sm font-normal text-muted-foreground">({reply.role})</span></p>
                  <p className="text-sm text-muted-foreground">{reply.postedAt}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  <span>{reply.likes}</span>
                </div>
              </div>
              <p className="mt-2">{reply.content}</p>
              <div className="flex gap-2 mt-3">
                <button className="flex items-center text-xs text-muted-foreground hover:text-primary">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Like
                </button>
                <button className="flex items-center text-xs text-muted-foreground hover:text-primary">
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
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
