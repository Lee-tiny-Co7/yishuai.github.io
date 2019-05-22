<!-- .markdown-preview[data-use-github-style] .highlight pre, .markdown-preview[data-use-github-style] pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: black; border-radius: 3px; } -->

# 入门

```JavaScript
console.log("Hello world!");
alert("Hello world!");
alert(prompt("What is your name?"));
```

# 数学

```JavaScript
1+2
1/2
console.log(1 + 2);  // 3
console.log(3 - 4);  // 1
console.log(5 * 6);  // 30
console.log(7 / 8);  // 0.875
```

JavaScript不区分integers和floating point numbers，都是double-precision floating point numbers.

1/2在C++和Java中是0, 因为取整。在JavaScript中是0.5.

三种特别的浮点数：Infinity, -Infinity, NaN.

```JavaScript
console.log(1 / 0);   // Infinity
console.log(-1 / 0);  // -Infinity
console.log(0 / 0);   // NaN

console.log(Infinity);
console.log(-Infinity);
console.log(NaN);
```

从字符串中提取数字

```JavaScript
console.log(parseInt("42", 10));
console.log(parseInt("137", 10));
console.log(parseFloat("0.1"));
console.log(parseFloat("1e-3"));

```

parseInt的第二个参数是Base。如果不提供，就从字符串的内容推断：“0x”或“0X”，为16进制； “0”, 8进制 (octal)或者10进制。所以最好是给出这个参数。

```JavaScript
console.log(parseInt("0x10"));	// This is 16
console.log(parseInt("010")); // This could be 8 or 10

```
指数，Pi

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

三角函数
```JavaScript
// Math.PI / 3 is 60 degrees.
console.log(Math.sin(Math.PI / 3));
console.log(Math.cos(Math.PI / 3));
console.log(Math.tan(Math.PI / 3));

console.log(Math.asin(0.866));
console.log(Math.acos(0.500));
console.log(Math.atan(1.732));

console.log(Math.exp(1));       // Exp of 1
console.log(Math.log(Math.E));  // Log of e
console.log(Math.pow(3, 2));    // Square of 3
console.log(Math.sqrt(9));      // Square root of 9
```

# 字符串
```JavaScript
console.log("I am a string!");
console.log('So am I!');
```

像C/C++, 可以作为字符的数组
```JavaScript
console.log('So am I!'[0]);
```

自动类型转换
```JavaScript
console.log("Hello" + "Dave");
console.log("The answer to Life, The Universe and Everything is " + 42);
```

JS没有跨行显示字符串的连接符，需手工连接
```JavaScript
var gettysburgAddress =
	"Four score and seven years ago our fathers brought forth on this " +
	"continent, a new nation, conceived in Liberty, and dedicated to the " +
	"proposition that all men are created equal.\n"
```

字符串长度
```JavaScript
console.log("Hello world!".length);
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

# 变量

Undefined：没有赋值
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

null：从应用的角度，没有值。比如：函数内部出错时，返回null
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

变量类型
```JavaScript
var myNum = 1;
console.log(typeof myNum);        // number

var myBool = true;
console.log(typeof myBool);       // boolean

var myString = "Hello world";
console.log(typeof myString);     // string

var myNull = null;
console.log(typeof myNull);       // object

var myUndefined;
console.log(typeof myUndefined);  // undefined

