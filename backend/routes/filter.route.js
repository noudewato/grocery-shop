import express from "express";
import {searchByQueryType} from "../controllers/filter.controller.js";
const filterRouter = express.Router();

// filterRouter.get("/", filterController.getNewArrivals);
filterRouter.post("/search",searchByQueryType);

export default filterRouter;
