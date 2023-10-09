import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../utils/ErrorHandlling.js";
import bcrypt from "bcryptjs";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";
import sendEmail from "../../../utils/sentEmail.js";

export const SignUp = asyncHandler(async (req, res, next) => {
  const { userName, email, password, age, phone, gender } = req.body;
  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    return next(new Error("Email is Register before"));
  }
  const checkUser = await userModel.findOne({ userName });
  if (checkUser) {
    return next(new Error("userName must be unique"));
  }
  const hashPass = bcrypt.hashSync(password, +process.env.SALT);
  const cryptr = new Cryptr(process.env.CrptPHONE);
  const encryptedPhone = cryptr.encrypt(phone);
  const user = await userModel.create({
    userName,
    email,
    password: hashPass,
    age,
    phone: encryptedPhone,
    gender,
  });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SIGN,
    { expiresIn: 60 * 2 }
  );

  const newToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SIGN,
    { expiresIn: 60 * 60 * 24 * 30 }
  );

  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const newLink = `${req.protocol}://${req.headers.host}/auth/newConfirm/${newToken}`;

  const html = `<!DOCTYPE html>
  <html>
  <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
  <style type="text/css">
  body{background-color: #88BDBF;margin: 0px;}
  </style>
  <body style="margin:0px;"> 
  <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
  <tr>
  <td>
  <table border="0" width="100%">
  <tr>
  <td>
  <h1>
      <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
  </h1>
  </td>
  <td>
  <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td>
  <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
  <tr>
  <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
  <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
  </td>
  </tr>
  <tr>
  <td>
  <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
  </td>
  </tr>
  <tr>
  <td>
  <p style="padding:0px 100px;">
  </p>
  </td>
  </tr>
  <tr>
  <td>
  <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
  </td>
  </tr>
  <br>
  <tr>
  <td>
  <a href="${newLink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">New Verify Email address</a>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  <tr>
  <td>
  <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
  <tr>
  <td>
  <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
  </td>
  </tr>
  <tr>
  <td>
  <div style="margin-top:20px;">

  <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
  <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
  
  <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
  <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
  </a>
  
  <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
  <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
  </a>

  </div>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </body>
  </html>`;

  await sendEmail({
    to: email,
    subject: "Email Confirmation",
    html,
  });

  return res.status(200).json({ message: "Check UR Email", user });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.TOKEN_SIGN);
  const user = await userModel.findByIdAndUpdate(
    decoded.id,
    {
      confirmEmail: true,
    },
    { new: true }
  );
  return user
    ? res.redirect("http://localhost:3000/auth/SignInPage")
    : res.send(
        `<a href="http://localhost:3000/auth/SignUpPage">Ops u look like u dont have account yet follow me to signUp</a>`
      );
});

export const newConfirm = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.TOKEN_SIGN);
  const user = await userModel.findById(decoded.id);
  if (!user) {
    `<a href="http://localhost:3000/auth/SignUpPage">Ops u look like u dont have account yet follow me to signUp</a>`;
  }
  if (user.confirmEmail) {
    res.redirect("http://localhost:3000/auth/SignInPage");
  }
  const newToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SIGN,
    {
      expiresIn: 60 * 1,
    }
  );
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`;

  const html = `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
    </td>
    </tr>
    <tr>
    <td>
    <p style="padding:0px 100px;">
    </p>
    </td>
    </tr>
    <tr>
    <td>
    <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
    </td>
    </tr>
    <br>
    <br>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">
  
    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
    
    <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>
    
    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>
  
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>`;

  await sendEmail({
    to: user.email,
    subject: "Confirmation",
    html,
  });
  return res.send(`<p>Check Your inbox now </p>`);
});

export const signInPage = asyncHandler(async (req, res, next) => {
  res.json({ message: "SingInPage" });
});

export const signUpPage = asyncHandler(async (req, res, next) => {
  res.json({ message: "SingUpPage" });
});

export const LogIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const checkEmail = await userModel.findOne({ email });
  if (!checkEmail) {
    return next(new Error("Email not found"), { cause: 400 });
  }
  if (!checkEmail.confirmEmail) {
    return next(new Error("Confirm Email first"), { cause: 400 });
  }
  const match = bcrypt.compareSync(password, checkEmail.password);
  if (!match) {
    return next(new Error("Password wrong"), { cause: 400 });
  }
  const token = jwt.sign(
    { id: checkEmail._id, email: checkEmail.email },
    process.env.TOKEN_SIGN,
    { expiresIn: "1y" }
  );
  const BerarToken = process.env.Barer_Token + token;
  const LogIn = await userModel.updateOne(
    { email },
    { Online: true, deleted: false }
  );
  return res
    .status(200)
    .json({ message: `Hello Mr.${checkEmail.userName}`, BerarToken });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const match = bcrypt.compareSync(oldPassword, req.user.password);
  if (!match) {
    return next(new Error("Password is Wrong", { cause: 400 }));
  }
  const hashPass = bcrypt.hashSync(newPassword, +process.env.SALT);
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { password: hashPass },
    { new: true }
  );
  return res.status(200).json({ message: "Done", user });
});

export const LogOut = asyncHandler(async (req, res, next) => {
  const user = await userModel.updateOne(
    { _id: req.user.id },
    { Online: false }
  );
  return res.status(200).json({ message: "Done", user });
});
