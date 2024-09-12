# Todo Application

This is a full-stack Todo Application built using Express.js for the backend and Vite for the frontend. The backend uses PostgreSQL as the database, and the frontend is served via Nginx in Docker.

## Table of Contents
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)
- [Developed on system](#developed-on-system)
- [License](#license)

## Features
- User sign up and login
- Todo creation, retrieval, updating, and deletion
- Status update for todos

## API Endpoints

### Authentication

- **POST** `/auth/signUp`
  - **Description:** Sign up a new user.
  - **Body Parameters:**
    - `name` (string): User's name.
    - `email` (string): User's email.
    - `password` (string): User's password.

- **POST** `/auth/login`
  - **Description:** Log in an existing user.
  - **Body Parameters:**
    - `email` (string): User's email.
    - `password` (string): User's password.

### Todos

- **POST** `/todo`
  - **Description:** Create a new todo item.
  - **Body Parameters:**
    - `name` (string): Name of the todo.
    - `description` (string): Description of the todo.

- **GET** `/todos`
  - **Description:** Get all todos.

- **DELETE** `/todos/:id`
  - **Description:** Delete a specific todo by its ID.

- **PUT** `/update/:id`
  - **Description:** Update the status of a todo.
  - **Body Parameters:**
    - `status` (boolean): New status of the todo.

## Setup Instructions
  - Clone the repository and proceed with the way more suitable for you 
    ```bash
    git clone https://github.com/saradchhetri07/TaskManagementApp.git
    cd TaskManagementApp
    ```
  - Create an new `.env` file inside `server` based on the `.env.example` file

### Local setup
  - Ensure the system is has node and postres installed for runnning the application locally on the machine


#### Frontend Setup (Vite)

  1. Navigate to the `client` directory and install the dependencies:
        ```bash
        cd client
        npm install
        ```

  1. Start the development server:
        ```bash
        npm run dev
        ```

#### Backend Setup (Express.js)

  1. Navigate to the `server` directory and install all dependencies:
        ```bash
        cd server
        npm install
        ```
  1. Run migrations:
        ```bash
        npm run migrate
        ```
  1. Start the backend server:
        ```bash
        npm start
        ```

## Docker Setup

1. Ensure you have Docker installed. You can follow [Docker's installation guide](https://docs.docker.com/get-docker/).

1. After completing the basic setup of `.env` file inside `server` folder 
    - Go to the root directory where `docker-compose.yaml` file is located
    - Run the following command to start docker instance of `frontend` `backend` and `database`

        ```bash
        docker compose up --build 
        ```
    - To run on detach mode run the command
        ```bash
        docker compose up --build -d
        ```

1. The frontend (Vite) will be served via Nginx, and the backend (Express) will be running with PostgreSQL inside Docker.

## Developed on system
### Local
  - Node: `v18.17.0`
  - npm: `v10.8.3`  
  - PostgreSQL: `postgres (PostgreSQL) 16.3 (Postgres.app)`

### Docker
  - Docker Version: `Docker version 26.0.0, build 2ae903e`
     - Node Inside docker: `node:18-alpine3.19`
     - PostgreSQL inside docker: `16.3-alpine3.19`

## License

This project is licensed under the MIT License.
