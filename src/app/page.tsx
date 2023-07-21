"use client";

import { Header } from "./components/header/Header";
import { SideBar } from "./components/sideBar/SideBar";
import { useEffect, useState } from "react";
import { Chat } from "./types/chat/Chat";
import { ChatArea } from "./components/chatArea/ChatArea";
import { Footer } from "./components/footer/Footer";
import { v4 as uuidv4 } from "uuid";
import { SideBarChatButton } from "./components/sideBarChatButton/SideBarChatButton";
import { Openai } from "./utils/Openai";

const Page = () => {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const [chatActive, setChatActive] = useState<Chat>();
  const [chatActiveId, setChatActiveId] = useState<string>("");
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [AILoading, setAILoading] = useState(false);

  useEffect(() => {
    setChatActive(chatList.find((item) => item.id === chatActiveId));
  }, [chatActiveId, chatList]);

  useEffect(() => {
    if (AILoading) getAIResponse();
  }, [AILoading]);

  const openSideBar = () => setSideBarOpened(true);
  const closeSideBar = () => setSideBarOpened(false);

  // const getAIResponse = () => {
  //   setTimeout(() => {
  //     let chatListClone = [...chatList];
  //     let chatIndex = chatListClone.findIndex(
  //       (item) => item.id === chatActiveId
  //     );
  //     if (chatIndex > -1) {
  //       chatListClone[chatIndex].messages.push({
  //         id: uuidv4(),
  //         author: "ai",
  //         body: "Aqui vai a respostas de AI :)",
  //       });
  //     }
  //     setChatList([...chatListClone]);
  //     setAILoading(false);
  //   }, 2000);
  // };

  const getAIResponse = async () => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex((item) => item.id === chatActiveId);

    if (chatIndex > -1) {
      const response = await Openai.generate(
        Openai.translateMessages(chatListClone[chatIndex].messages)
      );
      console.log(response)
      if (response) {
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: "ai",
          body: response,
        });
        console.log(response);
      }
    }
    setChatList(chatListClone);
    setAILoading(false);
    //console.log(setAILoading)
  };

  const handleClearConversations = () => {
    if (AILoading) return;

    setChatActiveId("");
    setChatList([]);
  };

  const handleNewChat = () => {
    if (AILoading) return;

    setChatActiveId("");
    closeSideBar();
  };

  const handleSendMessage = (message: string) => {
    if (!chatActiveId) {
      // creating new chat
      let newChatId = uuidv4();

      setChatList([
        {
          id: newChatId,
          title: message,
          messages: [{ id: uuidv4(), author: "me", body: message }],
        },
        ...chatList,
      ]);
      setChatActiveId(newChatId);
    } else {
      // updating existing chat
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(
        (item) => item.id === chatActiveId
      );
      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: "me",
        body: message,
      });
      setChatList(chatListClone);
    }

    setAILoading(true);
    console.log(setAILoading)
  };

  const handleSelectChat = (id: string) => {
    if (AILoading) return;

    let item = chatList.find((item) => item.id === id);
    if (item) setChatActiveId(item.id);
    closeSideBar();
  };

  const handleDeleteChat = (id: string) => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex((item) => item.id === id);
    chatListClone.splice(chatIndex, 1);
    setChatList(chatListClone);
    setChatActiveId("");
  };

  const handleEditChat = (id: string, newTitle: string) => {
    if (newTitle) {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex((item) => item.id === id);
      chatListClone[chatIndex].title = newTitle;
      setChatList(chatListClone);
    }
  };
  
  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <SideBar
        open={sideBarOpened}
        onClose={closeSideBar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {chatList.map((item) => (
          <SideBarChatButton
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
          />
        ))}
      </SideBar>
      <section className="flex flex-col w-full">
        <Header
          openSideBarClick={openSideBar}
          title={chatActive ? chatActive.title : "nova conversa"}
          newChatClick={handleNewChat}
        />

        <ChatArea chat={chatActive} loading={AILoading} />        

        <Footer onSendMessage={handleSendMessage} disabled={AILoading} />
      </section>
    </main>
  );
};

export default Page;
