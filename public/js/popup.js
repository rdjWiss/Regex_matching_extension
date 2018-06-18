/*
function displayStoredRegEx(){
    chrome.storage.local.get(['regex'], function(object) {
    console.log('Storedregex',object.regex)
    document.getElementById('regexStored').innerHTML = object.regex

}

displayStoredRegEx()*/

//Traitement du key presse sur le champ de recherche par regex 
function handleTextPress() {
  var checkbox=document.getElementById("onOff");
   if (checkbox.checked==true){
        var regex=document.getElementById('wordSearch').value //récupérer l'expression régulière à rechercher
        chrome.storage.local.set({regex: regex});//Stockage local pour rechercher auto. ultérieurement

        document.getElementById('regexStored').innerHTML = regex//Afficher l'expression régulière

        //Récupérer le choix du user: sensibilité à la casse ou non
        var casse=false
        if(document.getElementById("casse").checked) casse=true
        chrome.storage.local.set({casse: casse});

        //Envoi de la requete pour traitement
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, 
                                {action: "search",
                                 regex:regex,
                                 case : casse },
                                 function(response) {
                                    //Récupérer le nombre d'occurrence et l'afficher
                                    chrome.browserAction.setBadgeText({"text": ""+response.number});                   
                                 });  
        });
  }
}

//Ajout de l'event listener du keyup
var input = document.getElementById("wordSearch");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        handleTextPress();
    }
});  

//Traitement de l'evenement clear: remove tous le highlighting
function handleClearRegex() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, 
        {action: "clear" },
         function(response) {
            chrome.browserAction.setBadgeText({"text": ""});                 
         });  
    });
}

var clear = document.getElementById("clear")
clear.addEventListener("click", function(event) {
    handleClearRegex()
});  

    // to detect the effect of checkbox to Enable and disable the features of
// the extension with an effect on the icon of the extension.
window.onload = function(){
    var checkbox=document.getElementById("onOff");

    //Modifier l'état du checkbox on/off selon l'état sauvegardé
    chrome.storage.local.get(['onoff'], function(object) {
        if(object.onoff == 'ON')  checkbox.checked = true
            else checkbox.checked = false
   });

   checkbox.onchange =function (){
         if (checkbox.checked==true)
         {  
            chrome.browserAction.setBadgeText({ text: 'ON' });
            chrome.storage.local.set({onoff: 'ON'});//Sauvegarder nouveau état ON
         }
         if (checkbox.checked==false)
         {
            chrome.browserAction.setBadgeText({ text: 'OFF' });
            chrome.storage.local.set({onoff: 'OFF'});//Sauvegarder nouveau état OFF
            handleClearRegex()
         }
    }
};


