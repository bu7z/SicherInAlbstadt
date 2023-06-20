
const rcvClass1 = "chat_bubble";
const rcvClass2 = "chat_bubble_received";
const sndClass1 = "chat_bubble";
const sndClass2 = "chat_bubble_sent";
// message: userID -> someoneID; someoneID is for now a fixed variable (kind of)
// TODO: Create more dynamic someoneID gathering


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}


const sndID = parseJwt(document.cookie)["user_id"]
var rcvID;

// scroll down chat window to bottom
function autoscroll() {
  element_chat_window.scrollTop = element_chat_window.scrollHeight;
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


const getMessages = async(event)=>{

  var bubbles = document.getElementById('chat_main');
  bubbles.innerHTML = '';

  rcvID = event.target.id;
  console.log(rcvID);

  try{
    console.log("test");
    const response = await fetch(`/messages/${sndID}/${rcvID}`,{
      method: 'GET',
      credentials: 'include',
    });
    if(!response.ok){
      if(response.status === 401){
        return new Error('an error has accured');
      }
      throw new Error(`${response.status} ${response.statusText}`)
    }
    result = await response.json()
    console.log(result);
    for(let i = 0; i<result.length; i++){
      let div = document.createElement('div');
      let div2 = document.createElement('div');
      // adding corresponding classNames
      if (result[i]["sender_id"] === sndID){
        div.classList.add(sndClass1);
        div.classList.add(sndClass2);
      }else{
        div.classList.add(rcvClass1);
        div.classList.add(rcvClass2);
      }
      // finalizing the chat-bubble content and position
      div2.innerHTML = result[i]["text"];
      document.getElementById('chat_main').appendChild(div);
      div.appendChild(div2);
      autoscroll();
    }

  } catch(err) {
    console.log(err);
  }
}


//Load all Conversations
const getChats = async()=>{
  try{
    console.log("test");
    const response = await fetch(`/convos`,{
      method: 'GET',
      credentials: 'include',
    });
    if(!response.ok){
      if(response.status === 401){
        return new Error('an error has accured');
      }
      throw new Error(`${response.status} ${response.statusText}`)
    }
    result = await response.json()
    console.log(result);
    for(let i = 0; i<result.length; i++){
      let div = document.createElement('div');
      div.addEventListener("click", getMessages);
      div.addEventListener("click", getUser2);
      let div2 = document.createElement('div');


      // adding corresponding classNames
      div.classList.add("chat_list_element");
      var receiver = result[i]["user_id"]
      div.setAttribute('id',receiver);

      div2.innerHTML = result[i]["username"];
      document.getElementById('chat_list').appendChild(div);
      div.appendChild(div2);

      
    }

  } catch(err) {
    console.log(err);
  }
}


// New Chat
const getUser = async()=>{

  var reqUser = document.getElementById('uname').value;
  console.log(reqUser);
  try{
    const response = await fetch(`/users/${reqUser}`,{
      method: 'GET',
      credentials: 'include',
    });
    if(!response.ok){
      
      if(response.status === 401){
        return new Error('an error has accured');
      }
      throw new Error(`${response.status} ${response.statusText}`)
    }
    result = await response.json()
    console.log(result);
    for(let i = 0; i<result.length; i++){
      console.log()

      let div = document.createElement('div');
      let div2 = document.createElement('div');
      // adding corresponding classNames

      div.classList.add("chat_list_element");
      var receiver = result[i]["user_id"]
      div.setAttribute('id',receiver);

      div2.innerHTML = result[i]["username"];
      document.getElementById('chat_list').appendChild(div);
      div.appendChild(div2);

      div.addEventListener("click", getMessages);
      
    }

  } catch(err) {
    console.log(err);
  }
}


// set Username in Chatwindow
const getUser2 = async(event)=>{

  reqUser = event.target.innerHTML;
  console.log("USERID:" + event.target.id);
  console.log(reqUser);
  try{
    const response = await fetch(`/users/${reqUser}`,{
      method: 'GET',
      credentials: 'include',
    });
    if(!response.ok){
      
      if(response.status === 401){
        return new Error('an error has accured');
      }
      throw new Error(`${response.status} ${response.statusText}`)
    }
    result = await response.json()
    console.log(result);
    document.getElementById("chat_header_name").innerHTML = result["user_id"];

  } catch(err) {
    console.log(err);
  }
}





  
// sending a message
function sendMyMessage(){
  var msgbody = document.getElementById('chat_input_field').value
  if(msgbody){
    console.log(msgbody);
    fetch("/sndMsg", {
      method : "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: msgbody,
        sender_id: sndID,
        reciever_id: rcvID
      })
    })
  }else{
    console.log("empty message - not send")
  }

  
}








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

  getChats();









  
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


document.getElementById("header_chat").addEventListener("click", () => {
  document.getElementById("dialog").showModal();
});

document.getElementById("abbruch").addEventListener("click", () => {
  document.getElementById("dialog").close();
});
