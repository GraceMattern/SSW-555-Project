const utils = {
  withGrid(n) {
    return n * 16;
  },
  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },
  //
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }
    return { x, y };
  },
  oppositeDirection(direction) {
    if (direction === "left") {
      return "right";
    }
    if (direction === "right") {
      return "left";
    }
    if (direction === "up") {
      return "down";
    }
    return "up";
  },

  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail,
    });
    document.dispatchEvent(event);
  },

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

  inventoryHTML(inventory) {
    return `
    <div class="progressSoFar">
      <table>
          <tbody>
          <tr>
          <td><img class="header-img" src="/assets/images/food/thumbnails/Fruit_bowl-thumb.png"/></td>
          <td><span id="fruitBowlContainer">${inventory.fruitBowl}</span></td>

          <td><img class="craft-item" src="/assets/images/food/thumbnails/apple-thumb.png" alt="apple" /></td>
          <td>${inventory.apple}</td>
          <td><img class="craft-item" src="/assets/images/food//thumbnails/Strawberry-thumb.png" alt="strawberry" /> </td>
          <td>${inventory.strawberry}</td>
          </tr>
          <tr>
          <td><img class="header-img" src="/assets/images/food/thumbnails/Herbal_sachet-thumb.png"/></td>
          <td><span id="herbalSachetContainer">${inventory.herbalSachet}</span></td>
          <td><img class="craft-item" src="/assets/images/food/thumbnails/Leek-thumb.png" alt="apple" /></td>
          <td>${inventory.leeks}</td>
          <td><img class="craft-item" src="/assets/images/food//thumbnails/sage-thumb.png" alt="strawberry" /> </td>
          <td>${inventory.herb}</td>
          </tr>
          <tr>
          <td><img class="header-img" src="/assets/images/food/thumbnails/Soup-thumb.png"/></td>
          <td><span id="souptContainer">${inventory.soup}</span></td>
          <td><img class="craft-item" src="/assets/images/food/thumbnails/Tomato-thumb.png" alt="apple" /></td>
          <td>${inventory.tomato}</td>
          <td><img class="craft-item" src="/assets/images/food//thumbnails/Leek-thumb.png" alt="strawberry" /> </td>
          <td>${inventory.leeks}</td>
          </tr>
          <tr>
          <td><img class="header-img" src="/assets/images/food/thumbnails/Pie-thumb.png"/></td>
          <td><span id="pieContainer">${inventory.pie}</span></td>
          <td><img class="craft-item" src="/assets/images/food/thumbnails/apple-thumb.png" alt="apple" /></td>
          <td>${inventory.apple}</td>
          <td></td>
          <td></td>
          </tr>
          <tr>
          <td><img class="header-img" src="/assets/images/food/thumbnails/Jam-thumb.png"/></td>
          <td><span id="jamContainer">${inventory.jam}</span></td>
          <td><img class="craft-item" src="/assets/images/food/thumbnails/apple-thumb.png" alt="apple" /></td>
          <td>${inventory.apple}</td>
          <td><img class="craft-item" src="/assets/images/food//thumbnails/Strawberry-thumb.png" alt="strawberry" /> </td>
          <td>${inventory.strawberry}</td>
          </tr>
          </tbody>
        </table>
  `;
  },
};
