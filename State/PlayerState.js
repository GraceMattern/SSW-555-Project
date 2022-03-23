class PlayerState {
  constructor() {
    this.fruits = {
      "Apple": {
        fruitId: "A1",
        hp: 1,
        maxHp: 50,
        xp: 90,
        maxXp: 100,
        level: 1,
        status: null,
      },
      "Strawberry": {
        fruitId: "SB1",
        hp: 50,
        maxHp: 50,
        xp: 75,
        maxXp: 100,
        level: 1,
        status: null,
      },
    }
    this.lineup = ["Apple"];
    this.items = [
      { actionId: "item_recoverHp", instanceId: "item1" },
      { actionId: "item_recoverHp", instanceId: "item2" },
      { actionId: "item_recoverHp", instanceId: "item3" },
    ]
    this.storyFlags = {
    };
  }

  addFruit(fruitId) {
    const newId = `p${Date.now()}`+Math.floor(Math.random() * 99999);
    this.Fruits[newId] = {
      fruitId,
      hp: 50,
      maxHp: 50,
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null,
    }
    if (this.lineup.length < 3) {
      this.lineup.push(newId)
    }
    utils.emitEvent("LineupChanged");
    console.log(this)
  }

  swapLineup(oldId, incomingId) {
    const oldIndex = this.lineup.indexOf(oldId);
    this.lineup[oldIndex] = incomingId;
    utils.emitEvent("LineupChanged");
  }

  moveToFront(futureFrontId) {
    this.lineup = this.lineup.filter(id => id !== futureFrontId);
    this.lineup.unshift(futureFrontId);
    utils.emitEvent("LineupChanged");
  }

}
window.playerState = new PlayerState();