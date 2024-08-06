
## Overview

This project is an Angular application that demonstrates user authentication, authorization, and interaction with a simulated API. It includes features like login, user management, and a modal service for managing user data.

## Getting Started

Angular cli 18 is needed!
npm install -g @angular/cli


### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/JuanCruu/challenge
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd challenge
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```


### Running the Project

To start the development server, run:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200`. You should see the application running.

## User Authentication

### Types of Users

1. **Regular User**
   - **Username:** `user@gmail.com`
   - **Password:** `user1234`
   - **Admin:** No

2. **Admin User**
   - **Username:** `admin@gmail.com`
   - **Password:** `admin1234`
   - **Admin:** Yes

### Logging In

1. Open the application in your browser.
2. On the login page, enter one of the predefined usernames and passwords.
3. Click the "Login" button.

If the credentials are correct, you will be redirected to the home page. Admin users will have additional privileges, such as managing user data.

### Logging Out

To log out, click the "Logout" button in the sidebar. You will be redirected to the login page, and the token will be removed from local storage.

## Features

- **User Authentication:** Handles login, logout, and session management.
- **Admin Privileges:** Admin users can access additional features.
- **Data Management:** View and manage user data through modals.
- **Filtering:** Filter photo albums based on user input.

## Services

### AuthService

Manages authentication and user sessions. Provides methods to log in, log out, check authentication status, and verify admin privileges.

### AdminService

Interacts with a simulated API to fetch, update, and create user data. Includes methods for retrieving and managing user information.

### ModalService

Handles opening and closing modals. Allows displaying modals with various components and passing data to them.

## Components

### SidebarComponent
Displays a sidebar with navigation options and user-specific actions (e.g., logout).

### CardComponent
Displays user data in a card format. Used to show information about users and albums.

### HomeComponent
The main page of the application. Retrieves and displays a list of albums, and provides filtering functionality.
