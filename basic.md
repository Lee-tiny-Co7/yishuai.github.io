<!-- .markdown-preview[data-use-github-style] .highlight pre, .markdown-preview[data-use-github-style] pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: black; border-radius: 3px; } -->

# 入门

What is JavaScript? Brief history. Common use-cases. Runtime environments. ECMAScript standards. Overview of language features. Running JavaScript in the browser and at the command line. Debugging JavaScript in the browser. The console and REPL. (Flanagan Chapters 1–2)

## 上手

1995年，Brendan Eich，Mozilla的创始人设计

打开浏览器的控制台。这里可以编程。

```JavaScript
console.log("Hello world!");
alert("Hello world!");
alert(prompt("What is your name?"));
```

让网页执行你的程序。没有主函数main，从上往下执行，不需要编译。

包括在script元素里。像CSS似的，可以是文件，也可以直接包括在HTML里。

```html
<!DOCTYPE html>
	<html>
		<head>
			<title>CS 193X</title>
			<link rel="stylesheet" href="style.css" />
			<script src="filename.js" defer></script>
		</head>
		<body>
			... contents of the page...
		</body>
	</html>
```

注意上面的“defer”，它意味着: 直到所有DOM加载完后，才执行这个Javascript。别用load那种老方法了。

# 基本语法

Values and literals. Primitive types. Numbers. Integer and floating point as a single type. Special floating point numbers. Rounding errors. The Math library. Strings. Immutability of strings. + and [] operators. toString. Common string utilities. Booleans. Ternary operator. Truth-y and False-y values. null and undefined. Regular expressions. Dynamic typing. Weak typing. The typeof operator. The === and !== operators. Control statements. (Flanagan Chapters 3–5)

## 注释

```JavaScript
// comment or /* comment */
```

## 数学

不区分整数（integers）和浮点数（floating point numbers），都是double-precision floating point numbers，没有整数类型。所以，1/2在C++和Java中是0, 因为取整。在JavaScript中是0.5。

最大整数：MAX_INT = (2^53 - 1) = 9007199254740991

数学运算

```JavaScript
1+2
1/2
console.log(1 + 2);  // 3
console.log(3 - 4);  // 1
console.log(5 * 6);  // 30
console.log(7 / 8);  // 0.875

(0.1 + 0.2) == 0.3 is false // 0.30000000000000004
```

比特位操作（bitwise operators），如 ~, &, |, ^, >>, <<, >>>) 是 32bit!

三种特别的浮点数：Infinity（正无穷）, -Infinity（负无穷）, NaN（Not-a-number：不是一个数).

```JavaScript
console.log(1 / 0);   // Infinity
console.log(-1 / 0);  // -Infinity
console.log(0 / 0);   // NaN

console.log(Infinity);
console.log(-Infinity);
console.log(NaN);
```

从字符串中提取数字

parseFloat
```JavaScript
console.log(parseFloat("0.1"));
console.log(parseFloat("1e-3"));
```

parseInt：第二个参数是Base（基）。如果不提供，就从字符串的内容推断：“0x”或“0X”，为16进制； “0”, 8进制 (octal)或者10进制。所以最好是给出这个参数。

```JavaScript
console.log(parseInt("42", 10));
console.log(parseInt("137", 10));
console.log(parseInt("0x10"));	// This is 16
console.log(parseInt("010")); // This could be 8 or 10
```

常数：e，Pi

```JavaScript
console.log(Math.E);
console.log(Math.PI);
```

取整
```JavaScript
console.log(Math.ceil(1.1));   // 2
console.log(Math.floor(1.1));  // 1
console.log(Math.round(1.1));  // 1
```

随机数
[0, 1) (包括0, 不包括1)
```JavaScript
Math.random()
```

三角函数
```JavaScript
// Math.PI / 3 is 60 degrees.
console.log(Math.sin(Math.PI / 3));
console.log(Math.cos(Math.PI / 3));
console.log(Math.tan(Math.PI / 3));

console.log(Math.asin(0.866));
console.log(Math.acos(0.500));
console.log(Math.atan(1.732));
```

数学函数
```JavaScript
console.log(Math.exp(1));       // Exp of 1
console.log(Math.log(Math.E));  // Log of e
console.log(Math.pow(3, 2));    // Square of 3
console.log(Math.sqrt(9));      // Square root of 9
```

## 字符串

一系列字符。一旦赋值，不可改（Immutable）。没有char类型

```JavaScript
console.log("I am a string!");
console.log('So am I!');
```

