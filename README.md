# Kindling - Handover Kits Management

## Overview

Kindling is a React-based web application designed to help users create and manage handover kits efficiently. The application includes features for user authentication, profile management, and kit creation, viewing, and deletion.

## Features

- **Landing Page**: Introduction to Kindling with options to sign up or log in.
- **User Authentication**: Secure login and signup functionality.
- **Profile Management**: View and update user profile information.
- **Handover Kits**: Create, view, and delete handover kits.

## Pages

### 1. Landing Page

- **Path**: `/`
- **Components Used**: `Header`, `IconButton`
- **Key Features**:
  - Introduction to Kindling with a brief description.
  - Options to navigate to the Sign-Up or Login page.

### 2. Login Page

- **Path**: `/login`
- **Components Used**: `Header`, `Avatar`, `Alert`, `TextField`, `Button`, `Link`
- **Key Features**:
  - User login functionality with validation.
  - Option to remember the user.
  - Error handling and feedback for login attempts.
  - Links to Sign-Up and password recovery.

### 3. Sign-Up Page

- **Path**: `/signup`
- **Components Used**: `Header`, `Avatar`, `Alert`, `TextField`, `Button`, `Link`
- **Key Features**:
  - User registration with validation.
  - Error handling and feedback for sign-up attempts.
  - Redirects to the login page upon successful registration.

### 4. Profile Page

- **Path**: `/profile`
- **Components Used**: `Header`, `Alert`, `TextField`, `Button`, `CircularProgress`
- **Key Features**:
  - Fetch and display the user's profile information.
  - Allow users to update their username, email, and password.
  - Error and success handling for profile updates.

### 5. Kits Page

- **Path**: `/kits`
- **Components Used**: `Header`, `Card`, `Alert`, `Grid`, `CircularProgress`, `IconButton`
- **Key Features**:
  - Display a list of handover kits associated with the user.
  - Option to delete kits with confirmation.
  - Button to create a new kit.

### 6. Kit Detail Page

- **Path**: `/kits/:id`
- **Components Used**: `Header`, `CircularProgress`, `Alert`, `Typography`, `Button`
- **Key Features**:
  - Display detailed information about a specific kit.
  - Include options to view, share, and add content to the kit.

## Project Structure

- **`src/components`**: Reusable components like `Header`.
- **`src/services`**: API services for handling HTTP requests.
- **`src/pages`**: Individual pages (Landing, Login, Signup, etc.).
- **`src/App.js`**: Main application routing.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kindling.git
   ```
2. Navigate to the project directory:
   ```bash
   cd kindling
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   
The application should now be running on http://localhost:3000.

## Dependencies

- React
- Material-UI
- React Router
- Axios

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
