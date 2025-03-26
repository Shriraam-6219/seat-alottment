
import React from 'react';
import PageTransition from './layout/PageTransition';
import { cn } from "@/lib/utils";

interface RoleSelectionProps {
  onSelectRole: (role: 'student' | 'faculty') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <PageTransition className="w-full max-w-xl mx-auto">
      <div className="glass p-8 md:p-10 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-10">Select Your Role</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <RoleCard 
            title="Student"
            description="Find your exam seat"
            onClick={() => onSelectRole('student')}
          />
          
          <RoleCard 
            title="Faculty"
            description="View invigilation duties"
            onClick={() => onSelectRole('faculty')}
          />
        </div>
      </div>
    </PageTransition>
  );
};

interface RoleCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 md:p-8 rounded-xl",
        "bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/20",
        "transition-all duration-300 card-hover",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        "min-h-[140px] md:min-h-[160px]"
      )}
    >
      <span className="text-xl md:text-2xl font-medium">{title}</span>
      <span className="text-sm md:text-base text-muted-foreground mt-2">{description}</span>
    </button>
  );
};

export default RoleSelection;
