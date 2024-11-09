// src/routes/auth.ts
import express, { Request, Response, Router, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const router: Router = express.Router();

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

const registerHandler: RequestHandler = async (req, res) => {
    try {
        const { username, email, password } = req.body as RegisterRequest;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists",
                success: false,
            });
            return; // Return here without the res object
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET || "fallback-secret-key",
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User created successfully",
            success: true,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Error in registration",
            success: false,
        });
    }
};

const loginHandler: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body as LoginRequest;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "User not found",
                success: false,
            });
            return; // Return here without the res object
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({
                message: "Invalid password",
                success: false,
            });
            return; // Return here without the res object
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "fallback-secret-key",
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Error in login",
            success: false,
        });
    }
};

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;
// import express, { Request, Response, Router } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model";

// const router: Router = express.Router();

// // Define request body interfaces
// interface RegisterRequest {
//     username: string;
//     email: string;
//     password: string;
// }

// interface LoginRequest {
//     email: string;
//     password: string;
// }

// // Registration route
// router.post("/register", async function (req: Request, res: Response) {
//     try {
//         const { username, email, password } = req.body as RegisterRequest;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({
//                 message: "User already exists",
//                 success: false,
//             });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         const token = jwt.sign(
//             { userId: newUser._id },
//             process.env.JWT_SECRET || "fallback-secret-key",
//             { expiresIn: "7d" }
//         );

//         res.status(201).json({
//             message: "User created successfully",
//             success: true,
//             user: {
//                 id: newUser._id,
//                 username: newUser.username,
//                 email: newUser.email,
//             },
//             token,
//         });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({
//             message: "Error in registration",
//             success: false,
//         });
//     }
// });

// // Login route
// router.post("/login", async function (req: Request, res: Response) {
//     try {
//         const { email, password } = req.body as LoginRequest;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return res.status(400).json({
//                 message: "Invalid password",
//                 success: false,
//             });
//         }

//         const token = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET || "fallback-secret-key",
//             { expiresIn: "7d" }
//         );

//         res.json({
//             message: "Login successful",
//             success: true,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//             },
//             token,
//         });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({
//             message: "Error in login",
//             success: false,
//         });
//     }
// });

// export default router;
