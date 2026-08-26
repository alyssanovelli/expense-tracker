
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
Database Structure

The application uses three primary tables:

Users

Stores registered user accounts.

users
├── id
├── name
├── email
└── password_hash
Transactions

Stores user income and expense records.

transactions
├── id
├── user_id
├── name
├── amount
├── type
├── date
└── note
Budgets

Stores user-created spending budgets.

budgets
├── id
├── user_id
├── category
└── amount
Authentication

Authentication is handled using JSON Web Tokens.

When a user successfully logs in, the backend returns a token to the frontend. The frontend stores the token and sends it with protected API requests.

Protected requests use the following authorization format:

Authorization: Bearer <token>

The backend verifies the token before allowing access to user-specific data.

API
Authentication
POST /api/register
POST /api/login
Transactions
GET    /api/transactions
POST   /api/transactions
DELETE /api/transactions/:id
Budgets
GET    /api/budgets
POST   /api/budgets
DELETE /api/budgets/:id
Project Structure
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
Running Locally
Prerequisites
Node.js
npm
PostgreSQL
Clone the Repository
git clone https://github.com/alyssanovelli/expense-tracker.git
cd expense-tracker
Install Dependencies
npm install
Environment Variables

Create a .env file containing your local PostgreSQL configuration.

Example:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_database_password
DB_PORT=5432

Do not commit .env files or database credentials to GitHub.

Start the Backend
cd server
node server.js

The backend runs on:

http://localhost:5000
Start the Frontend

From the project root:

npm run dev
Deployment

The application is deployed using Render.

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

Production environment variables are configured through Render and are not stored in the repository.

Demo

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
Development Highlights

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
Future Improvements

Potential future improvements include:

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
Author

Alyssa Novelli

GitHub


### Then save and push it

Run:

```bash
git add README.md
git commit -m "Update README"
git push origin main

Then refresh your GitHub repository.

The important difference is that you should not have backslashes before #, -, (, or [ in the actual README. GitHub uses those characters as Markdown formatting.

Ad
bro half your chat isnt in the markdown anymore so idk what your telling me to add

Yeah, my bad. The formatting got mangled by the chat. Don't try to piece together the previous message.

Do this instead:

Open README.md.
Ctrl+A and delete everything.
Paste the exact block below.
Save it.
# Expense Tracker

A full-stack expense tracking application that allows users to manage their income and expenses, create spending budgets, and view reports about their financial activity.

The application was built to practice full-stack web development, REST API design, authentication, PostgreSQL database management, and production deployment.

## Live Demo

[View the Live Demo](https://expense-tracker-vktn.onrender.com)

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
Database Structure

The application uses three primary tables.

Users

Stores registered user accounts.

users
├── id
├── name
├── email
└── password_hash
Transactions

Stores user income and expense records.

transactions
├── id
├── user_id
├── name
├── amount
├── type
├── date
└── note
Budgets

Stores user-created spending budgets.

budgets
├── id
├── user_id
├── category
└── amount
Authentication

Authentication is handled using JSON Web Tokens.

When a user successfully logs in, the backend returns a token to the frontend. The frontend stores the token and sends it with protected API requests.

Protected requests use the following authorization format:

Authorization: Bearer <token>

The backend verifies the token before allowing access to user-specific data.

API
Authentication
POST /api/register
POST /api/login
Transactions
GET    /api/transactions
POST   /api/transactions
DELETE /api/transactions/:id
Budgets
GET    /api/budgets
POST   /api/budgets
DELETE /api/budgets/:id
Running Locally
Prerequisites
Node.js
npm
PostgreSQL
Clone the Repository
git clone https://github.com/alyssanovelli/expense-tracker.git
cd expense-tracker
Install Dependencies
npm install
Environment Variables

Create a .env file containing your local PostgreSQL configuration.

Example:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_database_password
DB_PORT=5432

Do not commit .env files or database credentials to GitHub.

Start the Backend
cd server
node server.js

The backend runs on:

http://localhost:5000
Start the Frontend

From the project root:

npm run dev
Deployment

The application is deployed using Render.

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

Production environment variables are configured through Render and are not stored in the repository.

Demo

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
Development Highlights

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
Future Improvements

Potential future improvements include:

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
Author

Alyssa Novelli

GitHub


**That's the entire README.** Don't add the `git add`, `git commit`, or `git push` commands into the README.

After saving the file, run these **separately in PowerShell**:

```bash
git add README.md
git commit -m "Update README"
git push origin main

