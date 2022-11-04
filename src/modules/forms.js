import { dom } from './dom.js';

function formControl() {
  dom.selector.newTaskFormBtn.addEventListener('click', () => {
    dom.newTaskFormDom();
  });

  dom.selector.newProjectFormBtn.addEventListener('click', () => {
    dom.newProjectFormDom();
  });

  dom.selector.newTaskFormCloseBtn.addEventListener('click', () => {
    dom.newTaskFormDom();
  });

  dom.selector.editTaskFormCloseBtn.addEventListener('click', () => {
    dom.editTaskFormDom();
  });

  dom.selector.newProjectFormCloseBtn.addEventListener('click', () => {
    dom.newProjectFormDom();
  });

  dom.selector.modal.addEventListener('click', () => {
    if (!dom.selector.newTaskForm.classList.contains('hidden')) {
      dom.newTaskFormDom();
    }

    if (!dom.selector.editTaskForm.classList.contains('hidden')) {
      dom.editTaskFormDom();
    }

    if (!dom.selector.newProjectForm.classList.contains('hidden')) {
      dom.newProjectFormDom();
    }
  });

  dom.selector.newTaskForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  dom.selector.editTaskForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  dom.selector.newProjectForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

export const forms = {
  formControl,
};