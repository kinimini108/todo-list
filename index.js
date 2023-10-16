const readline = require("readline");
const Todo = require("./todo");
const todo = new Todo();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function displayMenu() {
  console.log(`Todo a List Application 
Please Choose One of These Tasks.`);
  console.log(`Add / Update / Delete / List / Close`);
}

function promptUser() {
  rl.question("Chose one Of these Tasks: ", (choice) => {
    Choices(choice);
  });
}
function Choices(choice) {
  switch (choice) {
    case "Add":
    case "add":
      addTask();
      break;
    case "Update":
    case "update":
      updateTask();
      break;
    case "Delete":
    case "delete":
      deleteTask();
      break;
    case "List":
    case "Lists":
    case "list":
    case "lists":
      listTasks();
      break;
    case "Close":
    case "cls":
    case "exit":
    case "close":
      rl.close();
      console.log("See you later✌️");
      break;
    default:
      console.log("Invalid choice. Please try again.");
      promptUser();
  }
}
function addTask() {
  rl.question("Enter a Task: ", (task) => {
    // The user's input is then validated using a regular expression to ensure that it only contains non-digit characters.
    if (/^\D+$/.test(task)) {
      try {
        todo.addTask(task);
        console.log("Task added successfully.✅");
      } catch (error) {
        console.log("Error:", error.message);
      }
    } else {
      console.log("Invalid input. Please enter a task without numbers.");
    }
    promptUser();
  });
}

function updateTask() {
  rl.question("Enter ID to update Task: ", (taskId) => {
    rl.question("Enter the updated task: ", (task) => {
      try {
        todo.updateTask(taskId, task);
        console.log("Task updated successfully.✅");
      } catch (error) {
        console.log("Error:", error.message);
      }
      promptUser();
    });
  });
}

function deleteTask() {
  rl.question("Enter ID to delete Task: ", (taskId) => {
    try {
      todo.deleteTask(taskId);
      console.log("Task deleted successfully.✅");
    } catch (error) {
      console.log("Error:", error.message);
    }
    promptUser();
  });
}

function listTasks() {
  const tasks = todo.listTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    console.log("Here is The List Of Tasks:");
    tasks.forEach((task) => {
      console.log(`ID: ${task.id} Name: ${task.task}`);
    });
  }
  promptUser();
}

displayMenu();
promptUser();