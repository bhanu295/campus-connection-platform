
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate faculty email (contains .com)
      if (!email.includes('.com')) {
        toast.error('Invalid faculty email format.');
        setIsLoading(false);
        return;
      }
      
      await login(email, password, 'FACULTY');
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="container max-w-md mx-auto p-4">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Faculty Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your faculty dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Faculty Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <User className="h-5 w-5" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="faculty.name@university.com"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Faculty email must include .com domain
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                type="submit"
                className={`w-full py-2 rounded-md bg-primary text-white font-medium transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="flex justify-center mt-4">
                <Link to="/auth/student-login" className="text-sm text-primary hover:underline">
                  Login as Student
                </Link>
                <span className="mx-2 text-muted-foreground">|</span>
                <Link to="/auth/admin-login" className="text-sm text-primary hover:underline">
                  Login as Admin
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyLogin;
