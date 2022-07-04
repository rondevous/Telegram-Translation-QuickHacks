// ==UserScript==
// @name         Fetch Languages Progress
// @namespace    https://github.com/rondevous/Telegram-Translation-QuickHacks/blob/main/tg-lang-stats.user.js
// @description  Parse languages and download a CSV file containing the percentages of translated phrases per app per language.
// @author       Rondevous
// @include      https://translations.telegram.org/*
// @version      0.0.1
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// @require      https://github.com/evanplaice/jquery-csv/raw/main/src/jquery.csv.js
// @downloadURL  https://github.com/rondevous/Telegram-Translation-QuickHacks/raw/main/tg-lang-stats.user.js
// @updateURL    https://github.com/rondevous/Telegram-Translation-QuickHacks/raw/main/tg-lang-stats.user.js
// ==/UserScript==

/* Global GM_getValue, GM_setValue*/

const host = 'https://translations.telegram.org/'

// data format for 'JSON to CSV' converter
let tglangs = {
  "af": { 
    "langcode": "af",
    "language": "afrikaans",
    "android":0
  },
  "sq": {
    "langcode": "sq",
    "language": "albanian",
  },
  "am": {
    "langcode": "am",
    "language": "amharic",
  },
  "ar": {
    "langcode": "ar",
    "language": "arabic",
  },
  "az": {
    "langcode": "az",
    "language": "azerbaijani",
  },
  "eu": {
    "langcode": "eu",
    "language": "basque",
  },
  "be": {
    "langcode": "be",
    "language": "belarusian",
  },
  "bn": {
    "langcode": "bn",
    "language": "bengali",
  },
  "bg": {
    "langcode": "bg",
    "language": "bulgarian",
  },
  "my": {
    "langcode": "my",
    "language": "burmese",
  },
  "ca": {
    "langcode": "ca",
    "language": "catalan",
  },
  "cantonese": {
    "langcode": "cantonese",
    "language": "cantonese",
  },
  "zh-hans": {
    "langcode": "zh-hans",
    "language": "chinese (s)",
  },
  "zh-hant": {
    "langcode": "zh-hant",
    "language": "chinese (t)",
  },
  "hr": {
    "langcode": "hr",
    "language": "croatian",
  },
  "cs": {
    "langcode": "cs",
    "language": "czech",
  },
  "da": {
    "langcode": "da",
    "language": "danish",
  },
  "nl": {
    "langcode": "nl",
    "language": "dutch",
  },
  "eo": {
    "langcode": "eo",
    "language": "esperanto",
  },
  "et": {
    "langcode": "et",
    "language": "estonian",
  },
  "fi": {
    "langcode": "fi",
    "language": "finnish",
  },
  "fr": {
    "langcode": "fr",
    "language": "french",
  },
  "furlan-": {
    "langcode": "furlan-",
    "language": "friulian",
  },
  "gl": {
    "langcode": "gl",
    "language": "galician",
  },
  "de": {
    "langcode": "de",
    "language": "german",
  },
  "el": {
    "langcode": "el",
    "language": "greek",
  },
  "gu": {
    "langcode": "gu",
    "language": "gujarati",
  },
  "he": {
    "langcode": "he",
    "language": "hebrew",
  },
  "hi": {
    "langcode": "hi",
    "language": "hindi",
  },
  "hu": {
    "langcode": "hu",
    "language": "hungarian",
  },
  "id": {
    "langcode": "id",
    "language": "indonesian",
  },
  "ga": {
    "langcode": "ga",
    "language": "irish",
  },
  "it": {
    "langcode": "it",
    "language": "italian",
  },
  "ja": {
    "langcode": "ja",
    "language": "japanese",
  },
  "kn": {
    "langcode": "kn",
    "language": "kannada",
  },
  "kk": {
    "langcode": "kk",
    "language": "kazakh",
  },
  "km": {
    "langcode": "km",
    "language": "khmer",
  },
  "ko": {
    "langcode": "ko",
    "language": "korean",
  },
  "1kurdish": {
    "langcode": "1kurdish",
    "language": "kurdish",
  },
  "lv": {
    "langcode": "lv",
    "language": "latvian",
  },
  "lt": {
    "langcode": "lt",
    "language": "lithuanian",
  },
  "lurilanguage": {
    "langcode": "lurilanguage",
    "language": "luri",
  },
  "ms": {
    "langcode": "ms",
    "language": "malay",
  },
  "ml": {
    "langcode": "ml",
    "language": "malayalam",
  },
  "mt": {
    "langcode": "mt",
    "language": "maltese",
  },
  "mr": {
    "langcode": "mr",
    "language": "marathi",
  },
  "nb": {
    "langcode": "nb",
    "language": "norwegian (b)",
  },
  "or": {
    "langcode": "or",
    "language": "odia",
  },
  "fa": {
    "langcode": "fa",
    "language": "persian",
  },
  "pl": {
    "langcode": "pl",
    "language": "polish",
  },
  "pt-br": {
    "langcode": "pt-br",
    "language": "portuguese (B)",
  },
  "pt-pt": {
    "langcode": "pt-pt",
    "language": "portuguese (P)",
  },
  "ro": {
    "langcode": "ro",
    "language": "romanian",
  },
  "ru": {
    "langcode": "ru",
    "language": "russian",
  },
  "sardu": {
    "langcode": "sardu",
    "language": "sardinian",
  },
  "sr": {
    "langcode": "sr",
    "language": "serbian",
  },
  "sicilian-scn": {
    "langcode": "sicilian-scn",
    "language": "sicilian",
  },
  "sinhala-alpha": {
    "langcode": "sinhala-alpha",
    "language": "sinhala",
  },
  "sk": {
    "langcode": "sk",
    "language": "slovak",
  },
  "sl": {
    "langcode": "sl",
    "language": "slovene",
  },
  "es": {
    "langcode": "es",
    "language": "spanish",
  },
  "sw": {
    "langcode": "sw",
    "language": "swahili",
  },
  "sv": {
    "langcode": "sv",
    "language": "swedish",
  },
  "ta": {
    "langcode": "ta",
    "language": "tamil",
  },
  "te": {
    "langcode": "te",
    "language": "telugu",
  },
  "th": {
    "langcode": "th",
    "language": "thai",
  },
  "tr": {
    "langcode": "tr",
    "language": "turkish",
  },
  "tk": {
    "langcode": "tk",
    "language": "turkmen",
  },
  "uk": {
    "langcode": "uk",
    "language": "ukrainian",
  },
  "ur": {
    "langcode": "ur",
    "language": "urdu",
  },
  "urdupaks": {
    "langcode": "urdupaks",
    "language": "urdu",
  },
  "uz": {
    "langcode": "uz",
    "language": "uzbek",
  },
  "venetian": {
    "langcode": "venetian",
    "language": "venetian",
  },
  "vi": {
    "langcode": "vi",
    "language": "vietnamese",
  }
}
// convert JSON to CSV
// credits: https://github.com/konklone/json/blob/gh-pages/index.html
function doCSV(json) {
  // 1) find the primary array to iterate over
  // 2) for each item in that array, recursively flatten it into a tabular object
  // 3) turn that tabular object into a CSV row using jquery-csv
  var inArray = Array.from(json); // ronMOD: arrayFrom

  var outArray = [];
  for (var row in inArray)
      outArray[outArray.length] = parse_object(inArray[row]);
  var csv = $.csv.fromObjects(outArray, {separator: ','});
  // download link to entire CSV as data
  // thanks to https://jsfiddle.net/terryyounghk/KPEGU/
  // and https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  var uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  $("a#SaveCSV").attr("href", uri);
  var csv = $("a#SaveCSV")
  csv.click()
}

