
export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name?: string;
  email?: string;
  mobile?: string;
  rollNumber?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Exam {
  id: string;
  subjectName: string;
  courseCode: string;
  date: string;
  startTime: string;
  endTime: string;
  building: string;
  floor: string;
  classroom: string;
}

export interface InvigilationDuty {
  id: string;
  facultyId: string;
  examId: string;
  date: string;
  startTime: string;
  endTime: string;
  building: string;
  floor: string;
  classroom: string;
  subjectName: string;
  courseCode: string;
}

export interface TableColumn {
  key: string;
  title: string;
}
