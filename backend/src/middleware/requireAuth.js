import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  console.log("=== AUTH DEBUG ===");
  console.log("Cookie header:", req.headers.cookie);
  console.log("Parsed cookies:", req.cookies);

  const token = req.cookies?.token;

  if (!token) {
    console.log("NO TOKEN RECEIVED");
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("TOKEN VERIFIED:", payload);

    req.userId = payload.userId;
    req.userRole = payload.role;
    req.isGuest = payload.isGuest === true;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}