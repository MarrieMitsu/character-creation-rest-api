// Packages
import { Router } from "express";
import { CharacterRouter } from "../routes/character";

// API Route
export const router = Router();

/**
 *  Route collection
 */
router.use("/api", CharacterRouter);