const router = require("express").Router();
const myConnect = require("./db/connect");
const { ObjectId } = require("mongodb");

router.get("/", (req, res) => {
  myConnect((err, db) => {
    if (err)
      res.render("error404", {
        pageTitle: "Error",
        error: "Connection Failed",
      });
    db.collection("tasks")
      .find({})
      .toArray()
      .then((result) =>
        res.render("home", {
          pageTitle: "Home",
          tasks: result,
          isEmpty: !result.length,
        })
      )
      .catch((error) =>
        res.render("error404", {
          pageTitle: "Error",
          error: "Failed to get data",
        })
      );
  });
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  myConnect(async (err, db) => {
    if (err)
      res.render("error404", {
        pageTitle: "Error",
        error: "Connection Failed",
      });
    isTask = await db.collection("tasks").findOne({ title: req.body.title });
    if (isTask)
      return res.render("error404", {
        pageTitle: "Error",
        error: "Title is Exist",
      });
    req.body.status ? (req.body.status = true) : (req.body.status = false);
    db.collection("tasks")
      .insertOne(req.body)
      .then((response) => res.redirect("/"))
      .catch((error) =>
        res.render("error404", {
          pageTitle: "Error",
          error: "Failed to add Task",
        })
      );
  });
});

router.get("/single/:id", (req, res) => {
  myConnect(async (err, db) => {
    if (err)
      res.render("error404", {
        pageTitle: "Error",
        error: "Connection Failed",
      });
    task = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!task) res.render("single", { isTask: 1 });
    res.render("single", { task, pageTitle: "Single", isTask: 0 });
  });
});

router.get("/del/:id", (req, res) => {
  myConnect((err, db) => {
    if (err)
      res.render("error404", {
        pageTitle: "Error",
        error: "Connection Failed",
      });
    db.collection("tasks")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => res.redirect("/"))
      .catch((e) =>
        res.render("error404", {
          pageTitle: "Error",
          error: "Failed Delete",
        })
      );
  });
});

router.get("/edit/:id", (req, res) => {
  myConnect(async (err, db) => {
    if (err)
      res.render("error404", {
        pageTitle: "Error",
        error: "Connection Failed",
      });
    const task = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (task) return res.render("edit", { task });
    res.render("error404", {
      pageTitle: "Error",
      task,
      error: "Can't find element",
    });
  });
});

router.post("/edit/:id", (req, res) => {
  myConnect((err, db) => {
    if (err)
      res.render("error404", {
        pageTitle: "Error",
        error: "Connection Failed",
      });
    req.body.status ? (req.body.status = true) : (req.body.status = false);
    db.collection("tasks")
      .updateOne(
        { _id: new ObjectId(req.params)},
        { $set: { ...req.body } }
      )
      .then((r) => res.redirect("/"))
      .catch((e) =>
        res.render("error404", {
          pageTitle: "Error",
          task,
          error: "Can't Update element",
        })
      );
  });
});
module.exports = router;
