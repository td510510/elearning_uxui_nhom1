import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, CreditCard, Smartphone, QrCode, ArrowLeft, Copy, Check, Calendar, Lock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Input } from '@/app/components/ui/input';

export function Order() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [bankData, setBankData] = useState({
    accountNumber: '',
    accountHolder: '',
    bankName: ''
  });

  // Check URL params for success indicator
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true') {
      setOrderPlaced(true);
      // Simulate order processing and redirect
      setTimeout(() => {
        navigate('/my-courses');
      }, 3000);
    }
  }, [searchParams, navigate]);

  // Sample order data
  const orderItems = [
    {
      id: 1,
      title: 'React và TypeScript - Hướng dẫn Toàn diện',
      price: 499000,
      originalPrice: 1999000,
      quantity: 1,
    },
    {
      id: 2,
      title: 'JavaScript Nâng cao - Các Mẫu Thiết kế',
      price: 399000,
      originalPrice: 1499000,
      quantity: 1,
    },
    {
      id: 3,
      title: 'Thiết kế UI/UX Chuyên nghiệp',
      price: 599000,
      originalPrice: 2499000,
      quantity: 1,
    },
  ];

  const originalTotal = orderItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = originalTotal - subtotal;
  const total = subtotal;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('de-DE') + ' đ';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('0123456789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // Simulate order processing
    setTimeout(() => {
      navigate('/my-courses');
    }, 5000);
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Đơn hàng thành công!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Cảm ơn bạn đã mua khóa học tại StudyClub
            </p>
            <p className="text-sm text-gray-500">
              Đang chuyển hướng đến khóa học của bạn...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/cart')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại giỏ hàng
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Thanh toán
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hoàn tất đơn hàng của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>Chọn phương thức thanh toán phù hợp với bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* MoMo */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex-1 cursor-pointer flex items-center gap-3">
                      <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div>
                        <p className="font-semibold">MoMo</p>
                        <p className="text-sm text-gray-500">Thanh toán qua ví MoMo</p>
                      </div>
                    </Label>
                  </div>

                  {/* Credit Card */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Thẻ tín dụng/Ghi nợ</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, JCB</p>
                      </div>
                    </Label>
                  </div>

                  {/* Bank Transfer */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <QrCode className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Chuyển khoản ngân hàng</p>
                        <p className="text-sm text-gray-500">Quét mã QR hoặc chuyển khoản</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Details */}
          {paymentMethod === 'momo' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-pink-600" />
                  Thanh toán MoMo
                </CardTitle>
                <CardDescription>Quét mã QR bằng ứng dụng MoMo để thanh toán</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6">
                  {/* MoMo QR Code */}
                  <div className="bg-white p-6 rounded-xl border-4 border-pink-500">
                    <div className="w-64 h-64 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=2|99|0123456789|NGUYEN VAN A|nguyenvana@email.com|0|0|1497000|Thanh toan khoa hoc StudyClub"
                        alt="MoMo QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <Alert>
                      <Smartphone className="h-4 w-4" />
                      <AlertDescription>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Mở ứng dụng MoMo trên điện thoại</li>
                          <li>Chọn "Quét mã QR" và quét mã bên trên</li>
                          <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                          <li>Đơn hàng sẽ tự động được kích hoạt</li>
                        </ol>
                      </AlertDescription>
                    </Alert>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Số điện thoại:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold">0123 456 789</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleCopyCode}
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Số tiền:</span>
                        <span className="font-mono font-semibold text-pink-600">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === 'card' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Thông tin thẻ tín dụng/Ghi nợ
                </CardTitle>
                <CardDescription>Nhập thông tin thẻ của bạn để thanh toán</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Số thẻ</Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardData.cardNumber}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\s+/g, '').replace(/[^\d]/gi, '');
                      value = value.replace(/(.{4})/g, '$1 ').trim();
                      setCardData({ ...cardData, cardNumber: value });
                    }}
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Tên chủ thẻ</Label>
                  <Input
                    placeholder="NGUYEN VAN A"
                    value={cardData.cardHolder}
                    onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Hạn sử dụng</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        placeholder="MM"
                        maxLength={2}
                        className="flex-1"
                        value={cardData.expiryDate.split('/')[0] || ''}
                        onChange={(e) => {
                          const month = e.target.value;
                          const year = cardData.expiryDate.split('/')[1] || '';
                          setCardData({ ...cardData, expiryDate: `${month}/${year}` });
                        }}
                      />
                      <span className="text-gray-500">/</span>
                      <Input
                        placeholder="YY"
                        maxLength={2}
                        className="flex-1"
                        value={cardData.expiryDate.split('/')[1] || ''}
                        onChange={(e) => {
                          const month = cardData.expiryDate.split('/')[0] || '';
                          const year = e.target.value;
                          setCardData({ ...cardData, expiryDate: `${month}/${year}` });
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">CVV</Label>
                    <Input
                      placeholder="123"
                      maxLength={3}
                      type="password"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    />
                  </div>
                </div>

                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    Thông tin thẻ của bạn được bảo mật bằng mã hóa SSL 256-bit
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={!cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv}
                >
                  Thanh toán {formatCurrency(total)}
                </Button>
              </CardContent>
            </Card>
          )}

          {paymentMethod === 'bank' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-green-600" />
                  Chuyển khoản ngân hàng
                </CardTitle>
                <CardDescription>Chuyển tiền vào tài khoản ngân hàng dưới đây</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Vui lòng sử dụng <strong>Nội dung chuyển khoản</strong> là: <strong>STUDYCLUB{new Date().getTime()}</strong> để hệ thống tự động xác nhận
                  </AlertDescription>
                </Alert>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg space-y-4 border border-green-200 dark:border-green-800">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ngân hàng</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Ngân hàng Techcombank</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Chủ tài khoản</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">StudyClub Vietnam</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Số tài khoản</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-mono font-semibold text-gray-900 dark:text-white">12345678901234</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          navigator.clipboard.writeText('12345678901234');
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Số tiền</p>
                    <p className="text-xl font-semibold text-green-600">{formatCurrency(total)}</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nội dung chuyển khoản</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white break-all">STUDYCLUB{new Date().getTime()}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          navigator.clipboard.writeText(`STUDYCLUB${new Date().getTime()}`);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500">
                  * Đơn hàng sẽ được kích hoạt trong vòng 24 giờ sau khi chúng tôi xác nhận thanh toán
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Đơn hàng</CardTitle>
              <CardDescription>Chi tiết đơn hàng của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="flex-1 pr-2">
                      <p className="font-medium line-clamp-2">{item.title}</p>
                      <p className="text-gray-500 text-xs">x{item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="font-semibold">
                        {formatCurrency(item.price)}
                      </span>
                      {item.originalPrice && item.originalPrice !== item.price && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500 line-through">
                            {formatCurrency(item.originalPrice)}
                          </span>
                          <span className="text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tổng giá gốc:</span>
                    <span className="font-medium">{formatCurrency(originalTotal)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Giảm giá:</span>
                    <span className="font-medium text-green-600">
                      -{formatCurrency(discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tạm tính:</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Tổng cộng:</span>
                <span className="text-2xl font-bold text-[#254a91] dark:text-blue-400">
                  {formatCurrency(total)}
                </span>
              </div>

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
    </div>
  );
}
