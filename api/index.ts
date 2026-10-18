import app from "../server";

// Vercel Serverless Function Entry Point for all /api/* and /auth/* routes
export default function handler(req: any, res: any) {
  return app(req, res);
}
