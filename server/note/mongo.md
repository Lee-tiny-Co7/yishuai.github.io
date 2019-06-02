# mongo

安装：https://docs.mongodb.com/manual/installation/
http://web.stanford.edu/class/cs193x/install-mongodb/

mac安装：
brew install mongodb
sudo mkdir -p /data/db/
sudo chown -R $USER /data/db
mongod  

kill it via Command-C.

If you get prompted on whether to accept incoming connections, you should.

## DBMS

Heroku不提供永久存储，使用不能用json文件存。

- CS145: Introduction to Databases
- CS245: Database System Principles
- CS346: Database System Implementation

## MongoDB

面向文档的数据集（更灵活的schema），不是关系数据库（固定schema）。

灵活：

Document-oriented DB:
{
  name: "Lori",
  employer: "Self",
  occupation: "Entrepreneur"
}
{
  name: "Malia",
  school: "Harvard"
}

mongod进程，运行在27017端口。

数据库结构：
0. database：如：ecards-db
1. collection：很多document （相当于表），如：card
2. document：JSON-like对象：instance（相当于一行），一组键值对，如{a:1}{a:2}

## mongo 命令行接口

show dbs
use db1
show collections
db.collection1
db.collection1.find(query1)
db.collection1.find({x: 'foo'})
db.collection1.find() 返回所有的
db.collection1.findOne(query1) 给出第一个
db.collection1.insertOne(document1)
db.test.insertOne({ name: 'dan' }) 会自动加一个唯一的 \_id
db.collection1.deleteOne(query1)
db.collection1.deleteMany(query1)
db.collection1.deleteMany() 全部删除
db.collection1.drop()

https://docs.mongodb.com/manual/reference/mongo-shell/

## NodeJS接口

npm start

安装mongodb的nodejs接口库
npm install --save mongodb

可以操作DB的对象：
1. Db：http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html
  得到collection
2. Collection：http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html
  get/insert/delete

https://mongodb.github.io/node-mongodb-native/3.1/tutorials/crud/

Document是JS对象。

## 连接数据库

MongoClient.connect(url, callback)

http://docs.mongodb.org/manual/reference/connection-string/

如果db不存在，就会创建一个。  

可以用两种方法来处理结果
1. 回调
2. Promise：用.then，因此可以用async、await

```js
const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = 'eng-dict';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
let collection = null;

async function main() {
  db = await MongoClient.connect(MONGO_URL);
  collection = db.collection('words');
  await insertWord('hello', 'a greeting');

}

main();
```

db.collection('words') 如果没有这个collection，就会创建一个。这是一个同步的函数。

collection.find(query)返回Cursor，指向找到的第一个document

http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html

然后可以用cursor.hasNext，cursor.next来往后迭代查找

cursor.toArray()把搜索到的结果转换为数组。

collection.update(query, newEntry);

支持 upsert:

const params = { upsert: true };
await collection.update(query, newEntry, params);

const result = await collection.deleteOne(query);
const result = await collection.deleteMany(query);

## 高级query

- Querying
  ：https://docs.mongodb.com/manual/tutorial/query-documents/
- Query selectors and projection operators
  https://docs.mongodb.com/manual/reference/operator/query/

  - db.collection('inventory').find({ qty: { $lt: 30 } });

- Updating：https://docs.mongodb.com/manual/tutorial/update-documents/
- Update operators：https://docs.mongodb.com/manual/reference/operator/update/
db.collection('words').updateOne(
{ word: searchWord },
{ $set: { definition: newDefinition }})

## Saving data

## 练习：

https://github.com/yayinternet/mongodb-examples

### 导入字典数据

进入 load-dict-script/ 目录
$ mongoimport --db eng-dict2 --collection words --file formatted-dictionary.json

"imported 28035 documents"

### 服务器端Render示例

用Handlebars模板

示例：dictionary-server-side
每个单词有自己的页面，如：http://localhost:3000/dog

在终端中运行：mongod，别关
在另一个终端中，进入目录，npm install，npm start

### 单页应用示例

dictionary-spa

review系统
字典进mongodb
e-card

https://docs.mongodb.com/manual/reference/connection-string/

## 数据库设计

https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1

- 6 Rules of Thumb for MongoDB Schema Design:
- Part 1: Basic modeling techniques
  https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
- Part 2: Referencing
  https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-2

- Part 3: Design recommendations  
  https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3