function parse_object(obj, path) {
  if (path == undefined)
      path = "";
  var type = $.type(obj);
  var scalar = (type == "number" || type == "string" || type == "boolean" || type == "null");
  if (type == "array" || type == "object") {
      var d = {};
      for (var i in obj) {
          var newD = parse_object(obj[i], path + i + "/");
          $.extend(d, newD);
      }
      return d;
  }
  else if (scalar) {
      var d = {};
      var endPath = path.substr(0, path.length-1);
      d[endPath] = obj;
      return d;
  }
  // ?
  else return {};
}

function resetAndFetch () {
  let langcodes = Object.keys(tglangs)
  for (let langcode of langcodes) {
    tglangs[langcode]["android"] = 0
    tglangs[langcode]["ios"] = 0
    tglangs[langcode]["tdesktop"] = 0
    tglangs[langcode]["macos"] = 0
    tglangs[langcode]["android_x"] = 0
  }
  GM_setValue("tglangs", tglangs) // reset
  firstlang = Object.keys(tglangs)[0]
  GM_setValue("lastlang", [firstlang, 'android']) // [lang, app]??
  GM_setValue("ModeParseLangsCompletion", true)
  window.location.href = host + firstlang + '/' + 'android/'
}

/*
dataformat = {
  "am": {
    "langcode": "am",
    "language": "amharic",
    "android": 34,
    "ios": 41,
    "tdesktop": 30,
    "macos": 12,
    "android_x": 32,
  },
  "ar": {
    "langcode": "ar",
    ...
  }
}
*/

