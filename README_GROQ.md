# 365 Ngày Với Mác-Lênin - AI Chatbot

## 📝 Mô tả

Ứng dụng lịch triết học Mác-Lênin với tích hợp AI chatbot thông minh sử dụng **Groq API** (miễn phí, nhanh, không giới hạn).

## ✨ Tính năng chính

### 🤖 AI Chatbot

- **Model**: Llama 3.3 70B Versatile (via Groq)
- **Tốc độ**: Cực nhanh (nhanh hơn GPT và Gemini nhiều lần)
- **Chi phí**: Hoàn toàn MIỄN PHÍ
- **Giới hạn**: Không giới hạn quota
- **Chuyên môn**: Triết học Mác-Lênin

### 📅 Lịch Triết Học

- Lịch 365 ngày với quotes triết học
- Chủ đề theo từng tháng
- Giao diện đẹp mắt, hiện đại
- AOS animations

### 🎮 Game & Học Tập

- Millionaire Game (Ai Là Triệu Phú)
- Learning Page (Trang học tập)
- Tarot Card Reading
- Flashcards

## 🚀 Cài đặt

### Yêu cầu

- Node.js >= 16
- npm hoặc yarn

### Backend Setup

```bash
cd server
npm install
```

Tạo file `.env` trong thư mục `server`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Lấy API key miễn phí tại: https://console.groq.com/keys

### Frontend Setup

```bash
npm install
```

## 🏃 Chạy ứng dụng

### Development

```bash
# Terminal 1: Chạy backend
cd server
npm start

# Terminal 2: Chạy frontend
npm run dev
```

### Production Build

```bash
npm run build
npm run deploy
```

## 🛠️ Công nghệ sử dụng

### Frontend

- **React** 19.2.0
- **Vite** 7.2.4
- **React Icons** 5.5.0
- **AOS** (Animate On Scroll)

### Backend

- **Express** 4.18.2
- **Node Fetch** 3.3.2
- **CORS**
- **dotenv**

### AI Service

- **Groq API** with Llama 3.3 70B
- Retry mechanism with exponential backoff
- Conversation history management
- Error handling

## 📁 Cấu trúc thư mục

```
calendar/
├── server/                 # Backend server
│   ├── server.js          # Main server file
│   ├── .env               # Environment variables (gitignored)
│   └── package.json
├── src/
│   ├── components/        # React components
│   │   └── ChatBot.jsx   # AI Chatbot component
│   ├── pages/            # Page components
│   ├── utils/
│   │   └── aiService.js  # AI service layer
│   └── data/             # Static data
├── dist/                 # Production build
└── package.json
```

## 🎯 API Endpoints

### Backend Server

#### Health Check

```
GET /health
Response: { status: 'ok', timestamp: '...', service: 'Groq AI Proxy', model: 'llama-3.3-70b-versatile' }
```

#### Chat Completion

```
POST /api/chat
Body: {
  messages: [
    { role: 'system', content: '...' },
    { role: 'user', content: '...' }
  ]
}
```

## ⚡ Tối ưu hóa

### Server

- ✅ Input validation
- ✅ Detailed error logging
- ✅ Health check endpoint
- ✅ Request logging middleware
- ✅ Better error messages
- ✅ Token usage tracking
- ✅ Increased max_tokens to 1500

### Frontend

- ✅ Retry mechanism with backoff
- ✅ Conversation history trimming
- ✅ Timeout handling
- ✅ Error type classification
- ✅ User-friendly error messages

## 🔧 Cấu hình

### AI Service Configuration

```javascript
const CONFIG = {
  maxHistoryPairs: 10, // Max conversation pairs to keep
  maxRetries: 3, // Max retry attempts
  timeout: 30000, // Request timeout (30s)
  retryDelay: 1000, // Base retry delay (1s)
};
```

### Groq API Parameters

```javascript
{
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 1500,
    top_p: 0.9,
    stream: false
}
```

## 📊 So sánh với các dịch vụ khác

| Tính năng      | Groq              | Google Gemini  | OpenAI GPT     |
| -------------- | ----------------- | -------------- | -------------- |
| **Tốc độ**     | ⚡ Cực nhanh      | ⚡ Nhanh       | ⏱️ Trung bình  |
| **Chi phí**    | 💰 Miễn phí       | 💵 Giới hạn    | 💸 Trả tiền    |
| **Quota**      | ♾️ Không giới hạn | 📊 Có giới hạn | 📊 Có giới hạn |
| **Chất lượng** | 🌟 Rất tốt        | 🌟 Tốt         | 🌟 Xuất sắc    |

## 🐛 Troubleshooting

### Backend không chạy

```bash
# Kiểm tra .env file
cat server/.env

# Kiểm tra API key
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer $GROQ_API_KEY"
```

### Frontend không kết nối được backend

- Đảm bảo backend đang chạy ở `localhost:3001`
- Kiểm tra CORS settings
- Xem console logs

## 📝 License

MIT

## 👨‍💻 Tác giả

HungPD0726

## 🙏 Credits

- **Groq** - AI API Provider
- **Meta** - Llama 3.3 Model
- **React** - UI Framework
- **Vite** - Build Tool
