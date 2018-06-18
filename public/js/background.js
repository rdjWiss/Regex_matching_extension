chrome.browserAction.setBadgeText({ text: 'ON' });
chrome.storage.local.set({onoff: 'ON'})

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        chrome.tabs.get(sender.tab.id, function(tab) {
            if (chrome.runtime.lastError) {
                return; // the prerendered tab has been nuked, happens in omnibox search
            }
            if (tab.index >= 0) { // tab is visible
               // chrome.browserAction.setBadgeText({tabId:tab.id, text:message.badgeText});
               // chrome.browserAction.setBadgeText({ text: 'ON' });
               chrome.storage.local.get(['onoff'], function(object) {
                    chrome.browserAction.setBadgeText({ text: object.onoff });
               });
            } else { // prerendered tab, invisible yet, happens quite rarely
                var tabId = sender.tab.id, text = message.badgeText;
                chrome.webNavigation.onCommitted.addListener(function update(details) {
                    if (details.tabId == tabId) {
                        //chrome.browserAction.setBadgeText({tabId: tabId, text: text});
                        chrome.browserAction.setBadgeText({ text: 'ON' });
                        chrome.webNavigation.onCommitted.removeListener(update);
                    }
                });
            }
        });

        if (message.type == "notification"){
          chrome.browserAction.getBadgeText({}, function(result) {
                chrome.browserAction.setBadgeText({ text: ""+message.nombre });
                //sendResponse({farewell: 'result.tex'});
                sendResponse()
            });
          
        }

        
});
  // to run the script 
    var script = document.createElement('script');
    script.src = 'jquery-1.11.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);  
