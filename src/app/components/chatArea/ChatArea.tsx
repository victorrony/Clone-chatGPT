import { Chat } from "@/app/types/chat/Chat";
import { ChatPlaceholder } from "../chatPlaceholder/ChatPlaceholder";
import { ChatMessageItem } from "../chatMessageItem/ChatMessageItem";
import { ChatMessageLoading } from "../chatMessageLoading/ChatMessageLoading";
import { useEffect, useRef } from "react";

type Props = {
  chat: Chat | undefined;
  loading: boolean;
};
export const ChatArea = ({ chat, loading }: Props) => {
  const scrollArea = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    scrollArea.current?.scrollTo(0, scrollArea.current?.scrollHeight); 
  },[loading, chat?.messages.length]);

  return (
    <section className="flex-auto h-0 overflow-y-scroll">
      {!chat && <ChatPlaceholder />}
      {chat && chat.messages.map((item) => (
        <ChatMessageItem 
            key={item.id}
            item={item}  
        />
      ))}
      {loading && <ChatMessageLoading />}
    </section>
  );
};
