# Finance Dashboard

## Overview
This Finance Dashboard is a frontend-only project designed to help users **track and visualize their financial activities**. It provides a clear overview of total balance, income, expenses, transactions, and insights like the highest spending category. The project emphasizes **clean UI, responsive design, and interactive charts** to deliver an intuitive user experience.

---

## Features
- **Summary Cards**: Displays Total Balance, Total Income, and Total Expenses.  
- **Transactions Table**: Shows all transactions with Date, Amount, Category, and Type. Supports **search/filter** functionality.  
- **Role-Based UI Simulation**: Switch between `Viewer` (read-only) and `Admin` (add/edit transactions simulation) roles using a dropdown.  
- **Charts**: 
  - **Line Chart** – Visualizes balance trend over time.  
  - **Pie Chart** – Shows expense distribution by category.  
- **Insights Card**: Displays **highest spending category** in the center between charts.  
- **Responsive Layout**: Works on desktop and mobile screens.  
- **UI Enhancements**: Hover effects, striped table rows, card shadows, and clean color scheme for readability.

---

## Technical Decisions and Trade-offs
- **Frontend Only**: Used **HTML, CSS, and Vanilla JavaScript** for simplicity and fast implementation.  
- **Static Data**: Transactions are stored in a static array for easy frontend demonstration without backend integration.  
- **Chart.js**: Chosen for quick and responsive data visualization.  
- **Role Simulation**: Implemented on the frontend; does not enforce real security, but meets assignment requirements.  
- **Responsiveness**: Flexbox and media queries used for layout and mobile support.  

**Trade-offs**:  
- No backend or database, so real-time updates and secure authentication are not implemented.  
- Vanilla JS limits scalability for larger datasets compared to frameworks like React.  
- Frontend-only role simulation does not provide real RBAC security. 
