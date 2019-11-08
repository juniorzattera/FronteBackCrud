const validate = rules => (ctx, next) => {
  const { value, error } = rules.validate(ctx.request.body);
  if (!ctx.validated)
    ctx.validated = {};
  if (error)
    return ctx.body = error;
  else
    ctx.validated.body = value;

  next();
}

module.exports = { validate };
