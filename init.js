(function () {
  const canvas = document.getElementById("gc");
  const ctx = canvas.getContext("2d");
  const ts = new Image(60, 45);

  ts.onload = () => {
    ctx.drawImage(ts, 0, 0, canvas.width, canvas.height);
  };

  ts.src = "/assets/images/maps/ss.png";

  var btn = document.getElementById("btn");
  btn.innerHTML = "Start Game";

  //init local storage
  inventory = {
    sage: 0,
    apple: 0,
    strawberry: 0,
    leeks: 0,
    herb: 0, //added by sv
    wheat: 0,
    tomato: 0, //added by hs
    herbalSachet: 0,
    jam: 0,
    fruitBowl: 0,
    wreath: 0,
  };
  localStorage.setItem("inventory", JSON.stringify(inventory));

  btn.addEventListener("click", () => {
    btn.hidden = true;
    var difficultyLevel = document.getElementById("levels").value;
    const overworld = new Overworld({
      element: document.querySelector(".game-container"),
      playerName: prompt("Enter the name of the player."),
      difficulty: difficultyLevel,
    });
    document.getElementById("levelContainer").style.display = "none";
    overworld.init();
  });
})();
