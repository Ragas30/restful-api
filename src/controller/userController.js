import { register } from "../services/userService.js";

export const registerUser = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await register(request)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}