字符串长度
```JavaScript
console.log("Hello world!".length);
```

像C/C++, 可以作为字符的数组
```JavaScript
console.log('So am I!'[0]);
```

加号连接，自动类型转换
```JavaScript
console.log("Hello" + "Dave");
console.log("The answer to Life, The Universe and Everything is " + 42);
```

没有跨行显示字符串的连接符，需手工连接
```JavaScript
var gettysburgAddress =
	"Four score and seven years ago our fathers brought forth on this " +
	"continent, a new nation, conceived in Liberty, and dedicated to the " +
	"proposition that all men are created equal.\n"
```

## 各种字符串函数

indexOf(), charAt(), match(), search(), replace(), toUpperCase(), toLowerCase(), slice(), substr()

切分
```JavaScript
var str = "1 2 3 4";

console.log("With string argument:")
console.log(str.split(" "));

console.log("With regular expression argument:")
console.log(str.split(/\s/));
```

大小写转换
```JavaScript
console.log("I'm in lowercase".toLowerCase());
console.log("I'm in uppercase".toUpperCase());
```

搜索匹配
```JavaScript
"I'm in lowercase".includes('e')
"I'm in lowercase".indexOf('e')
"I'm in lowercase".lastIndexOf('e')
```

## 变量

三种定义方法：var, let, const

### var

老方法，不建议用了。范围是在函数内，出了函数就不能用了。

hoisted变量声明方法：浏览器会把所有var变量声明提前到Scope（函数）的最前面声明。所以，即使在变量声明前就用了它，也没事。

```JavaScript
function printMessage(message, times) {
 	for (var i = 0; i < times; i++) {
	 	console.log(message);
 	}
 	console.log('Value of i is ' + i);
}
printMessage('hello', 3);
```

### let

let：范围是在block内，出了块就不能用了。block是花括号（curly braces）内的内容。下例就会出错。

```JavaScript
function printMessage(message, times) {
	for (let i = 0; i < times; i++) {
	 	console.log(message);
 	}
 	console.log('Value of i is ' + i);
}
printMessage('hello', 3);
```

### const

const：和let类似，是block范围常量。但是常数，不能再赋值了。

```JavaScript
let x = 10;
if (x > 0) {
	const y = 10;
}
console.log(y);
```

但const list还可以加值。

```JavaScript
const y = 10;
y = 0; // error!
y++; // error!
const list = [1, 2, 3];
list.push(4); // OK
```

### 最佳实践

尽量用const，不用var，这是谷歌的JS风格指导：https://google.github.io/styleguide/jsguide.html#features-use-const-and-let

## 变量类型

动态设定类型
```JavaScript
var x = 1;
let y = 'x';
const z = true;
```

六种基本类型：boolean, number, string, symbol, null, undefined

```JavaScript
var myNum = 1;
console.log(typeof myNum);        // number

var myBool = true;
console.log(typeof myBool);       // boolean

var myString = "Hello world";
console.log(typeof myString);     // string

var myNull = null;
console.log(typeof myNull);       // null

var myUndefined;
console.log(typeof myUndefined);  // undefined

console.log(typeof myMissing);    // undefined
```

### Undefined

：没有赋值
```JavaScript
var myVar;
console.log(myVar);
console.log(typeof myVar);
```

```JavaScript
var myObj = {};
console.log(myObj.myProperty);
console.log(typeof myObj.myProperty);
```

```JavaScript
var myFn = function(myArg) {
	console.log(myArg);
	console.log(typeof myArg);
}
myFn();
```

```JavaScript
var myVar = undefined;
console.log(myVar);
console.log(typeof myVar);
```

### null

：从应用的角度，没有值。

比如：函数内部出错时，返回null

null是一个值，只是为空

undefined是变量，但还没有值（但是，你也可以把一个变量的值设为undefined）

```JavaScript
var myVar = null;
console.log(myVar);
console.log(typeof myVar);
```

没有声明
```JavaScript
console.log(myVarx);
console.log(typeof myVarx);
```

### 日期

距离January 1, 1970 UTC的毫秒数

```JavaScript
var date = new Date();
date.valueOf() = 1452359316314
date.toISOString() = '2016-01-09T17:08:36.314Z'
date.toLocaleString() = '1/9/2016, 9:08:36 AM'
```

## 赋值

Reference（指针）

非primitive的变量，其实是一个指针。因此，把它赋值给另一个变量时，是把指针赋过去了。所以，那个变量如果内容发生了变化，这个也会发生变化

