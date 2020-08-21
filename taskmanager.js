import Task from "./task.js";

export default class TaskManager {
  constructor(
    newToDo,
    openNewTask,
    taskModalSaveBtn,
    alert,
    alertModal,
    taskContainer,
    taskForm,
    taskTitle,
    taskDescription,
    taskAssignedTo,
    taskDueDate,
    priorities,
    progress
  ) {
    this.tasks = [];
    this.id = 0;
    this.newToDo = newToDo;
    this.openNewTask = openNewTask;
    this.taskModalSaveBtn = taskModalSaveBtn;
    this.alert = alert;
    this.alertModal = alertModal;
    this.taskContainer = taskContainer;
    this.taskForm = taskForm;
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.taskAssignedTo = taskAssignedTo;
    this.taskDueDate = taskDueDate;
    this.taskDetails = [
      taskTitle,
      taskDescription,
      taskAssignedTo,
      taskDueDate,
    ];
    //Priority && Status
    // priorities creating an array of options:
    const high = document.querySelector("#highPriority");
    const medium = document.querySelector("#mediumPriority");
    const low = document.querySelector("#lowPriority");
    const nopriority = document.querySelector("#noPriority");
    this.priorities = [high, medium, low, nopriority];

    //progress :
    const done = document.querySelector("#statusDone");
    const review = document.querySelector("#statusReview");
    const inprogress = document.querySelector("#statusInProgress");
    const todo = document.querySelector("#statusToDo");
    this.progress = [done, review, inprogress, todo];

    this.selectPriority = [
      ...document.forms.taskForm.querySelectorAll("input[name=priority]"),
    ];
    this.selectStatus = [
      ...document.forms.taskForm.querySelectorAll("input[name=status]"),
    ];

    this.editId = "";
  }
  addTask(task) {
    this.tasks = this.getTasks();
    this.tasks.push(task);
    this.tasks.forEach((task, i) => (this.id = i + 1));
    // this.id ++;
    task.id = this.id;
    console.log(this.id);
    console.log(task.id);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.display();

    // stats()
  }
  display() {
    const tasks = this.getTasks();
    console.log(tasks);
    this.clearAll();
    this.tasks.forEach((task) => this.addTaskToPage(task));
  }
  clearAll() {
    this.taskContainer.innerHTML = "";
  }
  //taskForm UI start
  addTaskToPage(task) {
    // console.log(this.tasks)

    const html = `
            <div class="task" id="task${task.id}">
                
                <div class="row task" id=${task.id}>
                    <div class="col-lg-4 col-12 taskTitle order-2 order-lg-1">
                        <a href="#task${task.id}Description" class="text-secondary icon ml-0 pl-0 small"
                            data-toggle="collapse" data-target="#task${task.id}Description">
                            <h6 class="text-left">${task.title}</h6>
                        </a>

                    </div>
                    <div class="col-lg-2 col-6 order-3 order-lg-2">
                        ${task.date}
                    </div>
                    <div class="col-lg-2 col-6 order-4 order-lg-3">
                    ${task.assignee}
                    </div>
                    <div class="col-lg-4 order-1 order-lg-4">
                        <ul class="row taskSummary justify-content-around">
                            <li class="col">
                                <a href="#newTaskInput" id = "editTaskButton" role= "button"
                                    class="d-inline btn btn-link col-2 ml-0 pl-0 mb-0 pb-0 text-dark"
                                    data-toggle="modal" data-target="#newTaskInput">
                                    <i class="fas fa-edit"></i></a>
                            </li>
                            <li class="col">
                            <span class="dot rounded-circle ${task.priority} icon" data-toggle="tooltip" data-placement="top" title="Priority"></span>
                            </li>
                            <li class="col">
                                <i class="icon fas fa-tag ${task.status}" data-toggle="tooltip" data-placement="top" title="Status"></i>
                            </li>
                            <li class="col">
                                <button id="binForOne" type="button" class="ml-0 pl-0 btn btn-link text-dark"><i
                                        class="icon far fa-trash-alt"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div >
                    <!--toggle tasks details-->
                    <div id ="task${task.id}Description" class = "collapse" >
                    ${task.description}
                    </div>
                    <!--toggle tasks details end-->
                </div>
            
            </div>`;
    const taskElement = document.createRange().createContextualFragment(html);
    taskElement
      .querySelector("#binForOne")
      .addEventListener("click", (e) => this.deleteTaskOnPage(e));
    taskElement
      .querySelector("#editTaskButton")
      .addEventListener("click", (e) => this.editButtonClicked(e));
    document.querySelector("#tasks").append(taskElement);
    this.clearValues();
    this.clearValidations();
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  getTasks() {
    if (localStorage.getItem("tasks") === null) {
      this.tasks = [];
    } else {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    return this.tasks;
  }
  openModal() {
    this.clearValues();
    this.clearValidations();
    taskTitle.value = newToDo.value;
    if (taskTitle.value && taskTitle.value.length > 8) {
      taskTitle.classList.add("is-valid");
    } else {
      taskTitle.classList.add("is-invalid");
    }
    newToDo.value = null;
  }

  clearValues() {
    this.taskModalSaveBtn.textContent = "Save changes";
    this.taskModalSaveBtn.classList.remove("btn-danger");
    this.taskModalSaveBtn.classList.add("btn-primary");
    this.taskDetails.map((item) => (item.value = null));
    this.priorities.map((priority) => (priority.checked = false));
    this.progress.map((status) => (status.checked = false));
  }

  clearValidations() {
    this.taskDetails.map((item) =>
      item.classList.remove("is-invalid", "is-valid")
    );
  }
  formFilledOut() {
    const title = taskTitle.value;
    const description = taskDescription.value;
    const assignee = taskAssignedTo.value;
    const date = taskDueDate.value;
    let checkedPriority;
    for (let i = 0; i < this.priorities.length; i++) {
      if (this.priorities[i].checked) {
        checkedPriority = this.priorities[i].value;
        // console.log(typeof checkedPriority, checkedPriority);
      }
    }

    let checkedProgress;
    for (let i = 0; i < this.progress.length; i++) {
      if (this.progress[i].checked) {
        checkedProgress = this.progress[i].value;
        // console.log(typeof checkedProgress, checkedProgress);
        //returns values done, toDo, inProgress or review;
      }
    }
    //let task = {title,description,assignee, date, priority, status, id};
    if (
      this.validationTaskForm(
        title,
        description,
        assignee,
        date,
        checkedPriority,
        checkedProgress
      )
    ) {
      if (taskForm.getAttribute("data-id") === null) {
        const task = new Task(
          title,
          description,
          assignee,
          date,
          checkedPriority,
          checkedProgress
        );
        this.addTask(task);
        console.log("I'm here! validation task form new input!");
        taskForm.removeAttribute("data-id");
        this.alertModalSetup("Item successfully created", "alert-success");
        setTimeout(function () {
          $("#newTaskInput").modal("hide"); // set data-modal ...
        }, 1000);
      } else {
        // const task = new Task(title, description, assignee, date, checkedPriority, checkedProgress, id);
        this.id = Number(taskForm.getAttribute("data-id"));
        // console.log(task.id);
        // console.log("debugging review validation task update!", task);
        // console.log(taskForm.getAttribute('data-id')); //class list is still there remove all after use
        this.editTask(
          title,
          description,
          assignee,
          date,
          checkedPriority,
          checkedProgress,
          this.id
        );
        taskForm.removeAttribute("data-id");
        this.alertModalSetup("Item successfully updated", "alert-success");
        setTimeout(function () {
          $("#newTaskInput").modal("hide"); // set data-modal ...
        }, 1000);
      }
    } else {
      this.alertModalSetup("Please complete the form", "alert-danger");
      // console.log(alertModal)
      const smallText = document.querySelectorAll(".smallText");
      smallText.forEach((small) => small.classList.add("text-danger"));
      setTimeout(function () {
        smallText.forEach((small) => small.classList.remove("text-danger"));
      }, 1500);
    }
  }
  deleteTaskOnPage(event) {
    this.deleteTask(Number(event.target.closest("div.task").id));
    // console.log(typeof event.target.closest("div.task").id)
    event.target.closest("div.task").remove();
    this.alertSetup("Item successfully removed from the list", "alert-success");
  }
  deleteTask(id) {
    this.tasks = this.getTasks();
    console.log(this.tasks);
    const tasks = this.tasks.filter(function (task) {
      if (task.id !== id) {
        return task;
      }
    });
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // this.stats()
  }
  editButtonClicked(event) {
    // console.log(event.target.closest("div.task").id);
    this.taskModalSaveBtn.textContent = "Edit";
    this.taskModalSaveBtn.classList.add("btn-danger");
    const task = this.tasks.find(
      (task) => task.id === Number(event.target.closest("div.task").id)
    );
    // console.log(task)
    document.forms.taskForm.setAttribute("data-id", task.id);
    document.forms.taskForm.taskTitle.value = task.title;
    document.forms.taskForm.taskDescription.value = task.description;
    document.forms.taskForm.taskAssignedTo.value = task.assignee;
    document.forms.taskForm.taskDueDate.value = task.date;
    this.selectPriority.find(
      (priority) => priority.value === task.priority
    ).checked = true;
    this.selectStatus.find(
      (status) => status.value === task.status
    ).checked = true;
  }

  editTask(
    title,
    description,
    assignee,
    date,
    checkedPriority,
    checkedProgress,
    id
  ) {
    this.tasks = this.getTasks();
    const editTask = new Task(
      title,
      description,
      assignee,
      date,
      checkedPriority,
      checkedProgress,
      (id = this.id)
    );
    console.log(id);
    let index = this.tasks.findIndex((task) => task.id === id);
    // console.log(index)
    const tasks = this.tasks.splice(index, 1, editTask);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.display();
    this.clearValues();
    this.clearValidations();
    // this.stats();
  }
  // taskForm UI end

  findTaskIndex(task) {
    const tasks = this.getTasks();
    tasks.findIndex((taskInTasks) => task.id === taskInTasks.id);
  }

  displayByItem(filteredItem) {
    this.clearAll();
    filteredItem.forEach((task) => this.addTaskToPage(task));
  }
  getStatsOfStatus() {
    const statusStats = [];
    selectStatus.forEach((status) => {
      statusStats.push(
        this.tasks.filter((task) => task.status === status.value)
      );
    });
    return statusStats;
  }
  getStatsOfPriority() {
    const priorityStats = [];
    selectPriority.forEach((priority) => {
      priorityStats.push(
        this.tasks.filter((task) => task.priority === priority.value)
      );
    });
    return priorityStats;
  }

  todayConvertor() {
    const today = new Date();
    return today.setHours(0, 0, 0, 0);
  }

  validation(taskItem, boolean) {
    if (boolean) {
      taskItem.classList.remove("is-invalid");
      taskItem.classList.add("is-valid");
    } else {
      taskItem.classList.remove("is-valid");
      taskItem.classList.add("is-invalid");
    }
  }

  notEmptyandLongerThan(taskItem, number) {
    return taskItem && taskItem.length > number;
  }

  validationTaskForm(title, description, assignee, date, priority, status) {
    const dueDate = new Date(date);
    // const today = this.todayConvertor();
    if (
      this.notEmptyandLongerThan(title, 8) &&
      this.notEmptyandLongerThan(description, 15) &&
      this.notEmptyandLongerThan(assignee, 8) &&
      dueDate &&
      priority &&
      status
    ) {
      return true;
    }
    return false;
  }
  alertModalSetup(text, action) {
    this.alertModal.textContent = text;
    this.alertModal.classList.add(`${action}`);
    // remove alertModal
    let _this = this;
    setTimeout(function () {
      _this.alertModal.textContent = "";
      _this.alertModal.classList.remove(`${action}`);
    }, 1500);
  }
  alertSetup(text, action) {
    this.alert.textContent = text;
    this.alert.classList.add(`${action}`);
    // console.log(this.alert, action);
    let _this = this;
    // remove alert
    setTimeout(function () {
      // console.log(_this.alert);
      _this.alert.textContent = "";
      _this.alert.classList.remove(`${action}`);
    }, 1500);
  }
  deleteAll() {
    this.tasks.length = 0;
    this.clearAll();
    localStorage.removeItem("tasks");
  }
  deleteClicked() {
    document.querySelector("#deleteAll").addEventListener("click", function () {
      this.deleteAll();
    });
  }
}
