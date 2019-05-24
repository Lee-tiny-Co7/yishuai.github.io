
# 数组、对象

Arrays. Array insertion and deletion. Array length. Sparse arrays. Multidimensional arrays. Almost everything is an object. Objects as unordered maps. Object creation, modification and lookup syntax. Nested objects. Object methods. The delete keyword. The for... in statement, and the hasOwnProperty method. The global window object. Object references. Aliasing. Pass-by-reference-copy semantics. (Flanagan Chapters 6–7)

复合数据类型

## 数组

spread扩展操作符
```JavaScript
var anArray = [1,2,3];
myFunc(...anArray);
var o = [5, ...anArray, 6];
```

解构分配
```JavaScript
let [a,b,c] = arr;
let {name, age, salary} = obj;
function render({name, age}) {
}
```

模板，允许多行，
```JavaScript
function formatGreetings(name, age) {
 	var str = `Hi ${name} your age is ${age}`;
	var x = `This string has
				two lines`;
}
```

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
console.log(daysOfWeek.length);
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

for (let item of groceries) {
	console.log(item)
};

// 新写法
let sum = 0;
for (ent of a) {
	sum += ent;
}

```

JavaScript 1.6以后，加入了forEach函数，注意IE6等老的浏览器不支持
```JavaScript
var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
daysOfWeek.forEach(function(x) { console.log(x) });
```

## 数据操作

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
splice(startIndex, deleteCount, item1, item2, ... )
```JavaScript
var months = ['Jan', 'March', 'April', 'June'];

// inserts at index 1
months.splice(1, 0, 'Feb');
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

// replaces 1 element at index 4
months.splice(4, 1, 'May');
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']

// Remove one element at index 4:
months.splice(4, 1);
console.log(months);

Add element at index 2:

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


# JSON

```JavaScript
var obj = { ps: 'str', pn: 1, pa: [1,'two',3,4], po: { sop: 1}};
var s = JSON.stringify(obj) = '{"ps":"str","pn":1,"pa":[1,"two",3,4],"po":{"sop":1}}'
typeof s == 'string'
JSON.parse(s)
```
