# StudyNotion Backend Deployment Guide

## Issues Found and Fixed

### 1. **API Endpoint Mismatches** ✅ FIXED
- **Problem**: Frontend was calling incorrect API endpoints
- **Solution**: Updated all API endpoints in `src/services/apis.js` to match backend routes
- **Changes**: Added missing `/api/v1/` prefixes and forward slashes

### 2. **CORS Configuration** ✅ FIXED
- **Problem**: CORS was allowing all origins (`"*"`) which can cause issues
- **Solution**: Updated CORS configuration to allow specific origins
- **Changes**: Added proper origin configuration for production and development

### 3. **Database Connection** ✅ FIXED
- **Problem**: Missing error handling and connection options
- **Solution**: Added proper MongoDB connection options and error handling
- **Changes**: Added connection pooling, timeouts, and graceful shutdown

### 4. **Health Check Endpoints** ✅ FIXED
- **Problem**: Missing proper health check endpoints for Render
- **Solution**: Added `/health` endpoint and improved root endpoint
- **Changes**: Added timestamp, environment info, and uptime tracking

## Required Environment Variables for Render

You need to configure these environment variables in your Render dashboard:

### Database
```
MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
```

### JWT
```
JWT_SECRET=your_jwt_secret_key_here
```

### Cloudinary
```
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Razorpay
```
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret_key
```

### Email (Nodemailer)
```
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

### Environment
```
NODE_ENV=production
PORT=4000
```

## Steps to Deploy on Render

### 1. **Update Your Render Service**
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add all the environment variables listed above

### 2. **Update Build Settings**
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && npm start`
- **Root Directory**: Leave empty (or set to `/`)

### 3. **Health Check Configuration**
- **Health Check Path**: `/health`
- **Health Check Timeout**: 180 seconds

### 4. **Redeploy**
1. Go to "Manual Deploy" section
2. Click "Deploy latest commit"
3. Wait for deployment to complete

## Frontend Configuration

Make sure your frontend has the correct backend URL:

```javascript
// In your Vercel environment variables
REACT_APP_BASE_URL=https://studynotion-backend-n28p.onrender.com
```

## Testing the Deployment

### 1. **Test Health Check**
```bash
curl https://studynotion-backend-n28p.onrender.com/health
```

### 2. **Test Root Endpoint**
```bash
curl https://studynotion-backend-n28p.onrender.com/
```

### 3. **Test Database Connection**
The server will log database connection status on startup.

## Common Issues and Solutions

### Issue: "Cannot connect to database"
**Solution**: Check your `MONGODB_URL` environment variable

### Issue: "CORS error"
**Solution**: Verify the frontend URL is in the CORS allowed origins

### Issue: "JWT_SECRET not defined"
**Solution**: Add `JWT_SECRET` environment variable

### Issue: "Cloudinary configuration failed"
**Solution**: Check your Cloudinary credentials

## Monitoring

After deployment, monitor:
1. **Render logs** for any errors
2. **Database connection** status
3. **API response times**
4. **Error rates**

## Support

If you continue to have issues:
1. Check Render logs for specific error messages
2. Verify all environment variables are set correctly
3. Test endpoints individually using curl or Postman
4. Ensure your MongoDB cluster is accessible from Render's IP range 