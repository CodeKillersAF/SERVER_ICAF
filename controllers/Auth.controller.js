const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const passport = require('passport');
/**
 * @describe_to_register_the_user
 * admin , editor , user
 */

const userRegister = async (userData /*, role,*/ , res) => {
    try {
        //validate username
        let usernameNotTaken = await validateUsername(userData.username);
        if(!usernameNotTaken) {
            return res.status(400).json({
                message: `Username is already exist`,
                success: false
            });
        }

        //validate email
        let emailNotTaken = await validateEmail(userData.email);
        if(!emailNotTaken) {
            return res.status(400).json({
                message: `Email is already exist`,
                success: false
            });
        }

        //get password
        const password = await bcrypt.hash(userData.password, 12);

        const newUser = new User({
            ...userData,
            password,
            //role
        });

        const userSignup = await newUser.save();

        const payload = {
            newUser: {
                id: userSignup.id
            }
        };

        jwt.sign(
            payload,
            "anystring",
            { expiresIn: 1000 },

            function(err, token){
                if(err){
                  res.send(err)
                }
                res.status(200).json({
                  token,
                  userSignup,
                  message: 'User Registered Successfully'
                })
              })  

    } catch(err) {
        res.status(400).json({'error': err})
    }
};

//user login
const userLogin = async (userCredit /*, role, */ ,  res) => {
    //get the username
    let { username, password } = userCredit;

    //first check if the username is in the database
    const user = await User.findOne({ username });
    if(!user) {
        return res.status(404).json({
            message: "Username is not found. Invalid Login",
            success: false
        });
    }

    //check the role
    // if(user.role != role) {
    //     return res.status(403).json({
    //         message: "Make sure your role is correct",
    //         success: false
    //     });
    // }

    //if user is existing and try to signin from right role
    //now check the password
    let isMatchPassword = await bcrypt.compare(password, user.password);
    if(isMatchPassword) {
        //sign in token and issue it to user
        let token = jwt.sign(
            {
                user_id: user._id,
                role: user.role,
                username: user.username,
                email: user.email 
            }, SECRET, {expiresIn: "1 days"});

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 24
        };

        return res.status(200).json({
            ...result,
            message: "You are logged in successfully",
            success: true
        });

    } else {
        return res.status(403).json({
            message: "Incorrect Password",
            success: false
        });
    }
};


const validateUsername = async username =>  {
    let user = await User.findOne({ username });
    return user ? false : true;
};

/**
 * @description_passport_middleware
 * protect from other things
 */
const userAuth = passport.authenticate('jwt', { session: false});

/**
 * @description_check_role_middleware
 */
const checkRole = roles => (req, res, next) => 
            !roles.includes(req.user.role) ? res.status(401).send({error: 'Unauthorized'}) 
            : next();
// {
    // //whatever the role in our request
    // if(roles.includes(req.user.role)) {
    //     return next();
    // }
    // return res.status(401).json({
    //     message: "Unothorized",
    //     success: false
    // });
// };

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

//only for protection without password
const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        _id: user._id,
        updatedAt: user.updatedAt,
        createAt: user.createAt
    };
};

module.exports = {
    userRegister,
    userLogin,
    userAuth,
    serializeUser,
    checkRole,
}