# Critical strings/keys on the Telegram Translations platform
These type of strings are only translatable by official translators/coordinators of Telegram Translation.
When a language is complete except for critical strings, and an official translator has been appointed after most of the strings are done, finding only the critical strings is a difficult task. So this here is an attempt to document in some form all critical strings, so that they can be easily found and translated by the new official coordinators.

# How to update Critical Strings of 'Extras' Script

### A) Reset Critical strings because you messed up with script values
If you just want to reset the critical strings, because you fiddled with the values of the script in Violent Monkey extention:
1. Delete any of critical_app values completely. 
2. Open https://translations.telegram.org
3. Click the search help icon (?) -> Extra Tools -> Open Criticals

This should reset the critical strings back to what the script had.

### B) Parsing new critical strings by importing random values in a test/dustbin language pack (For updating criticals in 'extras' script)

1. Export each telegram app's language files from [translation.telegram.org/en](translation.telegram.org/en)

2. Replace all the translations in the language files with some random value along with the tokens (maybe use [stringnames & tokens generator](https://github.com/rondevous/stringnames/tree/addTokens/]) for this task).
3. Import this modified language file into your own custom non-language which is not for use.

4. On the import page, some keys/strings won't get imported even if you press 'import all'. **Those are the critical strings.** You will have to finish importing all the critical strings to get a complete list of these unimportable ones. _(Note: If you are an official translator, these might get imported. So use a non-official telegram account to do this.)_

5. Using the shortcuts userscript, CTRL+A to select 50 phrases at once and import/edit them right away. _("50 at a time" seems to be the limit when "edit selected" or when sending the selected strings to the server)_

6. When there are ~30 strings that aren't getting imported (they remain selected & don't go away after pressing "edit selected"), STOP. Let me make this easy for you:

7. Keeping the selected ones as they are (the ones that don't get imported), open the browser console (<kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>i</kbd>) and run the following javascript code:
```javascript
var path = window.location.pathname
var app = /\/[A-Za-z0-9_\-]+\/(tdesktop|ios|macos|android|android_x)/.exec(path)[1]
var stringsArray = document.getElementsByClassName('tr-plain-key-row selected')
if (app === "ios"|| app === "tdesktop"|| app === "macos") {
  var textregex = ""
  let orsep = "|" 
  for (let i = 0; i < (stringsArray.length); i++) {
    let phrase = stringsArray.item(i).attributes.item(1).value
    if(i == stringsArray.length - 1) { 
      orsep = ''
    }
    textregex += '"'+phrase+'" = ".*";\n' + orsep
  }
} else if (app === "android" || app === "android_x") {
  var textregex = ""
  let orsep = "|"
  for (let i = 0; i < (stringsArray.length); i++) {
    phrase = stringsArray.item(i).attributes.item(1).value
    if(i == stringsArray.length-1) {
      orsep = ''
    }
    textregex += ""+'<string name="'+phrase+'">.*</string>\n'+orsep
  }
  console.log("Copy below message & replace critical strings of "+ app)
  console.log(textregex)
}
```
8. You will get an output in the console. Copy it. Make sure you do not copy 'debugger eval code ..."
9. **Make a copy of your random/gibberish language files**, and open the file of the app you're importing into an editor like Notepad++. Open find-replace with CTRL+H. TURN ON [.*] REGEX (Regular Expression) MODE in the find-replace window. Paste the output from the above script - and again, make sure there is no extra text at the end like "debugger eval code". Keep the replace text blank, and press replace all. **This should remove the found critical strings from your language file.** Make sure you have a copy of the language file containing ALL the strings with the same values.

10. Import the removed-criticals file. You won't see the same ~30 strings from before. **CONTINUE IMPORTING FROM THIS FILE.** Redo steps 6-10 until all the strings are imported.

11. Now, import the not-removed-criticals version of the random/gibberish language file. You will see all the critical strings. You are one step away from getting that "critical_app" json for updating the script.

12. Open the browser console (<kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>i</kbd>) and run the following javascript code on this import page to get all the strings in <u>JSON format</u>
```javascript
// Run this on import page in your browser console, after importing translations of all strings
var path = window.location.pathname
var app = /\/[A-Za-z0-9_\-]+\/(tdesktop|ios|macos|android|android_x)/.exec(path)[1]
var jsoncor = {}
var stringsArray = document.getElementsByClassName('tr-plain-key-row')
for (let i = 0; i < (stringsArray.length); i++) {
  jsoncor[""+stringsArray.item(i).attributes.item(1).value] = 0
}
jsoncor = { "strings" : jsoncor }
console.log("Copy the json output below to update critical_"+app)
console.log(jsoncor)
```
<details>
<summary>Here is an alternative script to get output in form of <u>https://links</u></summary>
<pre>
<code>
// Run this to get output in the form of https:// links
var path = window.location.pathname
var device = /\/[A-Za-z0-9_\-]+\/(tdesktop|ios|macos|android|android_x)/.exec(path)[1]
var textcor = ''
var stringsArray = document.getElementsByClassName('tr-plain-key-row')
for (let i = 0; i < (stringsArray.length); i++) {
  textcor = textcor + (window.location.protocol + '//' + window.location.host + '/en/'+device+'/untranslated/' + stringsArray.item(i).attributes.item(1).value) + '\n'
}
console.log("Copy below links output for use somewhere else")
console.log(textcor)
</code>
</pre>
</details>

13. Copy the JSON output from browser console. Again, remove the 'debugger eval' extra text from it.

14. Go to Violent Monkey. Open the 'Telegram-Translation-Extras' script. Click on `</>` edit script. Open the "Values" tab. Click on the app you want to update. Paste in the value you copied from step 13. Save script value.

15. **(Optional)** you can make this change permanent by directly editing the critical_<i>app</i> variable in the script. After doing it this way, completely delete the critical_android value from script-storage (values tab). Then load translations.telegram.org/en/android -> click the (?) search help -> Extra Tools -> Open Criticals
