class Sprite {
  constructor(config) {

    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    //Configure Animation & Initial State
    this.animations = config.animations || {
      idleDown: [
        [0,0]
      ]
    }
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  draw(ctx) {
    const x = this.gameObject.x * 16;
    const y = this.gameObject.y * 16;

    this.isLoaded && ctx.drawImage(this.image,
      0, // left cut (col)
      0, // top cut (row)
      48,64, 
      x,y, // position
      48,64 // scale
    )
  }
}