class Inventory {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {
    //Case 1: Show the first page of options
    if (pageKey === "root") {
      return [
        {
          label: "Sage",
          count: 0,
          description: 0,
          handler: () => {
            //window.location.reload(true);
            //We'll come back to this...
          },
        },
        {
          label: "Apple",
          description: "Apple",
          handler: () => {
            //Quit Screen
          },
        },
        {
          label: "Leek",
          description: "Leek",
          handler: () => {
            //this.close();
          },
        },
        // {
        //   label: (src = "/assets/images/food/wheat.png"),
        //   description: "Close the pause menu",
        //   handler: () => {
        //     //this.close();
        //   },
        // },
      ];
    }
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Inventory");
    this.element.innerHTML = `
      <h2>Inventory</h2>
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
    this.esc = new KeyPressListener("Tab", () => {
      this.close();
    });
  }
}
