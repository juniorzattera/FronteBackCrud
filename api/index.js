const Koa = require('koa'); // express
const uuid = require('uuid/v4');
const Joi = require('@hapi/joi');
const Router = require('koa-router');
const Parser = require('koa-bodyparser');
const { name, version, description, author } = require('./package.json');

const { validate } = require('./utils');

const PORT = parseInt(process.env.NODE_PORT || process.env.PORT, 10) || 3000;

const router = new Router();
const app = new Koa();

app.use(Parser());

const todos = {};

const todoSchema = Joi.object({
  text: Joi.string(),
  due: Joi.number().allow(null),
});

router.get('/', ctx => ctx.body = { name, version, description, author });

router.get('/abrobra', ctx => {
  ctx.body = 9
});

router.get(
  '/todo',
  ctx => ctx.body = Object.entries(todos).map(([id, todo]) => Object.assign({}, todo, { id }))
);

router.get('/todo/:id', ctx => {
  const id = ctx.params.id;
  const todo = todos[id];

  if (todo)
    ctx.body = todo;
  else
    ctx.response.status = 404;
});

router.post('/todo', validate(todoSchema), ctx => {
  const id = uuid();
  todos[id] = Object.assign({}, ctx.validated.body);

  ctx.status = 201;
  ctx.set('Content-Location', `/todos/${id}`);

  Object.assign(ctx.body, todos[id], { id });
});

router.put('/todo/:id', validate(todoSchema), ctx => {
  const id = ctx.params.id || uuid();

  todos[id] = Object.assign({}, ctx.validated.body);

  ctx.body = Object.assign({}, todos[id], { id });
});

router.delete('/todo/:id', ctx => {
  const id = ctx.params.id;

  if (!todos[id])
    return ctx.status = 404;

  delete todos[id];

  ctx.status = 204;
})

app
  .use((ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.set('Access-Control-Allow-Methods', '*');
    next();
  })
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => console.log('app live @', PORT));
