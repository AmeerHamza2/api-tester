# 🚀 API Tester

A modern API testing tool built with React, TypeScript, and Axios. Test REST APIs with an intuitive Postman-like interface.

## ✨ Features

- 🌐 **Full HTTP Support** - GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- 📝 **Query Parameters** - Key-value pair editor with validation
- 🔧 **Custom Headers** - Authorization, content-type, and custom headers
- 📄 **JSON Body Editor** - Built-in JSON validation
- 📊 **Response Viewer** - Status, headers, and formatted response body
- 💾 **Auto-save** - Form state persisted to localStorage
- ⚡ **Real-time Validation** - URL, JSON, and parameter validation
- 🎨 **Modern UI** - Clean, responsive design with loading states

## 🛠️ Tech Stack

- React 18 + TypeScript + Vite
- Axios for HTTP requests
- Tailwind CSS for styling
- Lucide React for icons

## 📦 Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/api-tester.git
cd api-tester
npm install

# Install dependencies
npm install axios lucide-react

# Start development
npm run dev
```

## 🚀 Usage Examples

### Simple GET Request
```
Method: GET
URL: https://jsonplaceholder.typicode.com/posts/1
```

### POST with JSON Body
```
Method: POST
URL: https://jsonplaceholder.typicode.com/posts
Headers: Content-Type: application/json
Body:
{
  "title": "My Post",
  "body": "Post content",
  "userId": 1
}
```

### GET with Parameters
```
Method: GET
URL: https://jsonplaceholder.typicode.com/posts
Params: userId=1, _limit=5
Final URL: https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5
```

## 🧪 Test URLs

| Purpose | Method | URL |
|---------|--------|-----|
| Simple GET | GET | `https://jsonplaceholder.typicode.com/posts/1` |
| Test Parameters | GET | `https://httpbin.org/get` |
| Test POST | POST | `https://jsonplaceholder.typicode.com/posts` |
| Test Headers | GET | `https://httpbin.org/headers` |
| Error Handling | GET | `https://httpbin.org/status/404` |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable components (Button, Input, etc.)
│   └── ApiTester/          # Core API testing components
│       ├── ApiTester.tsx   # Main container
│       ├── RequestForm.tsx # Method + URL form
│       ├── ParamsSection.tsx
│       ├── HeadersSection.tsx
│       ├── BodySection.tsx
│       └── ResponseSection.tsx
├── hooks/useLocalStorage.ts
├── utils/
│   ├── validation.ts       # Form validation
│   └── httpClient.ts       # Axios wrapper
└── App.tsx
```

## 🔧 Key Features

### Validation
- ✅ Required URL validation
- ✅ JSON syntax validation
- ✅ Key-value pair validation (no empty values)
- ✅ Real-time error display

### Response Display
- Status code with color indicators
- Request duration and response size
- Complete URL with parameters
- Formatted JSON response
- Response headers viewer

### User Experience
- Form state persistence
- Loading states with disabled controls
- Hover effects and smooth transitions
- Mobile-responsive design

## 🐛 Troubleshooting

**Tailwind not working?**
```bash
# Ensure proper Tailwind setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**CORS errors?**
- Use `https://httpbin.org` for testing
- Check if API supports CORS
- Add required headers

**Request timeout?**
- Default: 30 seconds
- Modify in `src/utils/httpClient.ts`

## 📝 Validation Requirements

The app validates all instructor requirements:

1. ✅ Request type selection (GET, POST, PUT, etc.)
2. ✅ URL input with validation
3. ✅ Key-value pairs for params and headers
4. ✅ JSON body input with validation
5. ✅ Error messages for incomplete key-value pairs
6. ✅ Invalid JSON error handling
7. ✅ Axios integration for API calls

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push and create Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, TypeScript, and Axios**