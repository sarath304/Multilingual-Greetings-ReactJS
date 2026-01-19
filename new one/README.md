# Employee Management System

A modern, full-featured Employee Management System built with React and TypeScript. This application provides a complete solution for managing employee data with authentication, CRUD operations, search, filtering, and print functionality.

## 🚀 Features

### Authentication
- Secure login page with mock authentication
- Protected routes - dashboard access requires login
- Session persistence using localStorage
- Automatic redirect after successful login

### Dashboard
- **Summary Cards**: Display total employees, active employees, and inactive employees
- **Employee List**: Comprehensive table view with all employee details
- **Real-time Updates**: All changes reflect immediately in the dashboard

### Employee Management
- **Add Employee**: Create new employee records with full details
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Remove employees with confirmation dialog
- **Toggle Status**: Quickly activate/deactivate employees
- **Print Functionality**: Print employee list for records

### Employee Form
- Full Name input with validation
- Gender selection (Male, Female, Other)
- Date of Birth picker with validation
- Profile Image upload with preview
- State selection from dropdown (Indian states)
- Active/Inactive status toggle
- Comprehensive form validation
- Image preview before saving

### Search & Filter
- **Search**: Find employees by name (case-insensitive)
- **Gender Filter**: Filter by Male, Female, or Other
- **Status Filter**: Filter by Active or Inactive status
- **Combined Filtering**: All filters work together seamlessly

### UI/UX Features
- Modern, clean design with gradient accents
- Responsive layout for all screen sizes
- Loading states for better user feedback
- Empty states with helpful messages
- Smooth animations and transitions
- Print-friendly styling
- Accessible form controls

## 🛠️ Tech Stack

- **React 18.2.0**: Modern React with hooks
- **TypeScript 5.2.2**: Type-safe development
- **React Router DOM 6.20.0**: Client-side routing
- **Vite 5.0.8**: Fast build tool and dev server
- **LocalStorage**: Data persistence (no backend required)

## 📁 Project Structure

```
employee-management-system/
├── src/
│   ├── components/          # Reusable components
│   │   ├── DashboardSummary.tsx
│   │   ├── EmployeeForm.tsx
│   │   ├── EmployeeList.tsx
│   │   └── SearchAndFilter.tsx
│   ├── context/             # React context providers
│   │   └── AuthContext.tsx
│   ├── pages/               # Page components
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── employee.ts
│   ├── utils/               # Utility functions
│   │   ├── storage.ts       # LocalStorage operations
│   │   ├── imageUtils.ts    # Image handling
│   │   └── constants.ts     # Constants (states, etc.)
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Steps to Run Locally

1. **Clone or download the repository**
   ```bash
   cd employee-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The application will be available at `http://localhost:5173` (or the port shown in terminal)
   - For login, use any username and password (mock authentication)

5. **Build for production** (optional)
   ```bash
   npm run build
   ```

6. **Preview production build** (optional)
   ```bash
   npm run preview
   ```

## 🎯 Usage Guide

### Login
1. Navigate to the login page
2. Enter any username and password (mock authentication accepts any credentials)
3. Click "Sign In" to access the dashboard

### Adding an Employee
1. Click the "+ Add Employee" button
2. Fill in all required fields:
   - Full Name
   - Gender
   - Date of Birth
   - State
3. Optionally upload a profile image
4. Set Active/Inactive status
5. Click "Add Employee" to save

### Editing an Employee
1. Click the edit icon (✏️) next to an employee in the list
2. Modify the desired fields
3. Click "Update Employee" to save changes

### Deleting an Employee
1. Click the delete icon (🗑️) next to an employee
2. Confirm the deletion in the dialog

### Toggling Employee Status
- Click the toggle switch in the Status column to activate/deactivate an employee

### Searching and Filtering
- Use the search box to find employees by name
- Select filters from the dropdown menus to filter by gender or status
- Filters can be combined for more specific results

### Printing
- Click the "🖨️ Print List" button to print the employee list
- The print view automatically hides navigation and action buttons

## 🎨 Design Decisions

1. **LocalStorage for Data Persistence**: 
   - Chosen for simplicity and no backend requirement
   - Data persists across browser sessions
   - Easy to reset by clearing browser storage

2. **Mock Authentication**:
   - Accepts any credentials for demo purposes
   - Session stored in localStorage
   - Can be easily replaced with real authentication

3. **Base64 Image Storage**:
   - Images converted to base64 for localStorage compatibility
   - No external storage required
   - Image preview before saving

4. **Component Structure**:
   - Separated concerns with dedicated components
   - Reusable form component for both add and edit
   - Context API for authentication state

5. **TypeScript**:
   - Full type safety throughout the application
   - Better IDE support and error catching
   - Improved code maintainability

6. **Modern UI/UX**:
   - Gradient color scheme for visual appeal
   - Smooth animations and transitions
   - Responsive design for all devices
   - Loading and empty states for better UX

## 🔒 Security Notes

- This is a demo application with mock authentication
- For production use, implement proper authentication and authorization
- Add input sanitization and validation on the backend
- Use secure storage for sensitive data
- Implement proper image upload handling with size limits

## 📝 Assumptions

1. **Employee IDs**: Auto-generated using timestamp and random string
2. **Date Format**: Uses browser's locale date format for display
3. **Image Size Limit**: Maximum 5MB per image
4. **Supported Image Formats**: JPEG, JPG, PNG, GIF
5. **States**: Indian states list included (can be customized)
6. **No Backend**: All data stored in browser's localStorage

## 🐛 Known Limitations

- Data is stored locally and will be lost if browser storage is cleared
- No server-side validation
- Image storage in localStorage has size limitations
- No pagination for large employee lists (can be added if needed)

## 🚀 Future Enhancements

- Backend API integration
- Real authentication with JWT tokens
- Pagination for employee list
- Export to CSV/Excel
- Advanced filtering options
- Employee profile view page
- Bulk operations
- Image optimization before storage
- Dark mode support

## 📄 License

This project is created for educational/demonstration purposes.

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

- TypeScript strict mode enabled
- Functional components with hooks
- CSS modules for component styling
- Consistent naming conventions

---

**Note**: This application is ready for demonstration and can be easily extended with additional features or integrated with a backend API.

