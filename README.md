
# Expense Tracker

A full-stack expense tracking application that allows users to manage their income and expenses, create spending budgets, and view reports about their financial activity.

The application was built to practice full-stack web development, REST API design, authentication, PostgreSQL database management, and production deployment.

## Live Demo

[View the Live Demo](https://expense-tracker-fe-z51v.onrender.com)

The live application includes a demo login option so visitors can explore the application without creating their own account.

## GitHub Repository

[View the Source Code](https://github.com/alyssanovelli/expense-tracker)

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected application routes
- User-specific data
- Automatic logout when an authentication token is invalid or expired

### Transactions

- Add income and expenses
- View transaction history
- Delete transactions
- Store transaction names, amounts, dates, types, and notes
- Separate income from expenses
- Persistent transaction data using PostgreSQL

### Budgets

- Create spending budgets by category
- Set a budget amount
- Track spending against each budget
- Display budget progress bars
- Show remaining budget amounts
- Indicate when spending exceeds a budget
- Delete budgets

### Reports

- View spending information
- Review financial activity
- See summarized information about income and expenses

### Settings

- User settings page
- Account-related interface
- Application navigation and account controls

## Tech Stack

### Frontend

- React
- JavaScript
- React Router
- Vite
- CSS
- Lucide React

### Backend

- Node.js
- Express
- PostgreSQL
- JSON Web Tokens
- REST APIs

### Database

- PostgreSQL
- pg / node-postgres
- Relational database design
- Foreign key relationships
- Unique constraints

### Deployment

- Render
- Render PostgreSQL

## Application Architecture

The application is divided into three primary parts:

```text
React Frontend
      |
      | HTTP Requests
      v
Express / Node.js API
      |
      | SQL Queries
      v
PostgreSQL Database
```
## Database Structure

The application uses three primary tables.

### Users

Stores registered user accounts.
```text
users
├── id
├── name
├── email
└── password_hash
```

## Transactions

Stores user income and expense records.

```text
transactions
├── id
├── user_id
├── name
├── amount
├── type
├── date
└── note
```
## Budgets

Stores user-created spending budgets.
```text
budgets
├── id
├── user_id
├── category
└── amount
```
## Authentication

Authentication is handled using JSON Web Tokens.

When a user successfully logs in, the backend returns a token to the frontend. The frontend stores the token and sends it with protected API requests.

Protected requests use the following authorization format:
```text
Authorization: Bearer <token>
```
The backend verifies the token before allowing access to user-specific data.

## API
Authentication
```text
POST /api/register
POST /api/login
```
## Transactions
```text
GET    /api/transactions
POST   /api/transactions
DELETE /api/transactions/:id
```
## Budgets
```text
GET    /api/budgets
POST   /api/budgets
DELETE /api/budgets/:id
```
## Project Structure
```text
expense-tracker/
│
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── HomeNavBar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Budgets.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   │
│   ├── utils/
│   │   └── apiFetch.js
│   │
│   └── App.jsx
│
├── server/
│   ├── server.js
│   └── db.js
│
├── package.json
├── vite.config.js
└── README.md
```
The application is deployed using Render.
```text
User
 |
 v
React Frontend
 |
 v
Express / Node.js API
 |
 v
Render PostgreSQL
```

Production environment variables are configured through Render and are not stored in the repository.

## Demo

The deployed application includes a demo login option so recruiters and visitors can explore the application without creating their own account.

To try the application:

Open the live demo.
Select "Try Demo".
Select the demo login option.
Explore the dashboard.
Add transactions.
Create budgets.
Review reports.
Test the logout and login flow.

## Development Highlights

This project provided experience with:

Building React components
Managing React state with hooks
Creating protected routes
Building REST APIs with Express
Connecting Node.js to PostgreSQL
Designing relational database tables
Creating foreign key relationships
Implementing JWT authentication
Handling API errors
Managing environment variables
Deploying a full-stack application
Debugging production database issues
## Future Improvements

### Potential future improvements include:

Password reset functionality
More advanced financial reports
Recurring transactions
Transaction categories
Search and filtering
Monthly spending summaries
Improved mobile responsiveness
Data visualization
Exporting transactions
Additional account settings
## Author

Alyssa Novelli
