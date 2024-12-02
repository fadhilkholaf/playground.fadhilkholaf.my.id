"use client";

import Form from "next/form";
import { useEffect, useRef, useState } from "react";

import { InboundMessage } from "ably";
import { Prisma } from "@prisma/client";

import { createMessage } from "@/database/message";
import { getClient } from "@/lib/ably";

const Chat = ({
  messagesHistory,
}: {
  messagesHistory: Prisma.MessageGetPayload<{
    select: { content: true; createdAt: true };
  }>[];
}) => {
  const [messages, setMessages] = useState<
    { content: string; createdAt: Date }[]
  >([...messagesHistory]);

  const client = getClient();
  const channel = client.channels.get("playground-fadhilkholaf-channel");

  const bottomRef = useRef<HTMLLIElement | null>(null);

  const getMessages = async (e: InboundMessage) => {
    setMessages((prev) => [
      ...prev,
      { content: e.data.content, createdAt: e.data.createdAt },
    ]);
  };

  useEffect(() => {
    channel.subscribe("message", getMessages);

    return () => {
      channel.unsubscribe("message", getMessages);
    };
  }, [channel]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <section className="flex h-screen w-full flex-col justify-end gap-2 p-8">
      <ul className="flex flex-col gap-2 overflow-y-auto">
        {messages.map((message, index) => (
          <li
            key={index}
            className="flex items-end justify-between gap-2 rounded-lg border p-2"
            ref={index === messages.length - 1 ? bottomRef : null}
          >
            <p>{message.content}</p>
            <p className="text-xs">
              {`${new Intl.DateTimeFormat("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(message.createdAt)} 
              ${new Intl.DateTimeFormat("id-ID", {
                timeStyle: "long",
              })
                .format(message.createdAt)
                .replaceAll(".", ":")}`}
            </p>
          </li>
        ))}
      </ul>
      <Form
        action={async (formData) => {
          const content = formData.get("content") as string;

          if (content) {
            try {
              await createMessage(content);

              channel.publish("message", {
                content,
              });
            } catch (error) {
              console.log(error);
            }
          }
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          name="content"
          id="content"
          className="w-full rounded-lg p-2 text-black"
        />
        <button type="submit" className="rounded-lg bg-white p-2 text-black">
          Submit
        </button>
      </Form>
      <p className="text-center">Global realtime chat</p>
      <p className="text-center">Take 50 history message</p>
    </section>
  );
};

export default Chat;
