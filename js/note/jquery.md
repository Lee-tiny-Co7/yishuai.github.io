# jQuery

不建议用，因为它的功能现在基本可以用JS自身的功能（document.querySelector, classList, ES6 classes, CSS动画）实现了。

但需要能够读懂。因为曾经很流行。

Overview of jQuery. Cross-browser compatibility. The $ function object. Element selectors. Tree traversal. Node creation, insertion, modification and deletion. Getting and setting attributes, styles and class. Wrapping and unwrapping DOM raw objects. The chaining pattern. (Flanagan Chapter 19)

FCC练习18个。耗时：1小时。

知识点：

选择元素，修改class，css，禁用、修改、删除、移动、克隆元素，选择父-子-特定子元素，修改整个页面

## $变量

用CSS选择器，得到一套元素，然后一次对所有元素进行操作

$变量：代表jQuery，是一个函数，但也有很多属性和方法，返回一个集合。做四个事情
1. 变量是CSS选择器，就返回匹配的DOM元素
2. 变量是HTML字符串，创建一个新的DOM元素
3. 变量是DOM元素，返回该DOM元素类的DOM元素集合
4. 没有变量，返回空
5. 变量是集合，就返回还是这个集合

## 选择元素

\*
All Selector (”*”)
Class Selector (“.class”)
Element Selector (“element”)
ID Selector (“#id”)
Multiple Selector (“selector1, selector2, selectorN”)
Descendant Selector (“ancestor descendant”)
\*

```JavaScript
var domMan = document.getElementById("hello");
// 等价于
var jqMan = $("#hello");
```

jQuery在DOM对象上面又封装了一层，如果需要直接DOM操作，需要把它取出。注意用eq取出来的还是jQuery对象。
```JavaScript
var jqElem = $("#egg");
var domElem = jqElem[0];
// Alternatively:
var domElem = jqElem.get(0);
```

反之亦然
```JavaScript
var domElem = document.getElementById("egg");
var jqElem = $(domElem);
```

jQuery返回的集合是一个Set，可以做
1. 合并union：add
2. 求交集intersection：filter
3. 找不同difference：not

```JavaScript
var fruits = $(".apples").add(".oranges")
var ripeApples = $(".apples").filter(".ripe")
var unripeApples = $(".apples").not(".ripe")
```

注意CSS选择器已经支持合并和取交集
```JavaScript
var fruits = $(".apples, .oranges")		# 合并
var ripeApples = $(".apples.ripe")		# 交集
```

选择特定子元素
```JavaScript
$(".target:nth-child(2)").addClass("animated bounce");
$(".target:even").addClass("animated shake");
```

## 元素操作

1. attr：属性
2. css：style，但不能读写stylesheet里的style，只是对元素的style
3. addClass，removeClass：加css class
4. hide，show：修改display属性，none是看不见，block或者inline就能看见
5. toggle：如果现在看不见，就show，反之亦然
6. val：值

如果对集合里所有元素进行操作，用map。

操作会返回原对象，所以可以链式操作
```JavaScript
$(".elem").css("background", "yellow").attr("src", "some-url")  // etc.
```

prop: 调整属性标签
```JavaScript
$("button").prop("disabled", true);
```

## 修改内容

两种方法
1. html
2. text

如果有值，就设值，否则，返回值。

```JavaScript
var $(".elem").html("<b>Hello world!</b>")
var $(".elem").text("<b>Hello world!</b>")
```

## 移动元素

1. append：加做最后child
2. prepend：加做第一个child
3. after：放到后面，作为兄弟姊妹
4. before：放到前面，作为兄弟姊妹

也可以prependTo, prependTo, insertAfter，insertBefore，

```JavaScript
$("#target2").appendTo("#right-well");
```

## 加删元素
1. 加：给$送进去一个完整元素的HTML，然后插入即可。
2. 删：remove

```JavaScript
$("#target4").remove()
```

## 复制元素

克隆

```JavaScript
$("#target5").clone().appendTo("#left-well");
```

## 访问父/子元素（标签）

```JavaScript
$("#target1").parent().css("background-color",'red');
$("#right-well").children().css("color", "orange");
```

```JavaScript

```


```JavaScript

```

```JavaScript

```

# 事件处理，动画

Event handling. bind and unbind. Keyboard and mouse events. Event delegation and bubbling. Animation. (Flanagan Chapters 17, 19)

脚本可以放在代码的任何一个地方，浏览器会从前往后跑。如果放在了head里，浏览器看到这，还没有看到body，就做不了什么事。应该把代码放在一个函数里，然后在$(document).ready() 里调用。

```JavaScript
$(document).ready()
```

用on，bind事件的回调函数。如果是集合，会给集合中每个元素都bind上。相当于addEventListener
用off，取消，相当于removeEventListener
以前的bind，unbind函数不用了。
```JavaScript
$("#hello_btn").on("click", function() { alert("Hello world!" )} )
```

缩写。类似的还有mousedown, mouseup, mousemove, keydown, keyup, change, focus, blur, submit.
```JavaScript
$("#hello_btn").click(function() { alert("Hello world!" )} )
```

我们也可以在代码里调这些函数，生成这些事件
```JavaScript
$("#hello_btn").click(function() { alert("Hello world!" )} )
$("#hello_btn").click();
```

动画
1. setTimer
2. fadeIn, fadeOut, fadeToggle
3. slideIn, slideOut, slideToggle：适合菜单
4. hinge: 铰链转动，特别逗

```JavaScript
$("#elem").fadeOut().fadeIn()		# 先fadeout，再fadein
$("body").addClass("animated hinge");
```
