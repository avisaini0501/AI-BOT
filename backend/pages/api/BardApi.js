import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyBFJLE2kU8H_Vd5Tr7sFe-_3fIlLrN-0-Y";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});


export async function getApiResponse(req , res) {
  let messages = [{content: req.query.ques}];


client.generateMessage({
  model: MODEL_NAME,
  temperature: 0.25,
  candidateCount: 1,
  top_k: 40,
  top_p: 0.95,
  prompt: {
    messages: messages,
  },
}).then(result => {
 // console.log("First Response:" , result[0].candidates[0]?.content);

  messages.push({content: result[0].candidates[0]?.content });

   res.status(200).json({
    data: result[0].candidates[0]?.content,
  });
});

}