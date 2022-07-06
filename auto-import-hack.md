# AUTO-IMPORT
Because the Telegram Translations Platform doesn't seem to allow importing more than 50 strings without reloading the page.

## WARNING:
This hack is intended for stringnames language pack, finding critical strings, and similar purposes.

1. Avoid using this trick for actual languages. It is always better to double check when importing a large number of strings. Currently there seems to be a limit of 50 strings when importing phrases.
2. You _should_ know that [translations.telegram.org](https://translations.telegram.org) offers a **find & replace** option when you search for phrases. It also comes with RegEx support. So instead of depending on offline replacements to the file, use that.

## Possible solutions
- **Solution 1:** Hack the edit-selected-phrases button to send automatically 50 strings in a batch, with a delay of 5-10s
- **Solution 2:** Produce string files of 50 strings. E.g. for android it will be ~77 files to upload each time
 
## Working Solutions:
- Similar to solution 1, but you have to paste this in the browser console (<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>i</kbd>) once after uploading the file you want to import.
```javascript
var $rows = $('.tr-change-keys-block .tr-plain-key-row');
var shards = []
for(var i =0, j=50; i< $rows.length; i+=50, j+=50) {
  shards.push($rows.slice(i,j))
}
var counter = shards.length-1;
var autouploadkeys = setInterval(function(){
    // do your thing
    var grouped_rows = LangKeys.groupKeyRows(shards[counter]);
    ImportKeys.affectRows('editImportedKeys', grouped_rows);
    counter--;
    if(counter === 0) {
        clearInterval(autouploadkeys);
	console.log("IMPORT COMPLETE!\n If you are doing this for fetching critical strings, please try edit-all or see if any manually selected strings can be imported.")
    }
}, 8*1000); // 8 secs between uploads
```