```JavaScript
var myArr1 = [1, 2, 3];
var myArr2 = myArr1;
myArr2.push(4);
console.log(myArr1);
```

链表
```JavaScript
var link1 = {val: "1", next: null};
var link2 = {val: "1", next: null};
var link3 = {val: "1", next: null};
link1.next = link2;
link2.next = link3;
link3.next = link1;
console.log(link1.next.next.next.val);
```

## 动态类型转换
加法，往字符串靠
```JavaScript
console.log("1" + 2);
console.log(1 + "2");
```

乘除减法，往数字靠
```JavaScript
console.log("3" * 4);
console.log(3 * "4");
```

下面就比较奇怪了。试试。
```JavaScript
console.log([] + {});
console.log({} + []);
console.log({} + []);
console.log({} + {});
```

```JavaScript
var duck = "Donald Duck";
// var duck = ["Donald", "Duck"];

for (var i = 0; i < duck.length; i++) {
	console.log("Element #" + i + ": " + duck[i]);
}
```

# 流程控制

### 布尔类型

0, NaN, "" (空字符串), null，undefined这些值，会当false看待。其余所有值都是true，比如[] (空数组)，{} (空对象)。

```JavaScript
console.log(true);
console.log(false);
```

### 逻辑操作

&& || ！

### 逻辑判断：

==, !== 会做implicit类型转换，很难弄

```JavaScript
'' == '0'  // false
'' == 0  // true
0 == '0'  // true
NaN == NaN  // false
[''] == ''  // true
false == undefined  // false
false == null  // false
null == undefined  // true
```

ECMAScript用 ===，!==，要求严格相等。总是用这种。

```JavaScript
'' === '0'  // false
'' === 0  // false
0 === '0'  // false
NaN == NaN  // still weirdly false
[''] === ''  // false
false === undefined  // false
false === null  // false
null === undefined  // false
```

## If - Else

```JavaScript
var x = 11;
if (x < 10) {
	console.log("x is less than 10.");
} else if (x >= 10 && x <= 20) {
	console.log("x is between 10 and 20.");
} else {
	console.log("x is more than 20.");
}
```

## while

```JavaScript
var numNyan = 10;
var i = 0;
while (i < numNyan) {
	console.log("nyan ")
	i++;
}
```

## for

```JavaScript
var n = 3;
var d = 10;
console.log("First " + n + " multiples of " + d)
for (var i = 1; i <= n; i++) {
	console.log(i * d);
}
```

## switch

```JavaScript
var n = 1;
switch (n) {
	case 1:
		console.log("Ichi");
		break;
	case 2:
		console.log("Ni");
		break;
	case 3:
		console.log("San");
		break;
}
```

# 字符串匹配

## 常规表达式
```JavaScript
var re = /ab+c/;
var re2 = new RegExp("ab+c");
```

## 字符操作

search(), match(), replace(), and split()
```JavaScript
/HALT/.test(str); // Returns true if string str has the substr HALT /halt/i.test(str); // Same but ignore case
/[Hh]alt [A-Z]/.test(str); // Returns true if str either “Halt L” or “halt L”
'XXX abbbbbbc'.search(/ab+c/); // Returns 4 (position of ‘a’)
'XXX ac'.search(/ab+c/);			// Returns -1, no match
'XXX ac'.search(/ab*c/);			// Returns 4
'12e34'.search(/[^\d]/);			// Returns 2
'foo: bar;'.search(/...\s*:\s*...\s*;/); // Returns 0
```

## 常规表达式操作
RegExp: exec() and test()
```JavaScript
var str = "This has 'quoted' words like 'this'";
var re = /'[^']*'/g;
re.exec(str); // Returns ["'quoted'", index: 9, input: ...
re.exec(str); // Returns ["'this'", index: 29, input: ...
re.exec(str); // Returns null
str.match(/'[^']*'/g); // Returns ["'quoted'", "'this'"]
str.replace(/'[^']*'/g, 'XXX'); // Returns: 'This has XXX words with XXX.'

```

# 异常

## try - catch
```JavaScript
try {
      nonExistentFunction();
} catch (err) {   // typeof err 'object'
      console.log("Error call func", err.name, err.message);
}
```

## throw - finally
```JavaScript
try {
       throw "Help!";
    } catch (errstr) {  // errstr === "Help!"
			console.log('Got exception', errstr);
		} finally {
       // This block is executed after try/catch
    }

console.log("Got Error:", err.stack || err.message || err);
```
