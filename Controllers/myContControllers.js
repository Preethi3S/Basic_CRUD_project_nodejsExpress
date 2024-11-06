import asyncHandler from 'express-async-handler';
import Contact from '../models/contactSchema.js';
import { constantCode } from "../Errorcode.js";

// The reason for using the async handler is to avoid mutiple try-catch block function we can use a single keyword by importing it by installing npm i express-async-handler

// This async handler will automatically call my errorhandler file

//@desc cget contact
//@route GET con/
//@access private

export const getContacts = asyncHandler(async(req , res)=>{
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
})


//@desc create contact
//@route post con/
//@access private



export const createContacts = asyncHandler(async(req ,res)=>{
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Every field is mandatory");
    }
    const contacts = await Contact.create({name , email , phone , user_id : req.user.id});
    console.log(req.body)
    res.status(201).json(contacts);
})


//@desc update contact
//@route put con/:id
//@access private

export const updateContact = asyncHandler(async(req ,res)=>{

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("No such Contact found to Update...");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("UnAuthorized Error !! User cannot access another user account..");
    }
    
    const Updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )

    console.log("Contact updated successfully");
    res.status(200).json(Updatedcontact);
})

//@desc delete contact
//@route delete con/:id
//@access private

export const deleteContact = asyncHandler(async(req ,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("UnAuthorized Error !! User cannot access another user account..");
    }

    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
})

//@desc get one contact
//@route GET con/
//@access private

export const getContact = asyncHandler(async(req ,res)=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(constantCode.NOT_FOUND);
        const error = new error("Contact not found");
        next(error);
    }
    res.status(200).json(contacts);
})



