class Form extends HTMLElement {
    #shadowRoot;
    #template
    #style;
    #formElement;
    #addButton;
    constructor() {
        super();

        //form template
        this.#template = document.createElement("template");
        this.#template.innerHTML = `
        <form id="taskForm">
            <input type="text">
            <button id="addButton" type="submit">+</button>
        </form>
        `;

        //form style
        this.#style = document.createElement("style");
        this.#style.innerHTML = `
        `;

        //create shadow dom
        this.#shadowRoot = this.attachShadow({ mode: 'open' });

        //append template and style to dom
        this.#shadowRoot.appendChild(this.#style)
        this.#shadowRoot.appendChild(this.#template.content.cloneNode(true));

        this.#formElement = this.#shadowRoot.getElementById("taskForm");
        this.#addButton = this.#shadowRoot.getElementById("addButton");
    }

    connectedCallback() {
        this.preventReload();
    }

    preventReload() {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        })
    }
}

export const registerForm = () => {
    customElements.define("task-form", Form);
}

