import React, { useState } from 'react';
import { User, Bell, Lock, CreditCard, Globe, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

export function Settings() {
  const [activeSection, setActiveSection] = useState('notes');
  const [allowHighlights, setAllowHighlights] = useState(true);

  const menuItems = [
    { id: 'account', label: 'Tài khoản', icon: User },
    { id: 'communication', label: 'Tùy chọn giao tiếp', icon: Bell },
    { id: 'notes', label: 'Ghi chú & Điểm nổi bật', icon: FileText },
    { id: 'calendar', label: 'Đóng bộ lịch', icon: Calendar },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#254a91]">Cài đặt</h1>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tài khoản</h3>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center gap-3 ${activeSection === item.id
                        ? 'bg-[#254a91] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {activeSection === 'account' && (
            <Card className="border-0 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#254a91]">Thông tin tài khoản</CardTitle>
                <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Họ</Label>
                    <Input id="firstName" defaultValue="Nguyễn Văn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Tên</Label>
                    <Input id="lastName" defaultValue="A" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="nguyenvana@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" defaultValue="+84 123 456 789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Input
                    id="bio"
                    defaultValue="Đam mê học tập và phát triển kỹ năng mới"
                  />
                </div>

                <Button className="bg-[#254a91] hover:bg-[#1e3a6f]">Lưu thay đổi</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'communication' && (
            <Card className="border-0 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#254a91]">Tùy chọn giao tiếp</CardTitle>
                <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Thông báo email
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nhận thông báo qua email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Nhắc nhở bài tập
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nhận nhắc nhở về deadline bài tập
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Thông báo khóa học mới
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nhận thông báo về khóa học mới
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button className="bg-[#254a91] hover:bg-[#1e3a6f]">Lưu tùy chọn</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'notes' && (
            <Card className="border-0 shadow-sm rounded-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#254a91]">Ghi chú & Điểm nổi bật</CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Không cho phép</span>
                    <Switch
                      checked={allowHighlights}
                      onCheckedChange={setAllowHighlights}
                      className="data-[state=checked]:bg-[#254a91]"
                    />
                    <span className="text-sm text-gray-600">Cho phép</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Note Items */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input placeholder="Nhập ghi chú..." className="bg-[#f6f9ff] border-0" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    className="border-[#254a91] text-[#254a91] hover:bg-[#254a91] hover:text-white px-8"
                  >
                    Lưu
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'calendar' && (
            <Card className="border-0 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#254a91]">Đồng bộ hóa lịch</CardTitle>
                <CardDescription>Tích hợp lịch học với ứng dụng lịch của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Google Calendar</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Đồng bộ với Google Calendar
                    </p>
                  </div>
                  <Button variant="outline" className="border-[#254a91] text-[#254a91]">
                    Kết nối
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Outlook</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Đồng bộ với Microsoft Outlook
                    </p>
                  </div>
                  <Button variant="outline" className="border-[#254a91] text-[#254a91]">
                    Kết nối
                  </Button>
                </div>

                <Button className="bg-[#254a91] hover:bg-[#1e3a6f] w-full">Lưu cài đặt</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
