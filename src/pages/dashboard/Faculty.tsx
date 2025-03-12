import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, MessageSquare, Bell, Users, FileUp } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import { Link } from 'react-router-dom';

const FacultyDashboard = () => {
  // Mock data for the dashboard
  const recentUploads = [
    { id: '1', title: 'Advanced Algorithms Lecture Notes', subject: 'Computer Science', status: 'Approved', date: '2 days ago' },
    { id: '2', title: 'Quantum Physics Problem Set', subject: 'Physics', status: 'Pending', date: '3 days ago' },
    { id: '3', title: 'Macroeconomics Case Study', subject: 'Economics', status: 'Approved', date: '5 days ago' },
  ];
  
  const upcomingEvents = [
    { id: '1', title: 'Department Meeting', type: 'Meeting', date: 'Tomorrow, 10:00 AM' },
    { id: '2', title: 'Research Symposium', type: 'Event', date: 'Oct 15, 9:00 AM' },
    { id: '3', title: 'Final Exam Proctoring', type: 'Academic', date: 'Oct 20, 2:00 PM' },
  ];
  
  const studentQueries = [
    { id: '1', title: 'Question about homework deadline', student: 'Emma Wilson', date: '1 day ago' },
    { id: '2', title: 'Request for additional resources', student: 'Alex Johnson', date: '2 days ago' },
    { id: '3', title: 'Clarification on lecture topic', student: 'Sophia Chen', date: '3 days ago' },
  ];
  
  return (
    <DashboardLayout userRole="faculty" userName="Dr. Sarah Williams">
      <div className="px-4 py-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Faculty Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Williams! Manage your uploads, events, and student interactions.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Uploads"
            value="32"
            icon={<FileUp className="h-5 w-5 text-primary" />}
            change={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Events Created"
            value="12"
            icon={<Calendar className="h-5 w-5 text-primary" />}
            change={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Student Queries"
            value="27"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            change={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Active Students"
            value="156"
            icon={<Users className="h-5 w-5 text-primary" />}
            change={{ value: 12, isPositive: true }}
          />
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Uploads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Recent Uploads</CardTitle>
              <FileUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUploads.map((upload) => (
                  <div key={upload.id} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <Link 
                        to={`/faculty/uploads/${upload.id}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {upload.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground">{upload.subject}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          upload.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {upload.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <Link 
                  to="/faculty/uploads"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View all uploads
                </Link>
                <Link 
                  to="/materials/upload"
                  className="text-sm px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  New Upload
                </Link>
              </div>
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
              <div className="flex items-center justify-between mt-4">
                <Link 
                  to="/events"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View all events
                </Link>
                <Link 
                  to="/events/create"
                  className="text-sm px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Create Event
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Student Queries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Student Queries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentQueries.map((query) => (
                  <div key={query.id} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <Link 
                        to={`/forum/${query.id}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {query.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground">From: {query.student}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{query.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/forum"
                className="text-primary text-sm font-medium hover:underline mt-4 inline-block"
              >
                View all queries
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/materials/upload" className="bg-white p-4 rounded-xl border hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                <FileUp size={20} />
              </div>
              <h3 className="font-medium">Upload Materials</h3>
              <p className="text-sm text-muted-foreground mt-1">Share lecture notes and resources</p>
            </Link>
            
            <Link to="/events/create" className="bg-white p-4 rounded-xl border hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                <Calendar size={20} />
              </div>
              <h3 className="font-medium">Create Event</h3>
              <p className="text-sm text-muted-foreground mt-1">Schedule classes and activities</p>
            </Link>
            
            <Link to="/notices/create" className="bg-white p-4 rounded-xl border hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                <Bell size={20} />
              </div>
              <h3 className="font-medium">Post Notice</h3>
              <p className="text-sm text-muted-foreground mt-1">Announce important information</p>
            </Link>
            
            <Link to="/forum" className="bg-white p-4 rounded-xl border hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-medium">Forum</h3>
              <p className="text-sm text-muted-foreground mt-1">Respond to student questions</p>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
