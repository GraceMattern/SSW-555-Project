class TitleScreen {
  constructor() {
  }

  getOptions(resolve) {
    return [
      { 
        label: "New Game",
        description: "Start a new adventure!",
        handler: () => {
          this.close();
          resolve();
        }
      }
    ].filter(v => v);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TitleScreen");
    this.element.innerHTML = (`
      <img class="TitleScreen_logo" src="./assets/images/logo.png" alt="The Giving Garden" />
    `)

  }

  close() {
    this.keyboardMenu.end();
    this.element.remove();
  }
  
  init(container) {
    return new Promise(resolve => {
      this.createElement();
      container.appendChild(this.element);
      this.keyboardMenu = new KeyboardMenu();
      this.keyboardMenu.init(this.element);
      this.keyboardMenu.setOptions(this.getOptions(resolve))
    })
  }

}