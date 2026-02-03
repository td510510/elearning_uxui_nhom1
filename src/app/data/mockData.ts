export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  rating: number;
  totalHours: number;
  students: number;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  price: number;
  category: string;
  description: string;
  thumbnail: string;
  isFavorite?: boolean;
  status?: 'ongoing' | 'completed' | 'not-started';
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  type: 'Assignment' | 'Project' | 'Quiz';
  deadline: string;
  status: 'pending' | 'submitted' | 'graded';
}

export interface Certificate {
  id: string;
  courseTitle: string;
  completedDate: string;
  instructor: string;
  thumbnail: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Python cho Khoa học Dữ liệu',
    instructor: 'Dr. Nguyễn Văn An',
    progress: 65,
    rating: 4.8,
    totalHours: 24,
    students: 12450,
    level: 'Trung cấp',
    price: 599000,
    category: 'Lập trình',
    description: 'Khóa học toàn diện về Python cho phân tích dữ liệu và machine learning',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    status: 'ongoing'
  },
  {
    id: '2',
    title: 'Thiết kế UI/UX - Kiến thức Nền tảng',
    instructor: 'Trần Thị Bình',
    progress: 30,
    rating: 4.9,
    totalHours: 18,
    students: 8920,
    level: 'Cơ bản',
    price: 499000,
    category: 'Thiết kế',
    description: 'Nắm vững các nguyên tắc cơ bản của thiết kế giao diện và trải nghiệm người dùng',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    status: 'ongoing'
  },
  {
    id: '3',
    title: 'React và TypeScript - Từ Cơ bản Đến Nâng cao',
    instructor: 'Lê Minh Châu',
    progress: 85,
    rating: 4.7,
    totalHours: 32,
    students: 15670,
    level: 'Nâng cao',
    price: 799000,
    category: 'Lập trình',
    description: 'Xây dựng ứng dụng web hiện đại với React và TypeScript',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    status: 'ongoing'
  },
  {
    id: '4',
    title: 'Chiến lược Marketing Số',
    instructor: 'Phạm Thu Dung',
    progress: 100,
    rating: 4.6,
    totalHours: 20,
    students: 9340,
    level: 'Trung cấp',
    price: 699000,
    category: 'Marketing',
    description: 'Chiến lược marketing số toàn diện cho doanh nghiệp',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    status: 'completed'
  },
  {
    id: '5',
    title: 'Học Máy Từ A Đến Z',
    instructor: 'Hoàng Minh Đức',
    progress: 45,
    rating: 4.9,
    totalHours: 40,
    students: 18230,
    level: 'Nâng cao',
    price: 899000,
    category: 'AI & ML',
    description: 'Từ cơ bản đến nâng cao trong Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    status: 'ongoing'
  },
  {
    id: '6',
    title: 'Photoshop Cho Người Mới Bắt Đầu',
    instructor: 'Võ Thị Phương',
    progress: 20,
    rating: 4.5,
    totalHours: 15,
    students: 7650,
    level: 'Cơ bản',
    price: 399000,
    category: 'Thiết kế',
    description: 'Học Photoshop từ đầu cho người mới bắt đầu',
    thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
    status: 'ongoing'
  },
  {
    id: '7',
    title: 'Figma Nâng Cao - Prototype Tương tác',
    instructor: 'Nguyễn Thị Hương',
    progress: 55,
    rating: 4.8,
    totalHours: 22,
    students: 6340,
    level: 'Nâng cao',
    price: 549000,
    category: 'Thiết kế',
    description: 'Tạo prototype tương tác chuyên nghiệp với Figma',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    status: 'ongoing'
  },
  {
    id: '8',
    title: 'JavaScript Nâng Cao',
    instructor: 'Trương Quốc Anh',
    progress: 40,
    rating: 4.7,
    totalHours: 28,
    students: 11200,
    level: 'Nâng cao',
    price: 649000,
    category: 'Lập trình',
    description: 'Nắm vững lập trình bất đồng bộ và Promise trong JavaScript',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    status: 'ongoing'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Bài tập tuần 4: Trực quan hóa Dữ liệu',
    type: 'Bài tập',
    deadline: '2026-01-20',
    status: 'pending'
  },
  {
    id: '2',
    courseId: '3',
    title: 'Dự án giửa kỳ: Ứng dụng Quản lý Công việc',
    type: 'Dự án',
    deadline: '2026-01-25',
    status: 'pending'
  },
  {
    id: '3',
    courseId: '2',
    title: 'Trắc nghiệm: Nguyên tắc Thiết kế',
    type: 'Trắc nghiệm',
    deadline: '2026-01-18',
    status: 'pending'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseTitle: 'Chiến lược Marketing Số',
    completedDate: '2026-01-10',
    instructor: 'Phạm Thu Dung',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
  },
  {
    id: '2',
    courseTitle: 'Python Cơ bản',
    completedDate: '2025-12-15',
    instructor: 'Dr. Nguyễn Văn An',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80'
  }
];

export const recentActivity = [
  {
    id: '1',
    courseId: '1',
    lesson: 'Bài 12: Pandas DataFrame',
    timestamp: '2 giờ trước'
  },
  {
    id: '2',
    courseId: '3',
    lesson: 'Bài 25: Hook trong React',
    timestamp: '1 ngày trước'
  }
];
