// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/dashboard(.*)", "/subscribe(.*)"], // routes to protect
};
