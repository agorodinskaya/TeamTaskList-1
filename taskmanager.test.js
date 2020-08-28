import TaskManager from "./taskmanager.js";
import Task from "./task.js";

import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");
// test("test works", () => {
//   expect(1).toBe(1);
// });

const task = new Task(
  "Task Name",
  "Task Description",
  "Task Assignee",
  "2020-08-23",
  "bg-danger",
  "text-success",
  "task1"
);
const taskmanager = new TaskManager();
// let parent;
beforeEach(() => {
  localStorage.clear();
  document.documentElement.innerHTML = html.toString();
});

// set to html :
test("html to string with all the attributes", () => {
  const htmlString = taskmanager.toHTML(task);
  expect(htmlString).toContain("task1");
  expect(htmlString).toContain("Task Name");
  expect(htmlString).toContain("Task Description");
  expect(htmlString).toContain("Task Assignee");
  expect(htmlString).toContain("2020-08-23");
  expect(htmlString).toContain("bg-danger");
  expect(htmlString).toContain("text-success");
});
// test("should be able to add Task element to DOM", () => {
//   const element = taskmanager.toHTMLElement(task);
//   document.body.append(element);
//   expect(document.body.children.length).toBe(1);
// }); //// see snapshot test; check the first child ?

// add task :
test("should add task to array", () => {
  const newTask = taskmanager.addTask(task);
  expect(newTask.length).toBe(1);
});

// delete task :
test("should delete task to array", () => {
  taskmanager.deleteTask(task.id);
  expect(taskmanager.tasks.length).toBe(0);
});

// update task :
test("should update the task in array correctly", () => {
  taskmanager.addTask(task);
  const editTask = new Task(
    "Task NEW NAME",
    "Task Description",
    "Task Assignee",
    "2020-08-23",
    "bg-danger",
    "text-success",
    "task1"
  );
  taskmanager.editList(editTask);

  expect(editTask.title).toBe("Task NEW NAME");
});

// check length after the task update:
test("after update task the array length remains the same", () => {
  expect(taskmanager.tasks.length).not.toBe(2);
  expect(taskmanager.tasks.length).toBe(1);
});