function pausefetching (bool){
  if (bool){
    GM_setValue("ModeParseLangsCompletion", false) // pause
  } else {
    GM_setValue("ModeParseLangsCompletion", true) //resume
  }
}

function fetchinfo () {
  if (GM_getValue("ModeParseLangsCompletion") !== true) {
    return // do not fetch
  }
  AttachLanguageProgressParser()
  $(document).ready(function(){
    $("#ParseLanguageCompletion").modal('show');
  });
  let fromurl = window.location.href.match(/\.org\/([\w-]+)(\/(android_x|ios|tdesktop|macos|android))?\/?$/)
  console.log("fromurl match: "+fromurl[0]) // full match
  let langcode = fromurl[1]
  let appname = fromurl[3]
  var tglangs = GM_getValue('tglangs') // retrieve from script storage
  if (appname === undefined) {
    let lastlangcode = GM_getValue('lastlang')[0] 
    let lastapp = GM_getValue('lastlang')[1]
    switch(lastapp) {
      case 'android':
        GM_setValue('lastlang', [lastlangcode, 'ios'])
        setTimeout(function(){
          window.location.href = host + lastlangcode + '/' + 'ios/'
        }, getRndInteger(1,5) * 1000)
        break;
      case 'ios':
        GM_setValue('lastlang', [lastlangcode, 'tdesktop'])
        setTimeout(function(){
          window.location.href = host + lastlangcode + '/' + 'tdesktop/'
        }, getRndInteger(1,5) * 1000)
        break;
      case 'tdesktop':
        GM_setValue('lastlang', [lastlangcode, 'macos'])
        setTimeout(function(){
          window.location.href = host + lastlangcode + '/' + 'macos/'
        }, getRndInteger(1,5) * 1000)
        break;
      case 'macos':
        GM_setValue('lastlang', [lastlangcode, 'android_x'])
        setTimeout(function(){
          window.location.href = host + lastlangcode + '/' + 'android_x/'
        }, getRndInteger(1,5) * 1000)
        break;
      case 'android_x':
        let langkeys = Object.keys(tglangs)
        let lastindex = langkeys.indexOf(lastlangcode)
        if(lastindex === langkeys.length - 1) {
          // last lang/app reached, stop
          GM_setValue("ModeParseLangsCompletion", false)
          $('div[role="progressbar"]').css('width', '100%')
          $('div[role="progressbar"]').text((langkeys.length+' of '+langkeys.length+' languages').toString())
          console.log("Parsing Complete!")
          $('div[id="ParseLanguageCompletion"] div.modal-footer]').append("<a id='SaveCSV' href='#' class='btn btn-info'>Download CSV</a>")
          tglangs = GM_getValue('tglangs')
          var arrlangs = Object.keys(tglangs).map(function(key){return tglangs[key]})
          doCSV(arrlangs)
          return
        }
        nextlangcode = langkeys[lastindex+1]
        GM_setValue('lastlang', [nextlangcode, 'android'])
        setTimeout(function(){
          window.location.href = host + nextlangcode + '/' + 'android/'
        }, getRndInteger(5,10) * 1000)
        break;
    }
  }
  if (langcode === undefined ) {
    alert("Something went wrong: no language found.")
  }
  var langprogress = document.querySelector(".popup-body.popup-no-close")
  if (langprogress === undefined) {
    alert("To get the progress % of languages, you need to sign in.")
    return
  }
  let appPercent = langprogress.children[0].querySelectorAll('dd')[2].textContent.match(/(\d+)\.\d+\%/)[1]
  if(appPercent === undefined) return
  tglangs[langcode][appname] = parseInt(appPercent) // set percentage
  GM_setValue("tglangs", tglangs)
  GM_setValue('lastlang', [langcode, appname])
  switch(appname) {
    case 'android':
      setTimeout(() => {
        window.location.href = host + langcode + '/' + 'ios/'
      }, getRndInteger(1,5) * 1000);
      break;
    case 'ios':
      setTimeout(() => {
        window.location.href = host + langcode + '/' + 'tdesktop/'
      }, getRndInteger(1,5) * 1000)
      break;
    case 'tdesktop':
      setTimeout(function(){
        window.location.href = host + langcode + '/' + 'macos/'
      }, getRndInteger(1,5) * 1000)
      break;
    case 'macos':
      setTimeout(function(){
        window.location.href = host + langcode + '/' + 'android_x/'
      }, getRndInteger(1,5) * 1000)
      break;
    case 'android_x':
      let langkeys = Object.keys(tglangs)
      let lastindex = langkeys.indexOf(langcode)
      if(lastindex === langkeys.length - 1) {
        // last lang/app reached, stop
        GM_setValue("ModeParseLangsCompletion", false)
        $('div[role="progressbar"]').css('width', '100%')
        $('div[role="progressbar"]').text((langkeys.length+' of '+langkeys.length+' languages').toString())
        console.log("Parsing Complete!")
        $('div[id="ParseLanguageCompletion"] div[class="modal-footer"]').append("<a id='SaveCSV' href='#' class='btn btn-info'>Download CSV</a>")
        tglangs = GM_getValue('tglangs')
        var arrlangs = Object.keys(tglangs).map(function(key){return tglangs[key]})
        doCSV(arrlangs)
        return
      }
      let nextlangcode = langkeys[lastindex+1]
      GM_setValue('lastlang', [nextlangcode,'android'])
      setTimeout(function(){
        window.location.href = host + nextlangcode + '/' + 'android/'
      }, getRndInteger(5,10) * 1000)
      break;
  }
  // Set a delay of 1-10 secs to avoid hitting ratelimit (or avoid overloading the server)
}

