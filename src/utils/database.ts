// Packages
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// Types
export type Characters = {
    character_id?: string;
    profile_image?: string;
    name?: string;
    bio?: string;
    type?: string;
    health_point?: number;
    mana_point?: number;
    damage?: number;
    defense?: number;
    speed?: number;
    created_at?: string;
    updated_at?: string;
}

export type Schema = {
    characters: Characters[]
}

// Adapter
export const adapter = new FileSync<Schema>("./database/db.json");
export const db = low(adapter);