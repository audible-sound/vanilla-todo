import { Task } from "./taskSchema.js";
class TaskElement extends HTMLElement {
    #shadowRoot;
    #template;
    #style;
    #description
    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: "open" });

        this.#template = document.createElement("template");
        this.#template.innerHTML = `
            <div>
                <span id="description"></span>
                <button id="editButton">Edit</button>
                <button id="deleteButton">Delete</button>
            </div>
        `;

        this.#style = document.createElement("style");
        this.#style.innerHTML = `
        `;

        this.#shadowRoot.appendChild(this.#style);
        this.#shadowRoot.appendChild(this.#template.content.cloneNode(true));

        this.#description = this.#shadowRoot.getElementById("description");
    }

    connectedCallback(){
        this.deleteFromDOM();
    }

    attachDescription(task){
        this.#description.innerText = task;
    }

    deleteFromDOM(){
        this.#shadowRoot.getElementById("deleteButton").addEventListener("click", () => {
            Task.deleteFromStorage(+this.getAttribute("id"));
        });
    }
}

export const registerTaskElement = () => customElements.define("task-element", TaskElement);