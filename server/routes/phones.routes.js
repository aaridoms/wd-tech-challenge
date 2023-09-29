const router = require("express").Router();
const phonesList = require("../phones.json");

// GET /phones => returns the list of phones
router.get("/", async (req, res, next) => {

  // console.log(phonesList);

  try {
    res.json(phonesList);
  } catch (error) {
    next(error);
  }
});

// GET /phones/:id => returns a single phone
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const onePhone = phonesList.find((eachPhone) => {
      return eachPhone.id === Number(id);
    })

    console.log(onePhone)

    res.json(onePhone);
  } catch (error) {
    next(error);
  }
});

module.exports = router;