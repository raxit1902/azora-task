
# Getting Started with the Azora Web Application

This project was developed using React.js for the frontend and Node.js with Express.js for the backend. MongoDB is used as the database.

## Available Scripts

In the project directory, you can run:

### `npm run dev (Backend)`

Runs the backend server in development mode.
The server will start on http://localhost:5000.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start (Frontend)`

Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

**Project Structure**

**Frontend**
Components: Reusable React components like LoginForm, SignupForm, ContactList, and CreateContact.
State Management: Managed with Redux to handle authentication and contact data.
Styling: Tailwind CSS is used for styling the components.

**Backend**
API Endpoints: Developed using Node.js and Express.js to handle user authentication and contact CRUD operations.
Database: MongoDB is used as the database, with Mongoose as the ODM.

**Database Schema**
User Schema: Stores user details such as username, first name, last name, email, and password.
Contact Schema: Stores contact details with fields for first name, last name, contact number, email, and a reference to the user who created it.

**Running the Project Locally**
Prerequisites
Node.js (v14 or higher)
MongoDB (local installation or cloud instance)
Git
