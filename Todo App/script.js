/*Decleration of variables*/
const taskForm = document.querySelector('#task_form');
const taskInput = document.querySelector('#task_input');
const taskListUL = document.querySelector('#task_list');

let allTasks = getTasks();
updateTaskList();

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTask();
}
);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText.length > 0) {
        const taskObject = {
            text: taskText,
            completed: false
        }

        allTasks.push(taskObject);
        updateTaskList();
        saveTasks();
        taskInput.value = "";
    }
}

function updateTaskList(){
    taskListUL.innerHTML = "";
    allTasks.forEach((task, taskIndex)=>{
        taskItem = createTaskItem(task, taskIndex);
        taskListUL.append(taskItem);
    });
}

function createTaskItem(task, taskIndex){
    const taskLI = document.createElement("li");
    const taskID = "task_"+ taskIndex;
    const taskText = task.text;
    taskLI.className = "task";
    taskLI.innerHTML = 
    `
    <input type="checkbox" id="${taskID}">
        <label for="${taskID}" class="checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
        </label>
        <label for="${taskID}" class="task_text">
            ${taskText}
        </label>
        <button class="delete_button">
            <svg fill="var(--background_color)" xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>
        </button>
    `
    const deleteButton = taskLI.querySelector(".delete_button");
    deleteButton. addEventListener("click", ()=>{
    deleteTask(taskIndex);
    });
    const checkbox = taskLI.querySelector("input");
    checkbox.addEventListener("change", (e)=>{
        allTasks[taskIndex].completed = e.target.checked;
        saveTasks();
    });
    checkbox.checked = task.completed;
    return taskLI;
};

function deleteTask(taskIndex){
    allTasks = allTasks.filter((_, i)=> i !== taskIndex);
    saveTasks();
    updateTaskList();
}

function saveTasks(){

    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    console.log("Tasks Saved");

};

function getTasks(){
    const tasks = localStorage.getItem("allTasks") || "[]";
    return JSON.parse(tasks);
}
