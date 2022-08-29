export class Task {
    constructor(taskDescription) {
        this.taskDescription = taskDescription;
    }
    static createTaskElement(){
        return document.createElement("task-element");
    }
    static allTasks = () => {
        return (localStorage.getItem("allTasks") === null) ? [] : JSON.parse(localStorage.getItem("allTasks"))
    };
    static addToStorage(taskDescription) {
        const newTask = new Task(taskDescription);
        const tasks = Task.allTasks();
        tasks.push(newTask);
        localStorage.setItem("allTasks", JSON.stringify(tasks));
        Task.renderTasks();
    }
    static deleteFromStorage(index) {
        const tasks = Task.allTasks();
        localStorage.setItem("allTasks", JSON.stringify(tasks.filter((_, id) => id !== index)));
        Task.renderTasks();
    }
    static editDescription(index, taskDescription){
        const tasks = Task.allTasks();
        localStorage.setItem("allTasks", JSON.stringify(tasks.map((el, id) => {
            if (id === index) el.taskDescription = taskDescription;
            return el;
        })));
        Task.renderTasks();
    }
    static renderTasks() {
        const tasks = Task.allTasks();
        document.getElementById("taskRoot").textContent = "";
        tasks.forEach((task, index) => {
            const taskElement = Task.createTaskElement();
            taskElement.setAttribute("id", index);
            taskElement.attachDescription(task.taskDescription);
            document.getElementById("taskRoot").appendChild(taskElement);
        });
    }
}
