# Expense Tracker

A simple, responsive expense tracking web application built with React and Tailwind CSS. This application allows users to log and track their daily expenses, set budget constraints, and generate detailed reports.

## Features

### Core Functionality
- **Add Expenses**: Log expenses with name, amount, category, and date
- **View Expenses**: Browse and filter expenses by date and category
- **Delete Expenses**: Remove unwanted expense entries
- **Data Persistence**: All data is stored in browser localStorage

### Budget Management
- **Monthly Budget**: Set overall monthly spending limit
- **Category Budgets**: Set individual budgets for different expense categories
- **Budget Tracking**: Monitor spending against set budgets

### Reporting & Analytics
- **Daily Reports**: Detailed expense breakdown for specific dates
- **Monthly Reports**: Comprehensive monthly expense analysis
- **Top 5 Expenses**: Histogram visualization of largest expenses per month
- **Category Analysis**: See spending patterns by category

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Mobile-First**: Optimized for mobile usage
- **Offline-First**: Works without internet connection
- **Simple Interface**: Clean, intuitive user interface

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization library
- **LocalStorage**: Browser-based data persistence

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sotasbest/expense-tracker
   cd expense-tracker
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
   Navigate to `http://localhost:5173` to view the application

### Building for Production

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## Usage Guide

### Adding Expenses
1. Click on "Add Expenses" tab
2. Fill in the expense details:
   - **Name**: Description of the expense
   - **Amount**: Cost in dollars
   - **Category**: Select from Food, Transport, Bills, Entertainment, or Other
   - **Date**: When the expense occurred (defaults to today)
3. Click "Add Expense" to save

### Viewing Expenses
1. Click on "View Expenses" tab
2. Use the filters to:
   - Filter by specific date
   - Filter by category
   - Clear filters to see all expenses
3. View expense details and totals

### Setting Budgets
1. Click on "Budgets" tab
2. Set monthly and category-specific budgets
3. Click "Save Budgets" to apply changes

### Generating Reports
1. Click on "Reports" tab
2. Select a date for daily report or month for monthly report
3. View detailed breakdown including:
   - Total spending
   - Category breakdown
   - Individual expense list

### Viewing Top Expenses
1. Click on "Top Expenses" tab
2. Select a month to view
3. See the top 5 largest expenses as a histogram chart

## Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx      # Form for adding new expenses
│   ├── ExpenseList.jsx      # List and filter expenses
│   ├── BudgetSettings.jsx   # Budget configuration
│   ├── Reports.jsx         # Daily and monthly reports
│   └── Histogram.jsx       # Chart visualization
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Data Storage

All application data is stored in the browser's localStorage:
- **Expenses**: Array of expense objects with id, name, amount, category, and date
- **Budgets**: Object containing monthly and category budget limits

## Browser Compatibility

This application works in all modern browsers that support:
- ES6+ JavaScript features
- LocalStorage API
- CSS Grid and Flexbox