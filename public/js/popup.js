

//To handle the key press so to send the typed text to be handle in textSearch.js function
function handleTextPress() {
     var checkbox=document.getElementById("onOff");
       if (checkbox.checked==true)
    {
        var tex=document.getElementById('wordSearch').value //to get the typed value
        var casse=false
        if(document.getElementById("casse").checked) casse=true

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, 
                                {action: "search",
                                 regex:tex,
                                 case : casse },
                                 function(response) {
                                    //this 2 lines to show the number of time the word appears
                                    chrome.browserAction.setBadgeText({"text": ""+response.number});
                                   // chrome.browserAction.setBadgeBackgroundColor({color:'#FF0000'});                   
                                 });  
        });
    }
  }


//To get the enter key press event
var input = document.getElementById("wordSearch");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
     handleTextPress();
    }
});  

var clear = document.getElementById("clear")
clear.addEventListener("click", function(event) {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, 
        {action: "clear" },
         function(response) {
            //this 2 lines to show the number of time the word appears
            chrome.browserAction.setBadgeText({"text": ""});
           // chrome.browserAction.setBadgeBackgroundColor({color:'#FF0000'});                   
         });  
    });
   
});  

    // to detect the effect of checkbox to Enable and disable the features of
// the extension with an effect on the icon of the extension.
window.onload = function(){
    var checkbox=document.getElementById("onOff");
    chrome.storage.local.get(['onoff'], function(object) {
        if(object.onoff == 'ON')  checkbox.checked = true
            else checkbox.checked = false
   });

   checkbox.onchange =function (){
         if (checkbox.checked==true)
         {  
            chrome.browserAction.setBadgeText({ text: 'ON' });
            chrome.storage.local.set({onoff: 'ON'});
         }
         if (checkbox.checked==false)
         {
            chrome.browserAction.setBadgeText({ text: 'OFF' });
            chrome.storage.local.set({onoff: 'OFF'});
         }
    }
};


