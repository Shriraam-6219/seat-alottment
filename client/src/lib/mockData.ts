
// Mock data for student exam details
export const studentExamData = [
  {
    sno: 1,
    subjectName: "Data Structures and Algorithms",
    courseCode: "CS2001",
    date: "15 May 2023",
    time: "09:00 AM - 12:00 PM",
    building: "Main Block",
    floor: "3rd Floor",
    classroom: "Room 301"
  },
  {
    sno: 2,
    subjectName: "Database Management Systems",
    courseCode: "CS2002",
    date: "18 May 2023",
    time: "02:00 PM - 05:00 PM",
    building: "IT Block",
    floor: "2nd Floor",
    classroom: "Lab 204"
  },
  {
    sno: 3,
    subjectName: "Computer Networks",
    courseCode: "CS2003",
    date: "21 May 2023",
    time: "09:00 AM - 12:00 PM",
    building: "Main Block",
    floor: "2nd Floor",
    classroom: "Room 208"
  },
  {
    sno: 4,
    subjectName: "Operating Systems",
    courseCode: "CS2004",
    date: "24 May 2023",
    time: "02:00 PM - 05:00 PM",
    building: "IT Block",
    floor: "1st Floor",
    classroom: "Lab 105"
  },
  {
    sno: 5,
    subjectName: "Software Engineering",
    courseCode: "CS2005",
    date: "27 May 2023",
    time: "09:00 AM - 12:00 PM",
    building: "Main Block",
    floor: "4th Floor",
    classroom: "Room 410"
  }
];

// Mock data for faculty invigilation details
export const facultyInvigilationData = [
  {
    sno: 1,
    subjectName: "Data Structures and Algorithms",
    courseCode: "CS2001",
    date: "15 May 2023",
    time: "09:00 AM - 12:00 PM",
    building: "Main Block",
    floor: "1st Floor",
    classroom: "Room 101"
  },
  {
    sno: 2,
    subjectName: "Artificial Intelligence",
    courseCode: "CS3001",
    date: "17 May 2023",
    time: "02:00 PM - 05:00 PM",
    building: "IT Block",
    floor: "3rd Floor",
    classroom: "Lab 305"
  },
  {
    sno: 3,
    subjectName: "Machine Learning",
    courseCode: "CS3002",
    date: "22 May 2023",
    time: "09:00 AM - 12:00 PM",
    building: "Research Block",
    floor: "2nd Floor",
    classroom: "Lab 202"
  }
];

// Table columns definition
export const examTableColumns = [
  { key: "sno", label: "S.No", sortable: true },
  { key: "subjectName", label: "Subject Name", sortable: true },
  { key: "courseCode", label: "Course Code", sortable: true },
  { key: "date", label: "Date", sortable: true },
  { key: "time", label: "Time", sortable: true },
  { key: "building", label: "Building", sortable: true },
  { key: "floor", label: "Floor", sortable: true },
  { key: "classroom", label: "Classroom", sortable: true }
];
