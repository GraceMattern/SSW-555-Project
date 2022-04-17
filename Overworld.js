class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};
    this.cutsceneSpaces = config.cutsceneSpaces || {};

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

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      //TODO: determine if this object should actually mount
      let object = this.gameObjects[key];
      object.id = key;
      object.mount(this);
    });
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

  checkForActionCutscene() {
    const hero = this.gameObjects["protag"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }
  }

  //added by sv
  checkForPick() {
    let pick;
    const hero = this.gameObjects["protag"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.pick.length) {
      const addToInventory = new Inventory({ onComplete: () => resolve() });
      addToInventory.addToInventory(match.id);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["protag"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];

    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
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
    lowerSrc: "assets/images/maps/newmap.png",

    // upperSrc: "", // TODO
    gameObjects: {
      protag: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(22), //starting at the middle of bottom grid
        y: utils.withGrid(29),
      }),

      herb: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(4),
        src: "/assets/images/food/Sage.png",
        pick: [
          {
            events: [
              {
                type: "sage",
                score: 25,
                visible: true,
              },
            ],
          },
        ],
      }),

      tomato: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(4),
        src: "/assets/images/food/Tomato.png",
        pick: [
          {
            events: [
              {
                type: "tomato",
                score: 25,
                visible: true,
              },
            ],
          },
        ],
      }),

      apple: new Person({
        x: utils.withGrid(11),
        y: utils.withGrid(7),
        src: "/assets/images/food/Apple.png",
        pick: [
          {
            events: [
              {
                type: "Apple",
                score: 25,
                visible: true,
              },
            ],
          },
        ],
      }),

      leek: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(10),
        src: "/assets/images/food/Leek.png",
        pick: [
          {
            events: [
              {
                type: "Leek",
                score: 25,
                visible: true,
              },
            ],
          },
        ],
      }),

      strawberry: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(9),
        src: "/assets/images/food/Strawberry.png",
        pick: [
          {
            events: [
              {
                type: "Strawberry",
                score: 25,
                visible: true,
              },
            ],
          },
        ],
      }),

      npc1: new Person({
        x: utils.withGrid(19),
        y: utils.withGrid(28),
        src: "/assets/images/characters/sprite02.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Welcome to The Giving Garden",
                faceHero: "npc1",
              },
              { type: "textMessage", text: "Start by collecting some herbs!" },
            ],
          },
        ],
      }),
      npc2: new Person({
        x: utils.withGrid(14),
        y: utils.withGrid(22),
        src: "/assets/images/characters/sprite03.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Welcome to The Giving Garden",
                faceHero: "npc2",
              },
              { type: "textMessage", text: "Start by collecting some herbs!" },
            ],
          },
        ],
      }),
    },
    walls: {
      [utils.asGridCoord(9, 8)]: true, //left up to down
      [utils.asGridCoord(9, 9)]: true,
      [utils.asGridCoord(9, 10)]: true,
      [utils.asGridCoord(9, 11)]: true,
      [utils.asGridCoord(9, 12)]: true,
      [utils.asGridCoord(9, 13)]: true,
      [utils.asGridCoord(9, 14)]: true,
      [utils.asGridCoord(9, 15)]: true,
      [utils.asGridCoord(9, 16)]: true,
      [utils.asGridCoord(9, 17)]: true,
      [utils.asGridCoord(9, 18)]: true,
      [utils.asGridCoord(9, 19)]: true,
      [utils.asGridCoord(9, 20)]: true,
      [utils.asGridCoord(9, 21)]: true,
      [utils.asGridCoord(9, 22)]: true,
      [utils.asGridCoord(9, 23)]: true,
      [utils.asGridCoord(9, 24)]: true,
      [utils.asGridCoord(9, 25)]: true,
      [utils.asGridCoord(9, 26)]: true,
      [utils.asGridCoord(9, 27)]: true,
      [utils.asGridCoord(9, 28)]: true,
      [utils.asGridCoord(9, 29)]: true,
      [utils.asGridCoord(9, 30)]: true,

      [utils.asGridCoord(10, 8)]: true, //top left to right
      [utils.asGridCoord(11, 8)]: true,
      [utils.asGridCoord(12, 8)]: true,
      [utils.asGridCoord(13, 8)]: true,
      [utils.asGridCoord(14, 8)]: true,
      [utils.asGridCoord(15, 8)]: true,
      [utils.asGridCoord(16, 8)]: true,
      [utils.asGridCoord(17, 8)]: true,
      [utils.asGridCoord(18, 8)]: true,
      [utils.asGridCoord(19, 8)]: true,
      [utils.asGridCoord(20, 8)]: true,
      [utils.asGridCoord(21, 8)]: true,
      [utils.asGridCoord(22, 8)]: true,
      [utils.asGridCoord(23, 8)]: true,
      [utils.asGridCoord(24, 8)]: true,
      [utils.asGridCoord(25, 8)]: true,
      [utils.asGridCoord(26, 8)]: true,
      [utils.asGridCoord(27, 8)]: true,
      [utils.asGridCoord(28, 8)]: true,
      [utils.asGridCoord(29, 8)]: true,
      [utils.asGridCoord(30, 8)]: true,
      [utils.asGridCoord(31, 8)]: true,
      [utils.asGridCoord(32, 8)]: true,
      [utils.asGridCoord(33, 8)]: true,
      [utils.asGridCoord(34, 8)]: true,
      [utils.asGridCoord(35, 8)]: true,
      [utils.asGridCoord(36, 8)]: true,
      [utils.asGridCoord(37, 8)]: true,
      [utils.asGridCoord(38, 8)]: true,

      [utils.asGridCoord(38, 9)]: true, //left top to bottom
      [utils.asGridCoord(38, 10)]: true,
      [utils.asGridCoord(38, 11)]: true,
      [utils.asGridCoord(38, 12)]: true,
      [utils.asGridCoord(38, 13)]: true,
      [utils.asGridCoord(38, 14)]: true,
      [utils.asGridCoord(38, 15)]: true,
      [utils.asGridCoord(38, 16)]: true,
      [utils.asGridCoord(38, 17)]: true,
      [utils.asGridCoord(38, 18)]: true,
      [utils.asGridCoord(38, 19)]: true,
      [utils.asGridCoord(38, 20)]: true,
      [utils.asGridCoord(38, 21)]: true,
      [utils.asGridCoord(38, 22)]: true,
      [utils.asGridCoord(38, 23)]: true,
      [utils.asGridCoord(38, 24)]: true,
      [utils.asGridCoord(38, 25)]: true,
      [utils.asGridCoord(38, 26)]: true,
      [utils.asGridCoord(38, 27)]: true,
      [utils.asGridCoord(38, 28)]: true,
      [utils.asGridCoord(38, 29)]: true,
      [utils.asGridCoord(38, 30)]: true,

      [utils.asGridCoord(10, 30)]: true, //bottom left to right
      [utils.asGridCoord(11, 30)]: true,
      [utils.asGridCoord(12, 30)]: true,
      [utils.asGridCoord(13, 30)]: true,
      [utils.asGridCoord(14, 30)]: true,
      [utils.asGridCoord(15, 30)]: true,
      [utils.asGridCoord(16, 30)]: true,
      [utils.asGridCoord(17, 30)]: true,
      [utils.asGridCoord(18, 30)]: true,
      [utils.asGridCoord(19, 30)]: true,
      [utils.asGridCoord(20, 30)]: true,
      [utils.asGridCoord(21, 30)]: true,
      [utils.asGridCoord(22, 30)]: true,
      [utils.asGridCoord(23, 30)]: true,
      [utils.asGridCoord(24, 30)]: true,
      [utils.asGridCoord(25, 30)]: true,
      [utils.asGridCoord(26, 30)]: true,
      [utils.asGridCoord(27, 30)]: true,
      [utils.asGridCoord(28, 30)]: true,
      [utils.asGridCoord(29, 30)]: true,
      [utils.asGridCoord(30, 30)]: true,
      [utils.asGridCoord(31, 30)]: true,
      [utils.asGridCoord(32, 30)]: true,
      [utils.asGridCoord(33, 30)]: true,
      [utils.asGridCoord(34, 30)]: true,
      [utils.asGridCoord(35, 30)]: true,
      [utils.asGridCoord(36, 30)]: true,
      [utils.asGridCoord(37, 30)]: true,
      [utils.asGridCoord(38, 30)]: true,
    },

    cutsceneSpaces: {
      // [utils.asGridCoord(7, 8)]: [
      //   {
      //     events: [
      //       {
      //         who: "npc1",
      //         type: "stand",
      //         direction: "left",
      //         time: 500,
      //       },
      //       { type: "textMessage", text: "Pick Herbs, Veggies and Fruits" },
      //     ],
      //   },
      // ],
    },
  },
};

// =====================================================

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
    new KeyPressListener("Enter", () => {
      //Is there a person here to talk to?
      this.map.checkForActionCutscene();
      this.map.checkForPick();
    });

    new KeyPressListener("Tab", () => {
      //Is there a person here to talk to?
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([{ type: "inventory" }]);
      }
    });

    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([{ type: "pause" }]);
      }
    });

    new KeyPressListener("p", () => {
      //Check one space away from current location for picking up object.
      //Add object counter to inventory
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "protag") {
        //Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();

    this.bindActionInput();
    this.bindHeroPositionCheck();
    console.log(this.map.pick);

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
    this.map.startCutscene([
      // { who: "protag", type: "walk", direction: "down" },
      // { who: "protag", type: "walk", direction: "down" },
      // { who: "npc1", type: "walk", direction: "down", time: 800 },
      {
        type: "textMessage",
        text: "Welcome to The Giving Garden! Your mission is to collect items, craft goods, and gift those goods. Press next.",
      },

      {
        type: "textMessage",
        text: "Start moving by pressing the arrow or WASD keys.",
      },
    ]);
  }
}
