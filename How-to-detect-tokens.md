# How to detect tokens in Telegram Translations
The following regular expression (regEx) was taken directly from https://translations.telegram.org (Look for 'TOKEN_REGEX' in __translations.js__ via the browser debugger). This regex will match the tokens present in translations of telegram apps.

- ### In **Javascript**, as it is on the translations website:
Escaped version:
```javascript
var TOKEN_REGEX = new RegExp('%(\\d+\\$)?\\.?\\d*[%@sdf]|\\{[A-Za-z0-9_]+\\}|\\[\\/?[A-Za-z]\\]|\\bun\\d\\b|&lt;!\\[CDATA\\[&lt;a href=&quot;|&quot;&gt;|&lt;\\/a&gt;\\]\\]&gt;|\\[a href=&quot;|&quot;\\]', 'g');
```
Not escaped version:
```javascript
var TOKEN_REGEX = new RegExp('%(\\d+\\$)?\\.?\\d*[%@sdf]|\\{[A-Za-z0-9_]+\\}|\\[\\/?[A-Za-z]\\]|\\bun\\d\\b|<!\\[CDATA\\[<a href=\\"|\\">|<\\/a>\\]\\]>|\\[a href=\\"|\\"\\]', 'g');
```

- ### In **Python 3**, after replacing html-escapes and using the (?:non-grouping) version of (brackets)
```python
TOKEN_REGEX = re.compile("%(?:\\d+\\$)?\\.?\\d*[%@sdf]|\\{[A-Za-z0-9_]+\\}|\\[\\/?[A-Za-z]\\]|\\bun\\d\\b|<!\\[CDATA\\[<a href=\"|\">|<\\/a>\\]\\]>|\\[a href=\"|\"\\]")
```

### For the sake of understanding, I have broken down the (raw, unescaped) regex taken directly from the translations website to match the tokens of specific Telegram apps:


1. <u>Matching tokens of **Telegram-Android**</u>
```regex
\bun\d\b
%(\d+\$)?\d*[%@sdf]
```
> <u>Android Markup tokens, needing to enclose one or more text entities:</u>
```regex
<!\[CDATA\[<a href=\"|\">|(<\/a>)?\]\]>
```

2. Matching tokens of **Telegram-X**
```regex
%(\d+\$)?\d*[%@sdf]
```

3. Matching tokens of **Telegram iOS**
```regex
%(\d+\$)?\.?\d*[%@sdf]
\{[A-Za-z0-9_]+\}
```

4. Matching tokens of **Telegram MacOS**
```regex
%(\d+\$)?\d*[%@sdf]
```

5. Matching tokens of **Telegram Desktop**
```regex
\{[A-Za-z0-9_]+\}
```

> <u>TDesktop Markup tokens, needing to enclose one or more text entities:</u>
```regex
\[a href=\"|\"\]|\[\/?[A-Za-z]\]
```
