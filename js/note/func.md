# 函数

Function declaration and invocation syntax. Anonymous functions. Functions as data. The arguments object. Variadic functions. Optional parameters. Named parameters. Function overloading. Duck typing. (Flanagan Chapter 8)，Crockford Chapter 4

## 基础

函数定义也是hoisted。可以在声明前调用。所以，即使你在函数声明前调用了这个函数，也没事。


默认返回undefined

## 定义和调用

可以重用的一组代码
函数也是一种数据
两种定义方式

```JavaScript
var helloFn = function() {
	console.log("Hello!");
}

function helloFn() {
	console.log("Hello!");
}

// Function invocation
helloFn();
```

## 参数

### 可选参数

函数接受参数非常灵活：variadic

参数个数不限

送进函数参数的个数可以和定义的不同。少了，就是undefined
```JavaScript
var greet = function(greeting, person) {
	console.log(greeting + ", " + person + "!")
}

greet("Hail");
```

多了，忽略。
```JavaScript
var greet = function(greeting, person) {
	console.log(greeting + ", " + person + "!")
}

greet("Hail", "Stanford", "Hail");
```

C++、Java有默认参数。Javascript需要我们手工加：先检查有没有参数没有输入，然后给默认值
```JavaScript
var helloWorld = function(lang) {
	if (typeof lang === "undefined")
		lang = "English";
	switch(lang) {
		case "English":
			console.log("Hello!")
			return;
		case "Chinese":
			console.log("你好!");
			return;
	}
}

helloWorld();
helloWorld("Chinese")
```

### arguments

多了，虽然忽略，但可以从arguments这个数组中找到，包括所有送进来的参数

```JavaScript
// 老方法
var greet = function(greeting, person) {
	console.log(greeting + ", " + person + ", " + arguments[2] + "!")
}
greet("Hail", "Stanford", "Hail");

// 新方法
function myFunc (a,b,...theArgsArray) {
     var c = theArgsArray[0];
}
```

```JavaScript
var greet = function(greeting, person) {
	console.log(arguments[0] + ", " + arguments[1] + ", " + arguments[2] + "!")
}

greet("Hail", "Stanford", "Hail");
```

```JavaScript
var greet = function() {
	var line = "";
	for (var i = 0; i < arguments.length; i++) {
		if (i > 0) line += ", ";
		line += arguments[i];
	}
	line += "!";
	console.log(line);
}

greet("Hail", "Stanford", "Hail");
```

但Argument不是数组，不能对它进行sort什么的。如果想这么做，先用slice转换为数组
```JavaScript
var sortArgs = function() {
	var argumentsArr = Array.prototype.slice.call(arguments);
	return argumentsArr.sort();
}

sortArgs(2, 5, 9);
```

### 默认参数

```JavaScript
// 老方法
function myFunc(a,b) {
		a = a || 1;
   	b = b || "Hello";
}

// 新方法
function myFunc (a = 1, b = "Hello") {
}
```

### 参数类型检查

```JavaScript
var myFn = function(input) {
	if (typeof input === "string") {
		console.log("The input was a string.");
	} else if (typeof input === "number") {
		console.log("The input was a number.");
	}
}
myFn("hi");
myFn(42);
```

### 参数命名

参数太多，眼睛花。用对象的方式，清楚
```JavaScript
var orderSandwich = function(options) {
	// ...
}
orderSandwich({
	size: "footlong",
	bread: "dutch crunch",
	meat: "turkey",
	cheese: true
})
```

### 模板输入
```JavaScript
function formatGreetings(name, age) {
 	var str = `Hi ${name} your age is ${age}`;

	// 允许多行，
	var x = `This string has
				two lines`;
}
```

## 示例

```JavaScript
console.log(Math.max(1, 2));
console.log(Math.max(3, 4, 5));

console.log(Math.min(1, 2));
console.log(Math.min(3, 4, 5));

var str = "Quick brown fox";

console.log("With two arguments:");
console.log(str.substr(6, 5));	# 起始位置，长度

console.log("With one argument:");
console.log(str.substr(6));			# 没有长度，默认到尾
```

## 无名函数

### lambda函数。即写即用

```JavaScript
var helloFn = function() {
	console.log("Hello!");
}
```

不能直接用function开头。这样会出错
```JavaScript
function() {
	console.log("Hello!");
}
```

用()包起来就好了。
```JavaScript
(function() {
	console.log("Hello!");
})
```

直接运行。在后面加括号就行。这看起来有点傻，但能够用来做global abatement。
```JavaScript
(function() {
	console.log("Hello!");
})()
```

### 无名函数做回调函数（callback）

送进其它函数去的函数。

React's JSX prefers functional style: map(), filter(), ?:
```JavaScript
var helloFn = function() {
	console.log("Hello!");
}
window.setTimeout(helloFn, 1000);
```

因为只用一次，就别单独声明helloFn，用无名函数更简洁
```JavaScript
window.setTimeout(
		function() { console.log("Hello!") },
		1000
	);
```

### 用无名函数给对象属性赋值

```JavaScript
var dog = {
		"bark": function() { console.log("Woof!") }
	};
dog.bark();

var cat = {}
cat.meow = function() { console.log("Meow!") }
cat.meow();
```

### 函数返回无名函数

```JavaScript
var makeGreeting = function() {
    return function() {
        console.log("Hello!");
    };
};

var greeting = makeGreeting();	# greeting是一个函数
greeting();
```

# 函数高阶

Object method invocation as method passing. The this variable as an implicit parameter variable. Problems with methods in event handlers and callbacks. Usage of call and apply. Binding context. The new keyword. Crockford Chapter 4

## 函数式编程

Functional programming. Side effects. Referential transparancy. Iteration over collections without loops. Implementation of map, reduce, find, filter.


```JavaScript
for (var i = 0; i < anArr.length; i++) {
      newArr[i] = anArr[i]*i;
    }

newArr = anArr.map(function (val, ind) {
       return val*ind;
    });

anArr.filter(filterFunc).map(mapFunc).reduce(reduceFunc);
```

## 箭头函数

ES6函数式编程：箭头函数，不重新定义this
```JavaScript
newArr = anArr.map((val, ind) => val*ind);
```

## 闭包closures

Lexical scope. Inner functions. Closure scope. Examining closure scope in the debugger. Functors. Simulation of private object properties. Simulation of namespaces.

获得私有属性
```JavaScript
var myObj = (function() {
   var privateProp1 = 1;  var privateProp2 = "test";
   var setPrivate1 = function(val1)  { privateProp1 = val1; }
   var compute = function() {return privateProp1 + privateProp2;}
   return {compute: compute, setPrivate1: setPrivate1};
})();
typeof myObj;        // 'object'
Object.keys(myObj);  //  [ 'compute', 'setPrivate1' ]
```

## 更高阶函数

Implementation of curry, memoize, and debounce.
