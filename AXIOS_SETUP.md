# Axios Setup Documentation

This project now includes a properly configured axios setup with interceptors for making HTTP requests.

## Files Added

1. **`src/lib/axios.js`** - Main axios configuration with interceptors
2. **`src/services/api.js`** - Service layer with predefined API methods
3. **Updated `src/app/contact/page.js`** - Example of using the new axios setup

## Configuration Features

### Request Interceptor
- Automatically adds authentication tokens from localStorage
- Logs requests in development mode
- Handles request errors

### Response Interceptor
- Logs responses in development mode
- Handles common HTTP error codes:
  - **401**: Unauthorized - automatically redirects to login
  - **403**: Forbidden access
  - **404**: Resource not found
  - **422**: Validation errors
  - **500**: Internal server errors
- Removes auth token and redirects on authentication failures

## Usage Examples

### Basic API Calls

```javascript
import { api } from '@/lib/axios';

// GET request
const data = await api.get('/users');

// POST request
const result = await api.post('/users', { name: 'John', email: 'john@example.com' });

// PUT request
const updated = await api.put('/users/1', { name: 'Jane' });

// DELETE request
await api.delete('/users/1');
```

### Using Service Layer

```javascript
import { authService, userService } from '@/services/api';

// Login
const { token, user } = await authService.login({ email, password });

// Get user profile
const profile = await userService.getProfile();

// Update profile
const updated = await userService.updateProfile({ name: 'New Name' });
```

### Authentication Token Management

```javascript
import { setAuthToken, removeAuthToken } from '@/lib/axios';

// Set token (automatically included in future requests)
setAuthToken('your-jwt-token');

// Remove token
removeAuthToken();
```

### File Upload

```javascript
import { uploadFile } from '@/lib/axios';

const handleFileUpload = async (file) => {
  try {
    const result = await uploadFile('/upload', file, (progressEvent) => {
      const progress = (progressEvent.loaded / progressEvent.total) * 100;
      console.log(`Upload progress: ${progress}%`);
    });
    console.log('Upload successful:', result.data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Available Services

The `src/services/api.js` file includes pre-configured services for:

- **Authentication**: login, signup, logout, refresh token
- **User Management**: profile operations
- **Email Accounts**: CRUD operations
- **Leads**: lead management and bulk import
- **Contact**: message sending
- **SDR Agents**: AI agent management
- **Analytics**: dashboard and metrics data
- **File Management**: upload and delete operations

## Error Handling

All services automatically handle errors through the axios interceptors:

- Network errors are logged
- HTTP errors are categorized and handled appropriately
- Authentication errors trigger automatic logout and redirect
- Validation errors are properly logged with details

## Development vs Production

- Request/response logging is automatically enabled in development
- Error handling is consistent across environments
- Authentication token handling works client-side only

## Integration with Existing Code

The following components have been updated to use axios instead of fetch:

### 1. Contact Page (`src/app/contact/page.js`)
- Migrated from `fetch` to using `contactService.sendMessage()`
- Improved error handling with better error messages

### 2. Add Email Modal (`src/components/AddEmailModal.jsx`)
- Migrated from `fetch` to using `emailAccountsService.create()` and `emailAccountsService.verify()`
- Both email creation and verification now use the axios interceptors
- Enhanced error handling with detailed error messages from API responses
- Maintains the same functionality while leveraging the centralized HTTP client

### Migration Benefits
- **Consistent Error Handling**: All API calls now use the same error handling logic
- **Automatic Logging**: Request/response logging in development mode
- **Better Error Messages**: More detailed error information from API responses
- **Centralized Configuration**: All HTTP settings managed in one place
- **Future-Proof**: Easy to add authentication, retries, or other interceptors

The changes are minimal and maintain the same functionality while adding better error handling and consistency across the application.

## ✨ New Feature: Region Selection in Create SDR Modal

### Enhanced CreateSDRModal with Location Targeting

The Create SDR Modal now includes a sophisticated region selection feature:

#### 🌍 **Target Regions Field**
- **Searchable Combobox**: Users can search for countries and states
- **Multiple Selection**: Support for selecting multiple regions
- **Visual Indicators**: Countries and states are clearly distinguished with flags and labels
- **Comprehensive Coverage**: Includes 50+ countries and detailed state data for US, Canada, Australia, and Germany

#### 🔧 **Technical Implementation**
- **Custom Combobox Component** (`src/components/ui/combobox.jsx`): Reusable searchable multi-select component
- **Location Service** (`src/services/api.js`): Comprehensive location data with countries and states
- **Smart Search**: Real-time filtering of countries and states
- **No External Dependencies**: All location data is built-in to avoid API rate limits and CORS issues

#### 📋 **Usage Example**
```javascript
// The modal now requires target regions
const formData = {
  domain: "techstartup.com",
  emailAccount: "account-id",
  targetRegions: [
    "country:US",
    "state:US:CA", 
    "state:US:NY",
    "country:GB"
  ]
};
```

#### 🎯 **User Experience**
- **Type-ahead Search**: Start typing to find countries/states instantly
- **Visual Feedback**: Selected regions shown as removable chips
- **Smart Validation**: Form requires at least one region to be selected
- **Intuitive Interface**: Clear distinction between countries and states with icons

#### 🌐 **Supported Regions**
- **Countries**: 50+ major countries with flag emojis
- **US States**: All 50 states plus DC
- **Canadian Provinces**: All provinces and territories
- **Australian States**: All states and territories  
- **German States**: All 16 federal states

This enhancement makes the SDR creation process more targeted and professional, allowing users to precisely define their lead generation scope.
