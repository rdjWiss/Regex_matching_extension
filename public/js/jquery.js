
/** The source of the code is in this link : https://github.com/tankchintan/highlight-js/blob/master/highlight.js **/
!function($) {
    $.fn.highlight = function(pat, ignore,casse)
     {    
        
        function replaceDiacritics(str) {
            var diacritics = [ [ /[\u00c0-\u00c6]/g, 'A' ],
                [ /[\u00e0-\u00e6]/g, 'a' ], 
                [ /[\u00c7]/g, 'C' ],
                [ /[\u00e7]/g, 'c' ], 
                [ /[\u00c8-\u00cb]/g, 'E' ],
                [ /[\u00e8-\u00eb]/g, 'e' ], 
                [ /[\u00cc-\u00cf]/g, 'I' ],
                [ /[\u00ec-\u00ef]/g, 'i' ], 
                [ /[\u00d1|\u0147]/g, 'N' ],
                [ /[\u00f1|\u0148]/g, 'n' ],
                [ /[\u00d2-\u00d8|\u0150]/g, 'O' ],
                [ /[\u00f2-\u00f8|\u0151]/g, 'o' ], 
                [ /[\u0160]/g, 'S' ],
                [ /[\u0161]/g, 's' ], 
                [ /[\u00d9-\u00dc]/g, 'U' ],
                [ /[\u00f9-\u00fc]/g, 'u' ], 
                [ /[\u00dd]/g, 'Y' ],
                [ /[\u00fd]/g, 'y' ]
            ];
        
            for ( var i = 0; i < diacritics.length; i++) {
                str = str.replace(diacritics[i][0], diacritics[i][1]);
            }
           return str;
        }
          // console.log("pat",typeof(pat))    
          let option = "g"
          if(!casse) option+="i"

            console.log('casse2',casse,option)
         var regex = typeof(pat) === "string" ? new RegExp(pat, option) : pat;
          console.log("regex",regex)   
         var numberOcc=0
        function innerHighlight(node, pat, ignore) {
            var skip = 0;
            if (node.nodeType == 3) {
                let searchString = (ignore ? replaceDiacritics(node.data) : node.data);

                var found =false

                var matchArray = [];
                 var resultString = "";
                 var first=0; var last=0;

                 var newNode = document.createElement('span');

                // find each match
                 while((matchArray = regex.exec(searchString)) != null) {
                    // console.log("searchString",searchString)

                   last = matchArray.index;
                   // console.log('last',last,matchArray[0]);
                   // get all of string up to match, concatenate

                   var notHighlight =  document.createTextNode(searchString.substring(first, last));
                   var spannode = document.createElement('span');
                    spannode.className = 'highlight';
                    spannode.appendChild(document.createTextNode(matchArray[0] ));

                    newNode.appendChild(notHighlight)
                    newNode.appendChild(spannode)

                    // console.log('Created',notHighlight, spannode, newNode)

                   first = regex.lastIndex;
                   skip = 1;
                    numberOcc+=1
                    // console.log('occ',numberOcc,matchArray[0],node.data )
                 }

                 if(skip ==1){
                    // finish off string
                    var notHighlight =  document.createTextNode(searchString.substring(first,searchString.length));
                     newNode.appendChild(notHighlight)
                     
                     // console.log("NODES", node,newNode)
                     
                     node.replaceWith(newNode)
                 }
                 
            } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    i += innerHighlight(node.childNodes[i], pat, ignore);
                }
            }
            return skip;
        }
        /*return*/ this.length && pat && pat.length ? this.each(function() {
            ignore = typeof ignore !== 'undefined' ? ignore : $.fn.highlight.defaults.ignore;
            innerHighlight(this, pat, ignore);
        }) : this;
        return numberOcc;
    };
    
    $.fn.highlight.defaults = {
        ignore : false
    }

    $.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            with(this.parentNode) {
                replaceChild(this.firstChild, this);
                normalize();
            }
        }).end();
    };
}(window.jQuery);