console.log(typeof myMissing);    // undefined
```

# 流程控制
```JavaScript
console.log(true);
console.log(false);
```

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

```JavaScript
var numNyan = 10;
var i = 0;
while (i < numNyan) {
	console.log("nyan ")
	i++;
}
```

0, NaN, "" (空字符串), null，undefined这些值，会当false看待。其余所有值都是true，比如[] (空数组)，{} (空对象)。

```JavaScript
var n = 3;
var d = 10;
console.log("First " + n + " multiples of " + d)
for (var i = 1; i <= n; i++) {
	console.log(i * d);
}
```

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

# 数组、对象

索引从0开始
```JavaScript
var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
console.log(daysOfWeek[0]);
daysOfWeek[0] = "Mon";
```

读，超出数组长度，返回 undefined.
```JavaScript
var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
console.log("The value of the 8th day is: " + daysOfWeek[7]);
```

写，超出数组长度，变成这么长，中间插undefined.
```JavaScript
var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
daysOfWeek[9] = "The extra day of the week that everyone wishes they had";
console.log("The value of the 8th day is: " + daysOfWeek[7] + daysOfWeek[8] + daysOfWeek[9]);
```

可混合类型
```JavaScript
var daysOfWeek = ["The Answer to Life, Universe and Everything", 42];
```

遍历数组元素
```JavaScript
var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
for (var i = 0; i < daysOfWeek.length; i++) {
	console.log(daysOfWeek[i]);
}
```

JavaScript 1.6以后，加入了forEach函数，注意IE6等老的浏览器不支持
```JavaScript
var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
daysOfWeek.forEach(function(x) { console.log(x) });
```

加减数组元素
```JavaScript
var arr = [1, 2, 3];
console.log(arr.pop());
console.log(arr);

console.log(arr.push(1));
console.log(arr);

console.log(arr.shift());
console.log(arr);

console.log(arr.unshift(4));
console.log(arr);
```

排序，翻转
```JavaScript
var primes = [5, 3, 7, 11, 2]

console.log("Unsorted:");
console.log(primes);

console.log("Sorted:");
primes.sort()
console.log(primes);

console.log("Sorted and reversed:");
primes.reverse()
console.log(primes);
```

合并两个数组
```JavaScript
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
```

拼接成字符串
```JavaScript
var arr = [1, 2, 3]
console.log(arr.join('-'))
```

删加元素
```JavaScript
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
```

提取元素，返回新数组
```JavaScript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

```

# 对象
一组数据

声明
```JavaScript
var student = {
	"name": "Jane Doe",
	"class": 2015
};

var ninja = {
	weapon: 'katana',
	skill: 'stealth'
};

```

加新属性
```JavaScript
var student = {
	"name": "Jane Doe",
	"class": 2015
};

student.age = 14
console.log(student)
```

读写
```JavaScript
student.class = 2014

console.log('Name:', student.name);
console.log('Class:', student.class);

console.log('Weapon:', ninja["weapon"]);
console.log('Skill:', ninja["skill"]);
```

访问未定义的对象属性，不出错，只是返回undefined
```JavaScript
var ninja = {
	weapon: 'katana',
	skill: 'stealth'
};

console.log(ninja.email);  // Not an error
console.log(ninja["email"]);  // Not an error
```

遍历对象的属性
```JavaScript
for (key in student) {
	if (student.hasOwnProperty(key)) {
		console.log(key + ": " + student[key]);
	}
}
```

顺序不确定。

hasOwnProperty确保不会访问后面prototype chain定义的属性。

除了null，undefined，其它一切都是对象，可以用.来进行函数调用。
```JavaScript
console.log(true.toString());
console.log("Hello world!".toString());
console.log([1, 2, 3].toString());
console.log({"hi": "there"}.toString());
```

但数字后面加.会被认为是小数点，所以要加()。{}也是。
```JavaScript
console.log(0.toString());
console.log(function() {}.toString());

console.log((0).toString());
console.log((function() {}).toString());

console.log("Hey Jude".indexOf("Jude"));
console.log((42).toString());
```

对一个primitive来说（即number, string, boolean, null, undefined），JS会动态生成一个对象，执行完操作后，对象删除。所以不能往里面加新属性等。
```JavaScript
var myNum = 42;
myNum.answerTo = "Life, The Universe and Everything";
console.log(myNum.answerTo);
```

全局变量是window对象的属性
```JavaScript
EARTH_GRAVITY = 9.807
MOON_GRAVITY = 1.622
MARS_GRAVITY = 3.711
console.log(window.EARTH_GRAVITY);
console.log(window.MOON_GRAVITY);
console.log(window.MARS_GRAVITY);

window.EARTH_GRAVITY = 9.807
window.MOON_GRAVITY = 1.622
window.MARS_GRAVITY = 3.711
console.log(EARTH_GRAVITY);
console.log(MOON_GRAVITY);
console.log(MARS_GRAVITY);
```

# Reference（指针）
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

# 动态类型转换

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
