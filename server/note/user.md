# 用户登录和验证

## 用户授权

用 http://hashids.org/ ，隐藏DB的ID

cross-stitch-one-user

## OAuth2

https://en.wikipedia.org/wiki/OAuth

各公司的API

https://developer.github.com/apps/
https://developers.google.com/identity/sign-in/web/

步骤
1. Get an API key
2. Whitelist the domains that can call your API key
3. Insert a <script> tag containing <company>'s API
4. In the frontend code:
  a. Use <company>'s API to create a login button
  b. When the user clicks the login button, you will get
information like:
    i. Name, email, etc
    ii. Some sort of Identity Token

5. In the backend code:
  - Use <company>'s libraries to verify the token from
    the client is a valid token

## 隐藏API Key

用环境变量，把API key存在主机上。

https://12factor.net/config

Node用process.env.VAR_NAME访问这个环境变量
