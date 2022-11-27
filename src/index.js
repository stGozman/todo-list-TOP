import './style.css';
import { forms } from './modules/forms.js';
import { tasks } from './modules/tasks.js';
import { notes } from './modules/notes.js';
import { hamburger } from './modules/hamburger.js';

hamburger.toggle();
forms.formControl();
forms.setMinDateToToday();
tasks.addTask();
notes.createNote();