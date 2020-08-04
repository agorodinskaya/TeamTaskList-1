tasksDb = [];
let taskId = 1;

const taskContainer = document.querySelector("#tasks");
const taskSave = document.querySelector("#taskSave");
const deleteTask = document.querySelector("#delete");
const openForm = document.querySelector("#openForm");
const taskForm = document.querySelector("#taskForm")

const taskName = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskAssignee = document.getElementById("taskAssignee");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const taskStatus = document.getElementById("taskStatus");

const high = document.querySelector("#highPriority");
const medium = document.querySelector("#mediumPriority");
const low = document.querySelector("#lowPriority");

const done = document.querySelector("#statusDone");
const review = document.querySelector("#statusReview");
const inProgress = document.querySelector("#statusInProgress");
const todo = document.querySelector("#statusToDo");

let priorities = [high, medium, low];
let progress = [done, review, inProgress, todo];
let arrayColorSVG = ["#292b2c", "#5bc0de", "#f0ad4e", "#d9534f"];

//EventListner

taskSave.addEventListener("click", taskSubmit);

openForm.addEventListener("click", function (event) {
  clearValidations();
  clearValues();
});

////validation

taskName.addEventListener("input", function (event) {
  validation(validationLength(3));
});
taskDescription.addEventListener("input", function (event) {
  validation(validationLength(3));
});
taskAssignee.addEventListener("input", function (event) {
  validation(validationLength(3));
});
taskDate.addEventListener("input", function (event) {
  const today = todayConvertor();
  const taskDueDate = new Date(event.target.value);
  validation(today <= taskDueDate);
});

function validation(boolean) {
  if (boolean) {
    event.target.classList.remove("is-invalid");
    event.target.classList.add("is-valid");
  } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
  }
}

function validationLength(number) {
  return event.target.value && event.target.value.length > number;
}

// Validation End

function taskSubmit(e) {
  e.preventDefault();

  const name = taskName.value;
  const description = taskDescription.value;
  const assignee = taskAssignee.value;
  const date = taskDate.value;

  let checkedPriority;
  for (let i = 0; i < priorities.length; i++) {
    if (priorities[i].checked) {
      checkedPriority = priorities[i].value;
    }
  }

  let checkedProgress;
  for (let i = 0; i < progress.length; i++) {
    if (progress[i].checked) {
      checkedProgress = progress[i].value;
    }
  }

  if (checkItems(name, description, assignee, date, checkedPriority, checkedProgress)) { 
    storeTask(name, description, assignee, date, checkedPriority, checkedProgress);
    $("#newTaskInput").modal("hide");

  // } else if (checkItems(name, description, assignee, date, checkedPriority, checkedProgress, taskId)) {
    // updateTask(name, description, assignee, date, checkedPriority, checkedProgress, checkedTag, (taskId));

  } else {
    alert("Please complete the form");
  }
}
function storeTask(name, description, assignee, date, checkedPriority, checkedProgress, id) {
  const task = {name, description, assignee, date, checkedPriority, checkedProgress, id: taskId, };
  tasksDb.push(task)
  taskId++
  refreshPage();
}

function updateTask(name, description, assignee, date, checkedPriority, checkedProgress, checkedTag, id){
  const sotoreTask = { name, assignee, description, date, checkedPriority, checkedProgress, checkedTag, id: taskId };
  let index = tasksDb.findIndex(item => item.id === (taskId + 1));
 
  let lastIndex = taskList.length - 1;

  tasksDb.splice(index, 1, storeTask);
  console.log(tasksDb);
  refreshPage();
}

function refreshPage() {
  clearAll();
  tasksDb.forEach(task => addTaskToPage(task));
}

