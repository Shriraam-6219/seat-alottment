
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import PageTransition from './layout/PageTransition';
import Button from './ui-components/Button';
import { Search } from 'lucide-react';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface ResultsTableProps {
  title: string;
  subtitle?: string;
  data: Record<string, any>[];
  columns: TableColumn[];
  onBack: () => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ 
  title, 
  subtitle, 
  data, 
  columns, 
  onBack 
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Sort and filter data
  const sortedAndFilteredData = React.useMemo(() => {
    // First filter the data
    let filteredData = [...data];
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter(item => {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(lowerCaseSearch)
        );
      });
    }
    
    // Then sort the filtered data
    if (sortConfig) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [data, searchTerm, sortConfig]);
  
  return (
    <PageTransition className="w-full max-w-5xl mx-auto">
      <div className="glass p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          
          <div className="mt-4 md:mt-0 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </div>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-white/30 dark:bg-gray-800/30 border border-input focus-ring w-full md:w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary text-secondary-foreground">
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium uppercase tracking-wider",
                      column.sortable && "cursor-pointer hover:bg-secondary/80"
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {sortConfig && sortConfig.key === column.key && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedAndFilteredData.length > 0 ? (
                sortedAndFilteredData.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex}
                    className="hover:bg-secondary/30 transition-colors duration-150 animate-fade-in"
                    style={{ animationDelay: `${rowIndex * 50}ms` }}
                  >
                    {columns.map((column) => (
                      <td 
                        key={`${rowIndex}-${column.key}`}
                        className="px-4 py-4 text-sm"
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={onBack}
          >
            Back
          </Button>
          
          <Button
            onClick={() => {
              const message = "This would download the data as PDF in a real application";
              toast.info(message);
            }}
          >
            Download as PDF
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResultsTable;
