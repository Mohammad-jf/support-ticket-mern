// @desc Registera new user
// @route /api/users
// @access public

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }

  res.send("Register Route");
};

// @desc login a user
// @route /api/users/login
// @access public
const loginUser = (req, res) => {
  res.send("login Route");
};

module.exports = {
  registerUser,
  loginUser,
};
