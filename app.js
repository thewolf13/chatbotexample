class Chatbot{
    constructor(vars){
        this.args = vars

        this.state = false;
        this.messages=[];
    }

    display(){
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', ()=> this.toggleState(chatBox))
        sendButton.addEventListener('click', ()=> this.onSendButton(chatBox))
        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({key})=>{
            if(key==='Enter'){
                this.onSendButton(chatBox)
            }
        })

    }

    toggleState(chatBox){
        this.state = !this.state;

        if(this.state){
            chatBox.classList.add('chatbox--active')

        }else{
            chatBox.classList.remove('chatbox--active')

        }
    }

    // onSendButton(chatbox){
    //     var textField = chatbox.querySelector('input');
    //     let text1 = textField.value
    //     if(text1 === ""){
    //         return;
    //     }
    //     let msg1 = {name : "User", message: text1 }
    //     this.messages.push(msg1);

    //     var xhr = new XMLHttpRequest();
    //     var url = "http://127.0.0.1:5000/predict";
    //     xhr.open("POST", url, true);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             var json = JSON.parse(xhr.responseText);
    //             var outputText = json.answer;
    //             let msg2 = {name:    "Sam", message : outputText }
    //             this.messages.push(msg2);
    //             this.updateChatText(chatbox)
    //             textField.value='';
    //         }
    //     };
    //     //var data = JSON.stringify({"query": query});
    //     var data = JSON.stringify({message:text1})
    //     xhr.send(data);
    // }

    onSendButton(chatbox){
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if(text1 === ""){
            return;
        }
        let msg1 = {name : "User", message: text1 }
        this.messages.push(msg1);
        // 'htt[://127.0.0.1:5000/predict
        fetch("https://chatbotapi-production-edb0.up.railway.app"+'/predict',{
            method:'POST',
            body: JSON.stringify({message:text1}),
            mode :'cors',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then(r=>r.json())
        .then(r => {
            let msg2 = {name: "Sam", message: r.answer};
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value=''
        }).catch((error)=>{
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value=''
        });
    }

    updateChatText(chatbox){
        var html = '';
        this.messages.slice().reverse().forEach(function(item){
            if(item.name==="Sam"){
                html += '<div class = "messages__item messages__item--visitor">'+item.message+'</div>'
            }else{
                html += '<div class = "messages__item messages__item--operator">'+item.message+'</div>'

            }
        });
        const chatMessage = chatbox.querySelector('.chatbox__messages');
        chatMessage.innerHTML = html;
    }


}


const vars = {
    openButton: document.querySelector('.chatbox__button'),
    chatBox: document.querySelector('.chatbox__support'),
    sendButton: document.querySelector('.send__button'),
}
const chatbox = new Chatbot(vars);
chatbox.display();
