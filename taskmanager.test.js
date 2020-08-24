import TaskManager from "./taskmanager.js";
import Task from "./task.js";
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
// beforeEach(()=>{

// }
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
test("should be able to add Task element to DOM", () => {
  const element = taskmanager.toHTMLElement(task);
  document.body.append(element);
  expect(document.body.children.length).toBe(1);
}); //// see snapshot test; check the first child ?
