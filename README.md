bndr
====

Bndr.js - A super simple component/dom binding library. Register your JavaScript classes, linking them to attributes that you can use in html much like angular directives. You can also pass options in the same angular style.

### Try

HTML
```html
<div my-test
     my-test-interval="34"
     my-test-text="some text"></div>

<div my-other
     my-other-interval="36"
     my-other-text="some other text"></div>
```

JS
```javascript
function MyTest(el, options) {
    this._options = options;
    this.el = el;
    el.innerHTML = JSON.stringify(options);
};

function MyOther(el, options) {
    this._options = options;
    this.el = el;
    el.innerHTML = JSON.stringify(options);
};

bndr.registerClass('my-test', MyTest);
bndr.registerClass('my-other', MyOther);
bndr();
```
