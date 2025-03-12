
import React from 'react';
import { FileText, Download, Clock, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Link } from 'react-router-dom';

interface MaterialCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  uploadedBy: string;
  date: string;
  downloads: number;
  views: number;
  fileType: 'pdf' | 'doc' | 'ppt' | 'other';
}

const MaterialCard = ({
  id,
  title,
  description,
  category,
  subject,
  uploadedBy,
  date,
  downloads,
  views,
  fileType,
}: MaterialCardProps) => {
  const getFileIcon = () => {
    switch (fileType) {
      case 'pdf':
        return <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600"><FileText size={24} /></div>;
      case 'doc':
        return <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><FileText size={24} /></div>;
      case 'ppt':
        return <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600"><FileText size={24} /></div>;
      default:
        return <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600"><FileText size={24} /></div>;
    }
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          {getFileIcon()}
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary rounded-full">
                {category}
              </span>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {subject}
              </span>
            </div>
            <Link to={`/materials/${id}`}>
              <h3 className="text-lg font-semibold mt-2 hover:text-primary transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 mt-auto border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye size={14} className="mr-1" />
              <span>{views}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Download size={14} className="mr-1" />
              <span>{downloads}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center w-full">
          <div className="text-xs text-muted-foreground">
            By {uploadedBy}
          </div>
          <Link 
            to={`/materials/${id}`}
            className="text-xs font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;
