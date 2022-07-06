// ==UserScript==
// @name         Mark as Translated (remove blue dot)
// @namespace    https://github.com/rondevous/Telegram-Translation-QuickHacks/blob/main/tg-lang-stats.user.js
// @description  Activate this if you don't care about translation changes from the base language and you want to mark those strings as translated
// @author       Rondevous
// @include      https://translations.telegram.org/*
// @version      0.0.1
// @run-at       document-end
// @downloadURL  https://github.com/rondevous/Telegram-Translation-QuickHacks/raw/main/mark-as-translated.user.js
// @updateURL    https://github.com/rondevous/Telegram-Translation-QuickHacks/raw/main/mark-as-translated.user.js
// ==/UserScript==

const host = 'https://translations.telegram.org/'


/**
 * Returns elements with class 'form-submit-btn'
 */
function getSubmitBtns () {
  return document.getElementsByClassName('form-submit-btn')
}

/**
 * @returns {number} 0 if translator, else item-number of the last 'form-submit-btn'
 * (works on pages with "Add Translation" button)
 */
function isTranslator () {
  return ((getSubmitBtns().item(0).innerHTML.toString().match('.*Apply') !== null) ? 0 : getSubmitBtns().length - 1)
  // 'Add Translation' form buttons come first if you're translator; else last btn is of Add Translation
}

/**
 * @param {interger} min 
 * @param {interger} max 
 * @returns random integer between min and max
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function markReadStart () {
  console.log("markReadStart()")
  listenMutationTrKeys()
  var rowopen = document.querySelector(".tr-key-row-wrap.open")
  if (rowopen === null) {
    console.log("!rowopen")
    // none open, so open first key-row
    
    // $('.tr-key-row')[0].click() // CLICKS DON'T WORK HERE FOR SOME REASON
    
    // var rowclosed = document.querySelector(".tr-key-row-wrap")
    // rowclosed = rowclosed.children[0].children[1].children[1].children[1] // tr-value-link
    // let evt = new MouseEvent("click", {
    //   bubbles: true,
    //   cancelable: true,
    //   view: window
    // });
    // rowclosed.dispatchEvent(evt) // click
  } else {
    markRead()
  }
}


function markRead() {
  // suggestion wrap
  var addSuggestion = document.querySelector('.key-add-suggestion-wrap.collapsed')
  if(addSuggestion === null) { // its open
    // then its possibly a new string or critical
    setTimeout(function(){
      LangKeys.onKeyDown(new KeyboardEvent('keydown', { which: Keys.DOWN })) // next
    }, getRndInteger(1,3)*1000)
  } else { // if collapsed
    var criticaltag = $('span[data-title="Critical phrases can only be translated by coordinators of official languages"]')
    if(criticaltag[0] === null) { // if not a critical string
      document.getElementsByClassName('key-add-suggestion-header').item(0).click() // 1.open
      setTimeout(function(){ // wait for it to open (non-network)
        let ZeroOrLast = isTranslator()
        getSubmitBtns().item(ZeroOrLast).click() // 2.submit&apply
      }, 2000)
    } else { // critical string
      setTimeout(function(){
        LangKeys.onKeyDown(new KeyboardEvent('keydown', { which: Keys.DOWN })) // next
      }, getRndInteger(1,3)*1000)
    }
  }
}

function listenMutationTrKeys () {
  const trcontent = document.querySelector('.tr-content')
  var trcontentObserver = new MutationObserver(function (mutationList) {
    mutationList.forEach(function(mutation) {
      switch(mutation.target.className) {
        case "tr-key-row-wrap open":
          if(mutation.oldValue === "tr-key-row-wrap") {
            // row opened
            setTimeout(function(){
              markRead()
            }, getRndInteger(1,3) * 1000)
          }
          break;
        // blue dot hidden: "tr-value-untranslated ohide"
        case 'key-add-suggestion-wrap collapsed':
          if(mutation.oldValue === 'key-add-suggestion-wrap') {
            // applied
            setTimeout(function(){
              LangKeys.onKeyDown(new KeyboardEvent('keydown', { which: Keys.DOWN })) // next
            }, getRndInteger(1,2) * 1000);
          }
          break;
      }
    })
  })
  trcontentObserver.observe(trcontent, {
    subtree: true,
    attributeFilter: ['class'],
    attributeOldValue: true
  })
}

/**
 * Observes if the page has changed and calls runAtDocumentLoadProgressComplete()
 */
function ListenMutationProgress () {
  // Watch progress bar to detect loading of new page
  const ajprogressbar = document.querySelector('#aj_progress')
  var progressObserver = new MutationObserver(function (mutationList) {
    mutationList.forEach(function (mutation) {
      if (mutation.oldValue === 'width: 100%; transition: width 0.3s linear 0s, box-shadow 0.2s ease 0s; position: fixed; z-index: 1000; top: 0px; height: 3px; box-shadow: rgb(57, 173, 231) 0px 2px 0px inset;') {
        if (mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px inset') {
          console.log('=== Page changed/reloaded ===')
          runAtDocumentLoadProgressComplete()
        } else if (mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px 0px inset') {
          console.log('=== Page changed/reloaded with 4 x 0px boxShadow ===')
          runAtDocumentLoadProgressComplete()
        }
      }
    })
  })
  progressObserver.observe(ajprogressbar, {
    attributeFilter: ['style'],
    attributeOldValue: true
  })
}

/**
 * Runs when page has loaded with ajax / blue page loading progress bar
 */
function runAtDocumentLoadProgressComplete () {
  // run something every time new content loads
  if (window.location.href.toString().includes('/untranslated/')) {
    $('.tr-menu').prepend('<button id="BeginMarkRead" type="button" class="btn btn-warning">click me & open 1st string</button>')
    $('#BeginMarkRead').on("click", function(){ markReadStart() })
  }
}


function init () {
  document.onreadystatechange = function(){
    if (document.readyState === 'complete') {
      ListenMutationProgress ()
      if (window.location.href.toString().includes('/untranslated/')){
        $('.tr-menu').prepend('<button id="BeginMarkRead" type="button" class="btn btn-warning">click me & open 1st string</button>')
        $('#BeginMarkRead').on("click", function(){ markReadStart() })
      }
    }
  }
}

init()
