# Ajax

1. 请求，结果处理

XMLHttpRequest请求，JSON，filter，forEach，getElementsByClassName，innerHTML设置

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

2. 获得用户的经纬度

<script>
  // 在这行下面添加代码
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(pos){
        document.getElementById('data').innerHTML = "Lat: " + pos.coords.latitude + "<br> Long. " + pos.coords.longitude;
      }
    );
  };

  // 在这行上面添加代码
</script>
<h4>You are here:</h4>
<div id="data">

</div>

3. POST

<script>
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
</script>

<style>
  body {
    text-align: center;
    font-family: "Helvetica", sans-serif;
  }
  h1 {
    font-size: 2em;
    font-weight: bold;
  }
  .box {
    border-radius: 5px;
    background-color: #eee;
    padding: 20px 5px;
  }
  button {
    color: white;
    background-color: #4791d0;
    border-radius: 5px;
    border: 1px solid #4791d0;
    padding: 5px 10px 8px 10px;
  }
  button:hover {
    background-color: #0F5897;
    border: 1px solid #0F5897;
  }
</style>

<h1>Cat Friends</h1>
<p class="message box">
  Reply from Server will be here
</p>
<p>
  <label for="name">Your name:
    <input type="text" id="name"/>
  </label>
  <button id="sendMessage">
    Send Message
  </button>
</p>

4.
