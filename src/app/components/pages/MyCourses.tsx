import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, List, Star, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { mockCourses } from '@/app/data/mockData';

export function MyCourses() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredCourses = mockCourses.filter((course) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'ongoing') return course.status === 'ongoing';
    if (statusFilter === 'completed') return course.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-[#254a91] dark:text-white">{mockCourses.length}</p>
            <p className="text-sm text-gray-600 dark:text-white">Tổng số khóa học</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-[#254a91] dark:text-white">{mockCourses.filter(c => c.status === 'ongoing').length}</p>
            <p className="text-sm text-gray-600 dark:text-white">Đang học</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-4xl font-bold text-[#254a91] dark:text-white">{mockCourses.filter(c => c.status === 'completed').length}</p>
            <p className="text-sm text-gray-600 dark:text-white">Đã hoàn thành</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-44 bg-white">
              <SelectValue placeholder="Chủ đề" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả chủ đề</SelectItem>
              <SelectItem value="Lập trình">Lập trình</SelectItem>
              <SelectItem value="Thiết kế">Thiết kế</SelectItem>
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-44 bg-white border-green-500 text-green-600">
              <SelectValue placeholder="Giáo viên" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Tìm kiếm giáo viên..."
                  className="mb-2"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <SelectItem value="all">Tất cả giáo viên</SelectItem>
              <SelectItem value="giaovienA">Giáo viên A</SelectItem>
              <SelectItem value="giaovienB">Giáo viên B</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-56 bg-white border-green-500 text-green-600">
              <SelectValue placeholder="Trạng thái 1, Trạng thái 2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="ongoing">Đang học</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-[#254a91] text-white hover:bg-[#254a91]' : 'hover:bg-gray-100 dark:bg-gray-500'}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-[#254a91] text-white hover:bg-[#254a91]' : 'hover:bg-gray-100 dark:bg-gray-500'}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Courses */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-64 h-40 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-white">
                        {course.instructor}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2 dark:text-white">Tiến độ học tập</p>
                      <div className="flex items-center gap-3">
                        <Progress value={course.progress} className="flex-1 h-2" />
                        <span className="text-sm font-semibold text-gray-900 min-w-[3rem] text-right dark:text-white">
                          {course.progress}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 dark:text-white" />
                          <span className="dark:text-white">32 giờ</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="dark:text-white">📚 156 bài học</span>
                        </div>
                        <span className="dark:text-white">Truy cập lần cuối: 2 ngày trước</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/learning/${course.id}`)}
                        className="bg-[#254a91] hover:bg-[#1d3a75]"
                      >
                        Học tiếp
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {filteredCourses.length > itemsPerPage && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-gray-600 dark:text-white"
              >
                Trước
              </Button>
              {Array.from({ length: Math.ceil(filteredCourses.length / itemsPerPage) }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'bg-gray-900 text-white hover:bg-gray-800' : 'text-gray-600 dark:text-white'}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.min(Math.ceil(filteredCourses.length / itemsPerPage), currentPage + 1))}
                disabled={currentPage === Math.ceil(filteredCourses.length / itemsPerPage)}
                className="text-gray-600 dark:text-white"
              >
                Sau
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <Badge className="mb-3">{course.level}</Badge>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {course.instructor}
                  </p>

                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating.toString().replace('.', ',')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 dark:text-white" />
                      <span className="dark:text-white">{course.totalHours}h</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Tiến độ</span>
                      <span className="text-xs font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => navigate(`/learning/${course.id}`)}
                  >
                    {course.status === 'completed' ? 'Xem lại' : 'Tiếp tục học'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
