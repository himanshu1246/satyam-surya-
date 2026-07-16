var galSliders = [];

/* Extracted Scripts */

function removeLoader(){const loader=document.querySelector(".site--loader-wrapper");if(loader){loader.classList.remove("active");setTimeout(()=>{loader.style.display="none"},500)}}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",removeLoader)}else{removeLoader()}

/* Extracted Scripts */

galSliders.push('gallery-galSider')

/* Extracted Scripts */

const codeGTM = "N4SSK7CN";
		const showSmallChatWindow = "no";
		const isChatbot = "no";
		var sitePrimaryColor = '#AE902F';
	    var countryCode = 'IN';
	    var cbpron = 'IExvZGhhIEJlbGxldnVlIE1haGFsYXhtaSBNdW1iYWkgTmV3';
	    var cbproncomp = '';
	    var CUSTOM_DELAY=5000;
		window.lazySizesConfig = window.lazySizesConfig || {};
		window.lazySizesConfig.init = false;
		const lpSliderCount = 4;
		let priceSliders = [];
		
		let isThanksPage = false;

/* Extracted Scripts */

window.addEventListener("load", (event) => {
			var enableAutoPopupOnMobile = true;
			var isMobile = window.innerWidth <= 768;
			 if (enableAutoPopupOnMobile || !isMobile) {
                var popupElement = document.getElementById('enqPopup');
                if (popupElement) {
                    var enqPopup = new bootstrap.Modal(popupElement);
                    setInterval(() => {
                        if (sessionStorage.getItem('hasEnquired') !== 'true' && !popupElement.classList.contains('show')) {
                            enqPopup.show();
                        }
                    }, 10000);
                    setTimeout(() => {
                        if (sessionStorage.getItem('hasEnquired') !== 'true' && !popupElement.classList.contains('show')) {
                            enqPopup.show();
                        }
                    }, 5000);
                }
			}
		});

/* Extracted Scripts */

// Robust WhatsApp Link Interceptor for Chatbots & Shadow DOM
(function() {
    // 1. Override window.open
    var originalWindowOpen = window.open;
    window.open = function(url, windowName, windowFeatures) {
        if (typeof url === 'string' && url.toLowerCase().includes('api.whatsapp.com/send')) {
            url = url.replace(/phone=\d+/, 'phone=919075060900');
        }
        return originalWindowOpen(url, windowName, windowFeatures);
    };

    // 2. Intercept all clicks (including Shadow DOM via composedPath)
    document.addEventListener('click', function(e) {
        var path = e.composedPath ? e.composedPath() : (e.path || [e.target]);
        for (var i = 0; i < path.length; i++) {
            var el = path[i];
            if (el && el.tagName && el.tagName.toLowerCase() === 'a' && el.href) {
                if (el.href.toLowerCase().includes('api.whatsapp.com/send')) {
                    el.href = el.href.replace(/phone=\d+/, 'phone=919075060900');
                }
                break;
            }
        }
    }, true);
})();

/* Extracted Scripts */

document.addEventListener('click', function(e) {
    if (e.target.closest('.glightbox') || e.target.closest('[data-bs-toggle="modal"]') || e.target.closest('.btn-close')) {
        setTimeout(() => {
            if (document.activeElement) document.activeElement.blur();
        }, 10);
    }
});