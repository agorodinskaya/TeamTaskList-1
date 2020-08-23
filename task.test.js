import Task from "./task.js";
// test("test works", () => {
//   expect(1).toBe(1);
// });

test("object Task creation", () => {
  const task = new Task(
    "Task Name",
    "Task Description",
    "Task Assignee",
    "2020-08-23",
    "bg-danger",
    "text-success",
    "task1"
  );
  expect(task.id).toBe("task1");
  expect(task.title).toBe("Task Name");
  expect(task.description).toBe("Task Description");
  expect(task.assignee).toBe("Task Assignee");
  expect(task.priority).toBe("bg-danger");
  expect(task.status).toBe("text-success");
});
