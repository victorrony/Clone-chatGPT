import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { ChatMessage } from '../types/chatMessage/ChatMessage';


const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const api = new OpenAIApi(config);

export const Openai = {
    generate: async (messages: ChatCompletionRequestMessage[]) => {
        try {
            const response = await api.createChatCompletion({
                model: 'gpt-3.5-turbo',
                temperature: 0.6,
                messages
            });
            return response.data.choices[0]?.message?.content;
        } catch (error) {
            return undefined;
        }            
    },
    translateMessages: (messages: ChatMessage[]) => {
        let reqMessages: ChatCompletionRequestMessage[] = [];

        for (let i in messages) {
            reqMessages.push({
                role: messages[i].author === 'me' ? 'user' : 'assistant',
                content: messages[i].body
            });
        }
        return reqMessages;
    }
}