function addTaskToPage(task) {
  const html = `
    <div class="row task" id="task${task.id}">
        <div class="col-lg-4 col-12 taskTitle order-2 order-lg-1">
            <a href="#taskDescription" class="text-secondary icon ml-0 pl-0 small"
            data-toggle="collapse" data-target="#task${task.id}Description">
                <h6 class="text-left pt-2">${task.name}</h6>
            </a>
        </div>
        <div class="col-lg-2 col-6 order-3 order-lg-2 pt-2">${task.date}</div>
        <div class="col-lg-2 col-6 order-4 order-lg-3 pt-2">${task.assignee}</div>
        <div class="col-lg-4 order-1 order-lg-4">
        <ul class="row taskSummary justify-content-around">
          <li class="col">
              <a href="#newTaskInput" role=button
                  class="d-inline btn btn-link col-2 ml-0 pl-0 mb-0 pb-0 text-dark edit"
                  data-toggle="modal" data-target="#newTaskInput" id="">
                  <i class="fas fa-edit"></i></a>
          </li>
          <li class="col">
              <span class="dot rounded-circle ${task.checkedPriority} icon" data-toggle="tooltip" data-placement="top" title="Priority"></span>
          </li>
          <li class="col">
              <button class="btn btn-link ${task.checkedProgress}" data-toggle="modal"
                  data-target="#"><i class=" fas fa-tag "></i></button>
          </li>
          <li class="col">
              <button type="button" class="ml-0 pl-0 btn btn-link text-dark">
              <i class="icon far fa-trash-alt" id="delete"></i></button>
          </li>
    </ul>
        </div>
    </div>
    <div id="task${task.id}Description" class="collapse hide">
        <div class="card-body">
            <div class="card-body-task">
                ${task.description}
            </div>
        </div>
    </div>
    `;
  const taskElement = document.createRange().createContextualFragment(html);


  const deleteBtn = taskElement.querySelector("#delete");
  const editBtn = taskElement.querySelector('a.edit'); 




  deleteBtn.closest("div.task").addEventListener('click', deleteTasks);
  editBtn.addEventListener('click', editTasks);
  
  taskContainer.append(taskElement);
}

const findTaskIndex = (task) => tasksDb.findIndex(taskInDB => (taskInDB.id == task.id));


function editTasks(task){
  tasksDb.splice(findTaskIndex(task),1,task);
  refreshPage();
  clearValues();
  clearValidations();
}

function deleteTasks(task) {
  let taskIndex = findTaskIndex(task);
  tasksDb.splice(taskIndex,1);
  refreshPage();
}

//Clearing
function clearValidations() {
  taskName.classList.remove("is-invalid", "is-valid");
  taskDescription.classList.remove("is-invalid", "is-valid");
  taskAssignee.classList.remove("is-invalid", "is-valid");
  taskDate.classList.remove("is-invalid", "is-valid");
}

function clearValues() {
  taskName.value = null;
  taskDescription.value = null;
  taskAssignee.value = null;
  taskDate.value = null;
  for (let i = 0; i < priorities.length; i++) {
    priorities[i].checked = false;
  }
  for (let i = 0; i < progress.length; i++) {
    progress[i].checked = false;
  }
}

function clearAll() {
  taskContainer.innerHTML = "";
}
// Clearing End

function checkItems(name, description, assignee, date, checkedPriority, checkedProgress) {
  const dueDate = new Date(date);
  const today = todayConvertor();
  if (
    name &&
    name.length > 3 &&
    description &&
    description.length > 3 &&
    assignee &&
    assignee.length > 3 &&
    dueDate &&
    today <= dueDate &&
    checkedPriority &&
    checkedProgress
  ) {
    return true;
  } else {
    return false;
  }
}

function todayConvertor() {
  const today = new Date();
  return today.setHours(0, 0, 0, 0);
}




storeTask(
  "Javascript Learning",
  "this is description for Javascript Learning",
  "Zoe",
  "15/08/2020",
  "bg-danger",
  "text-danger",
  1
);

storeTask(
  "WesBos javascript Course",
  "this is description for WesBos javascript Course",
  "Nini",
  "15/08/2020",
  "bg-success",
  "text-success",
  2
);
storeTask(
  "Javascript Learning",
  "this is description for Javascript Learning",
  "Zoe",
  "15/08/2020",
  "bg-danger",
  "text-danger",
  3
);