// Packages
import cors from "cors";
import express from "express";
import path from "path";
import { router } from "./routes";
import "./utils/env";

// main
(function() {
    // App
    const app = express();
    app.use(
        cors({
            origin: "*",
        })
    );
    app.use(express.urlencoded());
    app.use(express.static(path.join(__dirname, 'public')));

    // Routes
    app.get("/", function(_req, res) {
        res.sendFile(path.join(__dirname, "views", "index.html"));
    });
    app.use(router);

    // Listen
    app.listen(process.env.PORT, () => {
        console.log(`Server started on http://localhost:${process.env.PORT}`);
    });
})();
