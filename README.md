# AI-Based Cloud Data Leakage Prevention System Frontend

This project is a modern, enterprise-style React frontend for an IBM Final Year Project focused on AI-based cloud data leakage prevention using blockchain and IBM Cloud.

## Features

- Splash screen with animated loading experience
- Login and registration flows
- Responsive dashboard with analytics and cards
- Upload document workflow with progress and status indicators
- Documents management page with search, filters, and export action
- Verification page with SHA-256 and blockchain-style validation
- Activity logs timeline
- Admin dashboard for system oversight
- User profile and settings pages
- Modern dark blue enterprise UI with responsive design

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Recharts
- React Hook Form
- React Icons
- Lucide React

## Project Structure

```bash
src/
  components/
  pages/
  layouts/
  hooks/
  context/
  services/
  assets/
  utils/
  routes/
  styles/
```

## Share the Project to Another Laptop

To share the project, copy the entire project folder including:
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `README.md`
- `src/`
- `public/` (if present)
- `styles/`
- any additional assets or configuration files

Do not need to copy `node_modules/`; that folder can be recreated by installing dependencies on the new machine.

## Dependencies and Dev Dependencies

Install all packages from `package.json` on the other laptop using:

```bash
npm install
```

This installs the main runtime dependencies:
- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-hook-form`
- `react-icons`
- `framer-motion`
- `recharts`
- `lucide-react`

And the development/build dependencies:
- `vite`
- `@vitejs/plugin-react`
- `tailwindcss`
- `@tailwindcss/vite`

## How to Run the Project

### 1. Open the project folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app in the browser

After the command runs, Vite will provide a local URL such as:

```bash
http://localhost:5173
```

## Step-by-Step Usage Guide

### 1. Splash Screen
When the app starts, you will see a loading screen with an animated IBM-style security logo. It transitions automatically to the login page.

### 2. Login
Use the login page to access the dashboard.

Demo login details:
- Email: ava.chen@ibmcloud.com
- Password: secure123

You can also use the Google login button UI, which is currently styled but not connected to a real backend.

### 3. Register
If you are a new user, go to the registration page and fill in:
- Full Name
- Email
- Phone
- Password
- Confirm Password
- Role (Employee or Admin)

### 4. Dashboard
After login, you will land on the dashboard. It includes:
- Summary cards
- Charts
- Recent uploads
- Quick actions
- Search and profile access

### 5. Upload Documents
Go to the Upload page to:
- Drag and drop a document
- Browse your files
- See upload progress
- View AI classification and encryption status

### 6. Documents Page
The Documents page shows a modern table with:
- Document name
- Category
- Upload date
- Status
- Blockchain status
- Verification state
- Actions

### 7. Verification Page
Use the verification page to:
- Upload a document
- Generate SHA-256 hash
- Check blockchain integrity
- See verification results (Verified or Tampered)

### 8. Activity Logs
The Activity page gives a timeline of actions such as:
- Upload
- Download
- Delete
- Verification

### 9. Admin Dashboard
The Admin page is designed for administrators and includes:
- Statistics
- User management overview
- Document analytics
- Role management
- System logs
- Recent activities

### 10. User Profile and Settings
You can view your profile, update password details, and manage preferences such as:
- Theme
- Notifications
- Security
- Language
- About

## Admin Login Information

For demo purposes, the app is preconfigured to allow access to the main dashboard as a logged-in user. The admin-style views are available through the sidebar navigation and the Admin page.

## Dummy API Integration

The frontend uses dummy API calls through Axios in the services layer to simulate data loading for:
- Dashboard data
- Upload workflow

## Notes

- This is a frontend prototype and does not connect to a real backend yet.
- Authentication and data persistence are simulated for UI demonstration.
- You can extend this project later with real backend APIs, database storage, and blockchain integration.

## Build for Production

```bash
npm run build
```

This generates a production-ready build in the dist folder.



fastapi backend dependeces :::::::::::::

pip install fastapi uvicorn

pip install pymongo

pip install python-dotenv

pip install python-multipart

pip install passlib[bcrypt]

pip install python-jose

pip install fastapi uvicorn python-dotenv python-jose passlib[bcrypt] python-multipart

fast api could not be ::

python -m pip install --upgrade fastapi uvicorn