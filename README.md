# 101024415 COMP 3123 Assignment 1

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
  - [User Management](#user-management)
  - [Employee Management](#employee-management)
- [Testing with Postman](#testing-with-postman)
- [Author](#author)

## Overview
This is a Node.js RESTful API built for managing users and employees. It allows users to sign up, log in, and manage employee records. The app is built using **Express** for the server and **MongoDB** for data storage, hosted on **Vercel**.

## Technologies Used
- Node.js
- Express.js
- MongoDB (via MongoDB Atlas)
- Mongoose
- JWT for authentication
- Vercel for deployment

## Features
- User Authentication with JWT
- Employee CRUD (Create, Read, Update, Delete) operations
- Input validation using `express-validator`
- Secured endpoints with authentication middleware

## Getting Started
### Prerequisites
- Node.js installed on your local machine.
- A MongoDB Atlas account if running locally.
- A GitHub account for repository access.

### Environment Variables
**Set up environment variables**:
Create a `.env` file in the root of the project with the following:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=8081
   ```

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/101024415-comp-3123-assignment1.git
   cd 101024415-comp-3123-assignment1
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the app locally**:
   ```bash
   npm start
   ```
   The app will be running on `http://localhost:8081`.

## Endpoints

### User Management
#### Signup (POST)
- **URL**: `https://101024415-comp-3123-assignment1.vercel.app/api/v1/user/signup`
- **Payload**:
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created` with user details.

#### Login (POST)
- **URL**: `https://101024415-comp-3123-assignment1.vercel.app/api/v1/user/login`
- **Payload**:
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- **Example Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGZhZGEzZjViZmRhNzM3MzY4OTZhODgiLCJpYXQiOjE2MzI2NDA2OTQsImV4cCI6MTYzMjY0NDI5NH0.V1uYRTBCdy7D2ih5eZ1JmRZlU5nV6r-Lg4jTl4J-Vvk"
    }
    ```

### Using the JWT Token
Include the token in the `Authorization` header for any request to protected endpoints:
```
Authorization: Bearer <your_jwt_token>
```
Replace `<your_jwt_token>` with the actual token value from the login response.

### Employee Management
#### Get All Employees (GET)
- **URL**: `https://101024415-comp-3123-assignment1.vercel.app/api/v1/emp/employees`
- **Requires**: JWT token in `Authorization` header.
- **Response**: `200 OK` with an array of employee objects.

#### Get Employee By ID (GET)
- **URL**: `https://101024415-comp-3123-assignment1.vercel.app/api/v1/emp/employees/{eid}`
- **Requires**: JWT token in `Authorization` header.
- **Replace** `{eid}` with the employee ID.
- **Response**: `200 OK` with employee details.

#### Create New Employee (POST)
- **URL**: `https://101024415-comp-3123-assignment1.vercel.app/api/v1/emp/employees`
- **Requires**: JWT token in `Authorization` header.
- **Payload**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "position": "Manager",
    "salary": 50000,
    "date_of_joining": "2023-08-10",
    "department": "Operations"
  }
  ```
- **Response**: `201 Created` with the new employee ID.

#### Edit Employee By ID (PUT)
- **URL**: `https://101024415-comp-3123-assignment1.vercel.app/api/v1/emp/employees/{eid}`
- **Requires**: JWT token in `Authorization` header.
- **Replace** `{eid}` with the employee ID.
- **Payload**:
  ```json
  {
    "position": "Senior Manager",
    "salary": 60000
  }
  ```
- **Response**: `200 OK` with the updated employee details.

#### Delete Employee By ID (DELETE)
- **URL**: `https://101024415-comp-3123-assignment1.vercel.app/api/v1/emp/employees?eid=xxx`
- **Requires**: JWT token in `Authorization` header.
- **Replace** `xxx` with the employee ID.
- **Response**: `204 No Content` if the employee was successfully deleted.

## Testing with Postman
Use **Postman** to test the API by sending requests to the above endpoints.  
Remember to include the JWT token in the **Authorization** header when accessing protected routes:
```
Authorization: Bearer <your_jwt_token>
```

## Author
- **Nash Gill**  
  GitHub: [https://github.com/nashman100](https://github.com/nashman100)
