import { User } from "../models/User.models.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
  
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
  
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(
        500,
        "Something went wrong while generating refresh and access token"
      )
    }
  }

const registerUser = asyncHandler ( async( req,res )=>{
    const {fullName, email, password} = req.body
    console.log([fullName, email, password]);

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({email})
    if (existingUser) {
        throw new ApiError(410,"User with email already exist")
    }

    const user = await User.create({fullName, email, password});

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, createdUser ,"User created successfully")
    )
})

const loginUser = asyncHandler ( async (req,res)=>{
    const {email, password} = req.body
    console.log([email]);

    if (!email || !password){
        throw new ApiError(467,"All fields are required")
    }    

    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(468,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(469,"Invalid Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);   
    

    const loggedinUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, [loggedinUser, accessToken], "User Logged In Successfully")
    )

})

const logoutUser = asyncHandler (async(req,res) => {
    User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset:{
                RefreshToken: 1,
            },
        },
        {
            new: true,
        }
    )

    const options = {
        https: true,
        secure: true
    }

    console.log("User Logged Out");

    return res
    .status(200)
    .clearCookie("Access Token",options)
    .clearCookie("Refresh Token",options)
    .json(
        new ApiResponse(200,{},"User Logged Out Successfully")
    )
    
})

const getUser = asyncHandler (async(req,res) => {
    const { id } = req.body
    if (!id) {
        throw new ApiError(401,"ID is required")
    }

    const user = await User.findById(id)
    if(!user){
        throw new ApiError(404,"No user found")
    }

    const userDetails = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, userDetails, "User details")
    )  
})

const updatePassword = asyncHandler(async(req,res)=>{
    const { id, oldPass, newPass } = req.body
    console.log({id, oldPass, newPass});
    
    if ( !id || !oldPass || !newPass) {
        throw new ApiError(415,"All fields are required")
    }

    const user = await User.findById(id)
    if (!user) {
        throw new ApiError(404,"Admin Not Found")
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPass);
    if (!isPasswordValid) {
        throw new ApiError(405,"Old password is wrong")
    }

    user.password = newPass
    await user.save({ validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password updated")
    )
})

const deleteAccount = asyncHandler(async(req,res)=>{
    const { id } = req.body
    console.log({id});

    const user = await User.findById(id)
    if (!user) {
        throw new ApiError(404,"User not found")
    }

    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
        throw new ApiError(420,"Account not deleted")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, deletedUser, "Account deleted")
    )
})

const updateDetails = asyncHandler(async(req,res)=>{
    const {name, email} = req.body
    console.log({name, email});

    const user = await User.findOne({ fullName: name })
    if (!user) {
        throw new ApiError(404,"User not found")
    }

    const updateUser = await User.updateOne({ fullName: name, email: email })
    if (!updateUser) {
        throw new ApiError(430,"Somthing went wrong while updating details")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updateUser, "Details updated")
    )
})

// const generateAndSendOtp = asyncHandler(async(req, res) => {
//     const otp = Math.ceil( Math.random() * 1000000)
//     console.log(otp);


// })

// const verifyUser = asyncHandler( async( req, res) => {
    
// })

export {registerUser, loginUser, logoutUser, getUser, updatePassword, deleteAccount, updateDetails}