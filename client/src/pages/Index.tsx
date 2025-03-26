
import React, { useState } from 'react';
import RoleSelection from '@/components/RoleSelection';
import StudentForm from '@/components/StudentForm';
import FacultyForm from '@/components/FacultyForm';
import ResultsTable from '@/components/ResultsTable';
import { studentExamData, facultyInvigilationData, examTableColumns } from '@/lib/mockData';
import { Toaster } from 'sonner';

type UserRole = 'student' | 'faculty' | null;
type UserStep = 'role-selection' | 'input-form' | 'results';

const Index: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentStep, setCurrentStep] = useState<UserStep>('role-selection');
  const [userData, setUserData] = useState<string>('');
  
  // Handle role selection
  const handleRoleSelect = (role: 'student' | 'faculty') => {
    setUserRole(role);
    setCurrentStep('input-form');
  };
  
  // Handle student form submission
  const handleStudentSubmit = (rollNumber: string) => {
    setUserData(rollNumber);
    setCurrentStep('results');
  };
  
  // Handle faculty form submission
  const handleFacultySubmit = (mobileNumber: string) => {
    setUserData(mobileNumber);
    setCurrentStep('results');
  };
  
  // Handle going back
  const handleBack = () => {
    if (currentStep === 'input-form') {
      setUserRole(null);
      setCurrentStep('role-selection');
    } else if (currentStep === 'results') {
      setCurrentStep('input-form');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 bg-blue-500/5 dark:bg-blue-500/10 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 bg-blue-500/5 dark:bg-blue-500/10 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Seat Finder
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Find your exam seating arrangement or invigilation duties with ease
          </p>
        </header>
        
        {/* Main content area */}
        <main className="flex-grow flex items-center justify-center">
          {currentStep === 'role-selection' && (
            <RoleSelection onSelectRole={handleRoleSelect} />
          )}
          
          {currentStep === 'input-form' && userRole === 'student' && (
            <StudentForm onSubmit={handleStudentSubmit} onBack={handleBack} />
          )}
          
          {currentStep === 'input-form' && userRole === 'faculty' && (
            <FacultyForm onSubmit={handleFacultySubmit} onBack={handleBack} />
          )}
          
          {currentStep === 'results' && userRole === 'student' && (
            <ResultsTable 
              title="Your Exam Seating Arrangement"
              subtitle={`Roll Number: ${userData}`}
              data={studentExamData}
              columns={examTableColumns}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 'results' && userRole === 'faculty' && (
            <ResultsTable 
              title="Your Invigilation Duties"
              subtitle={`Mobile Number: ${userData}`}
              data={facultyInvigilationData}
              columns={examTableColumns}
              onBack={handleBack}
            />
          )}
        </main>
        
        {/* Footer */}
        <footer className="mt-auto pt-8 pb-4 text-center text-sm text-muted-foreground animate-fade-in">
          <p>© {new Date().getFullYear()} Seat Finder. All rights reserved.</p>
        </footer>
      </div>
      
      {/* Toast notifications */}
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
