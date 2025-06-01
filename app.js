const {
  addTask,
  getAllTasks,
  markTaskComplete,
  deleteTask,
  formatDate,
} = require("./taskManager");
const http = require("http");
const fs = require("fs");
const url = require("url");

const command = process.argv[2];

if (command === "add") {
  const title = process.argv[3];
  const description = process.argv[4];
  addTask(title, description);
  const tasks = getAllTasks();
  const task = tasks[tasks.length - 1];
  console.log(`✓ Task added successfully!`);
  console.log(`\nID: ${task.id}, Title: "${task.title}"`);
} else if (command === "list") {
  const tasks = getAllTasks();
  console.log("=== Your Tasks ===\n");
  tasks.forEach((task) => {
    const taskStatus = task.completed ? "Completed ✓" : "Pending";
    const formattedDate = formatDate(task.createdAt);
    console.log(`[${task.id}] ${task.title} (${taskStatus})`);
    console.log(`\n    Description: ${task.description}`);
    console.log(`    Created: ${formattedDate}\n`);
  });
} else if (command === "complete") {
  const taskId = parseInt(process.argv[3]);
  markTaskComplete(taskId);
} else if (command === "delete") {
  const taskId = parseInt(process.argv[3]);
  deleteTask(taskId);
} else if (command === "server") {
  startServer();
} else {
  console.log("Invalid command!");
}

function startServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === "GET" && parsedUrl.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to Task Manager!");
    } else if (req.method === "GET" && parsedUrl.pathname === "/tasks") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const tasks = getAllTasks();
      res.end(JSON.stringify(tasks, null, 2));
    } else if (req.method === "POST" && parsedUrl.pathname === "/tasks") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const taskData = JSON.parse(body);
        addTask(taskData.title, taskData.description);
        res.writeHead(201, { "Content-Type": "text/plain" });
        res.end("Task added successfully");
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}
