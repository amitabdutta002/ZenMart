import { Admin } from "../models/Admin.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const genrateRefreshAndAccessToken = async (adminId) =>{
    try {
        const admin = await Admin.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.grnrateRefreshToken();
        
        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false }) 

        return [accessToken, refreshToken]
        
    } catch (error) {
        throw new ApiError(
            500,
            "Somthing went wrong while generating refresh and access token"
        )
    }
}

const registerAdmin = asyncHandler( async (req,res)=>{
    const {fullName, username, password} = req.body
    console.log([fullName,username,password]);

    if ([fullName,username,password].some((field) => field?.trim() === "")) {
        throw new ApiError(
            400,
            "All fields are required"
        )
    }
    const existingUser = await Admin.findOne({username})

    if (existingUser){
        throw new ApiError(
            409,
            "Admin already exist"
        )
    }
    const admin = await Admin.create({
        fullName,
        username,
        password
    })
    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )
    return res
    .status(201)
    .json(new ApiResponse   (201, createdAdmin, "Admin registerd successfully"))
})

const loginAdmin = asyncHandler(async(req,res)=>{
    const {username, password} = req.body
    if (!username || !password) {
        throw new ApiError(400,"Username and Password is required");
    }
    const admin = await Admin.findOne({username})
    if (!admin) {
        throw new ApiError( 401,"Admin does not exist")
    }
    const isPasswordValid = await admin.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(402,"Invalid credentials")
    }

    const [AccessToken, RefreshToken] = await genrateRefreshAndAccessToken(admin._id)

    const loggedInAdmin = await Admin.findById(admin._id).select(
    )
    "-password -refreshToken"

    
    const options = {
        httpOnly: true,
        secure: true,
    }

    console.log([username]);

    return res
    .status(200)
    .cookie("AccessToken",AccessToken, options)
    .cookie("RefreshToken",RefreshToken, options)
    .json(
        new ApiResponse(200,{
            admin: loggedInAdmin,
            AccessToken,
            RefreshToken,
        },
        "Admin logged in Successfully"
    ))
})

const logoutAdmin = asyncHandler(async (req,res,next)=>{
    Admin.findByIdAndUpdate(
        req.admin?._id,
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
        httpOnly: true,
        secure: true,
    }

    console.log('Admin Logged out');
    

    return res
    .status(200)
    .clearCookie("Access Token",options)
    .clearCookie("Refresh Token",options)
    .json(
        new ApiResponse(200, {},"Admin Logged Out successfully")
    )
})

const deleteAdmin = asyncHandler(async(req,res)=>{
    const { id } = req.body

    const admin = await Admin.findById(id)
    if (!admin) {
        throw new ApiError(404,"Admin not found")
    }

    const deletedAdmin = await Admin.findByIdAndDelete(id)
    if (!deletedAdmin) {
        throw new ApiError(403,"Somthing went wrong while deleting admin")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, deletedAdmin, "Admin deleted")
    )
})

const getAdmin = asyncHandler( async(req,res)=>{
    const { id } = req.body
    const admin = await Admin.findById(id)
    
    if (!admin) {
        throw new ApiError(404,"Admin not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, admin, "Admin data" )
    )
})

const updatePassword = asyncHandler(async(req,res)=>{
    try {
        const { id, oldPass, newPass } = req.body
        if ( !id || !oldPass || !newPass) {
            throw new ApiError(415,"All fields are required")
        }

        const admin = await Admin.findById(id)
        if (!admin) {
            throw new ApiError(404,"Admin Not Found")
        }

        const isPasswordValid = await admin.isPasswordCorrect(oldPass);
        if (!isPasswordValid) {
            throw new ApiError(405,"Old password is wrong")
        }

        admin.password = newPass
        await admin.save({ validateBeforeSave: false})

        return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password updated")
        )
    } catch (error) {
        return res
        .status(500)
        .json(
            new ApiError(500,"Error updating password")
        )
    }
})



export {registerAdmin, loginAdmin, logoutAdmin, deleteAdmin, updatePassword, getAdmin }