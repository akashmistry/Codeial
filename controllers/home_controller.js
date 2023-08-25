module.exports.home = function (req, res) {
  // COOKIES WILL COME AS REQ
  console.log(req.cookies);

  // COOKIES WILL GO AS RES
  res.cookie("something", 20);

  return res.render("home", {
    title: "Home",
  });
};
