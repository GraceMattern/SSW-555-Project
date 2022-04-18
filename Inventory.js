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

        //added by hs
        {
          label: "Tomato",
          count: this.fetCounters("tomato"),
          description: "Tomato",
          handler: () => {
            // this.counters.leeks += 1;
            // //console.log(this.counters.leeks);
            // localStorage.setItem("inventory", JSON.stringify(this.counters));
            // console.log(localStorage.getItem("inventory"));
            return `Tomato : ${this.addToInventory("tomato")}`;
          },
        },
        //added by sv - strawberry
        {
          label: "Strawberry",
          count: this.fetCounters("strawberry"),
          description: "Strawberry",
          handler: () => {
            // this.counters.leeks += 1;
            // //console.log(this.counters.leeks);
            // localStorage.setItem("inventory", JSON.stringify(this.counters));
            // console.log(localStorage.getItem("inventory"));
            return `Strawberry : ${this.addToInventory("strawberry")}`;
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

//added by sv HUD
class Hud {
  constructor() {}
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Hud");
    const inventory = JSON.parse(localStorage.getItem("inventory"));

    this.update();
  }
  update() {
    console.log("updateFired");
    const inventory = JSON.parse(localStorage.getItem("inventory"));
    const difficultyLevel = document.getElementById("levels").value;

    if (difficultyLevel === "easy") {
      //check if the goal is met or in progress
      this.element.innerHTML = `
      <div class="progressSoFar">
        <table>
            <tbody>
            <tr>
            <td><img class="header-img" src="/assets/images/food/thumbnails/Fruit_bowl-thumb.png"/></td>
            <td><img class="craft-item" src="/assets/images/food/thumbnails/apple-thumb.png" alt="apple" /></td>
            <td>${inventory.apple}</td>
            <td><img class="craft-item" src="/assets/images/food//thumbnails/Strawberry-thumb.png" alt="strawberry" /> </td>
            <td>${inventory.strawberry}</td>
            </tr>
            <tr>
            <td><img class="header-img" src="/assets/images/food/thumbnails/Herbal_sachet-thumb.png"/></td>
            <td><img class="craft-item" src="/assets/images/food/thumbnails/Leek-thumb.png" alt="apple" /></td>
            <td>${inventory.leeks}</td>
            <td><img class="craft-item" src="/assets/images/food//thumbnails/sage-thumb.png" alt="strawberry" /> </td>
            <td>${inventory.herb}</td>
            </tr>
            <tr>
            <td><img class="header-img" src="/assets/images/food/thumbnails/Soup-thumb.png"/></td>
            <td><img class="craft-item" src="/assets/images/food/thumbnails/Tomato-thumb.png" alt="apple" /></td>
            <td>${inventory.tomato}</td>
            <td><img class="craft-item" src="/assets/images/food//thumbnails/Leek-thumb.png" alt="strawberry" /> </td>
            <td>${inventory.leeks}</td>
            </tr>
            <tr>
            <td><img class="header-img" src="/assets/images/food/thumbnails/Pie-thumb.png"/></td>
            <td><img class="craft-item" src="/assets/images/food/thumbnails/apple-thumb.png" alt="apple" /></td>
            <td>${inventory.apple}</td>
            <td></td>
            <td></td>
            </tr>
            <tr>
            <td><img class="header-img" src="/assets/images/food/thumbnails/Jam-thumb.png"/></td>
            <td><img class="craft-item" src="/assets/images/food/thumbnails/apple-thumb.png" alt="apple" /></td>
            <td>${inventory.apple}</td>
            <td><img class="craft-item" src="/assets/images/food//thumbnails/Strawberry-thumb.png" alt="strawberry" /> </td>
            <td>${inventory.strawberry}</td>
            </tr>
            </tbody>
          </table>
    `;
    } else if (difficultyLevel === "medium") {
    } else {
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    document.addEventListener("InventoryUpdated", () => {
      this.update();
    });
  }
}
