import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, MessageSquare, Bell, Users, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // Refs for animation elements
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [heroRef.current, featuresRef.current, statsRef.current, ctaRef.current];
    elements.forEach((el) => el && observer.observe(el));

    return () => elements.forEach((el) => el && observer.unobserve(el));
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Study Materials',
      description:
        'Access a comprehensive library of study resources, neatly categorized by department, subject, and year.',
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Events & Calendar',
      description:
        'Stay updated with upcoming campus events and activities. Add them to your calendar with a single click.',
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: 'Discussion Forum',
      description:
        'Connect with peers and faculty. Ask questions, share insights, and engage in meaningful academic discussions.',
    },
    {
      icon: <Bell className="h-8 w-8 text-primary" />,
      title: 'Notice Board',
      description:
        'Never miss important announcements about exams, placements, and other campus activities.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Role-Based Access',
      description:
        'Tailored experiences for students and faculty, with specific permissions and capabilities for each role.',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Secure Authentication',
      description:
        'Your data is protected with our robust authentication system, ensuring privacy and security.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-100" ref={heroRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-medium mb-6 opacity-0 animate-slideUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Campus Resource Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-slideUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Streamline Your Academic Journey
              </h1>
              <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                A centralized platform for all your campus resources, designed to enhance collaboration and simplify access to study materials, events, and academic discussions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-slideUp" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                <Link to="/auth/login?role=student" className="btn-primary py-3 px-8 text-center">
                  Student Login
                </Link>
                <Link to="/auth/login?role=faculty" className="btn-outline py-3 px-8 text-center">
                  Faculty Login
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 opacity-0 animate-slideUp" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl bg-white p-4">
                  <div className="bg-primary-100 rounded-xl h-full flex items-center justify-center relative">
                    {/* Placeholder for hero image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary/10 rounded-xl"></div>
                    <div className="relative text-center p-6">
                      <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
                        <span className="text-white font-bold text-xl">CR</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">CampusHub</h3>
                      <p className="text-sm text-muted-foreground">Your all-in-one campus resource platform</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-xl bg-primary/20 animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -top-6 -right-6 w-8 h-8 rounded-lg bg-primary/30 animate-float" style={{ animationDelay: '1.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={featuresRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-medium">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Everything You Need in One Place
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform offers a seamless experience for students and faculty members to access all campus resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hoverable className="border opacity-0 animate-slideUp" style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-100" ref={statsRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Students', value: '5,000+' },
              { label: 'Study Materials', value: '2,500+' },
              { label: 'Faculty Members', value: '250+' },
              { label: 'Events', value: '1,000+' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm text-center opacity-0 animate-slideUp"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" ref={ctaRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-90"></div>
            <div className="relative z-10 px-6 py-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Enhance Your Campus Experience?
              </h2>
              <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
                Join thousands of students and faculty members who are already using CampusHub to streamline their academic journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/register?role=student" className="bg-white text-primary font-medium px-8 py-3 rounded-full hover:bg-white/90 transition-colors">
                  Get Started as Student
                </Link>
                <Link to="/auth/register?role=faculty" className="bg-transparent text-white border border-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Register as Faculty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-medium">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              How CampusHub Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to be intuitive and easy to use. Here's how you can get started.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-border hidden md:block transform -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {[
                {
                  step: '01',
                  title: 'Create an Account',
                  description: 'Sign up as a student or faculty member to get started with CampusHub.',
                },
                {
                  step: '02',
                  title: 'Access Resources',
                  description: 'Browse through study materials, events, forums, and notices.',
                },
                {
                  step: '03',
                  title: 'Contribute & Engage',
                  description: 'Upload study materials, participate in discussions, and stay updated with campus events.',
                },
                {
                  step: '04',
                  title: 'Boost Productivity',
                  description: 'Enhance your academic journey with organized resources and collaborative features.',
                },
              ].map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 p-6">
                    <div className={`md:max-w-xs ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold relative z-10">
                          {item.step}
                        </div>
                        <div className="h-0.5 flex-1 bg-border ml-4 hidden md:block"></div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:hidden"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link to="/auth/register?role=student" className="btn-primary inline-flex items-center">
              <span>Get Started Today</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
