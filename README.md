# Widgets Application

## Overview

This project is a Next.js application that allows users to view and manage widgets. The main features include:

- User authentication to save widget view preferences.
- Ability to toggle the visibility of different types of widgets, such as stat widgets and simple text widgets.
- Persistence of widget visibility state for individual users across logins.

## Setup Instructions

To set up and run the project locally, follow these steps:

1. **Prerequisites**: Ensure you have Node.js and pnpm installed on your system. Alternatively, you can use npm but pnpm is recommended.

2. **Clone the Repository**:

   ```bash
   git clone https://github.com/ArunJose/widgets.git
   cd widgets
   ```

3. **Install Dependencies**:

   ```bash
   pnpm install
   ```

4. **Environment Variables**: Create a `.env` file in the root directory and add the necessary environment variables. Please note the `DATABASE_URL` should be a valid Neon Postgres URL. The `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` can be obtained from Clerk.

   ```
   DATABASE_URL=""
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
   CLERK_SECRET_KEY=""
   ```

5. **Database Setup**:

   - Run migrations:
     ```bash
     pnpm drizzle-kit migrate
     ```
   - Push to the database
     ```bash
     pnpm drizzle-kit push
     ```

6. **Run the Application**:
   ```bash
   pnpm run dev
   ```

## Project Structure

The project follows a typical Next.js structure with an `src` directory and an app router. Key directories include:

- **`/src/app/actions/`**: Contains server actions for handling widget visibility.
- **`/src/components/`**: Contains React components used throughout the application.

## Technical Decisions

- **Next.js**: Chosen for its ability to handle both frontend and backend logic in a single codebase.
- **Server Actions**: Used instead of traditional REST APIs for simplicity and integration with Next.js.
- **Clerk**: Selected for authentication due to its seamless integration with Next.js.
- **Drizzle ORM**: Used for type-safe database querying with Neon Postgres.

## Features

- **Widget Management**: Users can toggle the visibility of widgets via a dropdown menu. A check mark next to the widget name indicates visible widgets.
- **Authentication**: Users can sign in or sign up using email or Google.
- **State Persistence**: Widget visibility preferences are saved and loaded based on the user's ID.

## Error Handling and User Experience

- **Error Handling**: Errors in data retrieval are communicated to the user via toast notifications. Authentication errors and validations are managed by Clerk.
- **Loading States**: Loading animations are displayed during authentication checks and when fetching user-specific widget data.

## Challenges and Solutions

While there were no significant challenges, minor issues arose due to unsupported features in Neon Postgres. These were resolved by using syntax supported by Neon Postgres.

## Potential Improvements

- Add more variety of widgets.
- Ability to edit widget data and store widget-specific values in the database.
- Add testing.
- Explore deployment options for wider accessibility.
