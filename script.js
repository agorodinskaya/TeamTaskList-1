const taskContainer = document.querySelector("#tasks");
const taskSave = document.querySelector("#taskSave");
const deleteTask = document.querySelector("#delete");
const openForm = document.querySelector("#openForm")


const taskName = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskAssignee = document.getElementById("taskAssignee");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const taskStatus = document.getElementById("taskStatus");


const high = document.querySelector('#highPriority');
const medium = document.querySelector('#mediumPriority');
const low = document.querySelector('#lowPriority');

const done = document.querySelector('#statusDone');
const review = document.querySelector('#statusReview');
const inProgress = document.querySelector('#statusInProgress');
const todo = document.querySelector('#statusToDo');

let priorities = [high, medium, low];
let progress = [done, review, inProgress, todo];
let arrayColorSVG = ['#292b2c', '#5bc0de', '#f0ad4e','#d9534f'];


//EventListner

taskSave.addEventListener("click", taskSubmit);
openForm.addEventListener("click", function(event){
    clearValidations();
    clearValues();
});


tasklist = [];
let taskId = 5;

////validation

taskName.addEventListener("input", function(event){
    validation(validationLength(8));
  });
taskDescription.addEventListener("input", function(event){
    validation(validationLength(15));
  });
taskAssignee.addEventListener("input", function(event){
    validation(validationLength(8));
  });
taskDate.addEventListener("input", function(event){
      const today = todayConvertor();
      const taskDueDate = new Date(event.target.value);
    validation(today <= taskDueDate);
  });


function validation(boolean){
    if(boolean){
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
    } else {
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    }
  };

  function validationLength (number){
    return event.target.value && event.target.value.length > number;
  }

// Validation End

function taskSubmit(e){
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

    if (checkItems(name ,description,assignee, date, checkedPriority, checkedProgress)){
        addTask(name, description, assignee, date, checkedPriority, checkedProgress);
        $("#newTaskInput").modal("hide");
    } else {
        alert("Please make sure all required fields are filled out correctly.");
    }
}

function addTask(name, description, assignee, date, checkedPriority, checkedProgress){
    const html = `
    <div class="row task" id="task${taskId}">
        <div class="col-lg-4 col-12 taskTitle order-2 order-lg-1">
            <a href="#taskDescription" class="text-dark icon ml-0 pl-0 small"
            data-toggle="collapse" data-target="#task${taskId}Description">
                <h6 class="text-left pt-2">${name}</h6>
            </a>
        </div>
        <div class="col-lg-2 col-6 order-3 order-lg-2 pt-2">${date}</div>
        <div class="col-lg-2 col-6 order-4 order-lg-3 pt-2">${assignee}</div>
        <div class="col-lg-4 order-1 order-lg-4">
        <ul class="row taskSummary justify-content-around">
        <li class="col">
            <a href="#newTaskInput" role=button
                class="d-inline btn btn-link col-2 ml-0 pl-0 mb-0 pb-0 text-dark"
                data-toggle="modal" data-target="#newTaskInput">
                <i class="fas fa-edit"></i></a>
        </li>
        <li class="col">
            <span class="dot rounded-circle ${checkedPriority} icon" data-toggle="tooltip" data-placement="top" title="Priority"></span>
        </li>
        <li class="col">
            <button class="btn btn-link ${checkedProgress}" data-toggle="modal"
                data-target="#"><i class=" fas fa-tag "></i></button>
        </li>
        <li class="col">
            <button type="button" class="ml-0 pl-0 btn btn-link text-dark"><i
                    class="icon far fa-trash-alt" id="delete"></i></button>
        </li>
    </ul>
        </div>
    </div>
    <div id="task${taskId}Description" class="collapse show">
        <div class="card-body">
            <div class="card-body-task">
                ${description}
            </div>
        </div>
    </div>
    `;
    const taskElement = document.createRange().createContextualFragment(html);
    taskContainer.append(taskElement);
    taskId++;
}

//Clearing
function clearValidations(){
    taskName.classList.remove("is-invalid", "is-valid");
    taskDescription.classList.remove("is-invalid", "is-valid");
    taskAssignee.classList.remove("is-invalid", "is-valid");
    taskDate.classList.remove("is-invalid", "is-valid");
  }

function clearValues(){
    taskName.value = null;
    taskDescription.value = null;
    taskAssignee.value = null;
    taskDate.value = null;
    for (let i = 0; i < priorities.length; i++) {
        priorities[i].checked = false
    }
    for (let i = 0; i < progress.length; i++) {
        progress[i].checked = false
    }
}

// Clearing End



function checkItems(name ,description,assignee, date, checkedPriority, checkedProgress){
    const dueDate = new Date(date);
    const today = todayConvertor();
    if(name && name.length > 8 && description && description.length > 15 && assignee && assignee.length > 8 && dueDate && today <= dueDate &&checkedPriority && checkedProgress){
        return true;
      } else {
          return false;
      }
    
  }

function todayConvertor(){
    const today = new Date();
    return today.setHours(0,0,0,0);
  }
