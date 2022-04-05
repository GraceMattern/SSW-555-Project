class PauseMenu {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {
    //Case 1: Show the first page of options
    if (pageKey === "root") {
      return [
        {
          label: "Replay",
          description: "Replay",
          handler: () => {
            window.location.reload(true);
            //We'll come back to this...
          },
        },
        {
          label: "Restart",
          description: "Restart",
          handler: () => {
            window.location.reload(true);
          },
        },
        {
          label: "Quit",
          description: "Quit",
          handler: () => {
            self.close();
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
    this.element.classList.add("overlayMenu");
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
