import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, Flame, CalendarRange, Star, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { useAuth } from '@/app/context/AuthContext';
import { mockCourses, mockAssignments } from '@/app/data/mockData';

export function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const ongoingCourses = mockCourses.filter((c) => c.status === 'ongoing');
  const completedCourses = mockCourses.filter((c) => c.status === 'completed');
  const upcomingAssignments = mockAssignments.slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);
  const coursesPerPage = 2;
  const totalSlides = Math.ceil(ongoingCourses.length / coursesPerPage);

  const totalProgress = Math.round(
    ongoingCourses.reduce((sum, c) => sum + c.progress, 0) / ongoingCourses.length
  );

  // Show different content for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#254a91] to-[#4a7cc7] text-white">
          <CardContent className="py-12 px-8 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-4xl font-bold mb-3">Chào mừng đến với StudyClub</h1>
            <p className="text-xl mb-6 text-blue-100">Nền tảng học tập trực tuyến hàng đầu</p>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Khám phá hàng nghìn khóa học chất lượng cao, học tập với các giảng viên hàng đầu và phát triển kỹ năng của bạn
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#254a91] hover:bg-gray-100" onClick={() => navigate('/register')}>
                Đăng ký miễn phí
              </Button>
              <Button size="lg" className="bg-white text-[#254a91] hover:bg-gray-100" onClick={() => navigate('/login')}>
                Đăng nhập
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-[#254a91]" />
              <p className="text-4xl font-bold text-[#254a91] mb-2">10,000+</p>
              <p className="text-gray-600">Khóa học chất lượng</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-[#254a91]" />
              <p className="text-4xl font-bold text-[#254a91] mb-2">500,000+</p>
              <p className="text-gray-600">Học viên đã tin tưởng</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 text-center">
              <Star className="h-12 w-12 mx-auto mb-3 text-[#254a91]" />
              <p className="text-4xl font-bold text-[#254a91] mb-2">4.8/5</p>
              <p className="text-gray-600">Đánh giá trung bình</p>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Courses */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#254a91] text-2xl">Khóa học phổ biến</CardTitle>
                <p className="text-gray-500 mt-1">Khám phá các khóa học được yêu thích nhất</p>
              </div>
              <Button variant="outline" onClick={() => navigate('/explore')}>
                Xem tất cả
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockCourses.slice(0, 6).map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl overflow-hidden bg-white hover:shadow-lg border border-gray-200 transition-all cursor-pointer"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-gray-400">•</span>
                      <Users className="h-4 w-4" />
                      <span>{(course.students / 1000).toFixed(1)}k học viên</span>
                    </div>
                    <h3 className="font-semibold text-[#254a91] mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#f0f4ff] text-[#254a91]">{course.category}</Badge>
                      <Button size="sm" onClick={() => navigate('/register')}>
                        Đăng ký học
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold text-[#254a91] mb-4">
              Sẵn sàng bắt đầu hành trình học tập?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn học viên đang học tập và phát triển kỹ năng mỗi ngày
            </p>
            <Button size="lg" className="bg-[#254a91] hover:bg-[#1e3a73]" onClick={() => navigate('/register')}>
              Bắt đầu miễn phí ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated user dashboard
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <p className="text-sm text-gray-500 dark:text-white">Tiến độ tổng quan</p>
      </div>

      {/* Progress and Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress Card */}
        <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ học tập</h2>
            <div className="relative">
              <Progress value={totalProgress} className="h-3" />
              <span className="absolute right-0 -top-6 text-sm font-semibold text-[#254a91]">{totalProgress}%</span>
            </div>
          </CardContent>
        </Card>

        {/* 8/12 Stat Card */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
            <p className="text-5xl font-bold text-[#254a91]">9/10</p>
            <p className="text-sm text-gray-600 mt-2 text-center">Khóa học hoàn thành tháng này</p>
          </CardContent>
        </Card>
      </div>

      {/* Course & Schedule */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-white">Tiếp tục học</p>
                <CardTitle className="text-[#254a91] dark:text-blue-400">Khóa học của tôi</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Trang thái</span>
                <Badge variant="secondary">Đang học</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ongoingCourses.slice(currentSlide * coursesPerPage, (currentSlide + 1) * coursesPerPage).map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#f6f9ff] hover:bg-white border border-transparent hover:border-[#cbd8ff] transition-colors"
              >
                <div className="h-16 w-24 rounded-lg bg-white/70 flex items-center justify-center overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#254a91] truncate">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={course.progress} className="flex-1 h-2" />
                    <span className="text-sm font-semibold text-gray-700">{course.progress}%</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>32 giờ | 156 bài</span>
                    <span>Truy cập lần cuối: Hôm qua</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className="bg-[#f0f4ff] text-[#254a91]">Cơ bản</Badge>
                  <Button size="sm" onClick={() => navigate(`/learning/${course.id}`)}>
                    Học tiếp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Pagination Dots */}
            {totalSlides > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${index === currentSlide
                      ? 'w-8 bg-[#254a91]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#254a91] dark:text-white">Lịch học</CardTitle>
            <p className="text-sm text-gray-500 dark:text-white">Nhiệm vụ sắp tới</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingAssignments.map((assignment, index) => {
              const course = mockCourses.find((c) => c.id === assignment.courseId);
              const borderColors = ['border-l-blue-500', 'border-l-green-500', 'border-l-orange-500'];
              return (
                <div
                  key={assignment.id}
                  className={`p-4 rounded-xl bg-white border-l-4 ${borderColors[index % 3]} shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-[#254a91]">{assignment.title}</p>
                      <p className="text-sm text-gray-600">{course?.title}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs ml-2"
                    >
                      {assignment.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Hạn: {new Date(assignment.deadline).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recommended */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#254a91] dark:text-white">Khóa học gợi ý</CardTitle>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-[#254a91]" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="rounded-xl p-4 bg-white hover:shadow-md border border-[#e5edff] transition-shadow"
              >
                <div className="h-36 rounded-lg bg-[#f6f9ff] flex items-center justify-center mb-3 overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{course.rating}</span>
                  <Users className="h-4 w-4" />
                  <span>{(course.students / 1000).toFixed(1)}k học viên</span>
                </div>
                <h3 className="font-semibold text-[#254a91] mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.instructor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
