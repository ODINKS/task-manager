const fs = require("fs");
const tasksFilePath = "./tasks.json";

//Util function
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

function loadTasksFromFile() {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

function saveTasksToFile(tasks) {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

function addTask(title, description) {
  const tasks = loadTasksFromFile();
  const task = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  saveTasksToFile(tasks);
  console.log("✓ Task added successfully!");
}

function getAllTasks() {
  return loadTasksFromFile();
}

function markTaskComplete(taskId) {
  const tasks = loadTasksFromFile();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = true;
    saveTasksToFile(tasks);
    console.log(`✓ Task ${taskId} marked as complete!`);
  } else {
    console.error("Task not found!");
  }
}

function deleteTask(taskId) {
  let tasks = loadTasksFromFile();
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasksToFile(tasks);
  console.log(`✓ Task ${taskId} deleted successfully!`);
}

module.exports = {
  addTask,
  getAllTasks,
  markTaskComplete,
  deleteTask,
  saveTasksToFile,
  loadTasksFromFile,
  formatDate
};
