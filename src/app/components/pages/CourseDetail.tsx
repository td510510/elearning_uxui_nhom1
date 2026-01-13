import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Users, Clock, CheckCircle, Award, BookOpen, Play, ShoppingCart, Heart } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { mockCourses } from '@/app/data/mockData';

export function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === courseId) || mockCourses[0];

  const modules = [
    {
      id: 1,
      title: 'Giới thiệu và cài đặt',
      lessons: [
        { id: 1, title: 'Giới thiệu về Python', duration: '12:30', preview: true },
        { id: 2, title: 'Cài đặt môi trường', duration: '15:45', preview: true },
        { id: 3, title: 'Hello World đầu tiên', duration: '8:20', preview: false },
      ],
    },
    {
      id: 2,
      title: 'Cơ bản về Python',
      lessons: [
        { id: 4, title: 'Biến và kiểu dữ liệu', duration: '20:15', preview: false },
        { id: 5, title: 'Cấu trúc điều kiện', duration: '18:30', preview: false },
        { id: 6, title: 'Vòng lặp trong Python', duration: '22:10', preview: false },
      ],
    },
    {
      id: 3,
      title: 'Functions và Modules',
      lessons: [
        { id: 7, title: 'Functions cơ bản', duration: '25:40', preview: false },
        { id: 8, title: 'Parameters và Arguments', duration: '19:20', preview: false },
        { id: 9, title: 'Modules và Packages', duration: '21:15', preview: false },
      ],
    },
  ];

  const benefits = [
    'Truy cập trọn đời',
    'Chứng nhận hoàn thành',
    'Hỗ trợ giảng viên',
    'Tài liệu bài học',
    'Bài tập thực hành',
    'Cộng đồng học viên',
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Course Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <div>
            <Badge className="mb-3">{course.level}</Badge>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {course.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {course.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{course.rating}</span>
                <span>(2,450 đánh giá)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.students.toLocaleString()} học viên</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.totalHours} giờ</span>
              </div>
            </div>
          </div>

          {/* Course Image */}
          <Card>
            <CardContent className="p-0">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-80 object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          {/* What You'll Learn */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Bạn sẽ học được gì
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Nắm vững cú pháp Python',
                  'Xử lý và phân tích dữ liệu',
                  'Làm việc với Pandas và NumPy',
                  'Trực quan hóa dữ liệu',
                  'Machine Learning cơ bản',
                  'Xây dựng dự án thực tế',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Yêu cầu
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Không cần kinh nghiệm lập trình trước đó</li>
                <li>Máy tính có kết nối internet</li>
                <li>Sẵn sàng học và thực hành</li>
              </ul>
            </CardContent>
          </Card>

          {/* Course Content */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Nội dung khóa học
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {modules.length} modules • {modules.reduce((sum, m) => sum + m.lessons.length, 0)} bài học
                </span>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {modules.map((module) => (
                  <AccordionItem key={module.id} value={`module-${module.id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#254a91] dark:text-blue-400" />
                        <span className="font-medium">{module.title}</span>
                        <span className="text-sm text-gray-500">
                          ({module.lessons.length} bài)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center gap-3">
                              <Play className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                              {lesson.preview && (
                                <Button size="sm" variant="ghost">
                                  Xem trước
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Instructor */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Giảng viên
              </h2>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-[#eef3fb] dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#254a91] dark:text-blue-400">
                    {course.instructor.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {course.instructor}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Data Scientist & AI Researcher
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                    Với hơn 10 năm kinh nghiệm trong lĩnh vực khoa học dữ liệu và AI, tôi đã
                    giảng dạy cho hơn 50,000 học viên trên toàn thế giới.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Đánh giá từ học viên
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/miniavs/svg?seed=User${i}`} alt={`Học viên ${i}`} />
                          <AvatarFallback>HV</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 dark:text-white">
                              Học viên {i}
                            </p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Khóa học rất hay và bổ ích. Giảng viên giảng dạy rất dễ hiểu và
                            nhiệt tình hỗ trợ học viên!
                          </p>
                          <p className="text-xs text-gray-500 mt-2">3 ngày trước</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Purchase Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 border-2 border-[#2f6fde] shadow-lg rounded-xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#254a91]">599.000đ</span>
                <span className="text-sm text-gray-400 line-through">2.000.000đ</span>
              </div>
              <Badge className="bg-red-500 text-white w-fit">Giảm 50%</Badge>

              <Button size="lg" className="w-full bg-[#254a91] hover:bg-[#1f3d70]">MUA NGAY</Button>
              <Button size="lg" variant="outline" className="w-full bg-white text-gray-700 border-gray-300">
                <ShoppingCart className="h-4 w-4 mr-2" /> Thêm vào giỏ hàng
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-white text-gray-700 border-gray-300">
                <Heart className="h-4 w-4 mr-2" /> Lưu vào yêu thích
              </Button>

              <div className="pt-2 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Khóa học bao gồm:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {[
                    '32 giờ video theo yêu cầu',
                    '156 bài học',
                    'Tài liệu bài học',
                    'Truy cập trọn đời',
                    'Tiếng Việt',
                    'Chứng chỉ hoàn thành',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#254a91]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center pt-2">Đảm bảo hoàn tiền trong 30 ngày</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
