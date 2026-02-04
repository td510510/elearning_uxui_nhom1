import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft, FileQuestion } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';

export function NotFound() {
  const navigate = useNavigate();

  const suggestedPages = [
    { name: 'Khám phá khóa học', path: '/explore', icon: Search },
    { name: 'Khóa học của tôi', path: '/my-courses', icon: FileQuestion },
  ];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.24))] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 sm:p-12 text-center">
            {/* 404 Illustration */}
            <div className="mb-6 sm:mb-8">
              <div className="relative inline-block">
                <div className="text-8xl sm:text-9xl font-bold text-[#254a91] opacity-10">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileQuestion className="h-16 w-16 sm:h-24 sm:w-24 text-[#254a91]" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Không tìm thấy trang
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
              Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
              <Button
                size="lg"
                className="bg-[#254a91] hover:bg-[#1e3a73] text-white"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Về trang chủ
              </Button>
            </div>

            {/* Suggested Pages */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8">
              <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Hoặc thử các trang sau:
              </p>
              <div className="flex gap-3 items-center justify-center">
                {suggestedPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.path}
                      onClick={() => navigate(page.path)}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#254a91] hover:bg-[#eef3fb] dark:hover:bg-blue-900/20 transition-all"
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#254a91]" />
                      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {page.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 sm:mt-8">
              Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với chúng tôi để được hỗ trợ.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
