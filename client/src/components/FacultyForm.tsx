import React, { useState } from 'react';
import PageTransition from './layout/PageTransition';
import InputField from './ui-components/InputField';
import Button from './ui-components/Button';
import { toast } from 'sonner';

interface FacultyFormProps {
  onSubmit: (mobileNumber: string) => void;
  onBack: () => void;
}

const FacultyForm: React.FC<FacultyFormProps> = ({ onSubmit, onBack }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate mobile number - simple validation for demo
    if (!mobileNumber.trim()) {
      setError('Mobile number is required');
      return;
    }
    
    // Simulate API call
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      // Check for demo mobile number
      if (mobileNumber.trim() !== '9876543210') {
        toast.error('Mobile number not found. Try using 9876543210 for demo');
        return;
      }
      onSubmit(mobileNumber);
    }, 1000);
  };
  
  return (
    <PageTransition className="w-full max-w-xl mx-auto">
      <div className="glass p-8 md:p-10 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Faculty Invigilation Details</h2>
        <p className="text-muted-foreground text-center mb-8 md:mb-10">Enter your mobile number to view your invigilation duties</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <InputField 
            label="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            error={error}
            autoFocus
            type="tel"
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
              View Duties
            </Button>
          </div>
        </form>
      </div>
      
      <div className="text-center mt-6 text-sm text-muted-foreground">
        <p>Try mobile number: 9876543210 (for demo)</p>
      </div>
    </PageTransition>
  );
};

export default FacultyForm;