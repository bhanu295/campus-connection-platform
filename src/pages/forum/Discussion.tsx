
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MessageSquare, User, Clock } from 'lucide-react';

const ForumDiscussion = () => {
  const discussions = [
    {
      id: 1,
      title: "Study Tips for Finals",
      author: "John Doe",
      authorRole: "Student",
      replies: 15,
      views: 124,
      lastUpdate: "2 hours ago",
      category: "Academic"
    },
    {
      id: 2,
      title: "Computer Science Project Collaboration",
      author: "Sarah Williams",
      authorRole: "Student",
      replies: 8,
      views: 67,
      lastUpdate: "4 hours ago",
      category: "Projects"
    },
    {
      id: 3,
      title: "Upcoming Physics Workshop",
      author: "Prof. Robert Chen",
      authorRole: "Faculty",
      replies: 21,
      views: 203,
      lastUpdate: "Yesterday",
      category: "Events"
    },
    {
      id: 4,
      title: "Math Tutoring Available",
      author: "Emily Parker",
      authorRole: "Student",
      replies: 5,
      views: 43,
      lastUpdate: "2 days ago",
      category: "Services"
    },
    {
      id: 5,
      title: "Research Opportunities in Biology",
      author: "Dr. Laura Morgan",
      authorRole: "Faculty",
      replies: 18,
      views: 156,
      lastUpdate: "3 days ago",
      category: "Academic"
    },
    {
      id: 6,
      title: "Campus Housing Questions",
      author: "Alex Johnson",
      authorRole: "Student",
      replies: 32,
      views: 289,
      lastUpdate: "5 days ago",
      category: "Campus Life"
    }
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

      <div className="bg-card rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full pl-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            className="md:w-48 py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            <option value="academic">Academic</option>
            <option value="projects">Projects</option>
            <option value="events">Events</option>
            <option value="services">Services</option>
            <option value="campus">Campus Life</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {discussions.map(discussion => (
          <Card key={discussion.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>
                <Link to={`/forum/post/${discussion.id}`} className="hover:text-primary">
                  {discussion.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 md:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{discussion.author} ({discussion.authorRole})</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{discussion.replies} replies</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{discussion.lastUpdate}</span>
                </div>
                <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs">
                  {discussion.category}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumDiscussion;
