# Ention Backend API

Backend API for the Ention laptop website built with Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication and authorization
- Product management
- Order processing
- Payment integration (Razorpay)
- Email notifications
- Admin dashboard
- File uploads

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payment**: Razorpay
- **Email**: Nodemailer
- **Deployment**: Railway

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Razorpay account
- Email service (Gmail/SMTP)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashmish18/ention-backend.git
   cd ention-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=24h
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   PORT=4000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment (Railway)

1. **Connect to Railway**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will automatically detect the Node.js project

2. **Environment Variables**
   - Add all environment variables from `.env.example`
   - Update `FRONTEND_URL` to your production frontend URL
   - Set `NODE_ENV=production`

3. **Deploy**
   - Railway will automatically deploy on every push to main branch
   - Monitor deployment logs for any issues

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/checkout/create-order` - Create order
- `POST /api/checkout/verify-payment` - Verify payment
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Admin
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/orders` - All orders
- `PUT /api/admin/orders/:id` - Update order status

## 🔒 Security

- CORS configured for production domains
- JWT authentication
- Input validation
- Rate limiting (recommended)
- Environment variable protection

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRE` | JWT expiration time | No |
| `EMAIL_HOST` | SMTP host | Yes |
| `EMAIL_PORT` | SMTP port | Yes |
| `EMAIL_USER` | Email username | Yes |
| `EMAIL_PASS` | Email password | Yes |
| `RAZORPAY_KEY_ID` | Razorpay public key | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | Yes |
| `PORT` | Server port | No |
| `NODE_ENV` | Environment | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@ention.com or create an issue in this repository. 