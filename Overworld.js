class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
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

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((o) => {
      //TODO: determine if this object should actually mount
      o.mount(this);
    });
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "assets/images/maps/demo.png",
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
    },
  },
  walls: {
    [utils.asGridCoord(0, 0)]: true,
    [utils.asGridCoord(0, 1)]: true,
    [utils.asGridCoord(0, 2)]: true,
    [utils.asGridCoord(0, 3)]: true,
    [utils.asGridCoord(0, 4)]: true,
    [utils.asGridCoord(0, 5)]: true,
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

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}
