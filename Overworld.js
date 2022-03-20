class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    // storing playername inside this.playerName
    this.playerName =
      config.playerName.length < 1 ? "DefaultName" : config.playerName;
  }

  startGameLoop() {
    const step = () => {
      // clear per frame
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // lower
      this.map.drawLowerImage(this.ctx);

      // objs
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });
        object.sprite.draw(this.ctx);
      });

      // TODO upper
      // this.map.drawUpperImage(this.ctx);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}
 