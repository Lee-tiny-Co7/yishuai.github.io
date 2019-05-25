# DOM（文档对象模型）

Tags. Document structure. Elements. Text, forms, images, blocks and frames. Selectors. Cascading and inheritence. Text and color tyles. The box model. Layout. The DOM as an document API. Browser information. The setTimer and setTimeout. Element lookup. Tree traversal. Attribute getting and setting. Creating and deleting nodes. Events. (Flanagan Chapters 15 and 16)

常用HTML元素：h, p, div, span, form, input, ul, ol, li, a, em, strong, tr

每个元素是一个Javascript对象。有父、子、兄弟姊妹

第一级：Node
第二级：Document，CharacterData，Element，Attr
第三极：HTMLDocument，Text，Comments，HTMLElement
第四级：HTMLHeadElement，HTMLBodyElement，HTMLTitleElement，HTMLImageElement ...

```html
<div>
	<h1>Header</h1>
	<ul>
		<li>Point 1</li>
		<li>Point 2</li>
		<li>Point 3</li>
	</ul>
</div>
```

## document对象

getElementById，如果没有，返回null
```html
<p id="hello">Hello world!</p>
```

```JavaScript
var elem = document.getElementById("hello");
```

还可以document.getElementsByClassName，document.getElementsByTagName
返回一个list，这个list是live的，会自动更新。

也可以querySelector，querySelectorAll

```JavaScript
let element = document.querySelector('#button');

let element = document.querySelectorAll('#button');

let elementList =
    document.querySelectorAll('.quote, .comment');	#或，不是与
```

其它方法不用了：如
```JavaScript
var goldenGateImg = document.images["golden_gate"];
```

## 查找元素

在DOM Tree上来回，找到想要的元素
```JavaScript
element.parentNode
element.childNodes
element.firstChild
element.lastChild
element.nextSibling
element.previousSibling
```

## 加删元素
document.createElement(tag string)
element.appendChild(element);
element.remove();
element.innerHTML = '';		# 移走元素下面的所有子元素

```JavaScript
function openPresent(event) {
  const newHeader = document.createElement('h1');
  newHeader.textContent = 'Hooray!';
  const newImage = document.createElement('img');
  newImage.src = 'https://media.giphy.com/media/27ppQUOxe7KlG/giphy.gif';

  const container = document.querySelector('#container');
  container.innerHTML = '';
  container.appendChild(newHeader);
  container.appendChild(newImage);
}

const image = document.querySelector('img');
image.addEventListener('click', openPresent);
```

## 访问元素信息

自定义数据属性，然后用Javascript访问
也可以在CSS里写
```html
<div id="1" data-index="0"><img src="x.png"></div>
```

```JavaScript
var space = document.getElementById('1')
const index = parseInt(space.dataset.index);		// "0"
```

## 修改元素信息

修改元素属性，如src，html，文本

element.innerHTML
element.textContent
element.classList
element.id
element.src

注意别用element.innerHTML = '<h1>Hooray!</h1>';有安全风险

### 换图片

```html
<img src="puppy.png" />
```

```JavaScript
var goldenGateImg = document.getElementById("golden_gate");
console.log("The URL of this image is: " + goldenGateImg.src);
goldenGateImg.src = "../img/golden_gate.jpg";

const image = document.querySelector('img');
image.src = 'new-picture.png';
```

### 修改标题

```JavaScript
const title = document.querySelector('h1');
title.textContent = 'Hooray!';
```

### 修改Class来修改Style

加删classes得通过classList
```JavaScript
const image = document.querySelector('img');
// Adds a CSS class called "active".
image.classList.add('active');
// Removes a CSS class called "hidden".
image.classList.remove('hidden');
```

### 直接修改Style
一般通过改classList，来改style，但当需要用Javascript值来改style时，可以这样。
```JavaScript
const modalView = document.querySelector('#modal-view');
modalView.style.top = window.pageYOffset + 'px';

element.style.transform = 'translateX(' + delta + 'px)';
```

### 隐藏和显示

修改display属性为none，这样看不见，但还是在load的。

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>JS Example</title>
		<style media="screen">
			body {
				font-family: monospace;
				text-align: center;
				}
			img {
				height: 200px;
				}
			.hidden {
				display: none;
				}
		</style>
  </head>
  <body>
    <div id="gift-outside">
      <h1>Click for a present:</h1>
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/gift-icon.png" />
    </div>
    <div id="gift-inside" class="hidden">
      <h1>Hooray!</h1>
      <img src="https://media.giphy.com/media/27ppQUOxe7KlG/giphy.gif" />
    </div>
  </body>
</html>
```

```JavaScript
function openPresent(event) {
  const image = event.currentTarget;
  image.removeEventListener('click', openPresent);

  const giftOutside = document.querySelector('#gift-outside');
  const giftInside = document.querySelector('#gift-inside');
  giftOutside.classList.add('hidden');
  giftInside.classList.remove('hidden');
}

