# @nec/json2tds

## Into

Manually making sitecore items is tedious (pun intended). Let's fix that.

Input -> JSON.
Output -> `.item` files + updates relevant `.scproj` files.

## Tests

### Simple Items
```
npm start -- --dist=test/sitecore/content/Home --src=test/1-simple-item
```

### Complex Items
```
npm start -- --dist=test/sitecore/content/Home --src=test/2-complex-item
```
