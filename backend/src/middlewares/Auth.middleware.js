import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/Admin.models.js";

export const verifyjwt = asyncHandler(async (req, _, next)=>{
    try {
        const token = req.cookie.AccessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(430,"Unautorized request");
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const admin = await Admin.findById(decodeToken?._id).select(" -password -refreshToken ")

        if (!admin) {
            throw new ApiError(431,"Invalid Access Token")
        }

        req.admin = admin;

        next();

    } catch (error) {
        throw new ApiError(432,"Unable to get Access Token");
    }
})