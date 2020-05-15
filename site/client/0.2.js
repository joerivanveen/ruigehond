"use strict";
console.log('Javascript file loaded');
window.user_interacted = false;

function retval(x) {
    return (x * x * x) - (10 * x); // function designed with https://www.desmos.com/calculator
}

if (document.readyState !== 'loading') {
    startPage();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        startPage();
    });
}
function scrollnext() { /* temporary */
    window.scrollTo({top: window.height * 2.5, left: 0, behavior: 'smooth'});
}

window.onresize = function(){
    window.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};

function startPage() {
    // set some global vars
    window.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // start at the top, the browser may still restore scroll position after this
    window.scrollTo(0, 0);
    // initialize parallax
    console.log('Initializing parallax');
    var x = document.getElementsByClassName('parallax');
    for (var i = 0; i < x.length; ++i) {
        if (!document.getElementById('parallax' + i)) { // make sure you only clone them once
            var el = x[i];
            var clone = el.cloneNode(true);
            clone.id = 'parallax' + i; //  check for this so you only clone them once
            clone.classList.remove('parallax');
            clone.classList.add('parallax_clone');
            clone.style.position = 'absolute';
            clone.style.left = '0px';
            el.parentNode.insertBefore(clone, el);
            el.previousSibling.style.visibility = 'visible';
        }
    }
    // start handling parallax onscroll
    window.addEventListener("scroll", function (event) {
        var x = document.getElementsByClassName('parallax');
        if (!window.user_interacted) {
            window.user_interacted = true;
        }
        for (var i = 0; i < x.length; ++i) {
            var el = x[i];
            var loc = el.getBoundingClientRect();
            if (loc.top < window.height && loc.bottom > 0) {
                var balance = 7 * ((((loc.height / 2) + loc.top) / window.height) - .5);
                var m = Math.round(retval(balance) * window.height / 100);
                el.previousSibling.style.marginTop = m + 'px';
                /*if (i === 0) {
                    console.log(loc.top + ' < ' + window.height + ' && ' + loc.bottom + ' > 0');
                    console.log(balance + ' | ' + m);
                }*/
            }
        }
        // TODO add some stickyness to the centered parallax items while scrolling
    }, false);
    // load video please
    var video = document.getElementById("bgvid");
    var source = document.createElement("source");
    source.setAttribute("src", video.getAttribute('data-webm'));
    video.appendChild(source);
    source = document.createElement("source");
    source.setAttribute("src", video.getAttribute('data-mp4'));
    video.appendChild(source);
    video.oncanplay = function () {
        /**
         * start waiting for user input, if nothing happens show the user our logo
         */
        window.setTimeout(function () {
            if (pageYOffset < 50) {
                window.scrollTo({top: window.height * .95, left: 0, behavior: 'smooth'});
            }
        }, 8000);
    };
    // don't forget to add muted="muted" to the html attributes or it won't play
    video.play();
}