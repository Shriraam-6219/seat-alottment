import React, { useState } from 'react';
import PageTransition from './layout/PageTransition';
import InputField from './ui-components/InputField';
import Button from './ui-components/Button';
import { toast } from 'sonner';

interface StudentFormProps {
  onSubmit: (rollNumber: string) => void;
  onBack: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, onBack }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate roll number - simple validation for demo
    if (!rollNumber.trim()) {
      setError('Roll number is required');
      return;
    }
    
    // Simulate API call
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      // Check for demo roll number
      if (rollNumber.trim() !== '123456') {
        toast.error('Roll number not found. Try using 123456 for demo');
        return;
      }
      onSubmit(rollNumber);
    }, 1000);
  };
  
  return (
    <PageTransition className="w-full max-w-xl mx-auto">
      <div className="glass p-8 md:p-10 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Student Exam Details</h2>
        <p className="text-muted-foreground text-center mb-8 md:mb-10">Enter your roll number to find your exam seating arrangement</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <InputField 
            label="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter your roll number"
            error={error}
            autoFocus
          />
          
          <div className="flex justify-between pt-4 md:pt-6">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onBack}
            >
              Back
            </Button>
            
            <Button 
              type="submit" 
              loading={loading}
            >
              Find Seat
            </Button>
          </div>
        </form>
      </div>
      
      <div className="text-center mt-6 text-sm text-muted-foreground">
        <p>Try roll number: 123456 (for demo)</p>
      </div>
    </PageTransition>
  );
};

export default StudentForm; 