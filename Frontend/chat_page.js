
const rcvClass1 = "chat_bubble";
const rcvClass2 = "chat_bubble_received";
const sndClass1 = "chat_bubble";
const sndClass2 = "chat_bubble_sent";
// not sure where we get the userID from (for now)
// message: userID -> someoneID; someoneID is for now a fixed variable
// TODO: Create more dynamic userID and someoneID gathering
const sndID = 5; // is userID
const rcvID = 9; // is someoneID

fetch(`/messages/${sndID}/${rcvID}`, {
    method: 'get',
}).then(response => {
     if (!response.ok) {
         throw new Error('an error accured')
     }
     return response.json()
}).then(msgs => { 
    for(let i = 0; i<msgs.length; i++){
      let div = document.createElement('div');
      let div2 = document.createElement('div');
      // adding corresponding classNames
      if (msgs[i]["sender_id"] === sndID){
        div.classList.add(sndClass1);
        div.classList.add(sndClass2);
      }else{
        div.classList.add(rcvClass1);
        div.classList.add(rcvClass2);
      }
      // finalizing the chat-bubble content and position
      div2.innerHTML = msgs[i]["text"];
      document.getElementById('chat_main').appendChild(div);
      div.appendChild(div2);


      
     // div.classList.add(chat_main);
     // if(msgs[i]["sender_id"] === sndID){
      //  let newMsg = document.create
     // }



      console.log(msgs[i]["text"])
  }
})
  








// need to beautify this shit !!!
// some global elements cause code duplication is shit
let element_chat_window;
let element_input_field;
let element_error_message;

// other global stuff
const error_message = "error: empty message; cannot send!"

document.addEventListener("DOMContentLoaded", () => {
  // get some elements after DOM ready
  element_chat_window = document.getElementById("chat_main");
  element_input_field = document.getElementById("chat_input_field");


  
  // initially hide things
  document.getElementById("header_chat_text").style.display = "none";

  // create error message element
  element_error_message = document.createElement("div");
  const text_node = document.createTextNode(error_message);
	element_error_message.appendChild(text_node);
	element_error_message.id = "div_error_message";

  console.log("DOM ready");
});

// scroll down chat window to bottom
function autoscroll() {
  element_chat_window.scrollTop = element_chat_window.scrollHeight;
}

// rename function; nav change on hover
/*function toggle_visibility(element) {
  if (element.children[0].style.display == "none") {
    element.children[0].style.display = "block";
    element.style.backgroundImage = "none";
  }
  else {
    element.children[0].style.display = "none";
    element.style.backgroundImage = "url('./icons/chat.svg')";
  }
}*/

// show error message if text empty
function set_error_message() {
	element_chat_window.appendChild(element_error_message);
	autoscroll();
}

// hide error message when textarea on focus
function reset_error_message() {
	element_chat_window.removeChild(element_error_message);
}

// send message button
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

    // reset textarea after message sent
    element_input_field.value = "";
  }
}
