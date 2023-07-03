import { ChatMessage } from "../chatMessage/ChatMessage";

export type Chat = {
    id: string;
    title: string;
    messages: ChatMessage[ ];
}