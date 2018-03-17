// De minimis non curat lex.

// For more info:
// http://blog.aloodo.org/

var aloodoTpWarning = `<p>It looks like you have set up your ad blocker
to block third-party tracking.  However, some kind of suspicious whitelisting
is in effect and your choice is not being applied.`;

// Replace main page content  if detected
function abMessage() {
        var be = document.getElementById('pagebody')
        var msg = `<div id="blockWarning"><div id="content">
        <h1>Who is your ad&nbsp;blocker working&nbsp;for?</h1>`
        
	+ aloodoTpWarning +

	`<ul><li>If you are running Adblock Plus, please uncheck the
	box labeled <a href="http://blog.aloodo.org/posts/consumer-privacy-tool-not-so-much/">"Allow some non-intrusive advertising".</a></li>

	<li>Turn on an a free <a
	href="http://www.aloodo.org/protection/">tracking
	protection</a>.</li>

	</ul>
	
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

function abDetected() {
	if (window.ga && ga.loaded) {
		abMessage();
	}
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

function abCheckSetup() {
	if (document.getElementById('harmlessJS') {
		return;
	}
	var el = document.createElement('script');
	el.src = '/js/harmless.js';
	el.id = 'harmlessJS';
	el.onload = abCheckSetup;
	document.head.appendChild(el);
	setTimeout(abCheck, 5000)
	if(typeof aloodo === 'object') {
    		aloodo.onLoad(trackerDetected);
	}
}

function trackerDetected() {
	aloodoTpWarning = `<p>Your ad blocker is not configured
	to block third-party tracking.</p>`;
}

window.addEventListener('load', abCheckSetup, false)

