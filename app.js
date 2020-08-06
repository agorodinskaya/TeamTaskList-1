class Task{
        constructor(title, description, assignee, date, priority, status, id) {
            this.title = title;
            this.description = description;
            this.assignee = assignee;
            this.date = date;
            this.priority = priority;
            this.status = status;
            this.id = null;
        }
        toHtmlElement() {
            const html = `
        <div class="task" id="task${this.id}">
            <div class="row task" id=${this.id}>
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
        this.id = 0;
    }
    //taskForm UI start
    addTaskToPage(task){
        const taskElement = task.toHtmlElement();
        taskElement.querySelector('#binForOne').addEventListener("click", (e) => this.deleteTaskOnPage(e));
        taskElement.querySelector('#editTaskButton').addEventListener("click", (e) => this.editButtonClicked(e));
        document.querySelector("#tasks").append(taskElement);

        $(function () { 
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
    deleteTaskOnPage(event) {
        this.deleteTask(event.target.closest("div.task").id);
        event.target.closest("div.task").remove();
        this.display();
    }
    editButtonClicked(event) {
        clearValues();
        clearValidations();
        console.log(event.target.closest("div.task").id);
        const task = this.tasks.find(task => task.id == event.target.closest("div.task").id);

        document.forms.taskForm.setAttribute("data-id", task.id);
        document.forms.taskForm.taskTitle.value = task.title;
        document.forms.taskForm.taskDescription.value = task.description;
        document.forms.taskForm.taskAssignedTo.value = task.assignee;
        document.forms.taskForm.taskDueDate.value = task.date;
        selectPriority.find(priority => priority.value === task.priority).checked = true;
        selectStatus.find(status => status.value === task.status).checked = true;
    }
    // taskForm UI end
    addTask(task) {
        this.id += 1;
        task.id = this.id;
        console.log("addtask", task.id);
        this.tasks.push(task);
        clearValues();
        clearValidations()
        stats()
    }

    findTaskIndex(task) {
        return this.tasks.findIndex(taskInTasks => (task.id === taskInTasks.id));
    }

    editTask(task) {
        clearAll();
        const taskIndex = this.findTaskIndex(task);
        //console.log("editTaskfilte working? taskIndex", taskIndex);
        this.tasks.splice(taskIndex, 1, task);
        //console.log("editTaskfilte working?", this.tasks);
        this.display();
        clearValues();
        clearValidations();
        stats();
    }

    deleteTask(task) {
        const taskIndex = this.findTaskIndex(task);
        this.tasks.splice(taskIndex, 1);
        stats() 
    }

    deleteAll() {
        this.tasks.length = 0;
        clearAll();
    }

    display() {
        clearAll();
        this.tasks.forEach(task => this.addTaskToPage(task));
    }
    displayByItem(filteredItem){
        clearAll();
        filteredItem.forEach(task => this.addTaskToPage(task));
    }
    getStatsOfStatus() {
        const statusStats =[] 
        selectStatus.forEach(status => {
            statusStats.push(this.tasks.filter(task=> task.status === status.value));
        }); 
        return statusStats;                                                                                        
    }
    getStatsOfPriority() {
        const priorityStats = []
        selectPriority.forEach(priority => {
            priorityStats.push(this.tasks.filter(task => task.priority === priority.value));
        });
        return priorityStats;
    }


}

function clearAll() {
    document.querySelector("#tasks").innerHTML = "";
} 

const taskmanager = new TaskManager();

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

//The buttons on the form
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

    //let task = {title,description,assignee, date, priority, status, id};
    if (validationTaskForm(title, description, assignee, date, priority, status)) {
        if (taskForm.getAttribute('data-id')=== null) {
            const task = new Task(title, description, assignee, date, priority, status);
            taskmanager.addTask(task);
            taskmanager.addTaskToPage(task);
            console.log("I'm here! validation task form new input!");
            taskForm.removeAttribute('data-id');
        } else {
            const task = new Task(title, description, assignee, date, priority, status);
            task.id = Number(taskForm.getAttribute('data-id'));
            console.log("debugging review validation task update!", task);
            console.log(taskForm.getAttribute('data-id')); //class list is still there remove all after use

            taskmanager.editTask(task);
            console.log("debugging review ", taskmanager.tasks);
            taskForm.removeAttribute('data-id');
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
    taskForm.removeAttribute('data-id');
}



//Priority 
function prioritySelected() {
    return selectPriority.find(priority => priority.checked).value;
}
//Status
function statusSelected() {
    return selectStatus.find(status => status.checked).value;
}
//Validation code
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
//The buttons on the main page

document.querySelector("#deleteAll").addEventListener("click", function () {
    taskmanager.deleteAll();
});

//navigation bar
const getTotal = document.querySelector("#getTotal");
const totalNumber = document.querySelector("#getTotal > span");
getTotal.addEventListener("click", () => taskmanager.display());


const getDone = document.querySelector("#getDone");
const getReview = document.querySelector("#getReview");
const getInProgress = document.querySelector("#getInProgress");
const getToDo = document.querySelector("#getToDo")

getDone.addEventListener("click", function () {
    const done = taskmanager.getStatsOfStatus()[0];
    taskmanager.displayByItem(done);
});
getReview.addEventListener("click", function () {
    const review = taskmanager.getStatsOfStatus()[1];
    taskmanager.displayByItem(review);
});
getInProgress.addEventListener("click", function () {
    const inProgress = taskmanager.getStatsOfStatus()[2];
    taskmanager.displayByItem(inProgress);
});
getToDo.addEventListener("click", function () {
    const toDo = taskmanager.getStatsOfStatus()[3];
    taskmanager.displayByItem(toDo);
});
const getHigh = document.querySelector("#getHigh");
const getMedium = document.querySelector("#getMedium");
const getLow = document.querySelector("#getLow");
const getNo = document.querySelector("#getNo")

getHigh.addEventListener("click", function () {
    const high = taskmanager.getStatsOfPriority()[0];
    taskmanager.displayByItem(high);
});
getMedium.addEventListener("click", function () {
    const medium = taskmanager.getStatsOfPriority()[1];
    taskmanager.displayByItem(medium);
});
getLow.addEventListener("click", function () {
    const low = taskmanager.getStatsOfPriority()[2];
    taskmanager.displayByItem(low);
});
getNo.addEventListener("click", function () {
    const no = taskmanager.getStatsOfPriority()[3];
    taskmanager.displayByItem(no);
});

// Status: done =text-success, Review =text-info, InProgress=text-warning, toDo = text-danger;
// Priority: high = bg-danger, medium = bg-warning, low = bg-warning, no = bg-danger;
function stats() {
    getTotal.querySelector("span").innerHTML = `${taskmanager.tasks.length}`;
    getDone.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-success").length}`;
    getReview.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-info").length}`;
    getInProgress.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-warning").length}`;
    getToDo.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-danger").length}`;
    getNo.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-dark").length}`;
    getLow.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-info").length}`;
    getMedium.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-warning").length}`;
    getHigh.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-danger").length}`;    
}

// DUMMY TASKS://///////////////////////////////////////////////////////////////////////////////////////////////

// const task1 = new Task("Wesbos JS",
//     "01/08/2020",
//     "YP",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
//     "high",
//     "done",
//     1);
// const task2 = new Task("Validation form",
//     "01/08/2020",
//     "Zoe",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
//     "medium",
//     "inProgress",
//     2);
// const task3 = new Task("Canvas",
//     "01/08/2020",
//     "YP",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
//     "high",
//     "review",
//     4);
const task4 = new Task("Debrief on next steps with Yumi and Zoe",
    "01/08/2020",
    "AG",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
    "low",
    "review",
    4);

//const taskmanager = new TaskManager();
    
    // taskmanager.addTask(task1)
    // taskmanager.addTask(task2)
    // taskmanager.addTask(task3)
    // taskmanager.addTask(task4)


// taskmanager.addTaskToPage({
//     "title": "\"Wesbos JS\";",
//     "description": "\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!\";",
//     "this.assignee": "\"YP\";",
//     "this.date": "\"01/08/2020\";",
//     "this.priority": "\"bg-danger\";",
//     "this.status": "\"text-info\";",
//     "this.taskID": "\"1\";"
// });






