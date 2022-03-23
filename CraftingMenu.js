class CraftingMenu {
  constructor({ fruits, onComplete}) {
    this.fruits = fruits;
    this.onComplete = onComplete;
  }

  getOptions() {
    return this.fruits.map(id => {
      const base = Fruits[id];
      return {
        label: base.name,
        description: base.description,
        handler: () => {
          playerState.addFruit(id);
          this.close();
        }
      }
    })
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("CraftingMenu");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = (`
      <h2>Picked fruits</h2>
    `)
  }

  close() {
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }


  init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container
    })
    this.keyboardMenu.init(this.element)
    this.keyboardMenu.setOptions(this.getOptions())

    container.appendChild(this.element);
  }
}