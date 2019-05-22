// >>> Scroll Limiter
// This file sets a time limter inside a scroll event
// forcing the scroll event function to exicute only once be interval.
// Default limiter set is 100ms.

var scrollTimer, lastScrollFireTime = 0;

$(window).on('scroll', function() {

    var minScrollTime = 100;
    var now = new Date().getTime();

    function processScroll() {
        console.log(new Date().getTime().toString());
    }

    if (!scrollTimer) {
        if (now - lastScrollFireTime > (3 * minScrollTime)) {
            processScroll();   // fire immediately on first scroll
            lastScrollFireTime = now;
        }
        scrollTimer = setTimeout(function() {
            scrollTimer = null;
            lastScrollFireTime = new Date().getTime();
            processScroll();
        }, minScrollTime);
    }
});



//  ****** Implementation *****
// use of the above to change title on scrolling left right at break points
/*
var scrollTimer, lastScrollFireTime = 0;


$('div.scroll.scroll_modal').on('scroll', function() {

    var minScrollTime = 200;
    var now = new Date().getTime();

    function processScroll() {

        var scrollEle     = {};
        scrollEle.One     = document.getElementById('rank-first').getBoundingClientRect();
        scrollEle.Two     = document.getElementById('rank-second').getBoundingClientRect();
        scrollEle.Three   = document.getElementById('rank-third').getBoundingClientRect();
        scrollEle.contDivRect =  document.getElementById('modal-rank-content').getBoundingClientRect()

        var triggerAreaLft = scrollEle.contDivRect.left + scrollEle.contDivRect.width/3;
        var triggerAreaRgt = scrollEle.contDivRect.left + scrollEle.contDivRect.width/2;
        var theTitleCell = document.getElementById('target-cell');

        if(scrollEle.Two.left > triggerAreaRgt && scrollEle.Two.left > triggerAreaRgt){
          console.log(`One stuff ${scrollEle.One}`);
            changeTitle("ENLISTED", theTitleCell)

        } else
          {
            if(scrollEle.Two.left > triggerAreaLft && scrollEle.Two.left < triggerAreaRgt){
            console.log(`Two stuff ${scrollEle.Two}`);
            changeTitle("OFFICER", theTitleCell)

          }
          if(scrollEle.Three.left > triggerAreaLft && scrollEle.Three.left > triggerAreaRgt){
            console.log(`Two stuff ${scrollEle.Two}`);
            changeTitle("OFFICER", theTitleCell)

          }
          if(scrollEle.Three.left > triggerAreaLft && scrollEle.Three.left < triggerAreaRgt){
            console.log(`Three stuff ${scrollEle.Two}`);
            changeTitle("GENERAL", theTitleCell)

          }
        }
    }
    function changeTitle(newString, domObj){
      if (domObj.innerHTML != newString) {

          domObj.classList.add('change-text');

          setTimeout(()=>{

            domObj.innerHTML = newString;

            domObj.classList.remove('change-text');
        },1000)
      }
    }

    if (!scrollTimer) {
        if (now - lastScrollFireTime > (3 * minScrollTime)) {
            processScroll();   // fire immediately on first scroll
            lastScrollFireTime = now;
        }
        scrollTimer = setTimeout(function() {
            scrollTimer = null;
            lastScrollFireTime = new Date().getTime();
            processScroll();
        }, minScrollTime);
    }
});
*/
