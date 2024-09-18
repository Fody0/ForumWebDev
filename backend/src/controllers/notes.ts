import NoteModel from "../models/note";
import {RequestHandler} from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote:RequestHandler = async (req, res, next) => {
    const noteid = req.params.noteid;

    try {
        if(!mongoose.isValidObjectId(noteid)) {
            throw createHttpError(400, "Not a valid Note Id");
        }

        const note = await NoteModel.findById(noteid).exec();

        if(!note){
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

interface CreateNodeBody{
    title?: string,
    text?: string,
}

export const createNote:RequestHandler<unknown, unknown, CreateNodeBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if(!title){
            throw createHttpError(400, "Title is required"  );
        }


        const newNote = await NoteModel.create({
            title: title,
            text: text,
        })

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteParams{
    noteid: string,
}


interface UpdateNoteBody{
    title?: string,
    text?: string
}

export const updateNote:RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req,res,next) => {
    const noteid = req.params.noteid;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if(!mongoose.isValidObjectId(noteid)) {
            throw createHttpError(400, "Not a valid Note Id");
        }

        if(!newTitle){
            throw createHttpError(400, "NewTitle is required"  );
        }

        const note = await NoteModel.findById(noteid).exec();

        if(!note){
            throw createHttpError(404, "Note not found");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
        // NoteModel.findByIdAndUpdate(noteid,updatedNote,{ }) looking up again

    } catch (error){
        next(error);
    }
}

export const deleteNote:RequestHandler = async(req,res,next) => {
    const noteid = req.params.noteid;
    try {

        if(!mongoose.isValidObjectId(noteid)) {
            throw createHttpError(400, "Not a valid Note Id");
        }

        const note = await NoteModel.findById(noteid).exec();

        if(!note){
            throw createHttpError(404, "Note not found");
        }

        await note.deleteOne();

        res.sendStatus(204);
    }catch(error){
        next(error);
    }



}