(function () {
  const overworld = new Overworld({
    element: document.querySelector(".game-container"),
    playerName: prompt("Enter the name of the player."),
  });
  overworld.init();

  const quitButton = document.createElement("button");
  quitButton.innerHTML = "quit";
  quitButton.onclick = () => {
    alert("Quit successfully- initial");
  };
  document.body.appendChild(quitButton);
})();
