# Telegram languages translation progress
Parse languages and download a CSV file containing the percentages of translated phrases per app per language.

## I have my own list of languages I want progress info about
Ok! Once you download the script (or when you install it) open the script in editor like notepad++. Now get the language-code/shortname of each language of your list from [translations.telegram.org](https://translations.telegram.org). And make a JSON like so:
```javascript
let tglangs = {
  "furlan-": {
    "langcode": "furlan-",
    "language": "friulian",
  },
  "1kurdish": {
    "langcode": "1kurdish",
    "language": "kurdish",
  },
  "sinhala-alpha": {
    "langcode": "sinhala-alpha",
    "language": "sinhala",
  }
}
```
Go ahead and edit that `let tglangs` variable in the script. Don't forget to copy paste the script into violent monkey extention if you haven't already. That's all!

![reset and fetch](https://user-images.githubusercontent.com/67483423/177086747-87d774dc-b4c0-4a0b-b25c-55a4d9dabafd.png)

## How to use?
1. Install [Violentmonkey](https://violentmonkey.github.io/get-it/), or a similar browser extension
2. Install the userscript: **[tg-lang-stats.user.js](https://github.com/rondevous/Telegram-Translation-QuickHacks/raw/main/tg-lang-stats.user.js)**
3. Put it to work. :slightly_smiling_face:
