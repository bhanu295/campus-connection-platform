
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, File, X, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const UploadMaterial = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Mock data for dropdowns
  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Economics', 'Business'];
  const subjects = ['CS101: Intro to Programming', 'CS201: Data Structures', 'MATH101: Calculus', 'PHYS101: Mechanics'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const types = ['PDF', 'PPT', 'DOC', 'Question Paper', 'Notes', 'Lab Manual'];
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };
  
  const validateAndSetFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload PDF, PPT, or DOC files.');
      return;
    }
    
    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit.');
      return;
    }
    
    setFile(file);
    
    // Auto-detect file type
    if (file.type.includes('pdf')) {
      setType('PDF');
    } else if (file.type.includes('powerpoint') || file.type.includes('presentation')) {
      setType('PPT');
    } else if (file.type.includes('word') || file.type.includes('document')) {
      setType('DOC');
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const removeFile = () => {
    setFile(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please upload a file.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // This would be an API call in a real application
      setTimeout(() => {
        toast.success('Material uploaded successfully!');
        setIsUploading(false);
        
        // Check user role from localStorage to determine redirect
        const userRole = JSON.parse(localStorage.getItem('user') || '{"role":"student"}').role;
        
        if (userRole === 'faculty') {
          toast('Your upload will be reviewed by an admin before it appears in the materials list.');
        }
        
        navigate('/materials/browse');
      }, 2000);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Upload Study Material</h1>
          <p className="text-muted-foreground mb-8">
            Share academic resources with your peers and faculty
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Material Details</CardTitle>
              <CardDescription>
                Please provide details about the material you're uploading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-border'
                  } transition-colors`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleFileDrop}
                >
                  {!file ? (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Drag and drop your file here</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Supports PDF, PPT, and DOC files (Max: 10MB)
                        </p>
                      </div>
                      <div className="pt-4">
                        <label className="btn-primary cursor-pointer inline-block">
                          <span>Browse Files</span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <File className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium truncate max-w-xs">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type.split('/')[1].toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={removeFile}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Two column layout for form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Introduction to Data Structures"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">
                      Document Type <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                      className="w-full py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Type</option>
                      {types.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">
                      Department <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                      className="w-full py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(subj => (
                        <option key={subj} value={subj}>{subj}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="year" className="text-sm font-medium">
                      Year <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                      className="w-full py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Year</option>
                      {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Provide a brief description of the material"
                  ></textarea>
                </div>
                
                {/* Notice for faculty uploads */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Note for Faculty Uploads</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Materials uploaded by faculty members require admin approval before they appear to students.
                      You'll be notified once your upload is approved.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/materials/browse')}
                    className="btn-outline py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="btn-primary py-2 px-6 flex items-center"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Upload Material
                      </>
                    )}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UploadMaterial;
