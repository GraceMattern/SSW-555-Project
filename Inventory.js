class Inventory {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
  }
  fetCounters(word) {
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    return inventory[word];
  }

  addToInventory(word) {
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    inventory[word] += 1;
    localStorage.setItem("inventory", JSON.stringify(inventory));
    return inventory[word];
  }
  removeFromInventory(word) {
    //debugger;
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    inventory[word] -= 1;
    localStorage.setItem("inventory", JSON.stringify(inventory));
    return true;
  }

  getOptions(pageKey) {
    //let inv = {"sage" : 0, "apple" : 0, "leeks" : 0};
    //Case 1: Show the first page of options
    if (pageKey === "root") {
      return [
        // Craft Food
        {
          label: "Fruit Bowl",
          type: "craftFood",
          count: this.fetCounters("fruitBowl"),
          description: "Fruit Bowl",
          handler: () => {
            const currentBowl = this.fetCounters("fruitBowl");
            if (this.fetCounters("strawberry") && this.fetCounters("apple")) {
              this.removeFromInventory("strawberry");
              this.removeFromInventory("apple");
              const updatedCount = this.addToInventory("fruitBowl");
              document.getElementById("fruitBowlContainer").innerHTML =
                updatedCount;
              utils.emitEvent("InventoryUpdated");
              return `Fruit Bowl : ${updatedCount}`;
            }
            alert(`Not sufficient Strawberry to craft item`);
            return `Fruit Bowl : ${currentBowl}`;
          },
        },

        {
          label: "Jam",
          type: "craftFood",
          count: this.fetCounters("jam"),
          description: "Jam",
          handler: () => {
            const currentCount = this.fetCounters("jam");
            if (this.fetCounters("strawberry")) {
              this.removeFromInventory("strawberry");

              const updatedCount = this.addToInventory("jam");
              document.getElementById("jamContainer").innerHTML = updatedCount;
              utils.emitEvent("InventoryUpdated");
              return `Jam : ${updatedCount}`;
            }
            alert(`Not sufficient Strawberry to craft food`);
            return `Jam : ${currentCount}`;
          },
        },

        {
          label: "Herbal Sachet",
          type: "craftFood",
          count: this.fetCounters("herbalSachet"),
          description: "Herbal Sachet",
          handler: () => {
            const currentCount = this.fetCounters("herbalSachet");
            if (this.fetCounters("herb")) {
              this.removeFromInventory("herb");

              const updatedCount = this.addToInventory("herbalSachet");
              document.getElementById("herbalSachetContainer").innerHTML =
                updatedCount;
              utils.emitEvent("InventoryUpdated");

              return `Herbal Sachet : ${updatedCount}`;
            }
            alert(`Not sufficient Herbs to craft food`);
            return `Herbal Sachet : ${currentCount}`;
          },
        },

        {
          label: "Soup",
          type: "craftFood",
          count: this.fetCounters("soup"),
          description: "Soup",
          handler: () => {
            const currentCount = this.fetCounters("soup");
            if (this.fetCounters("tomato") && this.fetCounters("leek")) {
              this.removeFromInventory("tomato");
              this.removeFromInventory("leek");

              const updatedCount = this.addToInventory("soup");
              document.getElementById("soupContainer").innerHTML = updatedCount;
              utils.emitEvent("InventoryUpdated");

              return `Soup : ${updatedCount}`;
            }
            alert(
              `Not sufficient Tomatoes ${this.fetCounters(
                "soup"
              )} and Leeks to craft food`
            );
            return `Soup : ${currentCount}`;
          },
        },

        {
          label: "Pie",
          type: "craftFood",
          count: this.fetCounters("pie"),
          description: "Pie",
          handler: () => {
            const currentCount = this.fetCounters("pie");
            if (this.fetCounters("apple")) {
              this.removeFromInventory("apple");
              const updatedCount = this.addToInventory("pie");
              document.getElementById("pieContainer").innerHTML = updatedCount;
              utils.emitEvent("InventoryUpdated");
              return `Pie : ${updatedCount}`;
            }
            alert(`Not sufficient Apples to craft food`);
            return `Pie : ${currentCount}`;
          },
        },
      ];
    }
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Inventory");
    this.element.innerHTML = `
      <h2>Craft and Gift</h2>
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
    this.keyboardMenu.setOptions(this.getOptions("root"), true);
    // this.keyboardMenu.setInventoryOptions(this.getOptions("root"));

    container.appendChild(this.element);

    utils.wait(200);
    this.esc = new KeyPressListener("CapsLock", () => {
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
      this.element.innerHTML = utils.inventoryHTML(inventory);
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
