function auth(req, res, next){
    const auth = false ;
    if (!auth) {
      res.send("Auth not true");
      return;
    }
    console.log("Auth true");
    next();
  };

  module.exports = auth