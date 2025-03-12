
import React from 'react';
import { BookOpen, Clock, Calendar, MessageSquare, Bell } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  // Mock data for the dashboard
  const recentMaterials = [
    { id: '1', title: 'Introduction to Calculus', subject: 'Mathematics', date: '2 days ago' },
    { id: '2', title: 'Principles of Economics', subject: 'Economics', date: '3 days ago' },
    { id: '3', title: 'Computer Network Fundamentals', subject: 'Computer Science', date: '5 days ago' },
  ];
  
  const upcomingEvents = [
    { id: '1', title: 'Final Exam Preparation', type: 'Workshop', date: 'Tomorrow, 10:00 AM' },
    { id: '2', title: 'Career Fair 2023', type: 'Event', date: 'Oct 15, 9:00 AM' },
    { id: '3', title: 'AI Research Seminar', type: 'Seminar', date: 'Oct 20, 2:00 PM' },
  ];
  
  const forumActivity = [
    { id: '1', title: 'Help with Physics problem set', replies: 5, date: '1 day ago' },
    { id: '2', title: 'Study group for Database exam', replies: 8, date: '2 days ago' },
    { id: '3', title: 'Resources for Machine Learning project', replies: 12, date: '3 days ago' },
  ];
  
  const notices = [
    { id: '1', title: 'Exam Schedule Updated', category: 'Academic', date: 'Oct 2, 2023' },
    { id: '2', title: 'Library Hours Extended', category: 'Facility', date: 'Oct 1, 2023' },
    { id: '3', title: 'Scholarship Application Open', category: 'Financial', date: 'Sep 28, 2023' },
  ];
  
  return (
    <DashboardLayout userRole="student" userName="John Smith">
      <div className="px-4 py-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, John! Here's an overview of your academic resources and activities.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Study Materials"
            value="24"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            change={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Hours Studied"
            value="48"
            icon={<Clock className="h-5 w-5 text-primary" />}
            change={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Events Attended"
            value="5"
            icon={<Calendar className="h-5 w-5 text-primary" />}
            change={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Forum Posts"
            value="12"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            change={{ value: 5, isPositive: true }}
          />
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Materials */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Recent Study Materials</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMaterials.map((material) => (
                  <div key={material.id} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <Link 
                        to={`/materials/${material.id}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {material.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground">{material.subject}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{material.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/materials/browse"
                className="text-primary text-sm font-medium hover:underline mt-4 inline-block"
              >
                View all materials
              </Link>
            </CardContent>
          </Card>
          
          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <Link 
                        to={`/events/${event.id}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {event.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground">{event.type}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/events/upcoming"
                className="text-primary text-sm font-medium hover:underline mt-4 inline-block"
              >
                View all events
              </Link>
            </CardContent>
          </Card>
          
          {/* Recent Notices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Recent Notices</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <Bell size={16} />
                    </div>
                    <div>
                      <Link 
                        to={`/notices/${notice.id}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {notice.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground">{notice.category}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{notice.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/notices"
                className="text-primary text-sm font-medium hover:underline mt-4 inline-block"
              >
                View all notices
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Forum Activity */}
        <div className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Forum Activity</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {forumActivity.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <Link
                      to={`/forum/${post.id}`}
                      className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">
                        {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/forum"
                className="text-primary text-sm font-medium hover:underline mt-4 inline-block"
              >
                View all discussions
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
