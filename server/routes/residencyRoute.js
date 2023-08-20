import express from "express";
import { createResidency, getRecidency, getRecidencybyID } from "../controler/residencyControler.js";

const resicencyRouter=express.Router();

resicencyRouter.post("/creat",createResidency)
resicencyRouter.get("/getRecidency",getRecidency)
resicencyRouter.get("/:id",getRecidencybyID)

export default resicencyRouter;