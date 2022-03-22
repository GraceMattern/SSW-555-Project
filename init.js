(function () {
  const canvas = document.getElementById("gc");
  const ctx = canvas.getContext("2d");
  const ts = new Image(60, 45);
  //const logo = new Image()

  ts.onload = () => {
    ctx.drawImage(ts, 0, 0, canvas.width, canvas.height);
  };

  ts.src = "/assets/images/maps/ss.png";
  //logo.src = "/assets/images/logo.png";

  var btn = document.getElementById("btn");
  btn.innerHTML = "Start Game";

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

  const quitButton = document.createElement("button");
  quitButton.innerHTML = "quit";
  quitButton.onclick = () => {
    alert("Quit successfully- initial");
  };
  document.body.appendChild(quitButton);

  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart";
  restartButton.onclick = () => {
    alert("Restart successfully");
    overworld.init();
  };
  document.body.appendChild(restartButton);
})();
