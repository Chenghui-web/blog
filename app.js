const koa = require('koa');
const controller = require('koa-route');//需要通过npm来添加此依赖
const app = new koa();
const cors = require('koa-cors');

/*设置路由*/


const main1 = ctx=>{
    ctx.response.type = 'json';
    ctx.response.body =  require('./server/WebAppService.js').get_search_data();
};
app.use(cors());
app.use(controller.get('/ajax/search', main1));

app.listen(3003);

// 作者：IT青年
// 链接：https://www.jianshu.com/p/0060d2d9b533
// 來源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。