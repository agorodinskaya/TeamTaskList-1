/// Question : 
// 1.where is it better to move our declarations ? 
// 2. 



class Task {
    constructor(title, description, assignee, date, priority, status, id) {
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.date = date;
        this.priority = priority;
        this.status = status;
        // this.id = null;
    }
    // toHtmlElement() {
    //     const html = `
    //     <div class="task" id="task${this.id}">
    //         <div class="row task" id=${this.id}>
    //             <div class="col-lg-4 col-12 taskTitle order-2 order-lg-1">
    //                 <a href="#task${this.id}Description" class="text-secondary icon ml-0 pl-0 small"
    //                     data-toggle="collapse" data-target="#task${this.id}Description">
    //                     <h6 class="text-left">${this.title}</h6>
    //                 </a>

    //             </div>
    //             <div class="col-lg-2 col-6 order-3 order-lg-2">
    //                 ${this.date}
    //             </div>
    //             <div class="col-lg-2 col-6 order-4 order-lg-3">
    //             ${this.assignee}
    //             </div>
    //             <div class="col-lg-4 order-1 order-lg-4">
    //                 <ul class="row taskSummary justify-content-around">
    //                     <li class="col">
    //                         <a href="#newTaskInput" id = "editTaskButton" role= "button"
    //                             class="d-inline btn btn-link col-2 ml-0 pl-0 mb-0 pb-0 text-dark"
    //                             data-toggle="modal" data-target="#newTaskInput">
    //                             <i class="fas fa-edit"></i></a>
    //                     </li>
    //                     <li class="col">
    //                     <span class="dot rounded-circle ${this.priority} icon" data-toggle="tooltip" data-placement="top" title="Priority"></span>
    //                     </li>
    //                     <li class="col">
    //                         <i class="icon fas fa-tag ${this.status}" data-toggle="tooltip" data-placement="top" title="Status"></i>
    //                     </li>
    //                     <li class="col">
    //                         <button id="binForOne" type="button" class="ml-0 pl-0 btn btn-link text-dark"><i
    //                                 class="icon far fa-trash-alt"></i></button>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </div>
    //         <div >
    //             <!--toggle tasks details-->
    //             <div id ="task${this.id}Description" class = "collapse" >
    //             ${this.description}
    //             </div>
    //             <!--toggle tasks details end-->
    //         </div>
    //         <hr />
    //     </div>`;
    //     return document.createRange().createContextualFragment(html);
    // }
}
const taskModalSaveBtn = document.querySelector('#task-modal-save');
const alert = document.querySelector(".alert")
const alertModal = document.querySelector(".alertModal");
const taskContainer = document.querySelector("#tasks")
const clearAllBtn = document.querySelector('#deleteAll');
//form.name. 
const taskForm = document.querySelector("#taskForm");
//TaskDetails
const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.forms.taskForm.taskDescription;
const taskAssignedTo = document.forms.taskForm.taskAssignedTo;
const taskDueDate = document.forms.taskForm.taskDueDate;
const taskDetails = [taskTitle, taskDescription, taskAssignedTo, taskDueDate];
//Priority && Status
// priorities creating an array of options: 
const high = document.querySelector('#highPriority');
const medium = document.querySelector('#mediumPriority');
const low = document.querySelector('#lowPriority');
const nopriority = document.querySelector('#noPriority');
let priorities = [high, medium, low, nopriority];

//progress :
const done = document.querySelector('#statusDone');
const review = document.querySelector('#statusReview');
const inprogress = document.querySelector('#statusInProgress');
const todo = document.querySelector('#statusToDo');
let progress = [done, review, inprogress, todo];

const selectPriority = [...document.forms.taskForm.querySelectorAll("input[name=priority]")];
const selectStatus = [...document.forms.taskForm.querySelectorAll("input[name=status]")];

const newToDo = document.querySelector("#newToDo");
const openNewTask = document.querySelector("#openForm");
// const task = new Task(title, description, assignee, date, priority, status, id)



