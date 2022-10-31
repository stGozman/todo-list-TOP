import { dom } from './dom.js';

// Tasks Array
let tasksArray = [];

// Task Obj Factory
function TaskObjCreator(title, details, date, priority, project, completed) {
  return {title, details, date, priority, project, completed};
}

function addTask(e) {
  dom.selector.newTaskFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    //Imported Form Input Values
    const taskTitle = dom.selector.taskTitle.value;
    const taskDetails = dom.selector.taskDetails.value;
    const taskDate = dom.selector.taskDate.value;
    const taskPriority = dom.selector.taskPriority.value;
    const taskProject = dom.selector.taskProject.value;

    if (taskTitle === '' || taskDetails === '' || taskDate === '' ) return;

    const taskObj = TaskObjCreator(taskTitle, taskDetails, taskDate, taskPriority, taskProject, false);

    tasksArray.push(taskObj);

    displayTask();
    console.log(tasksArray); //! REMOVE LATER
  });
}

function displayTask() {
  dom.clearTaskContainer();

  tasksArray.forEach(task => {
    let baseColor;

    if (task.priority === 'Low') {
      baseColor = 'blue';
    } else if (task.priority === 'Medium') {
      baseColor = 'yellow';
    } else {
      baseColor = 'red';
    }

    dom.createTaskDisplayDom(baseColor, task);
  });

  expandTask();
  checkTask();
  deleteTask();  
}

function expandTask() {
  const chevrons = document.querySelectorAll('.chevron');

  [...chevrons].forEach(chevron => {
    chevron.addEventListener('click', () => {
      dom.taskDisplayControlDom(chevron);
    });
  });
}

function checkTask() {
  const checkboxes = document.querySelectorAll('.checkbox');

  [...checkboxes].forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      dom.completeTaskDom(checkbox, tasksArray);
    });
  }); 
}

function deleteTask() {
  const trashs = document.querySelectorAll('.trash');

  [...trashs].forEach(trash => {
    trash.addEventListener('click', () => {
      dom.deleteTaskDom(trash, tasksArray);
    });
  });
}

export const tasks = {
  addTask,
};