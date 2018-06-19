
/** The source of the code is in this link : https://github.com/tankchintan/highlight-js/blob/master/highlight.js with aujustement to regex search **/
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
          
        let option = "g"
        if(!casse) option+="i"

        var regex = typeof(pat) === "string" ? new RegExp(pat, option) : pat;
        // console.log("regex",regex)   
        var numberOcc=0
        function innerHighlight(node, pat, ignore) {
            var skip = 0;
            if (node.nodeType == 3) {
               
                 var pos = node.data.search(regex);
                 // console.log(node.data)

                if (pos >= 0 && node.data.length > 0) { // .* matching "" causes infinite loop
                    var match = node.data.match(regex); // get the match(es), but we would only handle the 1st one, hence /g is not recommended
                    var spanNode = document.createElement('span');
                    spanNode.className = 'highlight'; // set css
                    var middleBit = node.splitText(pos); // split to 2 nodes, node contains the pre-pos text, middleBit has the post-pos
                    var endBit = middleBit.splitText(match[0].length); // similarly split middleBit to 2 nodes
                    var middleClone = middleBit.cloneNode(true);
                    spanNode.appendChild(middleClone);
                    // parentNode ie. node, now has 3 nodes by 2 splitText()s, replace the middle with the highlighted spanNode:
                    middleBit.parentNode.replaceChild(spanNode, middleBit); 
                    skip = 1; // skip this middleBit, but still need to check endBit
                     numberOcc+=1

                     // console.log('occ',numberOcc,match[0])
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

    //Remove all highlighting
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