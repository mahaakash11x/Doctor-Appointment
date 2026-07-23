import webmessageModel from "../models/webMessage.js";

//create message

export const createWebMessage = async (req, res) => {

    try {
        const { name, contact, message } = req.body;
        console.log(req.body);
        if (!name || !contact || !message) {
            return res.status(400).send({
                success: false,
                message: "Please provide all Fields"
            })
        }

        const webMessage = await webmessageModel.create({
            name,
            contact,
            message
        });
        res.status(201).send({
            success: true,
            message: "Web Message created successfully",
            webMessage,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating web message",
            error: error.message
        })
    }
};

//get All messages

export const getAllMessages = async (req, res) => {

    try {
        const webMessages = await webmessageModel.find({
         
        });
        res.status(201).send({
            success: true,
            message: "Web Message created successfully",
            totalCount: webMessages.length,
            webMessages,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all web message",
            error: error.message
        })
    }
};

// Delete Message

export const deleteWebMessage = async (req, res) => {

    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Plaese provide message ID"
            })
        }

        //find message
        const webMessage = await webmessageModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Message deleted successfully",
            webMessage,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete  web message",
            error: error.message
        })
    }
}