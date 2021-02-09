// Packages
import { Request, Response } from "express";
import { ValidationError } from "yup";
import { Characters, db } from "../utils/database";
import DatetimeFormat from "../utils/datetimeFormat";
import { characterValidation, customValidationErr } from "../utils/validation";
import "../utils/env";

// Interface
interface paramsProp {
    characterId?: string;
}

interface queryParamsProp {
    page?: number;
    per_page?: number;
}

// Character service
export class CharacterService {

    // Get all character
    getAll(req: Request, res: Response): Response {
        try {
            // Initialize
            const qp: queryParamsProp = req.query;
            let page = qp.page || 1;
            let perPage = qp.per_page || 10;
            let total = db.get("characters").size().value();
            let totalPage = Math.ceil(total / perPage);

            // Get all character
            const characters = db.get("characters").value();

            if (!characters) {
                return res.status(200).json({
                    "page": page,
                    "per_page": perPage,
                    "total": total,
                    "total_pages": totalPage,
                    "data": null
                });
            }
            
            return res.status(200).json({
                "page": page,
                "per_page": perPage,
                "total": total,
                "total_pages": totalPage,
                "data": characters.slice((page - 1) * perPage, page * perPage)
            });
            
        } catch (err) {
            return res.status(500).json({ "errors": "Internal Server Error" });
        }
    }

    // Get character
    get(req: Request, res: Response): Response {
        try {
            // Initialize
            const params: paramsProp = req.params;

            // Find character
            const character = db.get("characters").find({ character_id: params.characterId }).value();

            if (!character) {
                return res.status(404).json({
                    "errors": [
                        {
                            "name": "NotFound",
                            "message": "User not found"
                        }
                    ]
                });
            }

            return res.status(200).json({ "data": character });
            
        } catch (err) {
            return res.status(500).json({ "errors": "Internal Server Error" });
        }
    }
    
    // Create character
    async create(req: Request, res: Response): Promise<Response> {
        try {
            // Initialize
            const input: Characters = req.body
            const datetime = new DatetimeFormat().toMysql();

            // Validation
            await characterValidation.validate({
                name: input.name,
                bio: input.bio,
                type: input.type,
                health_point: input.health_point,
                mana_point: input.mana_point,
                damage: input.damage,
                defense: input.defense,
                speed: input.speed,
            }, {abortEarly: false});

            // Response
            const responseData: Characters = {
                profile_image: `${process.env.URL}/images/default.png`,
                name: input.name,
                bio: input.bio,
                type: input.type,
                health_point: input.health_point,
                mana_point: input.mana_point,
                damage: input.damage,
                defense: input.defense,
                speed: input.speed,
                created_at: datetime,
                updated_at: datetime,
            }

            return res.status(200).json({ "data": responseData });
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({ "errors": customValidationErr(err) });
            }
            return res.status(500).json({ "errors": "Internal Server Error" });
        }
    }

    // Change image profile
    changeImageProfile(req: Request, res: Response): Response {
        try {
            // Initialize
            const params: paramsProp = req.params;

            // Check if input is a file
            if (!req.file) {
                return res.status(404).json({
                    "errors": [
                        {
                            "name": "ValidationError",
                            "message": "Profile image must file"
                        }
                    ]
                });
            }

            // Find character
            const character = db.get("characters").find({ character_id: params.characterId }).value();

            if (!character) {
                return res.status(404).json({
                    "errors": [
                        {
                            "name": "NotFound",
                            "message": "User not found"
                        }
                    ]
                });
            }

            return res.status(201).json({
                "data": {
                    "profile_image": character.profile_image
                }
            });
            
        } catch (err) {
            return res.status(500).json({ "errors": "Internal Server Error" });
        }
    }

    // Update character
    async update(req: Request, res: Response): Promise<Response> {
        try {
            // Initialize
            const params: paramsProp = req.params;
            const input: Characters = req.body
            const datetime = new DatetimeFormat().toMysql();

            // Find character
            const character = db.get("characters").find({ character_id: params.characterId }).value();

            if (character) {
                // Validation
                await characterValidation.validate({
                    name: input.name,
                    bio: input.bio,
                    type: input.type,
                    health_point: input.health_point,
                    mana_point: input.mana_point,
                    damage: input.damage,
                    defense: input.defense,
                    speed: input.speed,
                }, { abortEarly: false });

                // Response
                const responseData: Characters = {
                    profile_image: character.profile_image,
                    name: input.name,
                    bio: input.bio,
                    type: input.type,
                    health_point: input.health_point,
                    mana_point: input.mana_point,
                    damage: input.damage,
                    defense: input.defense,
                    speed: input.speed,
                    created_at: character.created_at,
                    updated_at: datetime,
                }

                return res.status(200).json({ "data": responseData });
            }
            return res.status(404).json({
                "errors": [
                    {
                        "name": "NotFound",
                        "message": "User not found"
                    }
                ] 
            });
            
        } catch (err) {
            if(err instanceof ValidationError) {
                return res.status(400).json({ "errors": customValidationErr(err) });
            }
            return res.status(500).json({ "errors": "Internal Server Error" });
        }
    }

    // Delete character
    delete(req: Request, res: Response): Response {
        try {
            // Initialize
            const params: paramsProp = req.params;

            // Find character
            const character = db.get("characters").find({ character_id: params.characterId }).value();

            if (character) {
                return res.status(204).send();
            }
            return res.status(404).json({
                "errors": [
                    {
                        "name": "NotFound",
                        "message": "User not found"
                    }
                ]
            });

        } catch (err) {
            return res.status(500).json({ "errors": "Internal Server Error" });
        }
    }

}