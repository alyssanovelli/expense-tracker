# Expense Tracker

A full-stack expense tracking application that allows users to manage their income and expenses, create spending budgets, and view reports about their financial activity.

The application was built to practice full-stack web development, REST API design, authentication, PostgreSQL database management, and production deployment.

## Live Demo

[View the Live Demo](YOUR_LIVE_DEMO_URL)

The live application includes a demo login option so visitors can explore the application without creating their own account.

## GitHub Repository

[View the Source Code]
https://github.com/alyssanovelli/expense-tracker

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