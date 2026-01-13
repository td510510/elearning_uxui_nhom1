import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, Volume2, Maximize, Settings, StickyNote, MessageCircle, HelpCircle, Sparkles, ChevronRight, CheckCircle, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { mockCourses } from '@/app/data/mockData';

export function LearningPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [note, setNote] = useState('');

  const course = mockCourses.find((c) => c.id === courseId) || mockCourses[0];

  const lessons = [
    { id: 1, title: 'Giới thiệu về Python', duration: '12:30', completed: true },
    { id: 2, title: 'Cài đặt môi trường', duration: '15:45', completed: true },
    { id: 3, title: 'Biến và kiểu dữ liệu', duration: '20:15', completed: true },
    { id: 4, title: 'Cấu trúc điều kiện', duration: '18:30', completed: false },
    { id: 5, title: 'Vòng lặp trong Python', duration: '22:10', completed: false },
    { id: 6, title: 'Functions và Methods', duration: '25:40', completed: false },
    { id: 7, title: 'Làm việc với Lists', duration: '19:20', completed: false },
    { id: 8, title: 'Dictionaries và Sets', duration: '21:15', completed: false },
  ];

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex gap-6">
      {/* Sidebar - Lesson List */}
      <div className="w-80 flex-shrink-0">
        <Card className="h-full bg-white">
          <CardContent className="p-4 space-y-4">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#254a91]">
              <ArrowLeft className="h-4 w-4" />
              Quay lại khóa học
            </button>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Tên môn học</p>
              <p className="text-xs text-gray-500">Giáo viên</p>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 rounded-full bg-[#254a91]" style={{ width: '25%' }} />
              </div>
              <p className="text-xs text-gray-600">Tiến độ tổng</p>
            </div>

            <ScrollArea className="h-[calc(100%-140px)]">
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${currentLesson === index
                      ? 'bg-[#eef3fb] dark:bg-blue-900/30 border-2 border-[#254a91]'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {lesson.title}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                      {lesson.duration}
                    </p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Video Player */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="relative bg-gray-900 aspect-video rounded-t-xl flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800/60 to-black/70" />
              <div className="absolute right-4 top-4 text-xs bg-black/80 text-white px-4 py-1 rounded-full">
                Giới thiệu khóa học
              </div>
              <Button
                size="lg"
                className="z-10 h-16 w-16 rounded-full bg-white text-[#254a91] hover:bg-gray-100"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Video Controls */}
            <div className="p-4 bg-gradient-to-b from-gray-900 to-black rounded-b-xl text-white">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="flex-1">
                  <Progress value={45} className="h-2" />
                </div>
                <span className="text-sm">2:15 / 5:23</span>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Info & Interactions */}
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {lessons[currentLesson].title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{course.instructor}</p>

            <Tabs defaultValue="notes" className="mt-6">
              <TabsList className="grid w-full grid-cols-4 rounded-full bg-[#f5f7fb] text-gray-700">
                <TabsTrigger value="notes">Ghi chú</TabsTrigger>
                <TabsTrigger value="comments">Bình luận</TabsTrigger>
                <TabsTrigger value="qa">Hỏi đáp</TabsTrigger>
                <TabsTrigger value="ai">AI Trợ giảng</TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2 border border-[#e4e9f5] shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <label className="text-sm font-semibold text-gray-800">Thêm ghi chú</label>
                      <Textarea
                        placeholder="Nhập ghi chú liên quan đến bài..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[140px]"
                      />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Thời điểm video: 2:15</span>
                        <Button size="sm" className="bg-[#254a91] hover:bg-[#1f3d70]">Lưu ghi chú</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-[#e4e9f5] shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800">Ghi chú của tôi (2)</p>
                        <span className="text-xs text-gray-500">Xem tất cả</span>
                      </div>
                      {[
                        { time: '2:15', content: 'Phần này là đoạn giới thiệu bài học' },
                        { time: '5:20', content: 'Cấu trúc Python cơ bản - phần nâng cao' },
                      ].map((item, idx) => (
                        <div key={idx} className="rounded-lg border border-[#e4e9f5] bg-white p-3 text-sm text-gray-700">
                          <p className="text-xs text-gray-500 mb-1">Video: {item.time}</p>
                          <p>{item.content}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2 border border-[#e4e9f5] shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <label className="text-sm font-semibold text-gray-800">Bình luận</label>
                      <Textarea placeholder="Viết bình luận của bạn..." className="min-h-[120px]" />
                      <div className="flex justify-end">
                        <Button size="sm" className="bg-[#254a91] hover:bg-[#1f3d70]">Gửi bình luận</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-[#e4e9f5] shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <p className="text-sm font-semibold text-gray-800">Bình luận mới</p>
                      {[1, 2].map((i) => (
                        <div key={i} className="border border-[#e4e9f5] rounded-lg p-3 text-sm text-gray-700">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900">User {i}</span>
                            <span className="text-xs text-gray-500">2 giờ trước</span>
                          </div>
                          <p>Nội dung bình luận ngắn gọn hiển thị ở đây.</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="qa" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2 border border-[#e4e9f5] shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <label className="text-sm font-semibold text-gray-800">Hỏi đáp</label>
                      <Textarea placeholder="Đặt câu hỏi của bạn..." className="min-h-[120px]" />
                      <div className="flex justify-end">
                        <Button size="sm" className="bg-[#254a91] hover:bg-[#1f3d70]">Gửi câu hỏi</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-[#e4e9f5] shadow-sm">
                    <CardContent className="p-4 space-y-2">
                      <p className="text-sm font-semibold text-gray-800">Câu hỏi gần đây</p>
                      <div className="border border-[#e4e9f5] rounded-lg p-3 text-sm text-gray-700">
                        <p className="font-semibold text-gray-900 mb-1">Làm sao để check type của biến?</p>
                        <p className="text-gray-700 text-sm">Dùng hàm type(x) để kiểm tra.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-6 w-6 text-[#254a91]" />
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Tóm tắt bài học</p>
                          <p className="text-sm text-gray-700">
                            Bài học này giới thiệu cấu trúc điều kiện if-else, toán tử so sánh và logic.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-[#e4e9f5] shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <Textarea placeholder="Hỏi AI về nội dung bài học..." className="min-h-[120px]" />
                      <Button size="sm" className="bg-[#254a91] hover:bg-[#1f3d70] w-full">
                        <Sparkles className="h-4 w-4 mr-2" /> Hỏi AI
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
                Bài trước
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Check className="h-4 w-4 mr-2" /> Hoàn thành và tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
