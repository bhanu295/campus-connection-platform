
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Bell, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Notice {
  id: string;
  title: string;
  content: string;
  priority: string;
  date: string;
  createdBy: {
    id: string;
    name: string;
  };
}

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/notices');
        setNotices(response.data);
        setFilteredNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
        toast.error('Failed to load notices');
        
        // Fallback to mock data
        const mockNotices = [
          {
            id: '1',
            title: 'Semester End Examination Schedule',
            content: 'The end semester examinations will begin from June 15, 2024. The detailed schedule is now available on the student portal.',
            priority: 'high',
            date: '2024-03-01',
            createdBy: {
              id: '1',
              name: 'Admin',
            },
          },
          {
            id: '2',
            title: 'Campus Maintenance Notice',
            content: 'The central library will remain closed on Saturday for maintenance work.',
            priority: 'medium',
            date: '2024-03-05',
            createdBy: {
              id: '2',
              name: 'Facilities Manager',
            },
          },
          {
            id: '3',
            title: 'Annual Sports Day Announcement',
            content: 'The Annual Sports Day will be held on April 10, 2024. All students are encouraged to participate.',
            priority: 'low',
            date: '2024-03-10',
            createdBy: {
              id: '3',
              name: 'Sports Committee',
            },
          },
        ];
        
        setNotices(mockNotices);
        setFilteredNotices(mockNotices);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotices();
  }, []);
  
  // Filter notices based on search and priority
  useEffect(() => {
    let result = [...notices];
    
    if (searchTerm) {
      result = result.filter(notice => 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedPriority) {
      result = result.filter(notice => notice.priority === selectedPriority);
    }
    
    setFilteredNotices(result);
  }, [searchTerm, selectedPriority, notices]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Notice Board</h1>
          {isAuthenticated && (user?.role === 'ADMIN' || user?.role === 'FACULTY') && (
            <Link 
              to="/notices/create" 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Post Notice
            </Link>
          )}
        </div>
        
        <div className="bg-card rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="md:w-48 py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading notices...</p>
          </div>
        ) : filteredNotices.length > 0 ? (
          <div className="space-y-4">
            {filteredNotices.map(notice => (
              <Card key={notice.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{notice.title}</CardTitle>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${getPriorityBadgeClass(notice.priority)}`}>
                      {notice.priority} Priority
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{notice.content}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Posted by: {notice.createdBy.name}</span>
                    <span>Posted on: {formatDate(notice.date)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No notices found</h2>
            <p className="text-muted-foreground">
              {searchTerm || selectedPriority
                ? "Try adjusting your search criteria"
                : "No notices have been posted yet"}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Notices;
