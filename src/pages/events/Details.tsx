
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, User, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
  };
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        toast.error('Failed to load event details');
        
        // Fallback to mock data
        setEvent({
          id: '1',
          title: 'Campus Tech Festival 2024',
          date: '2024-03-15',
          time: '10:00 AM',
          location: 'Main Auditorium',
          description: 'Join us for a day of technology demonstrations, workshops, and networking opportunities. This event features presentations from industry experts and showcases student projects.',
          createdBy: {
            id: '1',
            name: 'Admin',
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to register for this event');
      navigate('/auth/student-login');
      return;
    }

    setIsRegistering(true);
    try {
      // In a real app, this would call an API to register the user
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Successfully registered for the event!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register for the event');
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto p-6 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading event details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto p-6 flex-grow">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/events')}
              className="inline-flex items-center text-primary hover:underline"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Events
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-6 flex-grow">
        <button 
          onClick={() => navigate('/events')}
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Events
        </button>
        
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{event.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Posted by {event.createdBy.name}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Date</h3>
                  <p className="text-muted-foreground">{formatDate(event.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Time</h3>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-center md:col-span-2">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
            
            <button 
              className={`w-full md:w-auto px-6 py-2 rounded-md ${
                isRegistering 
                  ? 'bg-primary/70 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90'
              } text-white transition-colors`}
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? 'Processing...' : 'Register for Event'}
            </button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
