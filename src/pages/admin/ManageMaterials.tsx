
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileEdit, Trash2, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Sample data for materials
const sampleMaterials = [
  {
    id: "1",
    title: "Introduction to React",
    subject: "Web Development",
    department: "Computer Science",
    type: "Tutorial",
    year: "2023",
    fileUrl: "https://example.com/files/react-intro.pdf",
    fileSize: "1.2 MB",
    downloads: 45,
    uploadedBy: "Prof. Smith",
    uploadDate: "2023-09-15"
  },
  {
    id: "2",
    title: "Advanced Calculus Notes",
    subject: "Mathematics",
    department: "Mathematics",
    type: "Lecture Notes",
    year: "2023",
    fileUrl: "https://example.com/files/calculus-notes.pdf",
    fileSize: "2.5 MB",
    downloads: 78,
    uploadedBy: "Dr. Johnson",
    uploadDate: "2023-08-22"
  },
  {
    id: "3",
    title: "Organic Chemistry Lab Manual",
    subject: "Chemistry",
    department: "Chemistry",
    type: "Lab Manual",
    year: "2023",
    fileUrl: "https://example.com/files/chem-lab.pdf",
    fileSize: "3.7 MB",
    downloads: 112,
    uploadedBy: "Prof. Williams",
    uploadDate: "2023-07-10"
  },
  {
    id: "4",
    title: "Database Systems Fundamentals",
    subject: "Database Management",
    department: "Computer Science",
    type: "Textbook",
    year: "2023",
    fileUrl: "https://example.com/files/database.pdf",
    fileSize: "5.1 MB",
    downloads: 89,
    uploadedBy: "Dr. Garcia",
    uploadDate: "2023-06-05"
  },
  {
    id: "5",
    title: "Literary Analysis Techniques",
    subject: "Literature",
    department: "English",
    type: "Guide",
    year: "2023",
    fileUrl: "https://example.com/files/lit-analysis.pdf",
    fileSize: "1.8 MB",
    downloads: 34,
    uploadedBy: "Prof. Thompson",
    uploadDate: "2023-05-19"
  }
];

const ManageMaterials = () => {
  const [materials, setMaterials] = useState(sampleMaterials);
  const [filterDept, setFilterDept] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
    toast.success("Material deleted successfully");
  };

  const handleDownload = (id: string) => {
    const material = materials.find(m => m.id === id);
    if (material) {
      // In a real application, this would initiate a download
      toast.success(`Downloading: ${material.title}`);
    }
  };

  const handleEdit = (id: string) => {
    const material = materials.find(m => m.id === id);
    if (material) {
      toast.info(`Editing: ${material.title}`);
      // This would open an edit form in a real application
    }
  };

  const filteredMaterials = materials.filter(material => {
    let matchesDept = true;
    let matchesType = true;
    
    if (filterDept) {
      matchesDept = material.department === filterDept;
    }
    
    if (filterType) {
      matchesType = material.type === filterType;
    }
    
    return matchesDept && matchesType;
  });

  // Get unique departments and types for filters
  const departments = [...new Set(materials.map(m => m.department))];
  const types = [...new Set(materials.map(m => m.type))];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Study Materials</h1>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <Card className="w-full md:w-[calc(50%-0.5rem)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <Filter className="h-5 w-5 mr-2" /> Filter Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Department:</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Material Type:</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-[calc(50%-0.5rem)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-2xl font-bold">{materials.length}</p>
                <p className="text-sm text-muted-foreground">Total Materials</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-2xl font-bold">{departments.length}</p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-2xl font-bold">{types.length}</p>
                <p className="text-sm text-muted-foreground">Material Types</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-2xl font-bold">
                  {materials.reduce((sum, material) => sum + material.downloads, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Study Materials List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Subject</th>
                  <th className="text-left p-2">Department</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Size</th>
                  <th className="text-left p-2">Downloads</th>
                  <th className="text-left p-2">Uploaded By</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map(material => (
                    <tr key={material.id} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{material.title}</td>
                      <td className="p-2">{material.subject}</td>
                      <td className="p-2">{material.department}</td>
                      <td className="p-2">{material.type}</td>
                      <td className="p-2">{material.fileSize}</td>
                      <td className="p-2">{material.downloads}</td>
                      <td className="p-2">{material.uploadedBy}</td>
                      <td className="p-2">{material.uploadDate}</td>
                      <td className="p-2 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDownload(material.id)}
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEdit(material.id)}
                          title="Edit"
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDelete(material.id)}
                          className="text-destructive hover:bg-destructive/10"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-muted-foreground">
                      No materials found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageMaterials;
