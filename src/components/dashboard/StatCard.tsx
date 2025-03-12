import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, change, className }: StatCardProps) => {
  return (
    <Card className={cn('border', className)}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2 mb-1">{value}</h3>
            
            {change && (
              <div className="flex items-center">
                <span
                  className={cn(
                    'text-xs font-medium flex items-center',
                    change.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  <span
                    className={cn(
                      'i-lucide:trending-up w-3.5 h-3.5 mr-1',
                      !change.isPositive && 'transform rotate-180'
                    )}
                  />
                  {Math.abs(change.value)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-full bg-primary/10">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
