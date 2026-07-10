import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  console.log("=== AUTH DEBUG ===");
  console.log("Cookie header:", req.headers.cookie);
  console.log("Parsed cookies:", req.cookies);

  const token = req.cookies?.token;

  if (!token) {
    console.log("❌ No token received");
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.userId;
    req.userRole = payload.role;
    req.isGuest = payload.isGuest === true;

    console.log("✅ Authenticated:", payload);

    next();
  } catch (err) {
    console.log("❌ JWT verification failed:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
