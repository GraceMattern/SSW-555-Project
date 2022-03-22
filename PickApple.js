class PickApple extends GameObject {
  
    constructor(config) {
      console.log(config)
      super(config);
      this.sprite = new Sprite({
        gameObject: this,
        src: "/images/food/tree.png",
        animations: {
          "idle"   : [ [0,0] ],
          "idle" : [ [1,0] ],
        },
        currentAnimation: "idle"
      });
  
    }

  }