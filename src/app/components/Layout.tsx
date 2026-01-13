import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Compass,
  Award,
  User,
  Settings as SettingsIcon,
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  Wallet,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Trang chủ' },
    { id: 'my-courses', icon: BookOpen, label: 'Khóa học của tôi' },
    { id: 'explore', icon: Compass, label: 'Khám phá' },
    { id: 'achievements', icon: Award, label: 'Thành tựu' },
    { id: 'profile', icon: User, label: 'Hồ sơ' },
    { id: 'settings', icon: SettingsIcon, label: 'Cài đặt' },
  ];

  return (
    <div className="flex min-h-screen bg-[#eef3fb] dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? 'w-20' : 'w-64'
          } bg-white/95 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col backdrop-blur`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {!sidebarCollapsed && (
            <div>
              <p className="text-xs text-gray-500">Tên website</p>
              <h1 className="text-xl font-bold text-[#254a91]">Online Learning</h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-[#2f4a75] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer - moved to bottom of main content */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/95 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 backdrop-blur">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:block text-sm text-gray-500">
              <span className="font-semibold text-[#254a91]">Tên website</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl px-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm khóa học..."
                className="pl-11 pr-14 h-11 rounded-full bg-[#eef3fb] border-transparent focus-visible:ring-2 focus-visible:ring-[#254a91]/50"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback>NV</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-56 rounded-xl shadow-lg z-50 bg-white border border-gray-200 p-1">
                <DropdownMenuItem onClick={() => onNavigate('my-courses')} className="text-sm text-gray-700 rounded-md hover:bg-gray-100">
                  Mua hàng của tôi
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onNavigate('profile')}
                  className="text-sm text-white bg-[#4a658c] hover:bg-[#3d5679] focus:bg-[#3d5679] rounded-md"
                >
                  Hồ sơ của tôi
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm text-gray-700 rounded-md hover:bg-gray-100">
                  Cập nhật
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm text-gray-700 rounded-md hover:bg-gray-100">
                  Trung tâm trợ giúp
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm text-gray-700 rounded-md hover:bg-gray-100">
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#eef3fb] dark:bg-gray-900 flex flex-col">
          <div className="p-6 flex-1">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-[#d5dce8] dark:bg-gray-800 w-full">
            <div className="px-6 py-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Logo</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Học học nữa, học mãi</p>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-700 dark:text-gray-400 mt-4 md:mt-0">
                    <a href="#" className="hover:text-[#254a91]">Điều khoản điều lệ</a>
                    <a href="#" className="hover:text-[#254a91]">Chính sách quyền riêng tư</a>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-600 dark:text-gray-500">©2026 Company Name. All rights reserved</p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
