# 数组 Array

Array insertion and deletion. Array length. Sparse arrays. Multidimensional arrays.  (Flanagan Chapters 6–7)

一组数。复合数据类型

## 定义

可混合类型
```JavaScript
let daysOfWeek = ["The Answer to Life, Universe and Everything", 42];
```

## 索引

从0开始，访问，读写

```JavaScript
let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
console.log(daysOfWeek[0]);
daysOfWeek[0] = "Mon";
```

读，超出数组长度，返回 undefined.
```JavaScript
let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
console.log("The value of the 8th day is: " + daysOfWeek[7]);
console.log(daysOfWeek.length);
```

写，超出数组长度，变成这么长，中间插undefined.
```JavaScript
let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
daysOfWeek[9] = "The extra day of the week that everyone wishes they had";
console.log("The value of the 8th day is: " + daysOfWeek[7] + daysOfWeek[8] + daysOfWeek[9]);
```

## for遍历

三种for方法，越来越简洁

第一种
```JavaScript
let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
for (let i = 0; i < daysOfWeek.length; i++) {
	console.log(daysOfWeek[i]);
}
```

第二种
```JavaScript
for (let item of groceries) {
	console.log(item)
};
```

第三种最新
```JavaScript
let sum = 0;
for (ent of a) {
	sum += ent;
}
```

还有一种：JavaScript 1.6以后，加入了forEach函数，注意IE6等老的浏览器不支持
```JavaScript
let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                  "Saturday", "Sunday"];
daysOfWeek.forEach(function(x) { console.log(x) });
```

## 操作

加减数组元素：pop，push，shift，unshift
```JavaScript
let arr = [1, 2, 3];
console.log(arr.pop());
console.log(arr);

console.log(arr.push(1));
console.log(arr);

console.log(arr.shift());
console.log(arr);

console.log(arr.unshift(4));
console.log(arr);
```

排序sort，翻转reverse
```JavaScript
let primes = [5, 3, 7, 11, 2]

console.log("Unsorted:");
console.log(primes);

console.log("Sorted:");
primes.sort()
console.log(primes);

console.log("Sorted and reversed:");
primes.reverse()
console.log(primes);
```

合并：concat
```JavaScript
let array1 = ['a', 'b', 'c'];
let array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
```

拼接成字符串：join
```JavaScript
let arr = [1, 2, 3]
console.log(arr.join('-'))
```

删加：splice

splice(startIndex, deleteCount, item1, item2, ... )
```JavaScript
let months = ['Jan', 'March', 'April', 'June'];

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
```

提取元素，返回新数组：slice

```JavaScript
let animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

# 解构

把数组拆成一个个数

spread扩展操作符：...
```JavaScript
let anArray = [1,2,3];
myFunc(...anArray);
let o = [5, ...anArray, 6];
```

解构分配（新方法）
```JavaScript
let [a,b,c] = arr;
let {name, age, salary} = obj;
function render({name, age}) {
}
```
