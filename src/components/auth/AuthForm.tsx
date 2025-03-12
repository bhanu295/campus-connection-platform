
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

type UserRole = 'student' | 'faculty' | 'admin';

interface AuthFormProps {
  type: 'login' | 'register';
  role?: UserRole;
  onSubmit: (data: any) => void;
}

const AuthForm = ({ type, role = 'student', onSubmit }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password || (type === 'register' && !name)) {
      setError('All fields are required');
      return;
    }
    
    // Faculty validation
    if (role === 'faculty') {
      if (!email.includes('.com')) {
        setError('You are not a faculty member. Faculty email must contain .com');
        return;
      }
    }
    
    // Submit the form
    onSubmit({ email, password, name, role });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-lg">CR</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">
        {type === 'login' ? 'Welcome back' : 'Create your account'}
      </h2>
      
      <p className="text-muted-foreground text-center mb-8">
        {type === 'login' 
          ? `Sign in to your ${role} account to continue` 
          : `Register as a ${role} to access campus resources`}
      </p>
      
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 animate-fadeIn">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              placeholder="Enter your email"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              placeholder={type === 'login' ? 'Enter your password' : 'Create a password'}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {type === 'login' && (
          <div className="text-right">
            <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        )}
        
        <button
          type="submit"
          className="btn-primary w-full py-2.5 mt-2"
        >
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={type === 'login' ? `/auth/register?role=${role}` : `/auth/login?role=${role}`} 
            className="text-primary hover:underline"
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
      
      {role !== 'admin' && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            {role === 'student' 
              ? 'Are you a faculty member? ' 
              : 'Are you a student? '}
            <Link 
              to={type === 'login' 
                ? `/auth/login?role=${role === 'student' ? 'faculty' : 'student'}` 
                : `/auth/register?role=${role === 'student' ? 'faculty' : 'student'}`} 
              className="text-primary hover:underline"
            >
              {role === 'student' 
                ? 'Sign in as faculty' 
                : 'Sign in as student'}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
