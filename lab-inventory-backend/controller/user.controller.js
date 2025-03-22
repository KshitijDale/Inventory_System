const { response } = require("express");
const asynchandler = require("../utils/asynchandler");
const User = require("./../models/User");
const UserType = require("./../models/UserType");
const APIError = require("./../utils/APIError");
const ApiResponse = require("./../utils/ApiResponce");

const generateRefreshAccessToken = async (user_id) => {
    try{
        const user = await User.findById(user_id);
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.refreshAccessToken();
        user.refrestoken = refreshToken;
        user.save();

        return {accessToken, refreshToken};
    }
    catch{
        throw new APIError(400, "Not able to generate Access and RefreshToken");
    }
}

exports.registerUser = asynchandler(async (req,res)=>{
    const {login_id , password, user_type, name} = req.body;
    if(
        [login_id, password,user_type,name].some((field) => field?.trim === "")
    ){
        throw new APIError(400, "All fields required");
    }
    
    const existeduser = await User.findOne({name});
    if(
        existeduser
    ){
        throw new APIError(400, "username already Exists");
    }
    const usertype= await UserType.findOne({type: user_type});
    if(!usertype){
        throw new APIError(400, "Input Valid userType");
    }
    const newUser = await User.create({login_id : login_id, password : password, user_type : usertype._id , name: name});

    const createdUser = await User.findById(newUser._id).select("-password -refreshtoken");

    if(!createdUser){
        throw new APIError(400, "Unable to create or register a new User");
    }
    res.redirect('/login');
})

exports.loginUser = asynchandler( async (req,res)=>{
    const {name, password} = req.body;
    if(
        [name,password].some(field => field?.trim() === "")
    )
    
    {
        throw new APIError(400, "Incomplete password or name field")
    }
    const user  = await User.findOne({name});
    
    if(!user){
        throw new APIError(400,"username does not exist");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new APIError(400,"Wrong Password");
    }
    const {accessToken, refreshToken} = await generateRefreshAccessToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken");
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: loggedInUser
    })
})

exports.logoutUser = asynchandler(async(req, res) => {
    console.log(req.user);
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


exports.refreshAccessToken = asynchandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new APIError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new APIError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new APIError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new APIError(401, error?.message || "Invalid refresh token")
    }

})

exports.changeCurrentPassword = asynchandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new APIError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


exports.getCurrentUser = asynchandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

exports.updateAccountDetails = asynchandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new APIError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});
