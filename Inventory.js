class Inventory {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
    this.counters = {
      sage: 0,
      apple: 0,
      leeks: 0,
    };
  }
  fetCounters(word) {
    return this.counters[word];
  }

  getOptions(pageKey) {
    //Case 1: Show the first page of options
    if (pageKey === "root") {
      return [
        {
          label: "Sage",
          count: this.fetCounters("sage"),
          description: "Sage",
          handler: () => {
            this.counters.sage += 1;
            console.log(this.counters.sage);
            return `Sage : ${this.counters.sage}`;
            // window.location.reload(true);
            // We'll come back to this...
          },
        },
        {
          label: "Apple",
          count: this.fetCounters("apple"),
          description: "Apple",
          handler: () => {
            this.counters.apple += 1;
            console.log(this.counters.apple);
            return `Apple : ${this.counters.apple}`;
          },
        },
        {
          label: "Leek",
          count: this.fetCounters("leeks"),
          description: "Leek",
          handler: () => {
            this.counters.leeks += 1;
            console.log(this.counters.leeks);
            return `Leek : ${this.counters.leeks}`;
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
