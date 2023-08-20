import express from "express";
import { allBooking, bookVisit, cancelBooking, getAllFavorites, registration, setFavariteResidency } from "../controler/userControler.js";

const userRouter=express.Router();

userRouter.post("/registration",registration)
userRouter.post("/bookvisit/:id",bookVisit)
userRouter.post("/allbooking",allBooking)
userRouter.post("/setFavariteResidency/:id",setFavariteResidency)
userRouter.post("/cancelBooking",cancelBooking)
userRouter.post("/getAllFavorites",getAllFavorites)



export default userRouter;