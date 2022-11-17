import { dom } from './dom.js';
import { projects } from './projects.js';
import { storage } from './storage.js';

// Task Obj Factory
function TaskObjCreator(title, details, date, priority, project, completed) {
  return {title, details, date, priority, project, completed};
}

const globalObject = {array: null};

projects.createProject();

function addTask(e) {
  updatePageOnLoad();

  dom.selector.newTaskFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    //Imported Form Input Values
    const taskTitle = dom.selector.newTaskTitle.value;
    const taskDetails = dom.selector.newTaskDetails.value;
    const taskDate = dom.selector.newTaskDate.value;
    const taskPriority = dom.selector.newTaskPriority.value;
    const taskProject = projects.projectsArray.find(project => project.active === true).name;
  
    if (taskTitle === '' || taskDate === '' ) return;
  
    const taskObj = TaskObjCreator(taskTitle, taskDetails, taskDate, taskPriority, taskProject, false);
  
    // Tasks Array
    let tasksArray = projects.projectsArray.find(project => project.active === true).projectArray;
  
    tasksArray.push(taskObj);

    globalObject.array = projects.projectsArray;
    storage.updateLocalStore(projects.projectsArray);
  
    displayTask(tasksArray);
    console.log(tasksArray); //! REMOVE LATER
  });
}

function displayExistingTasks(e) {
  let projectsArray = projects.projectsArray;
  const projDisps = document.querySelectorAll('.project-display');
  const projInbox = document.querySelector('#default-project');

  projInbox.onclick = () => {
    projects.makeAllProjectsNonActive(projInbox);

    dom.makeDefaultProjectActive(projectsArray, projInbox);
    dom.clearTaskContainer();
    displayTasksFromGlobalObject();
  };

  [...projDisps].forEach(projDisp => {
    projDisp.onclick = (e) => {
      const projIndex = [...dom.selector.projectContainer.children].indexOf(projDisp) + 1;
      projects.makeAllProjectsNonActive(projInbox);

      if (e.target.classList.contains('delete-project-btn')) {
        dom.makeDefaultProjectActive(projectsArray, projInbox);
      } else {
        dom.makeProjectActive(projectsArray, projIndex, projDisp);
      }

      dom.clearTaskContainer();
      displayTasksFromGlobalObject();
    };
  });
}

function displayTask(tasksArray) {
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
  checkTask(tasksArray);
  deleteTask(tasksArray);
  editTask(tasksArray);
}

function expandTask() {
  const chevrons = document.querySelectorAll('.chevron');

  [...chevrons].forEach(chevron => {
    chevron.addEventListener('click', () => {
      dom.taskDisplayControlDom(chevron);
    });
  });
}

function checkTask(tasksArray) {
  const checkboxes = document.querySelectorAll('.checkbox');

  [...checkboxes].forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      dom.completeTaskDom(checkbox, tasksArray, globalObject.array);
    });
  }); 
}

function deleteTask(tasksArray) {
  const trashs = document.querySelectorAll('.trash');

  [...trashs].forEach(trash => {
    trash.addEventListener('click', () => {
      dom.deleteTaskDom(trash, tasksArray, globalObject.array);
    });
  });
}

function editTask(tasksArray) {
  const edits = document.querySelectorAll('.edit');

  [...edits].forEach(edit => {
    edit.addEventListener('click', () => {
      dom.editTaskDom(edit, tasksArray, globalObject.array);
    });
  });
}

function updatePageOnLoad() {
  projects.displayProject();
  globalObject.array = projects.projectsArray;
  projects.projectsArray.forEach(project => {
    project.active = false;
  });
  projects.projectsArray[0].active = true;
  storage.updateLocalStore(projects.projectsArray);
  let tasksArray = projects.projectsArray.find(project => project.active === true).projectArray;
  displayTask(tasksArray);
}

function displayTasksFromGlobalObject() {
  if (globalObject.array !== null) {
    let tasksArray = globalObject.array.find(project => project.active === true).projectArray;
    displayTask(tasksArray);
  }

  storage.updateLocalStore(projects.projectsArray);
  console.log(projects.projectsArray); //! REMOVE LATER
}

export const tasks = {
  addTask,
  displayTask,
  displayExistingTasks,
};