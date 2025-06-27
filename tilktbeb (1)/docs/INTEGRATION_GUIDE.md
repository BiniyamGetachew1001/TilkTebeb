# TilkTebeb Frontend-Backend Integration Guide

This guide provides step-by-step instructions for integrating the TilkTebeb Next.js frontend with a Django backend.

## Prerequisites

- Node.js 18+ installed
- Django backend API running (see API_DOCUMENTATION.md for required endpoints)
- Basic understanding of Next.js and Django

## Frontend Setup

### 1. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Production Django API URL
NEXT_PUBLIC_API_BASE_URL=https://your-django-api.com/api

# Set to false to use real API instead of mock data
NEXT_PUBLIC_USE_MOCK_API=false

# App configuration
NEXT_PUBLIC_APP_NAME=TilkTebeb
NEXT_PUBLIC_APP_VERSION=1.0.0

# Feature flags
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SOCIAL_SHARING=true
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Development Mode

For development with mock data:
```bash
npm run dev
```

For development with real Django API:
```bash
NEXT_PUBLIC_USE_MOCK_API=false npm run dev
```

### 4. Production Build

```bash
npm run build
npm run start
```

## Django Backend Requirements

### 1. CORS Configuration

Install and configure django-cors-headers:

```python
# settings.py
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
]

MIDDLEWARE = [
    # ... other middleware
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

# Allow frontend domain
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Development
    "https://your-frontend-domain.com",  # Production
]

# Allow credentials for authentication
CORS_ALLOW_CREDENTIALS = True

# Allow specific headers
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### 2. JWT Authentication

Configure JWT authentication:

```python
# settings.py
INSTALLED_APPS = [
    # ... other apps
    'rest_framework',
    'rest_framework_simplejwt',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}
```

### 3. Required Django Models

Create these models in your Django app:

```python
# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    plan = models.CharField(
        max_length=20,
        choices=[
            ('base', 'Base'),
            ('small', 'Small Business'),
            ('medium', 'Medium Business'),
            ('large', 'Large Business'),
        ],
        default='base'
    )

class Book(models.Model):
    id = models.SlugField(primary_key=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    coverUrl = models.URLField()
    category = models.CharField(max_length=50)
    rating = models.FloatField()
    pages = models.IntegerField()
    language = models.CharField(max_length=20, default='English')
    summary = models.TextField()
    keyInsights = models.TextField()
    applications = models.TextField()
    isPremium = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

class BusinessPlan(models.Model):
    SIZE_CHOICES = [
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
    ]
    
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)
    description = models.TextField()
    overview = models.TextField()
    marketAnalysis = models.TextField()
    financials = models.TextField()
    implementation = models.TextField()
    isPremium = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

class UserActivity(models.Model):
    ACTIVITY_TYPES = [
        ('book_read', 'Book Read'),
        ('plan_viewed', 'Plan Viewed'),
        ('book_saved', 'Book Saved'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    itemId = models.CharField(max_length=100)
    itemTitle = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'book']

class Payment(models.Model):
    PAYMENT_METHODS = [
        ('telebirr', 'Telebirr'),
        ('cbe', 'CBE'),
    ]
    
    transactionId = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    plan = models.CharField(max_length=20)
    paymentMethod = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    success = models.BooleanField(default=False)
    message = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
```

## API Implementation Examples

### 1. Authentication Views

```python
# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(username=email, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'id': str(user.id),
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'plan': user.plan,
            'token': str(refresh.access_token),
        })
    
    return Response(
        {'error': 'Invalid credentials'}, 
        status=status.HTTP_401_UNAUTHORIZED
    )

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    # Implementation for user registration
    pass
```

### 2. Books Views

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer, BookPreviewSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def books_list(request):
    books = Book.objects.all()
    
    # Apply filters
    category = request.GET.get('category')
    if category and category != 'all':
        books = books.filter(category__iexact=category)
    
    query = request.GET.get('query')
    if query:
        books = books.filter(
            models.Q(title__icontains=query) | 
            models.Q(author__icontains=query)
        )
    
    premium = request.GET.get('premium')
    if premium is not None:
        books = books.filter(isPremium=premium.lower() == 'true')
    
    limit = request.GET.get('limit')
    if limit:
        books = books[:int(limit)]
    
    serializer = BookPreviewSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def book_detail(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    except Book.DoesNotExist:
        return Response(
            {'error': 'Book not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
```

