import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Download, Share2, ExternalLink, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { mockCourses, mockCertificates } from '@/app/data/mockData';

export function Achievements() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const completedCourses = mockCourses.filter((c: any) => c.status === 'completed');

  // Create more achievement items by duplicating completed courses
  const allAchievements = [
    ...completedCourses,
    ...completedCourses.map((c: any, i: number) => ({ ...c, id: `${c.id}-copy1-${i}` })),
    ...completedCourses.map((c: any, i: number) => ({ ...c, id: `${c.id}-copy2-${i}` })),
    ...completedCourses.map((c: any, i: number) => ({ ...c, id: `${c.id}-copy3-${i}` })),
    ...completedCourses.map((c: any, i: number) => ({ ...c, id: `${c.id}-copy4-${i}` })),
  ];

  const totalPages = Math.ceil(allAchievements.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = allAchievements.slice(startIdx, startIdx + itemsPerPage);

  const reviews = [
    {
      id: 1,
      course: 'React Fundamentals',
      author: 'Nguyễn Văn A',
      rating: 5,
      comment: '"Khóa học rất bổ ích và dễ hiểu!"',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack'
    },
    {
      id: 2,
      course: 'Advanced JavaScript',
      author: 'Nguyễn Văn A',
      rating: 5,
      comment: '"Khóa học rất bổ ích và dễ hiểu!"',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack2'
    },
    {
      id: 3,
      course: 'Python for Beginners',
      author: 'Nguyễn Văn A',
      rating: 5,
      comment: '"Khóa học rất bổ ích và dễ hiểu!"',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack3'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#254a91] dark:text-blue-400">Thành tựu của tôi</h1>
      </div>

      {/* Main Layout - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - My Achievements List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Achievement Items */}
          <div className="space-y-4">
            {paginatedCourses.map((course: any, index: number) => (
              <Card key={course.id} className="border-0 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Course Image */}
                    <div className="w-32 h-24 bg-[#e5edff] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#254a91] dark:text-blue-400 mb-2 text-lg">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {course.instructor}
                      </p>
                      <Button
                        size="sm"
                        className="bg-[#254a91] hover:bg-[#1e3a6f] dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        Thêm vào LinkedIn
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={page === currentPage ? 'bg-[#254a91] hover:bg-[#1e3a6f] text-white' : 'border-gray-300'}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Column - Course Reviews */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Đánh giá khóa học
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#b8d4f1] flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#89b3dc]"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {review.comment}
                      </p>
                      <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                        {review.author}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border-[#254a91] text-[#254a91] hover:bg-[#254a91] hover:text-white dark:text-white"
              >
                Hiển thị thêm 2
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suggested Next Courses */}
      <Card className="border-0 shadow-sm rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Khóa học tiếp theo (gợi ý theo chuyên ngành)
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.slice(0, 2).map((course: any) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow border-0 rounded-xl overflow-hidden cursor-pointer group">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Course Image */}
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Star Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded flex items-center justify-center shadow-sm">
                      <Star className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#254a91] mb-2 group-hover:underline dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {course.instructor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
