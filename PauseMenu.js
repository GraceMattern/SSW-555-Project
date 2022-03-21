class PauseMenu {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {
    //Case 1: Show the first page of options
    if (pageKey === "root") {
      return [
        {
          label: "Replay Game",
          description: "Replay the game",
          handler: () => {
            window.location.reload(true);
            //We'll come back to this...
          },
        },
        {
          label: "Quit Game",
          description: "Quit the game",
          handler: () => {
            //Quit Screen
          },
        },
        {
          label: "Continue",
          description: "Close the pause menu",
          handler: () => {
            this.close();
          },
        },
      ];
    }
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu");
    this.element.innerHTML = `
      <h2>Pause Menu</h2>
    `;
  }

  close() {
    this.esc?.unbind();
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }

  async init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container,
    });
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions("root"));

    container.appendChild(this.element);

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });
  }
}
