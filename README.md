bndr
====

Bndr.js - A super simple component/dom binding library. Register your JavaScript classes, linking them to attributes that you can use in html much like angular directives. You can also pass options in the same angular style.
And that's it really, no dependencies, no other structure, code how you like. 

All bndr gives you is a simple and familiar method of binding and configuring js instances with the dom.


Quick start
-----------

### Install
    
    git clone git@github.com:jasoniangreen/bndr.git


### Build

    grunt

You'll find the build bndr.js and bndr.min.js in the dist folder.

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
