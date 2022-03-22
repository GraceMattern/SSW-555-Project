class PickApple extends GameObject {
  
    constructor(config) {
      
      super(config);
      this.sprite = new Sprite({
        gameObject: this,
        src: "/images/food/tree.png",
        animations: {
          "idle-up"   : [ [0,0] ],
          "idle-down" : [ [1,0] ],
        },
       
      });
  
  

  }}