const image = document.querySelector('#gift-outside img');
image.addEventListener('click', openPresent);
```

更多例子：
https://codepen.io/bee-arcade/pen/8242bfd471e118e820422ce715c6ede5
https://codepen.io/bee-arcade/pen/db0b3223fd87ed06051aa1f2abf5ec63
https://codepen.io/bee-arcade/pen/6b8956cb0acaaf72f9927094b87d8577
https://codepen.io/bee-arcade/pen/5b1885ca9e14d88fc5ef078f07fb1a00

## Event Listener（事件侦听）

等着事件发生（比如鼠标点击）

### 登记

用addEventListener，登记event
第一个参数：event名字
第二个参数：回调函数，负责处理事件的函数
第三个参数：是否有“capture”属性，如果有，就会在正常的事件链之前执行这个回调函数。一般都写成false。

可以写多个event listener，按顺序来执行。

```JavaScript
var helloWorldFn = function() { console.log("hello world!")};
document.getElementById("hello_world_btn").addEventListener("click", helloWorldFn, false)
```

直接给元素Event处理属性赋值。但这种用得少了，因为和addEventListener，removeEventListener不能一起工作。
```JavaScript
var helloWorldFn = function() { console.log("hello world!")};
document.getElementById("hello_world_btn").onclick =  helloWorldFn;
```

### 解除

removeElementListener解除event
```JavaScript
var helloWorldFn = function() { console.log("hello world!")};
document.getElementById("hello_world_btn").addEventListener("click", helloWorldFn, false)
document.getElementById("hello_world_btn").removeEventListener("click", helloWorldFn, false)
```

### 键盘事件

keydown：任何键被按下。如果你不松，会一直fire
keypress：字符键（字母，数字）被按下。如果你不松，会一直fire
keyup：停止按一个键

event是KeyboardEvent类型，有一个key属性，存着按的键值。
各种键值：https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
比如："Escape"， "ArrowRight"， "ArrowLeft"

```JavaScript
function onKeyUp(event) {
		console.log('onKeyUp:' + event.key);
}
document.addEventListener('keyup', onKeyUp);
```

### 鼠标和触摸屏事件

MouseEvent
1. click
2. mousedown
3. mouseup
4. mousemove：动的时候，会重复fire。电脑上行。手机上不行。

返回坐标

```JavaScript
function onClick(event) {
		console.log('x' + event.clientX);
		console.log('y' + event.clientY);
}
element.addEventListener('click', onClick);
```

TouchEvent
1. touchstart
2. touchend
3. touchmove：仅手机上工作。电脑上不行。
4. touchcancel：浏览器不确定发生了什么时，会fire

PointerEvent
在鼠标和触摸屏上都可用
参考：https://developers.google.com/web/updates/2016/10/pointer-events
继承了MouseEvent，因此也有坐标

1. pointerdown
2. pointerup
3. pointermove：在手机，电脑上都可以
4. pointercancel

但有些浏览器不支持
https://caniuse.com/#feat=pointer
Polyfill实现：https://github.com/jquery/PEP

```html
<script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>
<section touch-action="none"></section>
```

## 事件处理函数

### 参数

当回调函数被调用，会得到一个参数对象event，里面有发生的这个event的各种信息，包括
1. 类型（type），如鼠标，键盘，页面加载；
2. 针对的元素（target），比如textbox

target是引发事件的对象（比如子元素），currentTarget是当前event绑定的对象（比如父元素）。

```JavaScript
var helloWorldFn = function(e) { console.log(e)};
document.getElementById("hello_world_btn").onclick =  helloWorldFn;

function openPresent(event) {
  const image = event.currentTarget; 	# 原来的event handler绑定的元素
  image.src = 'https://media.giphy.com/media/27ppQUOxe7KlG/giphy.gif';
  image.removeEventListener('click', openPresent);
}

const image = document.querySelector('img');
image.addEventListener('click', openPresent);
```

### 调用顺序

指定的回调函数，会在默认Action（比如submit）之前调用。有两种跳过这些默认的方法：

1. 返回的事件对象有preventDefault方法可以调用
```JavaScript
var preventDefaultFn = function(e) { e.preventDefault() };
document.getElementById("disabled_link").addEventListener("click", preventDefaultFn, false);
```

2. 如果回调函数返回false，也自动取消默认动作
```JavaScript
var preventDefaultFn = function() { return false };
document.getElementById("disabled_link").addEventListener("click", preventDefaultFn, false);
```

三个阶段的调用机制：

1. Capture阶段，从外往里，碰到capture为true的event，就执行
```JavaScript
reset.addEventListener('click', onResetClick, {capture: true});
```

2. 冒泡（bubble）阶段，从外往里，沿着DOM Tree向上传播，一路执行bubbles=true的监听函数。这个叫Event bubbling

可以用event.stopPropagation()中断这个传播。
```JavaScript
function onInnerClick(event) {
  inner.classList.add('selected');
  console.log('Inner clicked!');
  event.stopPropagation();
}

const inner = document.querySelector('#inner');
inner.addEventListener('click', onInnerClick);
```

### 指针捕获

允许一个特定的指针事件(PointerEvent) 事件从一个事件触发时候的目标重定位到另一个目标上。这个功能可以确保一个元素可以持续的接收到一个pointer事件，即使这个事件的触发点已经移出了这个元素（比如，在滚动的时候）。

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setPointerCapture
```JavaScript
function beginSliding(e) {
  slider.onpointermove = slide;
  slider.setPointerCapture(e.pointerId);
}

function stopSliding(e) {
  slider.onpointermove = null;
  slider.releasePointerCapture(e.pointerId);
}

function slide(e) {
  slider.style.transform = `translate(${e.clientX - 70}px)`;
}

const slider = document.getElementById('slider');

slider.onpointerdown = beginSliding;
slider.onpointerup = stopSliding;
```

``` html
<style>
	div {
	  width: 140px;
	  height: 50px;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: #fbe;
	}
</style>

<div id="slider">SLIDE ME</div>
```

## 请求动画帧

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
```JavaScript
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```
