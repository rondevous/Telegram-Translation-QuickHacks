# AUTO-IMPORT
Because the Telegram Translations Platform doesn't seem to allow importing more than 50 strings without reloading the page.

## WARNING:
1. Do not use this trick for actual languages. It is always better to double check when importing a large number of strings. And a limit of 50 strings per import is sensible.
2. You should also know that [translations.telegram.org](https://translations.telegram.org) offers a **find & replace** option when you search for phrases. It also comes with RegEx support. So instead of depending on offline replacements to the file, use that.
3. This hack is intended for stringnames language pack, and the like.

## Possible solutions
**Solution 1:** Hack the edit-selected-phrases button to send automatically 50 strings in a batch, with a delay of 5-10s
**Solution 2:** Produce string files of 50 strings. E.g. for android it will be ~77 files to upload each time
 
## Working Solutions:
- Similar to solution 1, but you have to paste this in the browser console (<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>i</kbd>) once after uploading the file you want to import.
```javascript
var $rows = $('.tr-change-keys-block .tr-plain-key-row');
var shards = []
for(var i =0, j=50; j< $rows.length; i+=50, j+=50) {
  shards.push($rows.slice(i,j))
}
var counter = 0;
var i = setInterval(function(){
    // do your thing
    var grouped_rows = LangKeys.groupKeyRows(shards[counter])
    ImportKeys.affectRows('editImportedKeys', grouped_rows)
    counter++;
    if(counter === shards.length-1) {
        clearInterval(i);
    }
}, 8*1000); // 8 secs between uploads
```
