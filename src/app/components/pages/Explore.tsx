import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, List, Star, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { mockCourses } from '@/app/data/mockData';

export function Explore() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const coursesPerPage = viewMode === 'grid' ? 6 : 3;

  const filteredCourses = mockCourses.filter((course) => {
    let match = true;

    if (selectedCategory !== 'all') {
      match = match && course.category === selectedCategory;
    }

    if (selectedLevel !== 'all') {
      match = match && course.level === selectedLevel;
    }

    if (selectedPrice !== 'all') {
      match = match && (
        (selectedPrice === 'free' && course.price === 0) ||
        (selectedPrice === 'paid' && course.price > 0)
      );
    }

    if (selectedRating !== 'all') {
      match = match && course.rating >= parseInt(selectedRating);
    }

    return match;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIdx = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIdx, startIdx + coursesPerPage);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-4">
          {/* Category Filter */}
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Chủ đề</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Lập trình', 'Thiết kế', 'Marketing', 'Kinh doanh'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-[#254a91] transition-colors">
                  <input type="checkbox" className="rounded w-4 h-4 accent-[#254a91]" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Level Filter */}
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Cấp độ</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Cơ bản', 'Trung cấp', 'Nâng cao'].map((level) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer hover:text-[#254a91] transition-colors">
                  <input type="checkbox" className="rounded w-4 h-4 accent-[#254a91]" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{level}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Price Filter */}
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Giá</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Miễn phí', 'Dưới 200k', 'Từ 200k đến 500k', 'Trên 500k'].map((price) => (
                <label key={price} className="flex items-center gap-3 cursor-pointer hover:text-[#254a91] transition-colors">
                  <input type="checkbox" className="rounded w-4 h-4 accent-[#254a91]" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{price}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Rating Filter */}
          <Card className="border-0 shadow-sm rounded-xl">
            <CardHeader className="pb-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Đánh giá tối thiểu</h3>
              <button className="text-xs text-[#254a91] dark:text-blue-400 hover:underline font-medium">
                Tất cả
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="radio" name="rating" id="rating-all" className="w-4 h-4 accent-[#254a91]" defaultChecked />
                <label htmlFor="rating-all" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Không lọc</label>
              </div>
              {[5, 4, 3, 2].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <input type="radio" name="rating" id={`rating-${rating}`} className="w-4 h-4 accent-[#254a91]" />
                  <label htmlFor={`rating-${rating}`} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 flex-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{rating}+</span>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hiển thị 6 khóa học
            </p>
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

          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedCourses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow border-0 rounded-xl cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-white text-[#254a91] hover:bg-white">
                        {course.level}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#254a91] dark:text-blue-400 mb-1 line-clamp-2 h-14">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {course.instructor}
                      </p>
                      <div className="flex items-center gap-4 text-sm mb-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="dark:text-gray-400">{course.rating.toString().replace('.', ',')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 dark:text-gray-400" />
                          <span className="dark:text-gray-400">{course.totalHours}h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 dark:text-gray-400" />
                          <span className="dark:text-gray-400">{course.students.toLocaleString('de-DE')}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-lg font-bold text-[#254a91] dark:text-blue-400">
                          {course.price > 0
                            ? `${course.price.toLocaleString('de-DE')} đ`
                            : 'Miễn phí'}
                        </span>
                        <Button size="sm" className="bg-[#254a91] hover:bg-[#1e3a6f]">
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {paginatedCourses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-md transition-shadow border-0 rounded-xl cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <CardContent className="p-6 flex gap-6">
                    <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-white text-[#254a91] hover:bg-white">
                        {course.level}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-[#254a91] dark:text-blue-400 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {course.instructor}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating.toString().replace('.', ',')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.totalHours}h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students.toLocaleString('de-DE')}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#254a91] dark:text-blue-400">
                          {course.price > 0
                            ? `${course.price.toLocaleString('de-DE')} đ`
                            : 'Miễn phí'}
                        </span>
                        <Button className="bg-[#254a91] hover:bg-[#1e3a6f]">
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-gray-300"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Trước
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
              Sau
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
