class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "assets/images/characters/sprite01.png",
    });
  }

  update() {

  }
}

class PickApple extends GameObject {
  
  constructor(config) {
    
    super(config);
    this.sprite = new Sprite({
      gameObject: this,
      src: "/assets/images/food/Apple.png",
      animations: {
        "used-down"   : [ [0,0] ],
        //"unused-down" : [ [1,0] ],
      },
      currentAnimation: "used-down"  
    });
    this.storyFlag = config.storyFlag;
    this.fruits=config.fruits

     this.talking = [
       {
         required: [this.storyFlag],
         events: [
           { type: "textMessage", text: "You have already used this." },
         ]
       },
       {
         events: [
           { type: "textMessage", text: "Approaching an apple..." },
           { type: "craftingMenu", pizzas: this.fruits },
           { type: "addStoryFlag", flag: this.storyFlag },
         ]
       }
     ]
    
  }
  // update() {
  //   this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag]
  //   ? "used-down"
  //   : "unused-down";
  // }
}
class PickStrawberry extends GameObject {
  
  constructor(config) {
    
    super(config);
    this.sprite = new Sprite({
      gameObject: this,
      src: "/assets/images/food/Strawberry.png",
      animations: {
        "used-down"   : [ [0,0] ],
       // "unused-down" : [ [1,0] ],
      },
      currentAnimation: "used-down"  
    });
    this.storyFlag = config.storyFlag;
    this.fruits=config.fruits

     this.talking = [
       {
         required: [this.storyFlag],
         events: [
           { type: "textMessage", text: "You have already used this." },
         ]
       },
       {
         events: [
           { type: "textMessage", text: "Approaching a Strawberry..." },
           { type: "craftingMenu", fruits: this.fruits },
           { type: "addStoryFlag", flag: this.storyFlag },
         ]
       }
     ]
    
  }
  //  update() {
  //    this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag]
  //    ? "used-down"
  //    : "unused-down";
  //  }
}
class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    }
  }

  update(state) {
    this.updatePosition();
    this.updateSprite(state);

    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }

  updateSprite(state) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
      this.sprite.setAnimation("idle-"+this.direction);
      return;
    }
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-"+this.direction);
    }
  }

}