bndr - Angular Directives without Angular
====

Bndr.js - A super simple component/dom binding utility. Register your JavaScript classes, linking them to attributes that you can use in html much like angular directives. You can also pass options in the same angular style.
And that's it really, no dependencies, no other structure, code how you like. 

All bndr gives you is a simple and familiar method of binding and configuring js class instances with the dom.


Quick start
-----------

### Install
    
    git clone git@github.com:jasoniangreen/bndr.git
    npm install
    npm install -g grunt-cli

### Build

    grunt

You'll find the build bndr.js and bndr.min.js in the dist folder.

### Try

HTML
```html
<div my-test
     my-test-some-var="34"
     my-test-text="some text"></div>

<div my-other
     my-other-some-other-var="36"
     my-other-text="some other text"></div>
```

JS
```javascript
function MyTest(el, name, options) {
    this._options = options;
    this._name = name;
    this.el = el;
    el.innerHTML = JSON.stringify(options);
};

function MyOther(el, name, options) {
    this._options = options;
    this._name = name;
    this.el = el;
    el.innerHTML = options.someOtherVar + options.text;
};

bndr.registerClass('my-test', MyTest);
bndr.registerClass('my-other', MyOther);
bndr();
```
