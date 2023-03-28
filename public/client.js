const socket = io()

let username;
do {
    username = prompt("Your Good Name is : ")
} while (!username);

let textarea = document.querySelector("#textarea");
let message_box = document.querySelector(".message-box");
let messageBtn = document.querySelector("#msgBtn");


messageBtn.addEventListener("click", () => {
    if (textarea.value == "") {
        alert("Please Enter message before send  :)")
    }
    else {
        sendMessage(textarea.value);
    }
});


sendMessage = (message) => {
    let msg = {
        user: username,
        message: message.trim()
    }

    //append in DOM
    appendMessage(msg, 'outgoing')
    textarea.value = "";
    scrollToBottom();

    //send data to the server by socket
    socket.emit('message', msg);

}

appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    let ClassName = type;
    mainDiv.classList.add(ClassName, 'message');

    let htmlMarkup = `
    <h3>${msg.user}</h3>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = htmlMarkup;
    message_box.appendChild(mainDiv);
}

// recieve message/data from server side
socket.on("message", (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

scrollToBottom = () => {
    message_box.scrollTop = message_box.scrollHeight;
}
