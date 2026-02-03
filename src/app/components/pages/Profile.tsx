import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Flame, Award, ArrowRight, Calendar, Shield, Star, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { mockCourses, mockAssignments } from '@/app/data/mockData';

export function Profile() {
  const navigate = useNavigate();
  const ongoingCourses = mockCourses.filter((c) => c.status === 'ongoing');
  const completedCourses = mockCourses.filter((c) => c.status === 'completed');
  const totalProgress = Math.round(
    ongoingCourses.reduce((sum, c) => sum + c.progress, 0) / ongoingCourses.length
  );

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nguyễn Văn An</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="h-20 w-20 border border-[#d7e2ff] dark:border-gray-600">
                  <AvatarImage src="https://api.dicebear.com/7.x/miniavs/svg?seed=student" alt="Avatar" />
                  <AvatarFallback>
                    <div className="h-full w-full rounded-full bg-gray-200 dark:bg-gray-700" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#254a91] dark:text-blue-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tham gia tháng 3, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 dark:text-blue-400" />
                    <span>124 giờ học</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-[#254a91] text-[#254a91] dark:border-blue-400 dark:text-blue-400" onClick={() => navigate('/settings')}>
                  Chỉnh sửa hồ sơ
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Row: stats + streak */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm lg:col-span-3">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-[#e5edff] dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Tiến độ tổng</span>
                  <span>{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="mt-2 h-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Học hoàn thành 50% trong tháng</p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-[#e5edff] dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <BookOpen className="h-4 w-4 text-[#254a91] dark:text-blue-400" />
                  <span>Số khóa đang học</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{ongoingCourses.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">5/18 bài</p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-[#e5edff] dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Award className="h-4 w-4 text-[#254a91] dark:text-blue-400" />
                  <span>Chứng chỉ đạt được</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">3</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Đang chờ nhận thêm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-100 to-pink-100">
          <CardContent className="p-4 flex flex-col items-start justify-between h-full">
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <Flame className="h-5 w-5" />
              <span>Chuỗi ngày học liên tục</span>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-700">7 ngày</p>
              <p className="text-xs text-orange-700">Vượt qua kỷ lục 6 ngày</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: activity + tasks */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Xem nhanh khóa đang học</h2>
              </div>
              <Button variant="ghost" className="text-[#254a91] dark:text-blue-400">Xem tất cả</Button>
            </div>

            {ongoingCourses.slice(0, 1).map((course) => (
              <div key={course.id} className="rounded-xl border border-[#e5edff] bg-white p-4 flex items-center gap-4">
                <div className="h-20 w-28 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Lập trình React từ cơ bản đến nâng cao</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Progress value={course.progress} className="flex-1 h-2" />
                    <span className="text-sm font-semibold text-gray-700">{course.progress}%</span>
                  </div>
                  <Button size="sm" className="mt-3 bg-[#254a91] hover:bg-[#1f3d70]" onClick={() => navigate(`/learning/${course.id}`)}>
                    Tiếp tục học
                  </Button>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-[#e5edff] bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">Bài học vừa xem</p>
              <div className="mt-3 flex items-center justify-between p-3 rounded-lg border border-[#e5edff] bg-[#f8faff]">
                <div>
                  <p className="font-semibold text-gray-900">Bài 35: Phương pháp Nghiên cứu Người dùng</p>
                  <p className="text-xs text-gray-500">Thiết kế UI/UX • 2 ngày trước</p>
                </div>
                <span className="text-sm text-gray-700">15:20</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500">Nhiệm vụ sắp tới</p>
            </div>
            {mockAssignments.map((assignment, index) => {
              const course = mockCourses.find((c) => c.id === assignment.courseId);
              const borderColors = ['border-l-[#254a91]', 'border-l-green-500', 'border-l-orange-500'];
              return (
                <div key={assignment.id} className={`p-3 rounded-lg bg-white border ${borderColors[index % 3]} shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{assignment.title}</p>
                      <p className="text-xs text-gray-500">{course?.title}</p>
                    </div>
                    <Badge variant="outline" className="text-xs dark:text-gray-500">{assignment.type}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Hạn: {new Date(assignment.deadline).toLocaleDateString('vi-VN')}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Certificates */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chứng nhận của tôi</h2>
            </div>
            <Button variant="ghost" className="text-[#254a91] dark:text-blue-400" onClick={() => navigate('/achievements')}>
              Xem tất cả
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-[#e5edff] shadow-sm">
              <div className="bg-gradient-to-r from-[#6d7bff] to-[#7fe1ff] p-5 text-white">
                <p className="text-xs">CHỨNG CHỈ HOÀN THÀNH</p>
                <h3 className="text-lg font-semibold">Trải nghiệm Người dùng Chuyên sâu</h3>
                <p className="text-xs mt-4">Cấp cho: Nguyễn Văn An</p>
                <p className="text-xs">Ngày hoàn thành: 25/12/2025</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white">
                <Button size="sm" variant="outline" className="flex-1">Tải PDF</Button>
                <Button size="sm" variant="outline" className="flex-1">Chia sẻ</Button>
              </div>
            </div>
            {/* {completedCourses.slice(0, 1).map((course) => (
              <Card key={course.id} className="border border-[#e5edff]">
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs text-gray-500">Chứng chỉ khóa học</p>
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-xs text-gray-500">Hoàn thành: 10/01/2026</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Tải PDF</Button>
                    <Button size="sm" className="flex-1">Chia sẻ</Button>
                  </div>
                </CardContent>
              </Card>
            ))} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