Then refresh GitHub.

For planning and workflow management in full-stack projects, try Jira.
Ad
it happened again just put the whole readme in a doc or something

Yep — I put the entire README into a file so none of the Markdown formatting gets mangled by the chat.

Download the complete README.md

Replace your current README.md with that file, then run:

git add README.md
git commit -m "Update README"
git push origin main

That's it. 

README.md
Document
Ad

Sponsored options
Ad
Sponsored options
Ad
Sponsored options
Ad
README.md
Expense Tracker

A full-stack expense tracking application that allows users to manage their income and expenses, create spending budgets, and view reports about their financial activity.

The application was built to practice full-stack web development, REST API design, authentication, PostgreSQL database management, and production deployment.

Live Demo

View the Live Demo

The live application includes a demo login option so visitors can explore the application without creating their own account.

GitHub Repository

View the Source Code

Features
Authentication
User registration
User login
JWT-based authentication
Protected application routes
User-specific data
Automatic logout when an authentication token is invalid or expired
Transactions
Add income and expenses
View transaction history
Delete transactions
Store transaction names, amounts, dates, types, and notes
Separate income from expenses
Persistent transaction data using PostgreSQL
Budgets
Create spending budgets by category
Set a budget amount
Track spending against each budget
Display budget progress bars
Show remaining budget amounts
Indicate when spending exceeds a budget
Delete budgets
Reports
View spending information
Review financial activity
See summarized information about income and expenses
Settings
User settings page
Account-related interface
Application navigation and account controls
Tech Stack
Frontend
React
JavaScript
React Router
Vite
CSS
Lucide React
Backend
Node.js
Express
PostgreSQL
JSON Web Tokens
REST APIs
Database
PostgreSQL
pg / node-postgres
Relational database design
Foreign key relationships
Unique constraints
Deployment
Render
Render PostgreSQL
Application Architecture

The application is divided into three primary parts:

React Frontend
      |
      | HTTP Requests
      v
Express / Node.js API
      |
      | SQL Queries
      v
PostgreSQL Database
Database Structure

The application uses three primary tables.

Users

Stores registered user accounts.

users
├── id
├── name
├── email
└── password_hash
Transactions

Stores user income and expense records.

transactions
├── id
├── user_id
├── name
├── amount
├── type
├── date
└── note
Budgets

Stores user-created spending budgets.

budgets
├── id
├── user_id
├── category
└── amount
Authentication

Authentication is handled using JSON Web Tokens.

When a user successfully logs in, the backend returns a token to the frontend. The frontend stores the token and sends it with protected API requests.

Protected requests use the following authorization format:

Authorization: Bearer <token>

The backend verifies the token before allowing access to user-specific data.

API
Authentication
POST /api/register
POST /api/login
Transactions
GET    /api/transactions
POST   /api/transactions
DELETE /api/transactions/:id
Budgets
GET    /api/budgets
POST   /api/budgets
DELETE /api/budgets/:id
Running Locally
Prerequisites
Node.js
npm
PostgreSQL
Clone the Repository
git clone https://github.com/alyssanovelli/expense-tracker.git
cd expense-tracker
Install Dependencies
npm install
Environment Variables

Create a .env file containing your local PostgreSQL configuration.

Example:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_database_password
DB_PORT=5432

Do not commit .env files or database credentials to GitHub.

Start the Backend
cd server
node server.js

The backend runs on:

http://localhost:5000
Start the Frontend

From the project root:

npm run dev
Deployment

The application is deployed using Render.

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

Production environment variables are configured through Render and are not stored in the repository.

Demo

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
Development Highlights

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
Future Improvements

Potential future improvements include:

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
Author

Alyssa Novelli

GitHub