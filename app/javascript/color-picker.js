var colorPicker;
const defaultColorUser = "#0000fd";

window.addEventListener("load", startup, false);
window.addEventListener("load", defaultColor, false);

function startup() 
{
  colorPicker = document.querySelector("#user-color");
  colorPicker.value = defaultColorUser;
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.addEventListener("change", updateAll, false);
  colorPicker.select();
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

function updateFirst(event) 
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#user-icon");
  
  if (userColor) 
  {
    userColor.style.backgroundColor = event.target.value;
    userColorIcon.style.backgroundColor = event.target.value;
  }
}

function updateAll(event)
{
  var userColor = document.querySelector("#user-bar-color");
  var userColorIcon = document.querySelector("#user-icon");
  userColor.style.backgroundColor = event.target.value;
  userColorIcon.style.backgroundColor = event.target.value;
}
