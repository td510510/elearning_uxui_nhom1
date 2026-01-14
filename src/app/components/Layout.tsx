import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
import { useAuth } from '@/app/context/AuthContext';
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
}

export function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const allMenuItems = [
    { id: 'dashboard', path: '/dashboard', icon: Home, label: 'Trang chủ', public: true },
    { id: 'my-courses', path: '/my-courses', icon: BookOpen, label: 'Khóa học của tôi', public: false },
    { id: 'explore', path: '/explore', icon: Compass, label: 'Khám phá', public: true },
    { id: 'achievements', path: '/achievements', icon: Award, label: 'Thành tựu', public: false },
    { id: 'profile', path: '/profile', icon: User, label: 'Hồ sơ', public: false },
    { id: 'settings', path: '/settings', icon: SettingsIcon, label: 'Cài đặt', public: false },
  ];

  // Filter menu items based on authentication
  const menuItems = isAuthenticated
    ? allMenuItems
    : allMenuItems.filter(item => item.public);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#254a91] to-[#4a7cc7] rounded-lg flex items-center justify-center border-2 border-[#254a91]/20 dark:border-blue-400/30 shadow-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#254a91] dark:text-blue-400">StudyClub</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Học cùng nhau</p>
              </div>
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
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-[#2f4a75] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
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
            {sidebarCollapsed && <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#254a91] to-[#4a7cc7] rounded-lg flex items-center justify-center border-2 border-[#254a91]/20 dark:border-blue-400/30 shadow-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-[#254a91] dark:text-blue-400">StudyClub</span>
            </div>}
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
            {isAuthenticated && (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#254a91] dark:bg-blue-400 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    3
                  </span>
                </Button>
              </>
            )}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar>
                      <AvatarImage src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} />
                      <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-56 rounded-xl shadow-lg z-50 bg-white border border-gray-200 p-1">
                  <div className="px-3 py-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/my-courses')} className="text-sm text-gray-700 rounded-md hover:bg-gray-100">
                    Khóa học của tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate('/profile')}
                    className="text-sm text-white bg-[#4a658c] hover:bg-[#3d5679] focus:bg-[#3d5679] rounded-md"
                  >
                    Hồ sơ của tôi
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-sm text-red-600 rounded-md hover:bg-red-50">
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                  Đăng nhập
                </Button>
                <Button size="sm" className="bg-[#254a91] hover:bg-[#1e3a73]" onClick={() => navigate('/register')}>
                  Đăng ký
                </Button>
              </div>
            )}
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
                    <div className="flex items-center gap-2 justify-center">
                      <BookOpen className="h-8 w-8 text-[#254a91] dark:text-blue-400" />
                      <h2 className="text-lg font-bold text-[#254a91] dark:text-blue-400">StudyClub</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Học học nữa, học mãi</p>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-700 dark:text-gray-400 mt-4 md:mt-0">
                    <a href="#" className="hover:text-[#254a91] dark:text-white">Điều khoản điều lệ</a>
                    <a href="#" className="hover:text-[#254a91] dark:text-white">Chính sách quyền riêng tư</a>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-600 dark:text-white">©2026 Company Name. All rights reserved</p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
