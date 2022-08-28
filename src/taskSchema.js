export class Task {
    #taskDescription
    constructor(taskDescription) {
        this.#taskDescription = taskDescription;
    }
    static allTask = (localStorage.getItem("allTasks") === null) ? [] : JSON.parse(localStorage.getItem("allTasks"));
    static addToStorage(taskDescription) {
        const newTask = new Task(taskDescription);
        Task.allTask.push(newTask);
        localStorage.setItem("allTasks", newTask)
    }
}
