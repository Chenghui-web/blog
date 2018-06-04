var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/data')   //m_data是我的数据库名字 需要自己创建

mongoose.connection.once('open',()=> {
  console.log("[mongoose]mongdb is start");     //监听启动
})

var userSchema  = new Schema({                  //建表
  username: {
    type: String
  },
  password: {
    type: String
  },
  call: {
    type: Number
  },
  email: {
    type: String
  }
})

var user = mongoose.model('User',userSchema);  //返回另一个Model实例


module.exports = user    //导出