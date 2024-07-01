import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiver_id } = req.params;
    const sender_id = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender_id, receiver_id] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender_id, receiver_id],
      });
    }
    const newMessage = new Message({
      sender_id,
      receiver_id,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Some thing went wrong while sending message");
    return res.status(500).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const sender_id = req.user._id;

    const conversations = await Conversation.findOne({
      participants: { $all: [userToChatId, sender_id] },
    }).populate("messages");

    if (!conversations) return res.json([]);
    res.status(200).json(conversations.messages);
  } catch (error) {
    res.status(500).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
};
