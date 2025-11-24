import express from "express"
import auth from "../middlewares/auth.js";
import { addAddress, getAddresses, updateAddress, deleteAddress, setDefaultAddress } from "../controllers/addressControllers.js";


const addressRouter = express.Router()

    addressRouter.get("/", auth, getAddresses)
    addressRouter.post("/", auth, addAddress)
    addressRouter.patch("/default/:addressId", auth, setDefaultAddress)
    addressRouter.put("/:addressId", auth, updateAddress)
    addressRouter.delete("/:addressId", auth, deleteAddress)
    


export default addressRouter