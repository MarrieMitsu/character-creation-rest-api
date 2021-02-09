// Packages
import { Router } from "express";
import { CharacterService } from "../services/character";
import { upload } from "../utils/fileStorage";

// Character router
export const CharacterRouter = Router();

// Get All character
CharacterRouter.get("/character", new CharacterService().getAll);

// Get character
CharacterRouter.get("/character/:characterId", new CharacterService().get);

// Create character
CharacterRouter.post("/character", new CharacterService().create);

// Change character profile image
CharacterRouter.put("/character/image/:characterId", upload, new CharacterService().changeImageProfile);

// Update character
CharacterRouter.put("/character/:characterId", new CharacterService().update);

// Delete character
CharacterRouter.delete("/character/:characterId", new CharacterService().delete);