function toggle_visibility(element) {
  if (element.children[0].style.display == "none") {
    element.children[0].style.display = "block";
    element.style.backgroundImage = "none";
  }
  else {
    element.children[0].style.display = "none";
    element.style.backgroundImage = "url('./icons/chat.svg')";
  }
}

function click_button(element) {
  const text = element.value;
  console.log(text);
}

document.getElementById("header_chat_text").style.display = "none";
