class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0)
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0)
  } 
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "assets/images/maps/map_3.png",
    // upperSrc: "", // TODO
    gameObjects: {
      protag: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npc1: new GameObject({
        x: utils.withGrid(0),
        y: utils.withGrid(0),
        src: "/assets/images/characters/sprite02.png"
      })
    }
  }
}

// ===================================================

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
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

      // lower
      this.map.drawLowerImage(this.ctx);

      // objs
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction
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

  startGameLoop() {}
}
