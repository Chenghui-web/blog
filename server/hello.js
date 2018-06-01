//这里是 初体验~~~
const Koa = require('koa');
const route = require('koa-route');

const fs = require('fs.promised');
const compose = require('koa-compose');

const app = new Koa();

const main = ctx =>{
  ctx.body = 'Hello Worl1d'
};

const main1 = ctx=>{
  ctx.body = 'Hello Worl1d2222'
};

const main3 = ctx => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  ctx.response.body = 'Hello World';
};

const logger = (ctx, next) => { //处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  ctx.body = 'Hello logger'
  next(); //调用next函数，把执行权交给下一个中间件。
};

const asy = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./template.html', 'utf8');//fs.readFile是一个异步操作，必须写成await fs.readFile(),中间件必须写成 async 函数
};

//koa-compose模块可以将多个中间件合成为一个
const middlewares = compose([logger, asy]);


//抛出错误
const wro = ctx => {
  ctx.throw(500);
};

//最外层->总报错层
const handler = async(ctx,next)=>{
  try{
    await next();
  }catch(err){
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message:err.message
    };
  }
};
//用来读写 Cookie
const num = function(ctx){
  const n = Number(ctx.cookies.get('view')||0) + 1 ;
  ctx.cookies.set('view',n);
  ctx.response.body = n +'views';
}


// app.use(main);
// app.use(route.get('/', main));
app.use(route.get('/main1', main1));
app.use(route.get('/main3', main3));
// app.use(logger);
// app.use(asy);
// app.use(middlewares);
app.use(handler);
// app.use(wro);
app.use(num);


app.listen(3001);
