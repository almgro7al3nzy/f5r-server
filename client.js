const socket = io('https://wv-chat.herokuapp.com');
// const socket = io('http://localhost:3300');
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msgForm');
const nmForm = document.getElementById('nmForm');
var userCurrentName = '';
socket.on('message', mesg => {
    // console.log("[ New ] " +mesg[0] + ": " + mesg[1])
    appendMessages("New", mesg[0], mesg[1])
})
socket.on('output-messages', data => {
    // console.log(data)
    if (data.length) {
        data.forEach(mesg => {
            var d = new Date(mesg.time);
            var text = d.toString();
            appendMessages(timeDiff(text), mesg.name, mesg.message)
        });
    }
})

msgForm.addEventListener('submit', e => {
    e.preventDefault()
    var dt = new Date();
    userCurrentName = (nmForm.cnname.value == '' ? "Anonymous" : nmForm.cnname.value)
    socket.emit('chatmessage', [userCurrentName,msgForm.msg.value, dt.toString()])
    // console.log('submit from msgfrom', msgForm.msg.value)
    msgForm.msg.value = '';
    

})

function appendMessages(time, name,message) {
    const html =`
    <div class="chatCnt">
        <div class="chatTxt">
            <p innerHtml="">${message}</p>
        </div>
        <div class="nameNdate">${name} • ${time} </div>
    </div>
    `
    messages.innerHTML += html
}

var timeDiff = (date1) => {
  
    var d1 = new Date(date1);
    var d2 = new Date()
  
    var diff = new Date(d2.getTime() - d1.getTime());
    
    var dt = 0;
    var st = '';
    
    if(diff.getUTCDate()-1 == 0){
      
      if(diff.getUTCHours() == 0){
        dt  = diff.getUTCMinutes()
        st = 'min'
        if(dt == 0){
          st = 'Just Now'
        }
      }else{
        dt = diff.getUTCHours()
        st = 'hour'
      }
    }else{
      dt = diff.getUTCDate()-1
      st = 'day'
    }
    
    return (st == 'Just Now' ? st : dt + " " + st + (dt == 1 ? "": "s") + " ago")
     
  }
  
//   console.log(timeDiff('2022-09-19T17:09:20.771+00:00'))

// function getMessages() {
// 	// Prior to getting your messages.
//   shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
//   /*
//    * Get your messages, we'll just simulate it by appending a new one syncronously.
//    */
//   // appendMessage();
//   // After getting your messages.
//   if (!shouldScroll) {
//     scrollToBottom();
//   }
// }

// function scrollToBottom() {
//   messages.scrollTop = messages.scrollHeight;
// }

// scrollToBottom();

// setInterval(getMessages, 100);