**Note: This method varies from the [previous method](https://github.com/rondevous/Telegram-Translation-QuickHacks/blob/a31d1a1f74ec33e7885bbac03674b60e5273a948/Parsing%20Critical%20Strings.md) of removing criticals and reuploading the file for import**

# Critical strings/keys on the Telegram Translations platform
These type of strings are only translatable by official translators/coordinators of Telegram Translation.
When a language is complete except for critical strings, and an official translator has been appointed after most of the strings are done, finding only the critical strings is a difficult task. So this here is an attempt to document in some form all critical strings, so that they can be easily found and translated by the new official coordinators.

# How to update Critical Strings of ['Extras'](https://github.com/rondevous/telegram-translation-extras) Script

### A) Reset Critical strings list to in-script ones
If you just want to reset the critical strings, maybe because you _tinkered_ with the values of the script in ViolentMonkey extention or because you received _an update_ to the script:

![007_sel](https://user-images.githubusercontent.com/67483423/177706693-87e2dac2-1f88-4eb2-a0af-700121a5d70a.png)

1. In the ViolentMonkey script editor, go to **'Values'** tab, and delete all of the critical_app values completely.
2. Open https://translations.telegram.org
3. Click the search help icon (?) -> Extra Tools -> Open Criticals

This should reset the critical strings to what the script has.

### B) Parsing new critical strings by importing random values in a test/dustbin language pack (For updating criticals in 'extras' script)

1. Export each telegram app's language files from [translation.telegram.org/en](translation.telegram.org/en)

2. Replace all the translations in the language files with some random value along with the tokens (maybe use [Telegram Gibberish Translation Generator](https://github.com/rondevous/Telegram-Translation-QuickHacks/blob/main/tg-gibberish-translation-generator.md]) for this task).

3. Import this modified language file into your custom non-language which is not for normal use.

4. On the import page, some keys/strings won't get imported even if you press 'import all'. **Those are the critical strings.** You will have to finish importing all the critical strings to get a complete list of these unimportable ones. _(Note: If you are an official translator, these might get imported. So use a non-official telegram account to do this.)_

5. Use the [auto-import](https://github.com/rondevous/Telegram-Translation-QuickHacks/blob/main/auto-import-hack.md) hack if there are problems with the import page.

6. Press EDIT-ALL to confirm there aren't any phrases left. Try going through the leftover phrases and guess if something should not be a critical. select such strings and import them. 

9. **Make a copy of your random/gibberish language files for re-verification.** Try re-uploading the same file, press edit-all again just to be sure they all are critical strings.

10. Open the browser console (<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>i</kbd>) and run this javascript code on this import page to get all the strings in **JSON format**
```javascript
// Run this on import page in your browser console, after importing translations of all strings
// RIGHT CLICK ON OUTPUT -> COPY OBJECT
var path = window.location.pathname
var app = /\/[A-Za-z0-9_\-]+\/(tdesktop|ios|macos|android|android_x)/.exec(path)[1]
var jsoncor = {}
var stringsArray = document.getElementsByClassName('tr-plain-key-row')
for (let i = 0; i < (stringsArray.length); i++) {
  jsoncor[''+stringsArray.item(i).attributes.item(1).value] = 0
}
jsoncor = { "strings" : jsoncor }
console.log("Copy the json output below to update critical_"+app)
console.log(jsoncor);
// Please right-click and choose "copy object" on the output
console.log("Please right-click and choose \"copy object\" on the below output")
jsoncor
```
![json output](https://user-images.githubusercontent.com/67483423/177001187-3b969465-976e-4138-a1da-b872c5ee1be1.jpg)

<details>
<summary>Here is an alternative code to get output in form of html href='https://links' </summary>
<pre>
<code>
// Run this to get output in the form of href=https://links
// RIGHT CLICK ON OUTPUT -> COPY MESSAGE
var path = window.location.pathname
var device = /\/[A-Za-z0-9_\-]+\/(tdesktop|ios|macos|android|android_x)/.exec(path)[1]
var textcor = ''
var stringsArray = document.getElementsByClassName('tr-plain-key-row')
for (let i = 0; i &lt; (stringsArray.length); i++) {
  let stringname = stringsArray.item(i).attributes.item(1).value
  textcor = textcor+ "&lt;a href='"+(window.location.protocol + '//' + window.location.host + '/en/'+device+'/untranslated/' + stringname) +"\'&gt;"+stringname+"&lt;/a&gt;" + "&lt;br&gt;\n\n"
}
console.log("Copy below message and paste it in html file.")
console.log(textcor)
textcor
</code>
</pre>
</details>

![html output](https://user-images.githubusercontent.com/67483423/177001223-01a6b93a-6e99-43aa-b8e3-a05888be250b.jpg)

11. From the output, right click -> copy object ("copy message" if using alternate "href" code). Again, remove the extra text like 'debugger eval' from it.

12. Go to Violent Monkey. Open the 'Telegram-Translation-Extras' script. Click on `</>` edit script. Open the "Values" tab. Click on the app you want to update. Paste in the value you copied from step 13. Save script value.

13. **(Optional)** you can make this change permanent by directly editing the critical_<i>app</i> variable in the script. After doing it this way, completely delete the critical_android value from script-storage (values tab). Then load translations.telegram.org/en/android -> click the (?) search help -> Extra Tools -> Open Criticals
