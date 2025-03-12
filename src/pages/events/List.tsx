
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Filter, Search, ChevronRight, PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  department: string;
  eventType: 'Seminar' | 'Workshop' | 'Conference' | 'Cultural' | 'Academic';
  registrationType: 'Free' | 'Paid';
  capacity: number;
  registered: number;
  description: string;
  image?: string;
};

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  // Mock data
  useEffect(() => {
    // This would be an API call in a real application
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Introduction to Machine Learning Workshop',
        date: '2023-06-15',
        time: '10:00 AM - 2:00 PM',
        location: 'Computer Science Building, Room 101',
        organizer: 'Prof. Alan Smith',
        department: 'Computer Science',
        eventType: 'Workshop',
        registrationType: 'Free',
        capacity: 50,
        registered: 35,
        description: 'A hands-on workshop introducing the fundamentals of machine learning algorithms and their applications.',
        image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: '2',
        title: 'Annual Science Conference',
        date: '2023-07-10',
        time: '9:00 AM - 5:00 PM',
        location: 'University Auditorium',
        organizer: 'Science Department',
        department: 'Science',
        eventType: 'Conference',
        registrationType: 'Paid',
        capacity: 200,
        registered: 150,
        description: 'An annual conference bringing together researchers and students to discuss the latest advancements in science.',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: '3',
        title: 'Economics Seminar: Global Market Trends',
        date: '2023-08-05',
        time: '1:00 PM - 3:00 PM',
        location: 'Economics Department, Room 205',
        organizer: 'Prof. Jennifer White',
        department: 'Economics',
        eventType: 'Seminar',
        registrationType: 'Free',
        capacity: 75,
        registered: 40,
        description: 'A seminar discussing current global market trends and their impact on the economy.',
        image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWNvbm9taWNzfGVufDB8fDB8fHww',
      },
      {
        id: '4',
        title: 'Cultural Festival',
        date: '2023-09-20',
        time: '11:00 AM - 7:00 PM',
        location: 'University Campus',
        organizer: 'Student Activities Committee',
        department: 'Student Affairs',
        eventType: 'Cultural',
        registrationType: 'Free',
        capacity: 1000,
        registered: 750,
        description: 'A day-long festival celebrating cultural diversity with food, music, dance, and art.',
        image: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VsdHVyYWwlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '5',
        title: 'End-of-Semester Exam Preparation Workshop',
        date: '2023-10-30',
        time: '3:00 PM - 5:00 PM',
        location: 'Library, Study Hall',
        organizer: 'Academic Support Center',
        department: 'All Departments',
        eventType: 'Academic',
        registrationType: 'Free',
        capacity: 100,
        registered: 80,
        description: 'A workshop providing strategies and resources for successful exam preparation.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3R1ZHl8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: '6',
        title: 'Robotics Workshop',
        date: '2023-11-15',
        time: '10:00 AM - 4:00 PM',
        location: 'Engineering Building, Lab 303',
        organizer: 'Prof. Robert Johnson',
        department: 'Engineering',
        eventType: 'Workshop',
        registrationType: 'Paid',
        capacity: 30,
        registered: 25,
        description: 'A hands-on workshop exploring robotics principles and building simple robots.',
        image: 'https://images.unsplash.com/photo-1561144257-e32e8704b33b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9ib3RpY3N8ZW58MHx8MHx8fDA%3D',
      },
    ];
    
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);
  
  // Filter events based on search and filters
  useEffect(() => {
    let result = [...events];
    
    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDepartment) {
      result = result.filter(event => event.department === selectedDepartment);
    }
    
    if (selectedType) {
      result = result.filter(event => event.eventType === selectedType);
    }
    
    if (selectedRegistration) {
      result = result.filter(event => event.registrationType === selectedRegistration);
    }
    
    setFilteredEvents(result);
  }, [searchTerm, selectedDepartment, selectedType, selectedRegistration, events]);
  
  // Extract unique values for filters
  const departments = [...new Set(events.map(event => event.department))];
  const eventTypes = [...new Set(events.map(event => event.eventType))];
  const registrationTypes = [...new Set(events.map(event => event.registrationType))];
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Check if user is faculty (to show create event button)
  const userRole = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const { role } = JSON.parse(userData);
        return role;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Campus Events</h1>
            <p className="text-muted-foreground">
              Discover and register for upcoming events on campus
            </p>
          </div>
          
          {(userRole() === 'faculty' || userRole() === 'admin') && (
            <Link to="/events/create" className="btn-primary mt-4 md:mt-0 flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Event
            </Link>
          )}
        </div>
        
        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search events by title or organizer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                className={`p-2 rounded-md ${viewType === 'grid' ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'}`}
                onClick={() => setViewType('grid')}
                aria-label="Grid view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                className={`p-2 rounded-md ${viewType === 'list' ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'}`}
                onClick={() => setViewType('list')}
                aria-label="List view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              
              <button
                className="flex items-center justify-center bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
                onClick={() => document.getElementById('filters')?.classList.toggle('hidden')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          <div id="filters" className="hidden mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Event Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedRegistration}
              onChange={(e) => setSelectedRegistration(e.target.value)}
              className="py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Registration Types</option>
              {registrationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Events List */}
        {viewType === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ 
                      backgroundImage: event.image ? `url(${event.image})` : 'url(https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D)' 
                    }}
                  >
                    <div className="w-full h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <span className="text-xs font-medium text-white bg-primary/80 px-2 py-1 rounded-full inline-block mb-2 w-fit">
                        {event.eventType}
                      </span>
                      <h3 className="text-white font-semibold text-xl">{event.title}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(event.date)}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        event.registrationType === 'Free' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.registrationType}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="pt-2">
                      <Link to={`/events/${event.id}`} className="text-primary font-medium text-sm flex items-center hover:underline">
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find events.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div 
                        className="md:w-1/4 h-40 md:h-auto bg-cover bg-center"
                        style={{ 
                          backgroundImage: event.image ? `url(${event.image})` : 'url(https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D)' 
                        }}
                      ></div>
                      
                      <div className="p-6 md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-white bg-primary px-2 py-1 rounded-full">
                              {event.eventType}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              event.registrationType === 'Free' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {event.registrationType}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {event.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{event.time}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              <span>{event.registered}/{event.capacity} registered</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Organized by: {event.organizer}
                          </span>
                          <Link to={`/events/${event.id}`} className="btn-primary text-sm py-1 px-4 flex items-center">
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find events.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default EventsList;
