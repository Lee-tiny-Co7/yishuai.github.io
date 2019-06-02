# 服务器请求

AJAX. Asynchronous communication. Callback functions. The get and post formats. Same-origin policy. Cross-origin requests with JSONP. AJAX polling. (Flanagan Chapter 18，19)

XMLHttpRequest是最底层的请求API。FCC对其进行练习。

Fetch等高层服务器请求API，更容易使用：https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## 注意

对这个练习，不能双击html，用浏览器打开。因为，如果是这样打开的话，是用的本地路径：file://本地fetch。

要在终端里用 python -m http.server 启动一个web server，然后访问 http://localhost:8000/，

## Fetch API

fetch('a.txt');
返回一个Promise，它管理异步事件返回的结果（三种状态：pending，fulfilled，rejected）。
然后用一个then()方法，指定onSuccess和onError的事件处理器（attach）。
可以绑定一串。

## 异步请求

请求以后，不会在这里等着。继续做别的工作。响应回来了以后，接着按指定的函数干活。

## 响应状态

response.status
200： success
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

## 响应函数

两种指定响应处理函数的方法
1. callback（回调）
2. Promise

## Promise

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

用then指定对Promise返回后的处理函数：

```js
function onSuccess(response) {
  }
function onFail(response) {
  }
fetch('images.txt').then(onSuccess, onFail);
```

Response回来后，继续用response.text()，异步读出响应的stream。因为它也是一个异步的请求，所以也返回一个Promise，需要用then绑定其处理事件onStreamProcessed。

```js
function onStreamProcessed(text) {
  console.log(text);
}
function onResponse(response) {
  console.log(response.status); response.text().then(onStreamProcessed);
}
function onError(error) {
  console.log('Error: ' + error);
}
fetch('images.txt').then(onResponse, onError);
```

可以把then串联起来，顺序执行异步的actions

```js
function onStreamProcessed(text) {
 console.log(text);
}
function onResponse(response) {
 return response.text();
}
fetch('images.txt')
   .then(onResponse, onError)
   .then(onStreamProcessed);
```

练习：来几个动画吧：12-images-text

## JSON

请求和响应一般用JSON编码。

对象-JSON字符串之间的转换函数

编码：JSON.stringify()
```js
const bear = {
  name: 'Ice Bear',
  hobbies: ['knitting', 'cooking', 'dancing']
};

const serializedBear = JSON.stringify(bear);
console.log(serializedBear);
```

解析 JSON.parse()

```js
const bearString =
      '{"name":"Ice Bear","hobbies":["knitting","cooking","dancing"]}';

const bear = JSON.parse(bearString);
console.log(bear);
```

## 返回JSON

函数json()

```js
function onStreamProcessed(json) {
  console.log(json);
}
function onResponse(response) {
  return response.json();
}
fetch('songs.json')
  .then(onResponse, onError)
  .then(onStreamProcessed);
```

## REST api

很多网站以REST api的形式，提供各种服务。比如搜索GIF：
https://github.com/Giphy/GiphyAPI#search-endpoint

## Fetch限制

1. 不能读本地硬盘
2. 老浏览器不支持：用 https://github.com/jquery/PEP，封装的
3. 跨域访问的限制：
  1. CORS: Cross-Origin Resource Sharing
  2. 网站abc.com上的网页，访问zyx.com上的内容，就叫跨域访问
  3. 图像、CSS、JS默认是可以跨域的：通过img images，link css，script js实现
  4. 其它内容，比如HTML，是不能跨域访问的：即不能XHR，也不能fetch
  5. 除非web server配置说可以你可以跨域来访问我：https://enable-cors.org/server_apache.html
  6. 也可以配web server，使得连image也不可以跨域访问

# Ajax：XMLHttpRequest

方法

```JavaScript
var request = new XMLHttpRequest();
request.open("GET","data.csv");
request.setRequestHeader("Content-Type", "text/plain");
request.send(null)
```

## jQuery Ajax

jQuery提供了函数：
1. load
2. get, post

```JavaScript
jQuery.get("debug.txt",alert);
```

## FCC对XMLHttpRequest的练习

###. 请求，结果处理

知识点：XMLHttpRequest请求，JSON，filter，forEach，getElementsByClassName，innerHTML设置

```JavaScript
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('getMessage').onclick=function(){
    req=new XMLHttpRequest();
    req.open("GET",'/json/cats.json',true);
    req.send();
    req.onload=function(){
      json=JSON.parse(req.responseText);
      json = json.filter((val) => val.id !== 1);

      var html = "";
      json.forEach(function(val){
        var keys = Object.keys(val);
        html += "<div class='cat'>";
        keys.forEach(function(key){
          html += "<strong>" + key + "</strong> " + val[key] + "<br>";
        });
        html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";
        html += "</div><br>";
      });
      console.log(html)
      document.getElementsByClassName('message')[0].innerHTML=html;
    };
  };
});
```

### 获得用户的经纬度

```JavaScript
if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(
    function(pos){
      document.getElementById('data').innerHTML = "Lat: " + pos.coords.latitude + "<br> Long. " + pos.coords.longitude;
    }
  );
};
```

### POST

```JavaScript
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('sendMessage').onclick=function(){
    var userName=document.getElementById('name').value;
    req=new XMLHttpRequest();
    req.open("POST",'/',true);
    req.setRequestHeader('Content-Type','text/plain');
    console.log(userName);
    req.onreadystatechange=function(){
        console.log(req);
        if(req.readyState==4 && req.status==200){
  document.getElementsByClassName('message')[0].innerHTML=req.responseText;
        };
    };
    req.send(userName);
  };
});
```
