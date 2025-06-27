# TilkTebeb Frontend

A modern Next.js frontend application for TilkTebeb - a platform providing business book summaries and business plans. This frontend is designed to work with a Django REST API backend.

## 🚀 Features

- **📚 Book Summaries**: Access to 200+ business book summaries
- **📋 Business Plans**: Detailed business plans for different business sizes
- **👤 User Authentication**: JWT-based authentication system
- **💳 Payment Processing**: Integrated payment system for subscriptions
- **📊 Analytics**: Reading analytics and progress tracking
- **🔖 Bookmarks**: Save and organize favorite content
- **📱 Responsive Design**: Mobile-first responsive design
- **🎨 Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **⚡ Performance**: Optimized for speed and SEO

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.0 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Package Manager**: npm/pnpm

## 📁 Project Structure

```
TilkTebeb/
├── app/                     # Next.js App Router pages
│   ├── api/                 # [REMOVED] - Now handled by Django
│   ├── books/               # Book-related pages
│   ├── business-plans/      # Business plan pages
│   ├── admin/               # Admin dashboard
│   ├── account/             # User account pages
│   ├── analytics/           # Reading analytics
│   ├── checkout/            # Payment processing
│   └── ...                  # Other pages
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── admin/               # Admin-specific components
│   └── ...                  # Feature components
├── lib/                     # Utility functions and API services
│   ├── api.ts               # Main API service selector
│   ├── api-service.ts       # Real Django API service
│   ├── mock-api-service.ts  # Mock API for development
│   └── mock-data.ts         # Mock data definitions
├── types/                   # TypeScript type definitions
├── docs/                    # Documentation
│   ├── API_DOCUMENTATION.md # Django API requirements
│   └── INTEGRATION_GUIDE.md # Integration instructions
└── ...
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TilkTebeb/tilktbeb\ \(1\)/
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_USE_MOCK_API=true  # Set to false when Django backend is ready
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development Modes

### Mock API Mode (Default)
Perfect for frontend development without a backend:
```bash
NEXT_PUBLIC_USE_MOCK_API=true npm run dev
```

### Real API Mode
When your Django backend is ready:
```bash
NEXT_PUBLIC_USE_MOCK_API=false npm run dev
```

## 📚 API Integration

This frontend is designed to work with a Django REST API backend. The application automatically switches between mock data and real API calls based on the `NEXT_PUBLIC_USE_MOCK_API` environment variable.

### Required Django Endpoints

The Django backend must implement the following endpoints:

- **Authentication**: `/auth/login/`, `/auth/register/`
- **Books**: `/books/`, `/books/{id}/`
- **Business Plans**: `/business-plans/`, `/business-plans/{id}/`
- **User Management**: `/user/{userId}/`, `/user/{userId}/bookmarks/`
- **Payments**: `/payments/`, `/payments/verify/{transactionId}/`
- **Analytics**: `/user/{userId}/analytics/`
- **Admin**: `/admin/stats/`, `/admin/users/`

For complete API documentation, see [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

## 🔗 Backend Integration

### Step 1: Set up Django Backend
Follow the Django API requirements in [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

### Step 2: Configure CORS
Ensure your Django backend allows requests from your frontend domain.

### Step 3: Update Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=https://your-django-api.com/api
NEXT_PUBLIC_USE_MOCK_API=false
```

### Step 4: Test Integration
Follow the testing guide in [docs/INTEGRATION_GUIDE.md](docs/INTEGRATION_GUIDE.md).

## 🏗️ Build and Deployment

### Development Build
```bash
npm run build
npm run start
```

### Production Deployment

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Docker
```bash
docker build -t tilktebeb-frontend .
docker run -p 3000:3000 tilktebeb-frontend
```

#### Static Export
```bash
npm run build
npm run export
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📖 Documentation

- **[API Documentation](docs/API_DOCUMENTATION.md)**: Complete Django API requirements
- **[Integration Guide](docs/INTEGRATION_GUIDE.md)**: Step-by-step integration instructions
- **[Component Documentation](docs/COMPONENTS.md)**: UI component usage guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

1. Check the [Integration Guide](docs/INTEGRATION_GUIDE.md)
2. Review the [API Documentation](docs/API_DOCUMENTATION.md)
3. Open an issue on GitHub
4. Contact the development team

## 🔄 Migration from Full-Stack

This frontend was converted from a full-stack Next.js application to work with a separate Django backend. Key changes:

- ✅ Removed all `/api` routes
- ✅ Added API service layer with mock/real API switching
- ✅ Updated all components to use external API calls
- ✅ Added comprehensive Django API documentation
- ✅ Created integration and deployment guides
- ✅ Optimized Next.js configuration for frontend-only deployment

## 🚀 What's Next?

1. **Set up Django Backend**: Follow the API documentation to create your Django backend
2. **Configure Authentication**: Implement JWT authentication in Django
3. **Add Real Data**: Replace mock data with real content
4. **Deploy**: Deploy both frontend and backend to production
5. **Monitor**: Set up monitoring and analytics
6. **Scale**: Optimize for performance and scalability

---

**Happy coding! 🎉**
