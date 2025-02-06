import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
      
        console.log("Request Headers:", req.headers); // Debugging
        console.log("Cookies:", req.cookies); // Debugging
        
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        console.log(token)
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId; 
        next(); 
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;
