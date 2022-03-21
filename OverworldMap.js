//create game objects
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
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0);
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
    lowerSrc: "assets/images/maps/map_3.png",
    // upperSrc: "", // TODO
    gameObjects: {
      protag: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npc1: new Person({
        x: utils.withGrid(0),
        y: utils.withGrid(0),
        src: "/assets/images/characters/sprite02.png",
        // behaviorLoop: [
        //   // { type: "stand", direction: "left", time: 800 },
        //   // { type: "stand", direction: "right", time: 1200 },
        // ],
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
