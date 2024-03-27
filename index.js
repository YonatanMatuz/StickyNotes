// --------------------------------------------------------------------------------------------------------- //
const form = document.querySelector("form");
const taskContent = document.querySelector("#taskContent");
const date = document.querySelector("#date");
const dateLabel = document.querySelector("#dateLabel");
const taskLabel = document.querySelector("#taskLabel");
const btnAddTask = document.querySelector("#btnAddTask");
const btnClearShelf = document.querySelector("#btnClearShelf")
const rootBtn = document.querySelector("#rootBtn");
const innerContainer = document.querySelector("#innerFormContainer");
const startText = document.querySelector("#startText");
let taskShelf = document.querySelector("#taskShelf");
let taskList = handleStorage();
// --------------------------------------------------------------------------------------------------------- //

form.addEventListener("submit", handleSubmit);
rootBtn.addEventListener("click",handleRoot);
btnClearShelf.addEventListener("click", handleRemove);
// calling the rending function on refresh //
renderTasks();
// ------------------------------------------------------------------------------------------------------------------------------------------ //
// ----------------------------- Various button clicking functions that handle the submits ordered by EventListener ------------------------ //
// -----------------------------------------------------------------------------------------------------------------------------------------//

async function handleSubmit(event){
    event.preventDefault();
    try{
        await handlePromise(event);
        form.reset();
    }catch(error){
        setTimeout(returnNormal,2000);
    }
}
function handlePromise(event){
    return new Promise((resolve,reject)=>{
    if(date.value && taskContent.value)
    {
        resolve(
            createTaskObject(event)
    )
    }else if (!date.value && taskContent.value){
        reject(
            dateRequired()
            )
    }else if (date.value && !taskContent.value){
        reject(
            taskRequired()
        )
    }else{
        reject(
            bothRequired()
        )
    }})
    }  

function handleRemove(){
    taskShelf.innerHTML = "";
    taskList = []; 
    removeStorage();
}
function handleRoot(){
    innerContainer.style.animation="1.5s linear fadein";
    setTimeout(fade,1400);
    rootBtn.style.animation="1.5s linear fadeout";

}
// -------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------- TRY - RESOLVE ------------------------------------------ //
// ----------------------------- resolve functions (creating object, rendering etc) ----------------------//
// ----------------------------------------------------------------------------------------------------- //

function createTaskObject(event){
    let task = {};
    const formData = new FormData(event.target)
    formData.forEach((value,key)=>{
        task[key] = value;
        })
        addTasktoList(task);
}
function addTasktoList(task){
    taskList.push(task);
    renderTasks();
    updateStorage();
}
function renderTasks(){
    taskShelf.innerHTML ="";
    taskList.forEach(task =>{
        let newTask = createTask(task);
        taskShelf.appendChild(newTask);
    })

}
function createTask(task){
    let card = document.createElement("div");
    card.classList.add("col-2");
    card.innerHTML=`
    <div class="card border border-0" style="width: 16rem">
        <div class="card-body">
        <div class="outerDiv">
        <button id="deleteBtn" class="btn myDltBtn" onclick="removeCurrentTask(this)"></button>
        </div>
        <br/>
         <p id="taskText" class="card-text">
         ${task.taskContent}
         </p> 
        <p id ="dateText" class="card-text align-text-bottom">
        ${task.date}
        </p>
      <br/>
        </div>
    </div> 
    `
    return card
}
// button injected with each sticky to delete it, not technically part of the resolve but is imported with it //
function removeCurrentTask(item){
    let thisItem = item.parentElement;
    thisItem.parentElement.removeChild(thisItem);
    taskList.pop(this);
    updateStorage();
    renderTasks();
  }
  // ------------------------------------------------------------------------------------------- //
  // --------------------------------------- CATCH - REJECT ----------------------------------- //
  // ----------------------------- reject promise normalize function ------------------------- //
  // ---------------------------------------------------------------------------------------- //

  function returnNormal(){
    dateLabel.innerHTML = "Date"
    dateLabel.style.color = "Black";
    taskLabel.innerHTML = "Note Content"
    taskLabel.style.color = "Black";
    btnAddTask.innerHTML = "Add task";
    btnAddTask.classList.remove("btn-danger");
}
// --------------------------------------------------------------------------------------------------------- //
// ----------------------------- Storage functions (handling, removing, updating) ------------------------- //
// ------------------------------------------------------------------------------------------------------- //

function handleStorage(){
    let currentStorage = localStorage.getItem("taskArray");
    if (currentStorage){
        return JSON.parse(currentStorage);
    }else{
        return [];
    }
}
function updateStorage(){
    localStorage.setItem("taskArray",JSON.stringify(taskList));
}
function removeStorage(){
    localStorage.removeItem("taskArray");
}
// ------------------------------------------------------------------------------------------------------------------------------ //
// ----------------------------- Reject functions + styling functions (blinking text / fading effects) ------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------- //

function dateRequired(){
    dateLabel.innerHTML="Required";
    dateLabel.style.color = "Red";
    blinkingDate();
    btnBlink();
    
   
}   
function taskRequired(){
    taskLabel.innerHTML="Required";
    taskLabel.style.color = "Red";
    blinkingTask();
    btnBlink();
}
function bothRequired(){
    taskLabel.innerHTML="Required";
    dateLabel.innerHTML="Required";
    taskRequired();
    dateRequired();
    btnBlink();
}
function blinkingDate(){
    let blinkspeed = 300;
    let blinkingText =  setInterval(()=>{
        dateLabel.style.visibility = ( dateLabel.style.visibility == 'hidden' ? '' : 'hidden');
    }, blinkspeed);
    setTimeout(()=>{clearInterval(blinkingText)},2000);
}
function blinkingTask(){
    let blinkspeed = 300;
    let blinkingText =  setInterval(()=>{
        taskLabel.style.visibility = ( taskLabel.style.visibility == 'hidden' ? '' : 'hidden');
    }, blinkspeed);
    setTimeout(()=>{clearInterval(blinkingText)},2000);
}
function blinkingBtn(){
    let blinkspeed = 300;
    let blinkingText =  setInterval(()=>{
        btnAddTask.style.visibility = ( btnAddTask.style.visibility == 'hidden' ? '' : 'hidden');
    }, blinkspeed);
    setTimeout(()=>{clearInterval(blinkingText)},2000);
}
function btnBlink(){
    btnAddTask.innerHTML = "Required";
    btnAddTask.classList.add("btn-danger");
    blinkingBtn();
}
function fade(){
    innerContainer.style.visibility="visible";
    rootBtn.style.visibility="hidden";
    startText.style.visibility="hidden";

}




