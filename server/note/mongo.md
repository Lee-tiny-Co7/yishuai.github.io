# mongo

## 安装

mac安装：
1. brew install mongodb
2. sudo mkdir -p /data/db/
3. sudo chown -R $USER /data/db
4. mongod  

kill it via Command-C.

If you get prompted on whether to accept incoming connections, you should.

参考：
1. https://docs.mongodb.com/manual/installation/
2. http://web.stanford.edu/class/cs193x/install-mongodb/

## DBMS

为什么要用DBMS？Heroku不提供永久存储，使用不能用json文件存。

## 相关知识

课程：
- CS145: Introduction to Databases
- CS245: Database System Principles
- CS346: Database System Implementation

## MongoDB：面向文档

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

## 数据库结构术语

0. database：如：ecards-db
1. collection：很多document （相当于表），如：card
2. document：JSON-like对象：instance（相当于一行），一组键值对，如{a:1}{a:2}

## mongo 命令行接口

1. show dbs
2. use db1
3. show collections
4. find
  - db.collection1.find(query1)
  - db.collection1.find({x: 'foo'})
  - db.collection1.find() 返回所有的
  - db.collection1.findOne(query1) 给出第一个
5. insert  
  - db.collection1.insertOne(document1)
  - db.test.insertOne({ name: 'dan' }) 会自动加一个唯一的 \_id
6. delete
  - db.collection1.deleteOne(query1)
  - db.collection1.deleteMany(query1)
  - db.collection1.deleteMany() 全部删除
7. drop
  - db.collection1.drop()

参考：https://docs.mongodb.com/manual/reference/mongo-shell/

## NodeJS接口

安装mongodb的nodejs接口库：npm install --save mongodb

可以操作DB的对象：

1. Db：http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html
  得到collection
2. Collection：http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html
  get/insert/delete

https://mongodb.github.io/node-mongodb-native/3.1/tutorials/crud/

Document是JS对象。

## 连接数据库

MongoClient.connect(url, callback)

参考：http://docs.mongodb.org/manual/reference/connection-string/

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

## Find

collection.find(query)返回Cursor，指向找到的第一个document

http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html

然后可以用cursor.hasNext，cursor.next来往后迭代查找

cursor.toArray()把搜索到的结果转换为数组。

- Querying
  ：https://docs.mongodb.com/manual/tutorial/query-documents/
- Query selectors and projection operators
  https://docs.mongodb.com/manual/reference/operator/query/

  - db.collection('inventory').find({ qty: { $lt: 30 } });

## Update

collection.update(query, newEntry);

支持 upsert:

const params = { upsert: true };
await collection.update(query, newEntry, params);

db.collection('words').updateOne(
  { word: searchWord },
  { $set: { definition: newDefinition }})

const result = await collection.deleteOne(query);
const result = await collection.deleteMany(query);

- Updating：https://docs.mongodb.com/manual/tutorial/update-documents/
- Update operators：https://docs.mongodb.com/manual/reference/operator/update/

##  Mongoose

https://www.cnblogs.com/zhongweiv/p/mongoose.html
https://mongoosejs.com/docs/

## 实战：

### 导入字典数据

进入 load-dict-script/ 目录
$ mongoimport --db eng-dict2 --collection words --file formatted-dictionary.json

"imported 28035 documents"

### 运行

在终端中运行：mongod，别关

在另一个终端中，进入目录，npm install，npm start

## 数据库设计

https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1

- 6 Rules of Thumb for MongoDB Schema Design:
- Part 1: Basic modeling techniques
  https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
- Part 2: Referencing
  https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-2

- Part 3: Design recommendations  
  https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3
