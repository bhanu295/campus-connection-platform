import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MaterialCardProps {
    title: string;
    description: string;
    link: string;
    category: string;
    uploadedBy: string;
    dateUploaded: string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
    title,
    description,
    link,
    category,
    uploadedBy,
    dateUploaded,
}) => {
    return (
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-gray-600">{description}</p>
                <div className="mt-4">
                    <span className="text-sm text-gray-500">Category: {category}</span>
                    <span className="text-sm text-gray-500 ml-2">Uploaded by: {uploadedBy}</span>
                    <span className="text-sm text-gray-500 ml-2">Date: {dateUploaded}</span>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Material
                </a>
            </CardContent>
        </Card>
    );
};

export default MaterialCard;