/**
 * @param {interger} min 
 * @param {interger} max 
 * @returns random integer between min and max
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Attach modal to display progress
 */
function AttachLanguageProgressParser () {
  $('body').append(`
  <div id='ParseLanguageCompletion' class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Fetching Language Progress...</h4>
        </div>
        <div class="modal-body">
          <div class="progress">
            <div class="progress-bar progress-bar-danger" role="progressbar" style="width:0%">
              0 of 0 languages
            </div>
          </div>
          <br>
          <p>Do not open any other <b>'translations.telegram.org'</b> window/tab while this script is running!</p>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
  `)
  $("div.progress").css({
    'background-color' :'grey',
    'width' :'100%',
    'height' :'30px'
  })
  $("div[role='progressbar'").css({
    'background-color' :'orange',
    'text-align' :'center',
    'height' :'30px'
  })
  let fromurl = window.location.href.match(/\.org\/([\w-]+)(\/(android_x|ios|tdesktop|macos|android))?\/?$/)
  let appname = fromurl[3]
  progPercentapp = 0
  switch (appname) {
    case 'android':
      progPercentapp = 1/5 // decimal progress by app
      break;
    case 'ios':
      progPercentapp = 2/5
      break;
    case 'tdesktop':
      progPercentapp = 3/5
      break;
    case 'macos':
      progPercentapp = 4/5
      break;
    case 'android_x':
      progPercentapp = 5/5
      break;
  }
  let tglangs = GM_getValue("tglangs")
  if(tglangs===undefined) return
  let langcodes = Object.keys(tglangs)
  let lastlang = GM_getValue("lastlang")[0]
  let i = langcodes.indexOf(lastlang) + progPercentapp
  let lenlangs = langcodes.length
  let progPercent = (i/lenlangs) * 100
  $('div[role="progressbar"]').css('width', progPercent+'%')
  $('div[role="progressbar"]').text(i+' of '+lenlangs+' languages')  
}

function AttachMutationProgress () {
  // Watch progress bar to detect loading of new page
  // #aj-progress box-shadow => 'none' means it was loaded from browser URL bar
  const ajprogressbar = document.querySelector('#aj_progress')
  var progressObserver = new MutationObserver(function (mutationList) {
      mutationList.forEach(function (mutation) {
      if (mutation.oldValue === 'width: 100%; transition: width 0.3s linear 0s, box-shadow 0.2s ease 0s; position: fixed; z-index: 1000; top: 0px; height: 3px; box-shadow: rgb(57, 173, 231) 0px 2px 0px inset;') {
          if (mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px inset') {
          console.log('[Extras] Re-attached Search Help Button')
          runAtDocumentLoadProgressComplete()
          } else if (mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px 0px inset') {
          console.log('[Extras] Re-attached Search Help Button with 4 x 0px boxShadow')
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

function runAtDocumentLoadProgressComplete () {
    // fetchinfo()
  } 

function init () {
  document.onreadystatechange = function(){
    if (document.readyState === 'complete') {
      $('.tr-menu').prepend('<button id="BeginFetchLangs" type="button" class="btn btn-danger">Reset & Fetch langs percent</button>')
      $('#BeginFetchLangs').on("click", function(){ resetAndFetch() })
      fetchinfo() // will exit if ModeParseLangsCompletion == false
    }
  }
  AttachMutationProgress()
}

init()
