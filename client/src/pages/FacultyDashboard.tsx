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
  fetchFacultyDuties, 
  filterDuties, 
  formatInvigilationForDisplay,
  facultyColumns,
  dateFilterOptions,
  buildingFilterOptions
} from '@/lib/mock-data';
import { InvigilationDuty } from '@/types';
import { toast } from '@/lib/toast';

export default function FacultyDashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [duties, setDuties] = useState<InvigilationDuty[]>([]);
  const [filteredDuties, setFilteredDuties] = useState<InvigilationDuty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is a faculty member
    if (!isAuthenticated || user?.role !== 'faculty') {
      navigate('/');
      return;
    }

    // Fetch duties for the faculty member
    if (user?.id) {
      setIsLoading(true);
      fetchFacultyDuties(user.id)
        .then(data => {
          const formattedDuties = data.map(formatInvigilationForDisplay);
          setDuties(formattedDuties);
          setFilteredDuties(formattedDuties);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching duties:', error);
          toast.error('Failed to load invigilation duties');
          setIsLoading(false);
        });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSearch = (query: string, filters: Record<string, string>) => {
    const result = filterDuties(duties, query, filters);
    setFilteredDuties(result.map(formatInvigilationForDisplay));
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
    { label: 'Building', value: 'building', options: buildingFilterOptions },
  ];

  return (
    <Layout>
      <PageTitle
        title="Invigilation Schedule"
        description="View and manage your invigilation duties"
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
        data={filteredDuties}
        columns={facultyColumns}
        isLoading={isLoading}
        emptyMessage="No invigilation duties found"
      />
    </Layout>
  );
}
