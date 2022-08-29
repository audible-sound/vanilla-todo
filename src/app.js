import { registerForm } from "./form.js"
import { registerTaskElement } from "./task.js";
import { Task } from "./taskSchema.js";
const app = () => {
    registerForm();
    registerTaskElement();
    Task.renderTasks();
}
document.addEventListener("DOMContentLoaded", app)