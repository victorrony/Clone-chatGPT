import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { ChatMessage } from '../types/chatMessage/ChatMessage';
// import ResponseCache from 'next/dist/server/response-cache';

const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const api = new OpenAIApi(config);

const ResponseCache = new Map();

export const Openai = {
    generate: async (messages: ChatCompletionRequestMessage[]) => {
        try {
            const cacheKey = JSON.stringify(messages);
            if (ResponseCache.has(cacheKey)) {
                console.log("Recuperando resposta do cache")
                return ResponseCache.get(cacheKey)?.json();
            }

            const response = await api.createChatCompletion({
                model: 'gpt-3.5-turbo',
                temperature: 0.6,
                messages
            });

            const answer = response.data.choices[0]?.message?.content;
            ResponseCache.set(cacheKey, answer);

            console.log('resposta da API'+response )
            return answer;
        } catch (error) {
            console.log('Erro ao fazer a solicitaçao para a API:', error)
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