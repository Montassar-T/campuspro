const User = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
      },
    },
    process.env.ACCES_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  /*
    const refreshToken = jwt.sign(
        {
            UserInfo:{
                id:foundUser._id,
            },
        },
        process.env.REFRESH_ACCES_TOKEN,
        {expiresIn:"7d"},
    );
    res.cookie('jwt', refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite: 'None', //cross site cookie
        maxAge: 1000 * 60 *60 *24 *7
    })
        */
  res.json({
    success: true,
    accessToken,
  });
};

module.exports = { login };
