import { Exam, InvigilationDuty, TableColumn } from '@/types';

// Mock exam data
export const mockExams: Exam[] = [
  {
    id: '1',
    subjectName: 'Mathematics',
    courseCode: 'MATH101',
    date: '2023-06-10',
    startTime: '09:00',
    endTime: '12:00',
    building: 'Science Block',
    floor: '2',
    classroom: '201',
  },
  {
    id: '2',
    subjectName: 'Database Systems',
    courseCode: 'CS301',
    date: '2023-06-12',
    startTime: '14:00',
    endTime: '17:00',
    building: 'Computer Block',
    floor: '1',
    classroom: '105',
  },
  {
    id: '3',
    subjectName: 'Digital Logic Design',
    courseCode: 'ECE201',
    date: '2023-06-15',
    startTime: '10:00',
    endTime: '13:00',
    building: 'Engineering Block',
    floor: '3',
    classroom: '302',
  },
  {
    id: '4',
    subjectName: 'Operating Systems',
    courseCode: 'CS401',
    date: '2023-06-18',
    startTime: '09:00',
    endTime: '12:00',
    building: 'Computer Block',
    floor: '2',
    classroom: '205',
  },
  {
    id: '5',
    subjectName: 'Computer Networks',
    courseCode: 'CS402',
    date: '2023-06-20',
    startTime: '14:00',
    endTime: '17:00',
    building: 'Computer Block',
    floor: '3',
    classroom: '305',
  },
];

// Mock invigilation duties
export const mockInvigilationDuties: InvigilationDuty[] = [
  {
    id: '1',
    facultyId: '2',
    examId: '1',
    date: '2023-06-10',
    startTime: '09:00',
    endTime: '12:00',
    building: 'Science Block',
    floor: '2',
    classroom: '201',
    subjectName: 'Mathematics',
    courseCode: 'MATH101',
  },
  {
    id: '2',
    facultyId: '2',
    examId: '3',
    date: '2023-06-15',
    startTime: '10:00',
    endTime: '13:00',
    building: 'Engineering Block',
    floor: '3',
    classroom: '302',
    subjectName: 'Digital Logic Design',
    courseCode: 'ECE201',
  },
  {
    id: '3',
    facultyId: '2',
    examId: '5',
    date: '2023-06-20',
    startTime: '14:00',
    endTime: '17:00',
    building: 'Computer Block',
    floor: '3',
    classroom: '305',
    subjectName: 'Computer Networks',
    courseCode: 'CS402',
  },
];

// Table columns for student schedules
export const studentColumns: TableColumn[] = [
  { key: 'subjectName', title: 'Subject' },
  { key: 'courseCode', title: 'Course Code' },
  { key: 'date', title: 'Date' },
  { key: 'time', title: 'Time' },
  { key: 'location', title: 'Location' },
];

// Table columns for faculty duties
export const facultyColumns: TableColumn[] = [
  { key: 'date', title: 'Date' },
  { key: 'time', title: 'Time' },
  { key: 'subjectName', title: 'Subject' },
  { key: 'courseCode', title: 'Course Code' },
  { key: 'location', title: 'Location' },
];

// Table columns for admin dashboard
export const adminColumns: TableColumn[] = [
  { key: 'id', title: 'ID' },
  { key: 'subjectName', title: 'Subject' },
  { key: 'courseCode', title: 'Course Code' },
  { key: 'date', title: 'Date' },
  { key: 'time', title: 'Time' },
  { key: 'location', title: 'Location' },
];

// Filter options
export const dateFilterOptions = [
  '2023-06-10', '2023-06-12', '2023-06-15', '2023-06-18', '2023-06-20'
];

export const buildingFilterOptions = [
  'Science Block', 'Computer Block', 'Engineering Block'
];

export const subjectFilterOptions = [
  'Mathematics', 'Database Systems', 'Digital Logic Design', 'Operating Systems', 'Computer Networks'
];

// Helper to format exam data for display
export function formatExamForDisplay(exam: Exam) {
  return {
    ...exam,
    time: `${exam.startTime} - ${exam.endTime}`,
    location: `${exam.building}, Floor ${exam.floor}, Room ${exam.classroom}`
  };
}

// Helper to format invigilation data for display
export function formatInvigilationForDisplay(duty: InvigilationDuty) {
  return {
    ...duty,
    time: `${duty.startTime} - ${duty.endTime}`,
    location: `${duty.building}, Floor ${duty.floor}, Room ${duty.classroom}`
  };
}

// Mock service for fetching student exams
export async function fetchStudentExams(rollNumber: string): Promise<Exam[]> {
  // In a real app, this would be an API call with the rollNumber
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExams);
    }, 1000);
  });
}

// Mock service for fetching faculty duties
export async function fetchFacultyDuties(facultyId: string): Promise<InvigilationDuty[]> {
  // In a real app, this would be an API call with the facultyId
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInvigilationDuties);
    }, 1000);
  });
}

// Mock service for filtering exams
export function filterExams(
  exams: Exam[], 
  query: string, 
  filters: Record<string, string>
): Exam[] {
  return exams.filter(exam => {
    // Search query matching
    if (query && !Object.values(exam).some(value => 
      String(value).toLowerCase().includes(query.toLowerCase())
    )) {
      return false;
    }
    
    // Filters matching
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== 'all' && exam[key as keyof Exam] !== value) {
        return false;
      }
    }
    
    return true;
  });
}

// Mock service for filtering invigilation duties
export function filterDuties(
  duties: InvigilationDuty[], 
  query: string, 
  filters: Record<string, string>
): InvigilationDuty[] {
  return duties.filter(duty => {
    // Search query matching
    if (query && !Object.values(duty).some(value => 
      String(value).toLowerCase().includes(query.toLowerCase())
    )) {
      return false;
    }
    
    // Filters matching
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== 'all' && duty[key as keyof InvigilationDuty] !== value) {
        return false;
      }
    }
    
    return true;
  });
}
