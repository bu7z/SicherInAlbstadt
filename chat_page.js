// need to beautify this shit !!!

let element_chat_window;
let element_input_field;
let element_error_message;

document.addEventListener("DOMContentLoaded", () => {
  element_chat_window = document.getElementById("chat_main");
  element_input_field = document.getElementById("chat_input_field");
  element_error_message = document.getElementById("div_error_message");

  element_error_message.style.display = "none";
  document.getElementById("header_chat_text").style.display = "none";

  console.log("DOM ready");
});

// scroll down chat window to bottom
function autoscroll() {
  element_chat_window.scrollTop = element_chat_window.scrollHeight;
}

// rename function; nav change on hover
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

function set_error_message() {
  element_error_message.style.display = "block";
  autoscroll();
}

function reset_error_message() {
  element_error_message.style.display = "none";
}

function click_button(element) {
  // create inner and outer div and add to chat window
  const element_div_outer = document.createElement("div");
  const element_div_inner = document.createElement("div");
  const message = element_input_field.value;
  const node = document.createTextNode(message);

  if (message == "") {
    set_error_message();
  } else {
    element_div_inner.appendChild(node);
    element_div_outer.appendChild(element_div_inner);

    element_div_outer.classList.add("chat_bubble");
    element_div_outer.classList.add("chat_bubble_sent");

    element_chat_window.appendChild(element_div_outer);

    // make sure it automatically scrolls down to latest message when send
    autoscroll();

    element_input_field.value = "";
  }
}