class TaskManager {
    constructor(newToDo, openNewTask, taskModalSaveBtn, alert, alertModal, taskContainer, taskForm, taskTitle, taskDescription, taskAssignedTo, taskDueDate, priorities, progress) {
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
        this.selectPriority = selectPriority;
        this.selectStatus = selectStatus;
        this.priorities = priorities;
        this.progress = progress
    }
        addTask(task) {
            this.tasks = this.getTasks();
            // const task = new Task(title, description, assignee, date, checkedPriority, checkedProgress);
            // task.id = this.id;
            // task.id ++;
            // console.log("addtask", task.id);
            this.tasks.push(task);
            this.tasks.forEach((task, i) => task.id = i + 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.display()

            // stats()

        } display() {
            const tasks = this.getTasks();
            console.log(tasks)
            this.clearAll();
            tasks.forEach((task) => this.addTaskToPage(task));
        }
        clearAll() {
            taskContainer.innerHTML = "";
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
            taskElement.querySelector('#binForOne').addEventListener("click", (e) => this.deleteTaskOnPage(e));
            taskElement.querySelector('#editTaskButton').addEventListener("click", (e) => this.editButtonClicked(e));
            document.querySelector("#tasks").append(taskElement);
            this.clearValues();
            this.clearValidations()
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            });
        }
        getTasks() {
            if (localStorage.getItem('tasks') === null) {
                this.tasks = [];
            } else {
                this.tasks = JSON.parse(localStorage.getItem('tasks'));
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
            taskModalSaveBtn.textContent = "Save changes";
            taskModalSaveBtn.classList.remove('btn-danger');
            taskModalSaveBtn.classList.add('btn-primary');
            taskDetails.map(item => item.value = null);
            priorities.map(priority => priority.checked = false);
            progress.map(status => status.checked = false)
        }

        clearValidations() {
            taskDetails.map(item => item.classList.remove("is-invalid", "is-valid"));
        }
        formFilledOut() {
        //console.log("check ID in saveButtonClicked "+temp);
            const title = taskTitle.value;
            const description = taskDescription.value;
            const assignee = taskAssignedTo.value;
            const date = taskDueDate.value;
            //select Priority , select Status
            // let priority = selectPriority.find(priority => priority.checked).value;
            // let status = selectStatus.find(status => status.checked).value;
            let checkedPriority;
            for (let i = 0; i < priorities.length; i++) {
                if (priorities[i].checked) {
                    checkedPriority = priorities[i].value;
                    // console.log(typeof checkedPriority, checkedPriority);
                }
            }

            let checkedProgress;
            for (let i = 0; i < progress.length; i++) {
                if (progress[i].checked) {
                    checkedProgress = progress[i].value;
                    // console.log(typeof checkedProgress, checkedProgress);
                    //returns values done, toDo, inProgress or review;
                }
            }
            //let task = {title,description,assignee, date, priority, status, id};
            if (this.validationTaskForm(title, description, assignee, date, checkedPriority, checkedProgress)) {
                if (taskForm.getAttribute('data-id') === null) {
                    const task = new Task(title, description, assignee, date, checkedPriority, checkedProgress);
                    this.addTask(task);
                    console.log("I'm here! validation task form new input!");
                    taskForm.removeAttribute('data-id');
                    this.alertModalSetup("Item successfully created", "alert-success");
                    setTimeout(function () {
                        $("#newTaskInput").modal("hide"); // set data-modal ...
                    }, 1000);
                } else {
                    const task = new Task(title, description, assignee, date, checkedPriority, checkedProgress);
                    task.id = Number(taskForm.getAttribute('data-id'));
                    // console.log(task.id);
                    // console.log("debugging review validation task update!", task);
                    // console.log(taskForm.getAttribute('data-id')); //class list is still there remove all after use

                    this.editTask(title, description, assignee, date, checkedPriority, checkedProgress,task.id);
                    // console.log('**************'+ task, task.id)
                    // console.log("debugging review ", this.tasks);
                    taskForm.removeAttribute('data-id');
                    this.alertModalSetup("Item successfully updated", "alert-success");
                    setTimeout(function () {
                        $("#newTaskInput").modal("hide"); // set data-modal ...
                    }, 1000);
                }     
            } else {
                this.alertModalSetup("Please complete the form", "alert-danger");
                // console.log(alertModal)
                const smallText = document.querySelectorAll('.smallText');
                smallText.forEach(small => small.classList.add('text-danger'));
                setTimeout(function () {
                    smallText.forEach(small => small.classList.remove('text-danger'));
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
            console.log(this.tasks)
            const tasks = this.tasks.filter(function (task) {
                if (task.id !== id) {
                    return task
                }
            })
            console.log(tasks)
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // this.stats() 
        }
        editButtonClicked(event) {
            // console.log(event.target.closest("div.task").id);
            taskModalSaveBtn.textContent = "Edit";
            taskModalSaveBtn.classList.add('btn-danger');
            const task = this.tasks.find(task => task.id === Number(event.target.closest("div.task").id));
            // console.log(task)
            document.forms.taskForm.setAttribute("data-id", task.id);
            document.forms.taskForm.taskTitle.value = task.title;
            document.forms.taskForm.taskDescription.value = task.description;
            document.forms.taskForm.taskAssignedTo.value = task.assignee;
            document.forms.taskForm.taskDueDate.value = task.date;
            selectPriority.find(priority => priority.value === task.priority).checked = true;
            selectStatus.find(status => status.value === task.status).checked = true;
        }

        editTask(title, description, assignee, date, checkedPriority, checkedProgress, id) {
            this.tasks = this.getTasks();
            const editTask = new Task(title, description, assignee, date, checkedPriority, checkedProgress)    
            let index = this.tasks.findIndex(task => (task.id === id));
            console.log(index)
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
            tasks.findIndex(taskInTasks => (task.id === taskInTasks.id));
        }

        displayByItem(filteredItem) {
            this.clearAll();
            filteredItem.forEach(task => this.addTaskToPage(task));
        }
        getStatsOfStatus() {
            const statusStats = []
            selectStatus.forEach(status => {
                statusStats.push(this.tasks.filter(task => task.status === status.value));
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
            if (this.notEmptyandLongerThan(title, 8) && this.notEmptyandLongerThan(description, 15) &&
                this.notEmptyandLongerThan(assignee, 8) && dueDate && priority && status) {
                return true;
            }
            return false;
        }
        alertModalSetup(text, action) {
            alertModal.textContent = text;
            alertModal.classList.add(`${action}`);
            // remove alertModal
            setTimeout(function () {
                alertModal.textContent = "";
                alertModal.classList.remove(`${action}`);
            }, 1500);
        }
        alertSetup(text, action) {
            alert.textContent = text;
            alert.classList.add(`${action}`);
            // remove alert
            setTimeout(function () {
                alert.textContent = "";
                alert.classList.remove(`${action}`);
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
            })
        }
}


//The buttons on the form

const formCancel = taskForm.querySelector("#cancelButton");
const formClose = taskForm.querySelector("#close"); //modify later
formCancel.addEventListener("click", removeTaskFormId);
formClose.addEventListener("click", removeTaskFormId);

function removeTaskFormId() {
    taskForm.removeAttribute('data-id');
}

//init class: ***************************************************************************************************
const taskmanager = new TaskManager(newToDo, openNewTask, taskModalSaveBtn, alert, alertModal, taskContainer, taskForm, taskTitle, taskDescription, taskAssignedTo, taskDueDate, selectPriority, selectStatus);
//=================================================================================================================
// **********************Events***********************************************************************************
//=================================================================================================================

window.addEventListener("DOMContentLoaded", taskmanager.display());
//Open modal:
openNewTask.addEventListener("click", function (event) {
    event.preventDefault();
    taskmanager.openModal()
})
// save button : 
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    taskmanager.formFilledOut(event);
})
// checkTitle(){
taskTitle.addEventListener("input", function (event) {
    taskmanager.validation(event.target, taskmanager.notEmptyandLongerThan(event.target.value, 8));
})
// }
// checkDescription(){
taskDescription.addEventListener("input", function (event) {
    taskmanager.validation(event.target, taskmanager.notEmptyandLongerThan(event.target.value, 15));
})
// }
// checkAssignee(){
taskAssignedTo.addEventListener("input", function (event) {
    taskmanager.validation(event.target, taskmanager.notEmptyandLongerThan(event.target.value, 8));
})
// }
// checkDueDate(){
taskDueDate.addEventListener("input", function (event) {
    const today = taskmanager.todayConvertor();
    const dueDate = new Date(event.target.value);
    taskmanager.validation(event.target, today <= dueDate);
})
// }

// Clear all:
clearAllBtn.addEventListener('click', function () {
    taskmanager.deleteAll();
    taskmanager.alertSetup("Successfully removed items from the list", "alert-success");
});




// //navigation bar
// const getTotal = document.querySelector("#getTotal");
// const totalNumber = document.querySelector("#getTotal > span");
// getTotal.addEventListener("click", () => taskmanager.display());


// const getDone = document.querySelector("#getDone");
// const getReview = document.querySelector("#getReview");
// const getInProgress = document.querySelector("#getInProgress");
// const getToDo = document.querySelector("#getToDo")

// getDone.addEventListener("click", function () {
//     const done = taskmanager.getStatsOfStatus()[0];
//     taskmanager.displayByItem(done);
// });
// getReview.addEventListener("click", function () {
//     const review = taskmanager.getStatsOfStatus()[1];
//     taskmanager.displayByItem(review);
// });
// getInProgress.addEventListener("click", function () {
//     const inProgress = taskmanager.getStatsOfStatus()[2];
//     taskmanager.displayByItem(inProgress);
// });
// getToDo.addEventListener("click", function () {
//     const toDo = taskmanager.getStatsOfStatus()[3];
//     taskmanager.displayByItem(toDo);
// });
// const getHigh = document.querySelector("#getHigh");
// const getMedium = document.querySelector("#getMedium");
// const getLow = document.querySelector("#getLow");
// const getNo = document.querySelector("#getNo")

// getHigh.addEventListener("click", function () {
//     const high = taskmanager.getStatsOfPriority()[0];
//     taskmanager.displayByItem(high);
// });
// getMedium.addEventListener("click", function () {
//     const medium = taskmanager.getStatsOfPriority()[1];
//     taskmanager.displayByItem(medium);
// });
// getLow.addEventListener("click", function () {
//     const low = taskmanager.getStatsOfPriority()[2];
//     taskmanager.displayByItem(low);
// });
// getNo.addEventListener("click", function () {
//     const no = taskmanager.getStatsOfPriority()[3];
//     taskmanager.displayByItem(no);
// });

// Status: done =text-success, Review =text-info, InProgress=text-warning, toDo = text-danger;
// Priority: high = bg-danger, medium = bg-warning, low = bg-warning, no = bg-danger;
// function stats() {
//     getTotal.querySelector("span").innerHTML = `${taskmanager.tasks.length}`;
//     getDone.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-success").length}`;
//     getReview.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-info").length}`;
//     getInProgress.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-warning").length}`;
//     getToDo.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.status === "text-danger").length}`;
//     getNo.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-dark").length}`;
//     getLow.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-info").length}`;
//     getMedium.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-warning").length}`;
//     getHigh.querySelector("span").innerHTML = `${taskmanager.tasks.filter(task => task.priority === "bg-danger").length}`;    
// }

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
// const task4 = new Task("Debrief on next steps with Yumi and Zoe",
//     "01/08/2020",
//     "AG",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam consequatur commodi non vitae harum autem quibusdam quam ratione deserunt!",
//     "low",
//     "review",
//     4);

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






