export class Task {
    constructor(taskDescription) {
        this.taskDescription = taskDescription;
    }
    static allTasks = () => {
        return (localStorage.getItem("allTasks") === null) ? [] : JSON.parse(localStorage.getItem("allTasks"))
    };
    static addToStorage(taskDescription) {
        const newTask = new Task(taskDescription);
        const tasks = Task.allTasks();
        tasks.push(newTask);
        localStorage.setItem("allTasks", JSON.stringify(tasks));
    }
}
