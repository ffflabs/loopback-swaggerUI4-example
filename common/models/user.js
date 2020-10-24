// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function (User) {
  /*User.afterRemote("login",   function (ctx,next) {
    let  result = {} } = ctx||{},
      { id, ttl, user } = result || {};


    if (id) {
      ctx.res.cookie("access_token", id, {
        signed: true,
        null,
        maxAge: Math.max(3600, ctx.result.ttl) * 1000,
      });
    }
    next();
  });*/
  User.afterRemote('login', async function (ctx) {
    let {result = {}} = ctx || {},
      {id, ttl, user} = result || {};

    if (id) {
      ctx.res.cookie('access_token', id, {
        signed: true,
        maxAge: Math.max(3600, ctx.result.ttl) * 1000,
      });
    }

    return;
  });
  User.getUserFromTokenOrLogin = async function (req, res, url) {
    let {accessToken} = req;
    console.log(Object.keys(req));
    if (accessToken && accessToken.userId) {
      //debug({accessToken});
      if (res) {
        res.cookie('access_token', accessToken.id, {
          signed: true,
          maxAge: Math.max(3600, accessToken.ttl) * 1000,
        });
      }

      return await ((accessToken.user && accessToken.user.get()) ||
        User.findById(req.accessToken.userId));
    } else if (res && url) {
      res.redirect(url);
    }
    return false;
  };
};
