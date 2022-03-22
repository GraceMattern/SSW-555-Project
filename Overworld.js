class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
    this.isPaused = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "assets/images/maps/map_3.png",
    // upperSrc: "", // TODO
    gameObjects: {
      npc1: new GameObject({
        x: utils.withGrid(0),
        y: utils.withGrid(0),
        src: "/assets/images/characters/sprite02.png",
      }),
      protag: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      pickapple: new PickApple({
        x: utils.withGrid(10),
        y: utils.withGrid(15),
        storyFlag: "Apple_picked"
      }),
      pickleek: new PickStrawberry({
        x: utils.withGrid(20),
        y: utils.withGrid(10),
        storyFlag: "Strawberry_picked"
      }),
    },
  },
};

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
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.protag;

      //Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      // draw lower
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      // TODO upper
      // this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([{ type: "pause" }]);
      }
    });
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

    this.bindActionInput();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}
