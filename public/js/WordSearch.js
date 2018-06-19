window.onload=function(){
  
  chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'search') { //The message was recEived
       $("body").removeHighlight() //To remove the previous highlight

       numbr=highlight(msg.regex,true,msg.case) //this is a call to the function which will highlight the given word in the active page
        sendResponse({
          number:numbr // to send the number of occurrence to popup.js script
        })
    }else if(msg.action == 'clear'){
      $("body").removeHighlight() //Remove all highlight
    }else{
        alert("unknown command")
    }
    return true
  });

  window.addEventListener("message", function(e) { // to add event listner for the event e 
      // We only accept messages from this window to itself [i.e. from any iframes]
      if (e.source != window)
        return;
      if (e.data.type && (e.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT")) {        
          chrome.runtime.sendMessage(e.data); // send to rest of extension, or could just send event.data.payload
      } // else ignore messages seemingly not sent to yourself
  }, false);   

  //TODO: REMOVE!!
  window.postMessage({ type: "FROM_PAGE_TO_CONTENT_SCRIPT", 
   text: "Hello from the webpage!" }, "*");

  var expression=/[0-9-()+]+$/

  
  //Redifintion of the function that will highlight the found words
  function highlight(regex,ignore,casse){     
      result= $("body").highlight(regex,ignore,casse);
    return result
  }

  //Activer la recherche auto. lorsque la page se charge, selon la regex précédente
  chrome.storage.local.get(['regex','casse'], function(object) {
    if(object.regex != undefined && object.regex != ""){
       numbr=highlight(object.regex,true,object.casse)
       console.log('numbre',numbr)

       chrome.runtime.sendMessage({type: "notification", nombre:numbr}, function(response) {
          console.log("response");
        });
    }
  });
}
