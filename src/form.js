import { Task } from "./taskSchema.js";
class Form extends HTMLElement {
    #shadowRoot;
    #template
    #style;
    #formElement;
    #addButton;
    #taskInput;
    #errorMessage;
    constructor() {
        super();

        //form template
        this.#template = document.createElement("template");
        this.#template.innerHTML = `
        <form id="taskForm">
            <input type="text" id="taskInput">
            <button id="addButton" type="submit">+</button>
        </form>
        <span class="error-message" status="input-valid">Invalid Input</span>
        `;

        //form style
        this.#style = document.createElement("style");
        this.#style.innerHTML = `
        @import url("../css/form.css");
        `;

        //create shadow dom
        this.#shadowRoot = this.attachShadow({ mode: 'open' });

        //append template and style to dom
        this.#shadowRoot.appendChild(this.#style)
        this.#shadowRoot.appendChild(this.#template.content.cloneNode(true));

        this.#formElement = this.#shadowRoot.getElementById("taskForm");
        this.#addButton = this.#shadowRoot.getElementById("addButton");
        this.#taskInput = this.#shadowRoot.getElementById("taskInput");
        this.#errorMessage = this.#shadowRoot.querySelector(".error-message");
    }

    connectedCallback() {
        this.validateInput();
        this.preventReload();
    }

    //prevents app from reloading when submitting input
    preventReload() {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        })
    }

    isError(){
        return this.#taskInput.value === "";
    }

    validateInput(){
        this.#addButton.addEventListener("click",() => {
            if (this.isError()) {
                this.#errorMessage.setAttribute("status", "input-invalid");
            } else{
                this.#errorMessage.setAttribute("status", "input-valid");
                this.submitHandler();
            }
        })
    }

    submitHandler(){
        const task = this.#taskInput.value;
        Task.addToStorage(task);
    }
}

export const registerForm = () => {
    customElements.define("task-form", Form);
}

