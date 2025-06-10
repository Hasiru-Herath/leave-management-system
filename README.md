Leave Management System
Overview
The Leave Management System is a full-stack web application for managing employee leave requests. It consists of a frontend built with React (JavaScript variant) and a backend built with Laravel. The system supports user authentication, role-based access (admin and employee), leave application and approval, and leave statistics visualization.

Frontend: Uses React with Vite for fast development, React Router v7 for navigation, Axios for API calls, Chart.js for dashboard statistics, and basic CSS for responsive styling.
Backend: Uses Laravel with Sanctum for secure API authentication and handles user registration, login, leave management, and role-based operations.

Features

User Authentication:
Login with email and password.
Registration with name, email, password, and role selection (employee or admin).


Employee Dashboard:
Apply for leaves with start date, end date, and reason.
View leave status (pending, approved, rejected).


Admin Dashboard:
View and manage all leave requests (approve or reject).
Visualize leave statistics with a Chart.js bar chart (pending, approved, rejected).


Role-Based Access:
Protected routes ensure employees access only the employee dashboard, and admins access only the admin dashboard.


Responsive Design:
Basic CSS ensures a mobile-friendly UI across devices.


Navigation:
Navbar with role display and logout functionality.


API Integration:
RESTful API endpoints for authentication, leave management, and statistics.


Validations:
Frontend displays error messages for invalid inputs or failed API calls.
Backend validates inputs using Laravel Form Requests.



Tech Stack
Frontend

React: v19.1.0 (JavaScript variant)
Vite: v6.3.5 (build tool)
React Router DOM: v7.6.2 (navigation)
Axios: v1.9.0 (API requests)
Chart.js: v4.4.9 with react-chartjs-2 v5.3.0 (statistics visualization)
CSS: Basic custom styles (src/index.css)
ESLint: v9.25.0 (code linting)

Backend

Laravel: v10.x (PHP framework)
Laravel Sanctum: API authentication
MySQL: Database for users and leaves
PHP: v8.x

Prerequisites

Node.js: v16+ (e.g., v18.16.0)
npm: v8+ (e.g., v8.19.2)
PHP: v8.1+
Composer: v2.x
MySQL: v8.x
Git: For version control



Setup Instructions
Backend Setup

Navigate to the backend folder:cd backend


Install PHP dependencies:composer install


Copy the .env.example file to .env:cp .env.example .env


Configure .env with your database details and Sanctum settings:DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=leave_management
DB_USERNAME=your_username
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost


Generate an application key:php artisan key:generate


Run database migrations:php artisan migrate


Start the Laravel server:php artisan serve


The backend API will be available at http://localhost:8000.



Frontend Setup

Navigate to the frontend folder:cd frontend


Install Node.js dependencies:npm install


Start the development server:npm run dev


The frontend will be available at http://localhost:5173.



Usage

Register:
Go to http://localhost:5173/register.
Enter name, select role (employee or admin), email, and password.
Example: Test User, employee, test@example.com, password.


Login:
Go to http://localhost:5173/login.
Use default credentials:
Admin: admin@example.com / password
Employee: employee1@example.com / password


Or use registered credentials.


Employee Dashboard:
Apply for a leave with start date, end date, and reason.
View leave status in a table.


Admin Dashboard:
View all leave requests.
Approve or reject pending leaves.
Check leave statistics via a bar chart.


Logout:
Click the "Logout" button in the navbar.



API Endpoints

POST /api/register:
Request: { "name": "string", "email": "string", "password": "string", "role": "employee|admin" }
Response: { "token": "string", "user": { "name": "string", "email": "string", "role": "string" } }


POST /api/login:
Request: { "email": "string", "password": "string" }
Response: { "token": "string", "user": { "name": "string", "email": "string", "role": "string" } }


GET /api/leaves:
Headers: Authorization: Bearer {token}, Accept: application/json
Response: Array of leave objects { id, user_id, start_date, end_date, reason, status }


POST /api/leaves:
Headers: Authorization: Bearer {token}, Accept: application/json
Request: { "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD", "reason": "string" }
Response: { "message": "Leave submitted" }


PUT /api/leaves/{id}:
Headers: Authorization: Bearer {token}, Accept: application/json
Request: { "status": "approved|rejected" }
Response: { "message": "Leave updated" }


POST /api/logout:
Headers: Authorization: Bearer {token}, Accept: application/json
Response: { "message": "Logged out" }



Testing

Frontend:
Run npm run dev and test:
Register with different roles.
Login as admin and employee.
Apply for leaves and check status.
Approve/reject leaves as admin.
Verify the Chart.js bar chart.
Test responsiveness on mobile and desktop.




Backend:
Run php artisan serve.
Test API endpoints using Postman or curl (see above).
Check logs in backend/storage/logs/laravel.log for errors.


Linting:
Run npm run lint in frontend to check for code issues.
Fix ESLint errors as suggested.



Troubleshooting

Frontend Errors:
If npm run dev fails, clear the Vite cache:rm -rf node_modules/.vite
npm run dev


If dependencies fail, clear npm cache:npm cache clean --force
npm install




Backend Errors:
Ensure MySQL is running and .env is configured correctly.
If Sanctum authentication fails, verify SANCTUM_STATEFUL_DOMAINS includes localhost:5173.
Check Sanctum middleware in backend/app/Http/Kernel.php:'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],




API Connectivity:
If frontend API calls fail, ensure axios includes Accept: application/json and Authorization headers.
Check CORS in backend/config/cors.php:'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],




React 19 Issues:
If library compatibility issues arise, downgrade to React 18:npm install react@18.2.0 react-dom@18.2.0





Notes

The frontend uses React Router v7 for navigation, compatible with all components.
The backend /api/register endpoint expects a role field (employee or admin).
Ensure the users table has a role column (run migrations if needed).
Basic CSS in frontend/src/index.css replaces Tailwind CSS for styling.
Sanctum requires CSRF token initialization for authenticated requests. The frontend should fetch /sanctum/csrf-cookie before login/register (handled in axios setup if configured).
Default users are seeded with admin@example.com / password and employee1@example.com / password.

Development

Frontend: Add features like toast notifications with react-toastify:npm install react-toastify


Backend: Extend API endpoints or add middleware for additional security.
Enhancements: Request specific features (e.g., password confirmation in Register.jsx, improved styling).

