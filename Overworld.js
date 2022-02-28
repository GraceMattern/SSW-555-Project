class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    // storing playername inside this.playerName
    this.playerName =
      config.playerName.length < 1 ? "DefaultName" : config.playerName;
  }

  init() {
    const bg = new Image();
    bg.onload = () => {
      this.ctx.drawImage(bg, 0, 0);
    };
    bg.src = "/assets/images/maps/map_3.png";

    //Game Objects
    const protag = new GameObject({
      x: 5,
      y: 6,
    });
    const npc1 = new GameObject({
      x: 0,
      y: 0,
      src: "/assets/images/characters/sprite02.png",
    });

    // draw game obj
    setTimeout(() => {
      protag.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  }
}
