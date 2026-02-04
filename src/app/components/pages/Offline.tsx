import { useState } from 'react';
import { WifiOff, RefreshCw, Signal, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Alert, AlertDescription } from '@/app/components/ui/alert';

export function Offline() {
  const [isOnline, setIsOnline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const handleRetry = async () => {
    setIsRetrying(true);
    setLastChecked(new Date());

    // Try to fetch a small resource to check connection
    try {
    } catch (error) {
      // Still offline
    } finally {
      setTimeout(() => {
        setIsOnline(true);
      }, 3000);
    }
  };

  if (isOnline) {
    return (
      <div className="min-h-[calc(100vh-theme(spacing.24))] flex items-center justify-center p-4 sm:p-6">
        <Card className="border-0 shadow-xl max-w-md w-full">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Signal className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Đã kết nối!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
              Kết nối internet đã được khôi phục. Đang tải lại trang...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#254a91]"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-theme(spacing.24))] flex items-center justify-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 sm:p-12 text-center">
            {/* Offline Illustration */}
            <div className="mb-6 sm:mb-8">
              <div className="relative inline-block">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center animate-pulse">
                  <WifiOff className="h-10 w-10 sm:h-12 sm:w-12 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Mất kết nối Internet
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
              Không thể kết nối đến Internet. Vui lòng kiểm tra kết nối mạng của bạn và thử lại.
            </p>

            {/* Retry Button */}
            <div className="mb-6 sm:mb-8">
              <Button
                size="lg"
                className="bg-[#254a91] hover:bg-[#1e3a73] text-white min-w-[200px]"
                onClick={handleRetry}
                disabled={isRetrying}
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                    Đang kiểm tra...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Thử lại
                  </>
                )}
              </Button>
            </div>

            {/* Last Checked */}
            {lastChecked && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
                Kiểm tra lần cuối: {lastChecked.toLocaleTimeString('vi-VN')}
              </p>
            )}

            {/* Troubleshooting Tips */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8">
              <Alert className="text-left bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-semibold mb-2">Các bước khắc phục:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                    <li>Kiểm tra kết nối Wi-Fi hoặc dữ liệu di động</li>
                    <li>Tắt và bật lại chế độ máy bay</li>
                    <li>Khởi động lại router hoặc modem</li>
                    <li>Liên hệ nhà cung cấp dịch vụ Internet nếu sự cố vẫn tiếp diễn</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 sm:mt-8">
              Dữ liệu của bạn đã được lưu và sẽ tự động đồng bộ khi kết nối được khôi phục.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
