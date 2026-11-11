let addButton = document.querySelector("#button");
let addTextInput = document.querySelector("#input1");
let taskList = document.getElementById("tasks");

let tasks = [];

function addTask() {
    if (addTextInput.value.trim() === "") return;

    let task = {
        id: Math.random(),
        text: addTextInput.value,
        completed: false 
    }
    tasks.push(task);
    console.log(tasks);
    createTaskText(task);
    addTextInput.value = '';
}

function createTaskText(task) {
    let taskDiv = document.createElement('div');
    taskDiv.style.display = "flex";
    taskDiv.style.alignItems = "center";
    taskDiv.style.gap = "10px";
    taskDiv.style.marginBottom = "5px";
    
    taskList.append(taskDiv);

    let contentMode = document.createElement('div');
    contentMode.style.display = "flex";
    contentMode.style.alignItems = "center";
    contentMode.style.gap = "5px";
    
    taskDiv.append(contentMode);

   
    let checkMark = document.createElement('input');
    checkMark.type = 'checkbox';
    checkMark.checked = task.completed;
    
    checkMark.addEventListener('change', function() {
        toggleTaskCompletion(task, checkMark, taskText);
    });

    let taskText = document.createElement('p');
    taskText.innerText = task.text;
    taskText.style.margin = "0";
  
    if (task.completed) {
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = '#888';
    }

    contentMode.append(checkMark);
    contentMode.append(taskText);
    
    createDeleteButton(contentMode, taskDiv, task);
    createEditButton(contentMode, taskDiv, task, taskText);
}

function toggleTaskCompletion(task, checkboxElement, textElement) {
    task.completed = checkboxElement.checked;
    
    let taskInArray = tasks.find(t => t.id === task.id);
    if (taskInArray) {
        taskInArray.completed = task.completed;
    }

    if (task.completed) {
        textElement.style.textDecoration = 'line-through';
        textElement.style.color = '#888';
    } else {
        textElement.style.textDecoration = 'none';
        textElement.style.color = 'black';
    }
    console.log(tasks);
}


function createDeleteButton(contentMode, taskDiv, task) {
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    contentMode.append(deleteButton);

    deleteButton.addEventListener('click', function () {
        deleteTask(taskDiv, task);
    })
}

function deleteTask(taskDiv, task) {
    taskDiv.remove();
    tasks = tasks.filter(el => el.id != task.id)
    console.log(tasks);
}


function createEditButton(contentMode, taskDiv, task, taskTextElement) {
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    contentMode.append(editButton);

    editButton.addEventListener('click', function () {
        contentMode.style.display = 'none';
        createEditWindow(taskDiv, task, contentMode, taskTextElement);
    })
}

function createEditWindow(taskDiv, task, contentMode, taskTextElement) {
    let editMode = document.createElement('div');
    editMode.style.display = "flex";
    editMode.style.gap = "5px";
    
    taskDiv.append(editMode);

    let editInput = document.createElement('input');
    editInput.value = task.text;
    editMode.append(editInput);

    createSaveButton(editMode, task, editInput, taskTextElement, editMode, contentMode);
    createCancelButton(editMode, contentMode);
    
}

function createSaveButton(editMode, task, editInput, taskTextElement, editModeDiv, contentModeDiv) {
    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    editMode.append(saveButton);

    saveButton.addEventListener('click', function () {
        let newText = editInput.value;

        let taskInArray = tasks.find(t => t.id === task.id);
        if (taskInArray) {
            taskInArray.text = newText;
        }

        taskTextElement.innerText = newText;

        editModeDiv.remove();
        contentModeDiv.style.display = 'flex';
        console.log(tasks);
    });
}


function createCancelButton(editMode, contentMode) {
    let cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    editMode.append(cancelButton);

    cancelButton.addEventListener('click', function () {
        cancelTask(editMode, contentMode);
    })
}

function cancelTask(editMode, contentMode) {
    editMode.remove();
    contentMode.style.display = 'flex';
}

addButton.addEventListener('click', function () {
    addTask();
});