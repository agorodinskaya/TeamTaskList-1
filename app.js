class Task{
        constructor(title, description, assignee, date, priority, status, taskID) {
            this.title = title;
            this.description = description;
            this.assignee = assignee;
            this.date = date;
            this.priority = priority;
            this.status = status;
            this.taskID = null;
        }
        toHtmlElement() {
            const html = `
        <div class="task" id="task${this.id}">
            <div class="row task" id="task1">
                <div class="col-lg-4 col-12 taskTitle order-2 order-lg-1">
                    <a href="#task${this.id}Description" class="text-secondary icon ml-0 pl-0 small"
                        data-toggle="collapse" data-target="#task${this.id}Description">
                        <h6 class="text-left">${this.title}</h6>
                    </a>

                </div>
                <div class="col-lg-2 col-6 order-3 order-lg-2">
                    ${this.date}
                </div>
                <div class="col-lg-2 col-6 order-4 order-lg-3">
                   ${this.assignee}
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
                        <span class="dot rounded-circle ${this.priority} icon" data-toggle="tooltip" data-placement="top" title="Priority"></span>
                        </li>
                        <li class="col">
                            <i class="icon fas fa-tag ${this.status}" data-toggle="tooltip" data-placement="top" title="Status"></i>
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
                <div id ="task${this.id}Description" class = "collapse" >
                ${this.description}
                </div>
                <!--toggle tasks details end-->
            </div>
            <hr />
        </div>`;
            return document.createRange().createContextualFragment(html);
        }

}

class TaskManager{
    constructor(){
        this.tasks = [];
        this.currentID = 1;
    }
    addTask(task) {
        this.currentID++;
        this.tasks.push(task);
    }
    findTaskIndex(task) {
        this.tasks.findIndex(taskInTasks => (taskInTasks.id == task.id));
    }
    deleteTask(task) {
        const taskIndex = this.findTaskIndex(task);
        this.tasks.splice(taskIndex, 1);
    }

}


//form.name. 
const taskForm = document.querySelector("#taskForm");
//TaskDetails
const taskTitle = document.forms.taskForm.taskTitle;
const taskDescription = document.forms.taskForm.taskDescription;
const taskAssignedTo = document.forms.taskForm.taskAssignedTo;
const taskDueDate = document.forms.taskForm.taskDueDate;
const taskDetails = [taskTitle, taskDescription, taskAssignedTo, taskDueDate];
//Priority && Status
const selectPriority = [...document.forms.taskForm.querySelectorAll("input[name=priority]")];
const selectStatus = [...document.forms.taskForm.querySelectorAll("input[name=status]")];

const newToDo = document.querySelector("#newToDo");
const openNewTask = document.querySelector("#openForm");
openNewTask.addEventListener("click", function () {
    clearValues();
    clearValidations();
    taskTitle.value = newToDo.value;
    if (taskTitle.value && taskTitle.value.length > 8) {
        taskTitle.classList.add("is-valid");
    } else {
        taskTitle.classList.add("is-invalid");
    }
    newToDo.value = null;
});

function clearValues() {
    taskDetails.map(item => item.value = null);
    selectPriority.map(priority => priority.checked = false);
    selectStatus.map(status => status.checked = false)
}

function clearValidations() {
    taskDetails.map(item => item.classList.remove("is-invalid", "is-valid"));
}

taskForm.addEventListener("submit", saveButtonClicked);

function saveButtonClicked(event) {
    event.preventDefault();
    //console.log("check ID in saveButtonClicked "+temp);
    const title = taskTitle.value;
    const description = taskDescription.value;
    const assignee = taskAssignedTo.value;
    const date = taskDueDate.value;
    //select Priority , select Status
    const priority = prioritySelected();
    const status = statusSelected();
    console.log("check ID in saveButtonClicked" + taskForm.classList.item(0));

    //let task = {title,description,assignee, date, priority, status, id};
    if (validationTaskForm(title, description, assignee, date, priority, status)) {
        if (!taskForm.classList.item(0)) {
            const task = new Task(title, description, assignee, date, priority, status);
            task.toHtmlElement();
            console.log(taskForm.classList.item(0));
        } else {
            const id = taskForm.classList.item(0);
            const task = {
                title,
                description,
                assignee,
                date,
                priority,
                status,
                id
            };
            console.log("debugging review ", task);
            console.log(taskForm.classList.item(0)); //class list is still there remove all after use
            editTask(task);
            console.log("debugging review ", task);
            taskForm.classList.remove(`${id}`);
        }
        $("#newTaskInput").modal("hide");
    } else {
        alert("Please complete the form");
    }
}

const formCancel = taskForm.querySelector("#cancelButton");
const formClose = taskForm.querySelector("#close"); //modify later
formCancel.addEventListener("click", removeTaskFormId);
formClose.addEventListener("click", removeTaskFormId);

function removeTaskFormId() {
    const id = taskForm.classList.item(0);
    if (id) {
        taskForm.classList.remove(`${id}`);
    }
}

//find priority
function prioritySelected() {
    return selectPriority.find(priority => priority.checked).value;
}

//Status
function statusSelected() {
    return selectStatus.find(status => status.checked).value;
}

taskTitle.addEventListener("input", function (event) {
    validation(event.target, notEmptyandLongerThan(event.target.value, 8));
});
taskDescription.addEventListener("input", function (event) {
    validation(event.target, notEmptyandLongerThan(event.target.value, 15));
});
taskAssignedTo.addEventListener("input", function (event) {
    validation(event.target, notEmptyandLongerThan(event.target.value, 8));
});
taskDueDate.addEventListener("input", function (event) {
    const today = todayConvertor();
    const dueDate = new Date(event.target.value);
    validation(event.target, today <= dueDate);
})

function todayConvertor() {
    const today = new Date();
    return today.setHours(0, 0, 0, 0);
}

function validation(taskItem, boolean) {
    if (boolean) {
        taskItem.classList.remove("is-invalid");
        taskItem.classList.add("is-valid");
    } else {
        taskItem.classList.remove("is-valid");
        taskItem.classList.add("is-invalid");
    }
};

function notEmptyandLongerThan(taskItem, number) {
    return taskItem && taskItem.length > number;
}

function validationTaskForm(title, description, assignee, date, priority, status) {
    const dueDate = new Date(date);
    const today = todayConvertor();
    if (notEmptyandLongerThan(title, 8) && notEmptyandLongerThan(description, 15) &&
        notEmptyandLongerThan(assignee, 8) && dueDate && priority && status) {
        return true;
    }
    return false;
}