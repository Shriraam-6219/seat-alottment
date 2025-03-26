
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface FilterOption {
  label: string;
  value: string;
  options?: string[];
}

interface SearchFilterProps {
  filters: FilterOption[];
  onSearch: (query: string, filters: Record<string, string>) => void;
}

export function SearchFilter({ filters, onSearch }: SearchFilterProps) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (filter: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const handleSearch = () => {
    onSearch(query, selectedFilters);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedFilters({});
    onSearch('', {});
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-4 lg:col-span-1">
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {filters.map((filter) => (
          <div key={filter.value} className="flex flex-col">
            <Label htmlFor={filter.value} className="text-sm font-medium mb-2 block">
              {filter.label}
            </Label>
            <Select
              value={selectedFilters[filter.value] || ''}
              onValueChange={(value) => handleFilterChange(filter.value, value)}
            >
              <SelectTrigger id={filter.value}>
                <SelectValue placeholder={`Select ${filter.label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filter.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end space-x-2 mt-4">
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="h-9 px-4 flex items-center gap-1 text-sm"
        >
          <X size={14} />
          <span>Clear</span>
        </Button>
        <Button 
          onClick={handleSearch}
          className="h-9 px-4 flex items-center gap-1 text-sm"
        >
          <Search size={14} />
          <span>Search</span>
        </Button>
      </div>
    </div>
  );
}
