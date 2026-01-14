import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';

interface CartItem {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

export function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: 'React & TypeScript - The Complete Guide',
      instructor: 'Nguyễn Văn A',
      price: 499000,
      originalPrice: 1999000,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      quantity: 1,
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      instructor: 'Trần Thị B',
      price: 399000,
      originalPrice: 1499000,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      quantity: 1,
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Lê Văn C',
      price: 599000,
      originalPrice: 2499000,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );
  const total = subtotal;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Giỏ hàng của bạn
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {cartItems.length} khóa học trong giỏ hàng
        </p>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <ShoppingBag className="h-24 w-24 text-gray-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Hãy thêm khóa học vào giỏ hàng để tiếp tục
            </p>
            <Button onClick={() => navigate('/explore')} size="lg" className="mt-4">
              Khám phá khóa học
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-40 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Giảng viên: {item.instructor}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-[#254a91] dark:text-blue-400">
                          {formatCurrency(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Tổng đơn hàng</CardTitle>
                <CardDescription>Chi tiết thanh toán</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tạm tính:</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Giảm giá:</span>
                      <span className="font-medium text-green-600">
                        -{formatCurrency(discount)}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-[#254a91] dark:text-blue-400">
                    {formatCurrency(total)}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/order')}
                >
                  Tiến hành thanh toán
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Bằng việc tiếp tục, bạn đồng ý với{' '}
                  <a href="#" className="text-[#254a91] dark:text-blue-400 hover:underline">
                    điều khoản dịch vụ
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
