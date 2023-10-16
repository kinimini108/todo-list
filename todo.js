const fs = require("fs");

class Todo {
  constructor() {
    this.tasks = this.readTask();
  }

  readTask() {
    try {
      const tasksData = fs.readFileSync("task.json", "utf8");
      return JSON.parse(tasksData);
    } catch (error) {
      return [];
    }
  }

  saveTasks() {
    const tasksData = JSON.stringify(this.tasks, null, 2);
    fs.writeFileSync("task.json", tasksData);
  }

  addTask(task) {
    if (!task) {
      throw new Error("Task cannot be empty.");
    }
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id: randomNumber.toString(), task: task };
    this.tasks.push(newTask);

    this.saveTasks();
  }

  updateTask(taskId, updatedTask) {
    const task = this.findTaskById(taskId);
    if (!task) {
      throw new Error("Task not found.");
    }
    task.task = updatedTask;
    this.saveTasks();
  }

  deleteTask(taskId) {
    const taskIndex = this.findTaskIndexById(taskId);
    if (taskIndex === -1) {
      throw new Error("Task not found.");
    }
    this.tasks.splice(taskIndex, 1);

    this.saveTasks();
  }
  findTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  findTaskIndexById(taskId) {
    return this.tasks.findIndex((task) => task.id === taskId);
  }

  listTasks() {
    return this.tasks;
  }
}

module.exports = Todo;