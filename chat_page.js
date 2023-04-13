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

// need to beautify this shit
function click_button(element) {
  // create inner and outer div and add to chat window
  const div_1 = document.createElement("div");
  const div_2 = document.createElement("div");
  const chat_window = document.getElementById("chat_main");
  const input_field = document.getElementById("chat_input_field");
  const node = document.createTextNode(input_field.value);

  div_2.appendChild(node);
  div_1.appendChild(div_2);

  div_1.classList.add("chat_bubble");
  div_1.classList.add("chat_bubble_sent");

  chat_window.appendChild(div_1);

  // make sure it automatically scrolls down to latest message when send
  chat_window.scrollTop = chat_window.scrollHeight;

  input_field.value = "";
}

document.getElementById("header_chat_text").style.display = "none";
