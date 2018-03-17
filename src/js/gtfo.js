// De minimis non curat lex.

// For more info:
// http://blog.aloodo.org/posts/faster-cleaner-ad-blocker-blocker/

// Replace main page content with a short version of
// the standard ad blocker lecture.
function abDetected() {
        var be = document.getElementById('pagebody')
        var msg = `<div id="blockWarning"><div id="content">
        <h1>Who is your ad&nbsp;blocker working&nbsp;for?</h1>
        
        <p>This browser appears to be blocking ads, but is
	vulnerable to third-party tracking.  Some ad blockers
	don&apos;t protect your privacy by default, and even
	<a href="http://www.businessinsider.com/google-microsoft-amazon-taboola-pay-adblock-plus-to-stop-blocking-their-ads-2015-2?r=UK&IR=T">charge fees to let targeted ads through</a>.</p>

        <p>Don&apos;t get fooled by ad blockers that sell out
	your personal information.  <strong><a href="http://www.aloodo.org/protection/">Get tracking protection now.</strong></a></p>
        </div></div>`;

        be.innerHTML=msg;

        var h = 1;
        while (window.innerHeight * 0.7 > document.body.offsetHeight) {
                h++;
                be.style.fontSize = h + "px";
        }
        return false;
}

// Check for ad blocking.
function abCheck() {
	if(typeof blockAdBlock === 'undefined') {
		abDetected();
	} else {
		blockAdBlock.onDetected(abDetected);
		blockAdBlock.check();
	}
}

// Delay the ad block check until user can see page
// content for a short time.
function abCheckSetup() {
	setTimeout(abCheck, 5000)
}

// Function called by Aloodo only if a third-party tracker
// can load
function trackerDetected() {
	console.log("tracker detected");
	var el = document.getElementById('harmlessJSaloodo');
	if (el) {
		return;
	}
	var el = document.createElement('script');
	el.src = '/js/harmless.js';
	el.id = 'harmlessJSaloodo';
	el.onload = abCheckSetup;
	document.head.appendChild(el);
}

// Set up tracking protection detection.
if(typeof aloodo === 'object') {
	aloodo.onDetected(trackerDetected);
}
