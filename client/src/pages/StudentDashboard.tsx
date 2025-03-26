import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui-custom/PageTitle';
import { SearchFilter } from '@/components/ui-custom/SearchFilter';
import { DataTable } from '@/components/ui-custom/DataTable';
import { Button } from '@/components/ui/button';
import { DownloadIcon, PrinterIcon } from 'lucide-react';
import { 
  fetchStudentExams, 
  filterExams, 
  formatExamForDisplay,
  studentColumns,
  dateFilterOptions,
  buildingFilterOptions,
  subjectFilterOptions
} from '@/lib/mock-data';
import { Exam } from '@/types';
import { toast } from '@/lib/toast';

export default function StudentDashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is a student
    if (!isAuthenticated || user?.role !== 'student') {
      navigate('/');
      return;
    }

    // Fetch exams for the student
    if (user?.rollNumber) {
      setIsLoading(true);
      fetchStudentExams(user.rollNumber)
        .then(data => {
          const formattedExams = data.map(formatExamForDisplay);
          setExams(formattedExams);
          setFilteredExams(formattedExams);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching exams:', error);
          toast.error('Failed to load exam schedule');
          setIsLoading(false);
        });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSearch = (query: string, filters: Record<string, string>) => {
    const result = filterExams(exams, query, filters);
    setFilteredExams(result.map(formatExamForDisplay));
  };

  const handleDownload = () => {
    toast.success('Schedule downloaded successfully');
    // In a real app, this would generate and download a PDF
  };

  const handlePrint = () => {
    window.print();
    toast.success('Printing schedule');
  };

  const filterOptions = [
    { label: 'Date', value: 'date', options: dateFilterOptions },
    { label: 'Subject', value: 'subjectName', options: subjectFilterOptions },
    { label: 'Building', value: 'building', options: buildingFilterOptions },
  ];

  return (
    <Layout>
      <PageTitle
        title="Exam Schedule"
        description="View and manage your upcoming exams"
        className="animate-fade-in"
      >
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleDownload}
          >
            <DownloadIcon size={16} />
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handlePrint}
          >
            <PrinterIcon size={16} />
            <span className="hidden sm:inline">Print</span>
          </Button>
        </div>
      </PageTitle>

      <SearchFilter
        filters={filterOptions}
        onSearch={handleSearch}
      />

      <DataTable
        data={filteredExams}
        columns={studentColumns}
        isLoading={isLoading}
        emptyMessage="No exam schedules found"
      />
    </Layout>
  );
}
