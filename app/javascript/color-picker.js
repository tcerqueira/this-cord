var colorWell;
const defaultColorUser = "#0000fd";

window.addEventListener("load", startup, false);
window.addEventListener("load", defaultColor, false);

function startup() {
    colorWell = document.querySelector("#user-color");
    colorWell.value = defaultColorUser;
    colorWell.addEventListener("input", updateFirst, false);
    colorWell.addEventListener("change", updateAll, false);
    colorWell.select();
  }

  function defaultColor(event)
  {
    var userColor = document.querySelector("#user-bar-color");
    var userColorIcon = document.querySelector("#user-icon");
    if (userColor) {
      userColor.style.backgroundColor = defaultColorUser;
      userColorIcon.style.backgroundColor = defaultColorUser;
    }
  }

  function updateFirst(event) {
    var userColor = document.querySelector("#user-bar-color");
    var userColorIcon = document.querySelector("#user-icon");
  
    if (userColor) {
      userColor.style.backgroundColor = event.target.value;
      userColorIcon.style.backgroundColor = event.target.value;
    }
  }

  function updateAll(event) {
  document.querySelectorAll("#user-bar-color").forEach(function(userColor) {
    userColor.style.backgroundColor = event.target.value;
    userColorIcon.style.backgroundColor = event.target.value;
  });
}