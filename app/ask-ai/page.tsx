"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";

function AskAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Inventory Managment support assistant. How can I help you today?",
    },
  ]);
  const focusRef = useRef<HTMLDivElement>();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    focusRef?.current &&
      focusRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    if (!message || !message.trim()) return; // Don't send empty messages

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response?.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        //@ts-ignore
        const { done, value } = await reader?.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
      setMessage("");
    }
  };

  return (
    <div className="px-32">
      <div className="flex items-center">
        <div className="font-sans font-bold text-2xl text-slate-50">
          AI CUSTOMER SUPPORT
        </div>
        <Link
          href="/"
          className="ml-auto bg-slate-700 text-white font-bold p-2 rounded hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Back to Home
        </Link>
      </div>
      <div className="mt-5 rounded-sm max-h-[35rem] h-[35rem] overflow-y-auto border-solid border-[0.5px] border-slate-500 bg-slate-900">
        <ul className="p-2">
          {messages.map((msg) => (
            <li
              className={`flex ${
                msg.role === "user" ? "justify-end ml-auto" : "justify-start"
              } mb-4`}
            >
              <span className="bg-slate-500 text-white p-2 rounded-sm max-w-1/2">
                <span className="text-slate-900">
                  {msg.role.toLocaleUpperCase()}:
                </span>{" "}
                {msg.content}
              </span>
            </li>
          ))}
          {
            //@ts-ignore
            <span ref={focusRef}></span>
          }
        </ul>
      </div>
      <div className="mt-2 flex items-center w-full p-[0.2rem] rounded-sm bg-slate-400 shadow-sm border-solid border-[0.5px] border-slate-500">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleKeyPress}
          className="flex-1 p-2.5 rounded-sm border-none bg-slate-900 text-base outline-none mr-1 text-slate-300"
          placeholder="Type your message..."
        />
        <button
          onClick={() => {
            sendMessage();
          }}
          className="py-2.5 px-3.5 rounded-sm bg-slate-700 text-white text-base hover:bg-slate-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AskAI;
