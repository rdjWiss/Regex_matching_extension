// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var pattern;

chrome.storage.local.get(['words'], function(object) {
  // alert('here')
  if(object.words!= undefined && object.words.length != 0){
    console.log(object.words);
    // let regExp = new RegExp('\\b(' + object.words.join('|') + ')\\b',"gi");
    /*const kSets = [
      {selectors: 'p, span', color: '#f7d68f'},
      {selectors: 'li, td', color: '#89b1ed'},
      {selectors: 'h1, h2, h3, th', color: '#8ae2a0'}
    ];
    for (let set of kSets) {
      let elements = Array.from(document.querySelectorAll(set.selectors));
      for (let element of elements) {
        if (regExp.test(element.innerText))
          
          element.style.backgroundColor = set.color;
      }
    }*/
    // +"(?![^<]*>|[^<>]*<\/[a])"
    let pattern = object.words.join('|');
    let regExp = new RegExp("(?![^<]*>|[^<>]*<\/[a])"+pattern+"(?![^<]*>|[^<>]*<\/[a])","gi");
    console.log(regExp);

    let searchString = document.body.innerHTML;

    var matchArray = [];
     var resultString = "";
     var first=0; var last=0;

     var nbr = 0;

     // find each match
     while((matchArray = regExp.exec(searchString)) != null) {
       last = matchArray.index;
       // get all of string up to match, concatenate
       resultString += searchString.substring(first, last);

       // add matched, with class
       // resultString += "<span class='found' backgroundColor='yellow'>" + matchArray[0] + "</span>";
       resultString += "<mark>" + matchArray[0] + "</mark>";

       nbr++;
       console.log(searchString.substring(last - 5, last), matchArray[0], nbr)
       // chrome.browserAction.setBadgeText({integer: nbr});
       
       // console.log(searchString.substring(first, last), matchArray[0])
       // resultString += "<mark>" + matchArray[0] + "</mark>";
       // console.log(resultString);
       first = regExp.lastIndex;
     }

     // finish off string
     resultString += searchString.substring(first,searchString.length);
     // console.log(resultString)
     document.body.innerHTML = resultString;
     console.log('nb',nbr);
     chrome.runtime.sendMessage({nbr: nbr});
      // walk(document.body,  object.words.join('|'));
  }
  
});
  
