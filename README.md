# OJT Progress Tracker

A web-based productivity and progress tracking application designed to help students manage their daily OJT (On Job Training) activities, monitor learning progress, and maintain mentor feedback records.

# Problem Statement

Students undergoing OJT often face difficulties in organizing daily tasks, tracking completed work, maintaining consistency, and sharing progress with mentors.

This project provides a centralized platform where students can manage tasks, track progress, maintain notes, and allow administrators to monitor student activities.

# Target Users

- Students undergoing OJT
- Mentors and Trainers
- Administrators

# Features Implemented

## Authentication System

- Student Registration
- Student Login
- Admin Login
- Duplicate User Validation
- Logout Functionality
- Role-Based Access Control

## Student Dashboard

### Task Management

- Add New Tasks
- Edit Existing Tasks
- Delete Tasks
- Mark Tasks as Completed

### Task Details

- Task Title
- Category
- Date
- Status
  - Pending
  - Completed

## Progress Tracking

- Total Tasks Count
- Completed Tasks Count
- Pending Tasks Count
- Completion Percentage
- Progress Bar

## Streak Tracking

- Daily Learning Streak Counter
- Tracks completed task activity

## Daily Notes

Students can maintain:

- Daily Learnings
- Errors Faced
- Mentor Feedback
- Important Notes

## Admin Dashboard

### Student Management

- View All Registered Students
- View Individual Student Dashboard
- Monitor Student Progress
- Track Student Tasks

# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

# Folder Structure

ojt-progress-tracker
│
├── backend
│   ├── models
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── index.html
├── login.html
├── register.html
├── admin.html
├── style.css
├── script.js
│
└── README.md


# Future Improvements

- Task Priority System
- Search & Filter Tasks
- Admin Analytics Dashboard
- Profile Management
- Session-Based Authentication
- Email Notifications
- Report Generation