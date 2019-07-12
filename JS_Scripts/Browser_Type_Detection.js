// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@@cc_on!@@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

// ********** Look for the CSS code in File Cabinet that modifies when mobile divice is rotated

//**** This section will change a stylesheet. See more notesbelow ****
//           if(isIE || isChrome || isEdge)
//           {
// $("#size-stylesheet").attr("href", "/CSS/Chrome-Styles.css");
//           }
//           else
//           {
// $("#size-stylesheet").attr("href", "/CSS/MainStyles-Dark.css");
//           }


// This code will check for the type of the type of browser.
// Originally this was changing the stylesheet via altering the following
// link: <link id="size-stylesheet" rel="stylesheet" type="text/css" href="~/CSS/empty.css" />
// If you want to use it to change anything just link it in just as
// the commented out section does.
