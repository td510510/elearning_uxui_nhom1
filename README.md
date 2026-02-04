# StudyClub - Nền tảng học tập trực tuyến

Hệ thống website học tập trực tuyến được thiết kế dựa trên nghiên cứu UI/UX chi tiết từ khảo sát 50 người dùng.

## 🎯 Tính năng chính

### 1. **Dashboard (Trang chủ)**

- Hiển thị tiến độ học tập tổng quan
- Danh sách khóa học đang học dở để tiếp tục nhanh chóng
- Nhiệm vụ sắp tới (bài tập, dự án, quiz)
- Hiện thị khóa học gợi ý

### 2. **Khóa học của tôi**

- Quản lý tất cả khóa học đã đăng ký
- Chuyển đổi linh hoạt giữa List View và Grid View
- Lọc theo trạng thái (đang học, hoàn thành)
- Thanh tiến độ cho từng khóa học

### 3. **Khám phá**

- Bộ lọc đa chiều: chủ đề, cấp độ, giá, đánh giá
- Hiển thị Grid và List view
- Thêm vào yêu thích
- Thông tin đầy đủ về giảng viên, học viên, thời lượng

### 4. **Trang học tập**

- Video player với điều khiển đầy đủ (play/pause, tua, âm lượng)
- **Ghi chú tức thời**: ghi chú trực tiếp tại mốc thời gian video
- Bình luận và hỏi đáp ngay dưới bài học
- **AI hỗ trợ**: trả lời câu hỏi 24/7
- Thanh tiến độ rõ ràng

### 5. **Thành tựu**

- Tất cả chứng nhận đã đạt được
- **Chia sẻ lên LinkedIn** với 1 click
- Gợi ý khóa học tiếp theo dựa trên chuyên ngành
- Phản hồi của tôi về các khóa học

### 6. **Hồ sơ cá nhân**

- Thống kê tiến độ tổng, số khóa đang học
- Chuỗi ngày học liên tục với biểu tượng lửa 🔥để tăng động lực
- Hoạt động gần đây
- Nhiệm vụ sắp tới
- Danh sách chứng nhận và có thể tải xuống

### 7. **Cài đặt**

- Quản lý tài khoản
- Tùy chọn thông báo chi tiết
- **Cài đặt ghi chú**: tự động lưu, đồng bộ, font chữ
- **Đồng bộ lịch** với Google Calendar/Outlook

### 8. **Chi tiết khóa học**

- Thông tin đầy đủ về khóa học
- Outline chi tiết với accordion
- Đánh giá từ học viên
- Sticky card bên phải để mua/đăng ký

## 🎨 Thiết kế UI/UX

### Dựa trên nghiên cứu người dùng:

- **80% yêu cầu Dark Mode** → Tích hợp Dark Mode toggle trên Header
- **54% ưu tiên Sidebar trái** → Navigation menu ở bên trái, có thể thu gọn
- **Tối giản với nhiều khoảng trắng** → Card-based layout, spacing rộng rãi
- **Màu sắc chủ đạo xanh lam/lục (60%)** → Sử dụng blue (#2563eb) làm màu chính
- **Bo góc nhẹ (54%)** → Border radius 0.5rem, không quá tròn hay vuông
- **Thanh tiến độ hiển thị rõ** → Progress bar ở mọi nơi cần thiết

### Giải quyết Pain Points:

1. **Thông tin dày đặc (38%)** → Card layout với padding/margin lớn
2. **Màu sắc mỏi mắt (38%)** → Dark mode + màu xanh dịu mắt

## 🛠️ Công nghệ sử dụng

- **React 18.3.1** - UI Library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **Vite** - Build tool

## 📱 Responsive Design

- **Desktop-first**: Ưu tiên trải nghiệm trên desktop (theo nghiên cứu, 40% không học trên mobile)
- Mobile: Chưa được hỗ trợ

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 📊 Dữ liệu Mock

Toàn bộ dữ liệu khóa học, bài tập, chứng nhận được mock trong `/src/app/data/mockData.ts`

## 🎯 Đối tượng người dùng

Dựa trên khảo sát:

- **86%** trong độ tuổi 18-34
- **42%** nhân viên văn phòng
- **22%** học sinh - sinh viên
- **64%** học để phát triển kỹ năng nghề nghiệp
- **60%** học để cập nhật kiến thức theo sở thích

## 💡 Điểm nổi bật

1. **Ghi chú tức thời**: Ghi chú trực tiếp trên video tại mốc thời gian
2. **AI hỗ trợ 24/7**: Tóm tắt bài học, trả lời câu hỏi
3. **Gamification nhẹ nhàng**: Chuỗi ngày học, thanh tiến độ (không quá trẻ con)
4. **LinkedIn integration**: Chia sẻ chứng nhận lên LinkedIn dễ dàng
5. **Dark Mode**: Hỗ trợ học tập buổi tối, giảm mỏi mắt
6. **Sidebar navigation**: Luôn thấy cấu trúc khóa học, điều hướng dễ dàng

## 📝 Tham khảo

Thiết kế dựa trên báo cáo nghiên cứu chi tiết:

- Khảo sát 50 người dùng
- Phân tích pain points
- Insight: "Học để dùng" hơn là "Học để chơi"

---

**Môn**: Thiết kế giao diện người dùng
**Giảng viên hướng dẫn**: ThS. Nguyễn Thành Luân
**Trường**: Đại học Công Nghệ Thông Tin - ĐHQG TP.HCM

**Nhóm thực hiện**: Nhóm 1

**Link sản phẩm:** https://elearning-uxui-nhom1.vercel.app

**Lưu ý:** Sản phẩm chỉ mô phỏng giao diện và tương tác chứ không phải là một trang web hoàn chỉnh
