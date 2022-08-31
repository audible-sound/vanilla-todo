import { Task } from "./taskSchema.js";
class TaskElement extends HTMLElement {
    #shadowRoot;
    #template;
    #style;
    #description;
    #errorMessage;
    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: "open" });

        this.#template = document.createElement("template");
        this.#template.innerHTML = `
            <div class="full-width flex flex-center border task-margin">
                <span class="text-width" id="description"></span>
                <input type="text" id="editInput" class="input-width hide-element">
                <div class="btns-width flex flex-center">
                    <button id="editButton">Edit</button>
                    <button id="deleteButton">X</button>
                    <button id="confirmEdit" class="hide-element">Ok</button>
                </div>
                <p class="hide-element error-message" id="errorMessage">Input Invalid!</p>
            </div>
        `;

        this.#style = document.createElement("style");
        this.#style.innerHTML = `
        @import url("../css/task.css")
        `;

        this.#shadowRoot.appendChild(this.#style);
        this.#shadowRoot.appendChild(this.#template.content.cloneNode(true));

        this.#description = this.#shadowRoot.getElementById("description");
        this.#errorMessage = this.#shadowRoot.getElementById("errorMessage");
    }

    isError(){
        return this.#shadowRoot.getElementById("editInput").value === "";
    }

    validateInput(){
        this.#shadowRoot.getElementById("confirmEdit").addEventListener("click",() => {
            if (this.isError()) {
                this.#errorMessage.setAttribute("class", "error-message");
            } else{
                this.#errorMessage.setAttribute("class", "hide-element");
                Task.editDescription(+this.getAttribute("id"), this.#shadowRoot.getElementById("editInput").value);
            }
        })
    }

    connectedCallback() {
        this.deleteFromDOM();
        this.editMode();
        this.validateInput();    
    }

    attachDescription(task) {
        this.#description.innerText = task;
    }

    deleteFromDOM() {
        this.#shadowRoot.getElementById("deleteButton").addEventListener("click", () => {
            Task.deleteFromStorage(+this.getAttribute("id"));
        });
    }

    editMode() {
        this.#shadowRoot.getElementById("editButton").addEventListener("click", () => {
            const description = this.#description.innerText;
            this.#shadowRoot.getElementById("editButton").setAttribute("class", "hide-element");
            this.#shadowRoot.getElementById("deleteButton").setAttribute("class", "hide-element");
            this.#description.setAttribute("class", "hide-element")
            this.#shadowRoot.getElementById("confirmEdit").removeAttribute("class");
            this.#shadowRoot.getElementById("editInput").removeAttribute("class");
            this.#shadowRoot.getElementById("editInput").value = description;
        });
    }
}

export const registerTaskElement = () => customElements.define("task-element", TaskElement);