## Testing the Integration

### 1. Frontend Testing with Mock API

Test the frontend with mock data:

```bash
# Start with mock API enabled
NEXT_PUBLIC_USE_MOCK_API=true npm run dev
```

Verify all pages load correctly:
- Home page: http://localhost:3000
- Books: http://localhost:3000/books
- Business Plans: http://localhost:3000/business-plans
- Login: http://localhost:3000/login
- Account: http://localhost:3000/account (after login)

### 2. Backend API Testing

Test Django API endpoints using curl or Postman:

```bash
# Test books endpoint
curl http://localhost:8000/api/books/

# Test authentication
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### 3. Full Integration Testing

1. Start Django backend: `python manage.py runserver`
2. Start frontend with real API: `NEXT_PUBLIC_USE_MOCK_API=false npm run dev`
3. Test complete user flows:
   - User registration and login
   - Browse books and business plans
   - Bookmark functionality
   - Payment processing
   - Admin dashboard (if applicable)

## Deployment Considerations

### 1. Frontend Deployment

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_BASE_URL=https://your-django-api.com/api
NEXT_PUBLIC_USE_MOCK_API=false
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Backend Deployment

Configure Django for production:

```python
# settings.py
import os

# Security settings
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com', 'api.your-domain.com']

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CORS for production
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.com",
]
```

### 3. Environment Variables

#### Frontend (.env.production)
```env
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com/api
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_APP_NAME=TilkTebeb
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### Backend (.env)
```env
DEBUG=False
SECRET_KEY=your-secret-key
DB_NAME=tilktebeb_db
DB_USER=db_user
DB_PASSWORD=db_password
DB_HOST=localhost
DB_PORT=5432
ALLOWED_HOSTS=api.your-domain.com,your-domain.com
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure django-cors-headers is properly configured
   - Check CORS_ALLOWED_ORIGINS includes your frontend domain
   - Verify CORS_ALLOW_CREDENTIALS is True

2. **Authentication Issues**
   - Check JWT token format in Authorization header
   - Verify token expiration settings
   - Ensure user model is properly configured

3. **API Connection Issues**
   - Verify NEXT_PUBLIC_API_BASE_URL is correct
   - Check network connectivity between frontend and backend
   - Ensure Django server is running and accessible

4. **Build Issues**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run build`

### Debug Mode

Enable debug logging in frontend:

```javascript
// lib/api.ts
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('API Request:', url, options)
  console.log('API Response:', response)
}
```

### Performance Optimization

1. **Frontend Optimizations**
   - Enable Next.js image optimization
   - Use dynamic imports for large components
   - Implement proper caching strategies

2. **Backend Optimizations**
   - Add database indexes for frequently queried fields
   - Implement API response caching
   - Use pagination for large datasets
   - Optimize database queries with select_related/prefetch_related

## Security Considerations

1. **Frontend Security**
   - Never expose sensitive API keys in frontend code
   - Use HTTPS in production
   - Implement proper input validation
   - Use Content Security Policy (CSP) headers

2. **Backend Security**
   - Use strong JWT secret keys
   - Implement rate limiting
   - Validate all input data
   - Use HTTPS for API endpoints
   - Implement proper authentication and authorization

## Support and Maintenance

1. **Monitoring**
   - Set up error tracking (e.g., Sentry)
   - Monitor API response times
   - Track user analytics

2. **Updates**
   - Keep dependencies updated
   - Monitor security vulnerabilities
   - Test updates in staging environment

3. **Backup**
   - Regular database backups
   - Version control for code
   - Document deployment procedures

For additional support, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Django REST Framework: https://www.django-rest-framework.org/
- API Documentation: See API_DOCUMENTATION.md
