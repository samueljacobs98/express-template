import { Request, Response } from "express";

export const handleRequest = async (req: Request, res: Response) => {
  res.send("pong");
};
