class Inventory {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
    // this.counters = {
    //   sage: 0,
    //   apple: 0,
    //   leeks: 0,
    // };
  }
  fetCounters(word) {
    //let inventory = this.counters;
    //localStorage.setItem("inventory", inventory);
    //debugger;
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    //console.log(inventory);
    // if (!inventory) {
    //   return this.counters[word];
    // }
    return inventory[word];
  }

  addToInventory(word) {
    //debugger;
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    inventory[word] += 1;
    localStorage.setItem("inventory", JSON.stringify(inventory));
    return inventory[word];
  }

  getOptions(pageKey) {
    //let inv = {"sage" : 0, "apple" : 0, "leeks" : 0};
    //Case 1: Show the first page of options
    if (pageKey === "root") {
      return [
        {
          label: "Sage",
          count: this.fetCounters("sage"),
          description: "Sage",
          handler: () => {
            //this.counters.sage += 1;
            //localStorage.setItem("inventory", JSON.stringify(this.counters));
            //console.log(this.counters.sage);
            return `Sage : ${this.addToInventory("sage")}`;
            // window.location.reload(true);
            // We'll come back to this...
          },
        },
        {
          label: "Apple",
          count: this.fetCounters("apple"),
          description: "Apple",
          handler: () => {
            // this.counters.apple += 1;
            // localStorage.setItem("inventory", JSON.stringify(this.counters));

            // console.log(this.counters.apple);
            return `Apple : ${this.addToInventory("apple")}`;
          },
        },
        {
          label: "Leek",
          count: this.fetCounters("leeks"),
          description: "Leek",
          handler: () => {
            // this.counters.leeks += 1;
            // //console.log(this.counters.leeks);
            // localStorage.setItem("inventory", JSON.stringify(this.counters));
            // console.log(localStorage.getItem("inventory"));
            return `Leek : ${this.addToInventory("leeks")}`;
          },
        },
        //added by sv
        {
          label: "Herb",
          count: this.fetCounters("herb"),
          description: "Herb",
          handler: () => {
            // this.counters.leeks += 1;
            // //console.log(this.counters.leeks);
            // localStorage.setItem("inventory", JSON.stringify(this.counters));
            // console.log(localStorage.getItem("inventory"));
            return `Herb : ${this.addToInventory("herb")}`;
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
