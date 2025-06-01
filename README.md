
# Node.js Task Manager

A simple task manager application built with Node.js, designed to manage tasks through the command line interface and a basic HTTP server. This project demonstrates core Node.js concepts such as file system operations, modules, basic HTTP server creation, and JSON data handling.

## Features

- **Add tasks**: Add new tasks with a title and description.
- **List tasks**: Display all tasks with their completion status.
- **Complete tasks**: Mark tasks as completed.
- **Delete tasks**: Remove tasks from the task list.
- **HTTP server**: A simple HTTP server with endpoints to interact with tasks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. Install dependencies (Node.js comes with built-in dependencies, so no need to install anything additional):
   ```bash
   npm install
   ```

3. Ensure you have a `tasks.json` file in the project directory. If it's not there, you can create one manually or use the sample data provided in the project.

## Usage

### Command-Line Interface (CLI)

You can interact with the application through the terminal using the following commands.

1. **Add a task**:
   To add a new task, run:
   ```bash
   node app.js add "Task Title" "Task Description"
   ```
   Example:
   ```bash
   node app.js add "Buy groceries" "Milk, eggs, bread"
   ```

2. **List all tasks**:
   To see all tasks in the list, run:
   ```bash
   node app.js list
   ```

3. **Mark a task as complete**:
   To mark a task as complete, use the task ID:
   ```bash
   node app.js complete <taskId>
   ```
   Example:
   ```bash
   node app.js complete 1
   ```

4. **Delete a task**:
   To delete a task by ID:
   ```bash
   node app.js delete <taskId>
   ```
   Example:
   ```bash
   node app.js delete 2
   ```

5. **Start the HTTP server**:
   To start the server, run:
   ```bash
   node app.js server
   ```

### HTTP Endpoints

Once the server is running, you can interact with tasks through HTTP requests.

- **GET `/tasks`**: Retrieve a list of all tasks in JSON format.

  Example (using a browser or Postman):
  ```bash
  GET http://localhost:3000/tasks
  ```

- **POST `/tasks`**: Add a new task. You must send the request body in JSON format with `title` and `description`.

  Example (using Postman):
  ```bash
  POST http://localhost:3000/tasks
  Body (JSON):
  {
    "title": "Finish homework",
    "description": "Complete math and science homework."
  }
  ```

## Project Structure

```plaintext
task-manager/
├── package.json       # Project metadata and dependencies
├── app.js             # Main application logic
├── taskManager.js     # Custom module for task management
├── tasks.json         # Stores tasks in JSON format
└── README.md          # Project documentation
```

- **`app.js`**: The entry point for the command-line interface. It handles task operations and starts the HTTP server.
- **`taskManager.js`**: A custom module that exports functions to add, list, complete, and delete tasks. It also handles reading from and writing to the `tasks.json` file.
- **`tasks.json`**: The data file that stores task information.

## Error Handling

The application includes basic error handling for:

- Invalid or missing command-line arguments.
- Missing or malformed tasks.
- File read/write errors.
- Server errors and missing endpoints.

## Contributing

Feel free to fork the repository and create a pull request if you'd like to contribute to this project. Suggestions and improvements are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
