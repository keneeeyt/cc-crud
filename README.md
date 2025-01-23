# CRUD Customers Details Project

This project is a CRUD application for managing customer details. The backend is built with Laravel 11, and the frontend is built with React/Vite and styled using Bootstrap CSS.

## Project Description

This project allows users to create, read, update, and delete customer details. It includes hardcoded validation and sanitation for creating customers on both the backend and frontend. Additionally, a global error handling page is implemented to handle network problems and other errors gracefully.

## Prerequisites

- PHP 8.x
- Composer
- Node.js
- npm

## Getting Started

### Backend Setup

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Create a new [.env](http://_vscodecontentref_/1) file:**

    ```sh
    cp .env.example .env
    ```

3. **Install backend dependencies:**

    ```sh
    composer install
    ```

4. **Generate application key:**

    ```sh
    php artisan key:generate
    ```

5. **Run database migrations:**

    ```sh
    php artisan migrate
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```sh
    cd react-frontend
    ```

2. **Create a new [.env](http://_vscodecontentref_/2) file:**

    ```sh
    cp .env.example .env
    ```

3. **Install frontend dependencies:**

    ```sh
    npm install
    ```

## Running the Application

### Backend

1. **Start the backend server:**

    ```sh
    php artisan serve
    ```

### Frontend

1. **Navigate to the frontend directory (if not already there):**

    ```sh
    cd react-frontend
    ```

2. **Start the frontend development server:**

    ```sh
    npm run dev
    ```

## Running Unit Tests

### Backend

1. **Run the backend unit tests:**

    ```sh
    php artisan test
    ```

### Frontend

1. **Navigate to the frontend directory (if not already there):**

    ```sh
    cd react-frontend
    ```

2. **Run the frontend unit tests:**

    ```sh
    npx vitest
    ```

## Project Structure

- **Backend:** Laravel 11
- **Frontend:** React/Vite
- **Styling:** Bootstrap CSS

## Additional Information

- Ensure that both the backend and frontend [.env](http://_vscodecontentref_/3) files are correctly configured.
- The backend server should be running before starting the frontend development server.
- A database SQL file is available in the root directory. You can use it to set up the database.

## License

This project is licensed under the MIT License.