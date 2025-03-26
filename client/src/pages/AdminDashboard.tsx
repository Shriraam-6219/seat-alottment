
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui-custom/PageTitle';
import { SearchFilter } from '@/components/ui-custom/SearchFilter';
import { DataTable } from '@/components/ui-custom/DataTable';
import { Button } from '@/components/ui/button';
import { 
  PlusIcon, 
  UploadIcon, 
  DownloadIcon, 
  RefreshCw as RefreshIcon 
} from 'lucide-react';
import { 
  adminColumns,
  mockExams, 
  formatExamForDisplay,
  dateFilterOptions,
  buildingFilterOptions,
  subjectFilterOptions
} from '@/lib/mock-data';
import { Exam } from '@/types';
import { toast } from '@/lib/toast';

export default function AdminDashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const loadExams = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const formattedExams = mockExams.map(formatExamForDisplay);
        setExams(formattedExams);
        setFilteredExams(formattedExams);
      } catch (error) {
        console.error('Error loading exams:', error);
        toast.error('Failed to load exam data');
      } finally {
        setIsLoading(false);
      }
    };

    loadExams();
  }, [isAuthenticated, user, navigate]);

  const handleSearch = (query: string, filters: Record<string, string>) => {
    const filtered = exams.filter(exam => {
      if (query && !Object.values(exam).some(value => 
        String(value).toLowerCase().includes(query.toLowerCase())
      )) {
        return false;
      }
      
      for (const [key, value] of Object.entries(filters)) {
        if (value && value !== 'all' && exam[key as keyof Exam] !== value) {
          return false;
        }
      }
      
      return true;
    });
    
    setFilteredExams(filtered);
  };

  const handleAddNew = () => {
    toast.info('Add new exam functionality would be implemented here');
  };

  const handleUpload = () => {
    toast.info('Bulk upload functionality would be implemented here');
  };

  const handleDownloadTemplate = () => {
    toast.info('Template download functionality would be implemented here');
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredExams(exams);
      setIsLoading(false);
      toast.success('Data refreshed successfully');
    }, 1000);
  };

  const filterOptions = [
    { label: 'Date', value: 'date', options: dateFilterOptions },
    { label: 'Subject', value: 'subjectName', options: subjectFilterOptions },
    { label: 'Building', value: 'building', options: buildingFilterOptions },
  ];

  return (
    <Layout>
      <PageTitle
        title="Admin Dashboard"
        description="Manage exam schedules and invigilation duties"
        className="animate-fade-in"
      >
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={handleAddNew}
          >
            <PlusIcon size={16} />
            <span>Add New</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleUpload}
          >
            <UploadIcon size={16} />
            <span className="hidden sm:inline">Upload</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleDownloadTemplate}
          >
            <DownloadIcon size={16} />
            <span className="hidden sm:inline">Template</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleRefresh}
          >
            <RefreshIcon size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </PageTitle>

      <SearchFilter
        filters={filterOptions}
        onSearch={handleSearch}
      />

      <DataTable
        data={filteredExams}
        columns={adminColumns}
        isLoading={isLoading}
        emptyMessage="No exam schedules found"
      />
    </Layout>
  );
}
