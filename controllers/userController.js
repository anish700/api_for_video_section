const { validationResult } = require("express-validator");
const { body } = require("express-validator/check");
const gravatar = require("gravatar");
const User = require("./../models/User");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const jwt_Secret = process.env.JWT_SECRET;

exports.deleteUser = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

//@route   GET api/users
//@desc    Test route
//@access  public (req token or not)
exports.getUser = (req, res) => {
  console.log(req.body);
  // res.render('pages/home-guest.ejs');
  res.send(" users are ");
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  // Finds the validation errors in this request and wraps them in an object with handy functions
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    return;
  }
  const { name, email, password } = req.body;

  try {
    //See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(200)
        .json({ errors: [{ message: "User already exits" }] });
    }
    //get users gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    //create instance of user
    user = new User({
      name,
      email,
      avatar,
      password,
    });
    // encrypt password using bcrypt
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(password, salt);

    //save user to db
    await user.save();

    //return jsonWebToken
    const payload = {
      user: {
        id: user.id, // _id without mongoose
      },
    };
    jwt.sign(
      payload,
      jwt_Secret,
      { expiresIn: 360000 }, //change to 3600 when production
      (err, token) => {
        if (err) throw err;
        res.json({ token });
        console.log(token);
      }
    );

    // res.send(" user reg "); // token will not be outputed if this line there
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.validate = (method) => {
  switch (method) {
    case "registerUser": {
      return [
        body("name", "name is required").exists(),
        body("email", "Invalid email").exists().isEmail(),
        body(
          "password",
          "Invalid password , Password must be atleast 5 characters long"
        ).isLength({ min: 5 }),
      ];
    }
  }
};
