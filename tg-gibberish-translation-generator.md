
# Telegram Gibberish Translation Generator
### Generate telegram language files with the random values as the translation

**This script will generate translation files for a TEST/dustbin language, along with the $tokens & 'quotes'.** This script is made with the intention of detecting strings that cannot be translated a.k.a. critical strings.

### Requirements:
1. [Python-3](https://www.python.org/downloads), linux users can install it from their pkg repo (PLEASE don't use python-2)

### Preparations:
1. Download [tg-gibberish-translation-generator.py](https://github.com/rondevous/Telegram-Translation-QuickHacks/raw/main/tg-gibberish-translation-generator.py)
_(right click > Save link as)_
2. Export the language files of each app from https://translations.telegram.org/en
3. Place all the languages files into a new folder (langfiles). And keep this folder beside tg-gibberish-translation-generator.py

## Run the script
In the command prompt/ terminal, go to the folder where the script is:
```bash
cd path/to/tg-gibberish-translation-generator/script
```
> Hint: Press Tab to auto-complete the folder name

**To generate them all at once:**
```
python tg-gibberish-translation-generator.py --folder langfiles
```
> `langfiles` is the folder where you saved all your exported files.

**To do it one at a time**
```bash
python tg-gibberish-translation-generator.py --file ios_en_v3456789.strings
```

**Some info**
```bash
python tg-gibberish-translation-generator.py -h
```

---
> If you're a programmer: I have documented the [token-detection regex](https://github.com/rondevous/stringnames/blob/addTokens/How-to-detect-tokens.md) which the translations website uses for highlighting the tokens. To include all stringnames, this script additionally rewrites strings that do not work without 'quotes' in translation, such as the one [here](https://translations.telegram.org/en/android/groups_and_channels/StartShortTodayAt), though they aren't covered by the token regex.