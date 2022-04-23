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

  checkInventory(count) {
    //console.log(inventory);
    console.log("Count", count);
    let inventory = JSON.parse(localStorage.getItem("inventory"));

    if (inventory === null) {
      return console.log("no inventory");
    } else {
      //let inventory = localStorage.getItem("inventory");
      if (
        inventory["fruitBowl"] >= count &&
        inventory["jam"] >= count &&
        inventory["herbalSachet"] >= count &&
        inventory["soup"] >= count &&
        inventory["pie"] >= count
      ) {
        console.log("utils", inventory);
        // const canvas = document.getElementById("gc");
        // const ctx = canvas.getContext("2d");
        // const ts = new Image(60, 45);
        // ts.src = "/assets/images/maps/Victory.png";
        // ctx.drawImage(ts, 0, 0, canvas.width, canvas.height);

        let img = document.createElement("img");
        img.src = "/assets/images/maps/Victory.png";
        img.style.position = "absolute";
        img.style.zIndex = "3";
        document.getElementsByClassName("game-container")[0].appendChild(img);

        const restartDiv = document.createElement("div");
        restartDiv.id = "restartDiv";
        restartDiv.style.zIndex = "4";
        restartDiv.style.position = "absolute";

        document
          .getElementsByClassName("game-container")[0]
          .appendChild(restartDiv);

        const restartButton = document.createElement("button");
        restartButton.id = "restartBtn";
        restartButton.innerHTML = "RESTART";
        // restartButton.style.zIndex = "4";
        restartButton.style.marginRight = "1rem";

        // restartButton.style.position = "absolute";

        restartButton.addEventListener("click", function () {
          window.location.reload(true);
        });
        document.getElementById("restartDiv").appendChild(restartButton);

        const quitButton = document.createElement("button");
        quitButton.id = "quitBtn";
        quitButton.innerHTML = "QUIT";
        // quitButton.style.zIndex = "4";
        // quitButton.style.position = "absolute";

        quitButton.addEventListener("click", function () {
          window.close();
        });
        document.getElementById("restartDiv").appendChild(quitButton);

        return console.log("Everything crafted");
      }
      return console.log("Not everything crafted yet");
    }
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
          <td><img class="craft-item" src="/assets/images/food//thumbnails/sage-thumb.png" alt="strawberry" /> </td>
          <td>${inventory.herb}</td>
          </tr>
          <tr>
          <td><img class="header-img" src="/assets/images/food/thumbnails/Soup-thumb.png"/></td>
          <td><span id="soupContainer">${inventory.soup}</span></td>
          <td><img class="craft-item" src="/assets/images/food/thumbnails/Tomato-thumb.png" alt="apple" /></td>
          <td>${inventory.tomato}</td>
          <td><img class="craft-item" src="/assets/images/food//thumbnails/Leek-thumb.png" alt="strawberry" /> </td>
          <td>${inventory.leek}</td>
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
          <td><img class="craft-item" src="/assets/images/food//thumbnails/Strawberry-thumb.png" alt="strawberry" /> </td>
          <td>${inventory.strawberry}</td>
          </tr>
          </tbody>
        </table>
  `;
  },
};
