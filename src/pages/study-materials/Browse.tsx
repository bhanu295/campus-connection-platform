
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Book, FileText, FileArchive, FilePlus2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Material = {
  id: string;
  title: string;
  subject: string;
  department: string;
  type: 'PDF' | 'PPT' | 'DOC' | 'Question Paper';
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  year: string;
  fileSize: string;
};

const BrowseMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Mock data
  useEffect(() => {
    // This would be an API call in a real application
    const mockMaterials: Material[] = [
      {
        id: '1',
        title: 'Introduction to Computer Science',
        subject: 'CS101',
        department: 'Computer Science',
        type: 'PDF',
        uploadedBy: 'Prof. Smith',
        uploadDate: '2023-05-15',
        downloads: 156,
        year: '1st Year',
        fileSize: '2.4 MB',
      },
      {
        id: '2',
        title: 'Advanced Mathematics for Engineers',
        subject: 'MATH202',
        department: 'Mathematics',
        type: 'PDF',
        uploadedBy: 'Prof. Johnson',
        uploadDate: '2023-06-20',
        downloads: 98,
        year: '2nd Year',
        fileSize: '3.7 MB',
      },
      {
        id: '3',
        title: 'Object-Oriented Programming Concepts',
        subject: 'CS201',
        department: 'Computer Science',
        type: 'PPT',
        uploadedBy: 'Prof. Williams',
        uploadDate: '2023-07-05',
        downloads: 210,
        year: '2nd Year',
        fileSize: '5.2 MB',
      },
      {
        id: '4',
        title: 'Principles of Economics',
        subject: 'ECON101',
        department: 'Economics',
        type: 'DOC',
        uploadedBy: 'Prof. Brown',
        uploadDate: '2023-08-10',
        downloads: 75,
        year: '1st Year',
        fileSize: '1.8 MB',
      },
      {
        id: '5',
        title: 'Database Management Systems',
        subject: 'CS301',
        department: 'Computer Science',
        type: 'PDF',
        uploadedBy: 'Prof. Davis',
        uploadDate: '2023-09-15',
        downloads: 183,
        year: '3rd Year',
        fileSize: '4.6 MB',
      },
      {
        id: '6',
        title: 'End Semester Question Paper - CS101',
        subject: 'CS101',
        department: 'Computer Science',
        type: 'Question Paper',
        uploadedBy: 'Admin',
        uploadDate: '2023-12-10',
        downloads: 320,
        year: '1st Year',
        fileSize: '0.9 MB',
      },
    ];
    
    setMaterials(mockMaterials);
    setFilteredMaterials(mockMaterials);
  }, []);
  
  // Filter materials based on search and filters
  useEffect(() => {
    let result = [...materials];
    
    if (searchTerm) {
      result = result.filter(material => 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDepartment) {
      result = result.filter(material => material.department === selectedDepartment);
    }
    
    if (selectedSubject) {
      result = result.filter(material => material.subject === selectedSubject);
    }
    
    if (selectedType) {
      result = result.filter(material => material.type === selectedType);
    }
    
    if (selectedYear) {
      result = result.filter(material => material.year === selectedYear);
    }
    
    setFilteredMaterials(result);
  }, [searchTerm, selectedDepartment, selectedSubject, selectedType, selectedYear, materials]);
  
  // Extract unique values for filters
  const departments = [...new Set(materials.map(material => material.department))];
  const subjects = [...new Set(materials.map(material => material.subject))];
  const types = [...new Set(materials.map(material => material.type))];
  const years = [...new Set(materials.map(material => material.year))];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="text-red-500" />;
      case 'PPT':
        return <FileText className="text-orange-500" />;
      case 'DOC':
        return <FileText className="text-blue-500" />;
      case 'Question Paper':
        return <FileArchive className="text-purple-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
            <p className="text-muted-foreground">
              Browse and download academic resources
            </p>
          </div>
          
          <Link to="/materials/upload" className="btn-primary mt-4 md:mt-0 flex items-center">
            <FilePlus2 className="h-4 w-4 mr-2" />
            Upload Material
          </Link>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search by title or subject code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <button
              className="flex items-center justify-center bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
              onClick={() => document.getElementById('filters')?.classList.toggle('hidden')}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
          
          <div id="filters" className="hidden mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
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
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Subjects</option>
              {subjects.map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="py-2 px-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Materials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <Card key={material.id} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          {getFileIcon(material.type)}
                        </div>
                        <div>
                          <h3 className="font-medium line-clamp-1 text-lg">{material.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {material.subject} | {material.department}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
                        {material.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>Uploaded by: {material.uploadedBy}</span>
                      <span>{material.year}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {new Date(material.uploadDate).toLocaleDateString()}
                      </span>
                      <span className="text-muted-foreground">
                        {material.downloads} downloads | {material.fileSize}
                      </span>
                    </div>
                    
                    <button className="w-full mt-4 bg-primary/10 text-primary font-medium py-2 rounded hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <Book className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No materials found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters, or upload a new material.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowseMaterials;
