"use client";

import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { InboundMessage } from "ably";
import { Prisma } from "@prisma/client";

import { createMessage } from "@/database/message";
import { getClient } from "@/lib/ably";

const Submit = () => {
  const formStatus = useFormStatus();

  return (
    <button
      disabled={formStatus.pending}
      className="rounded-lg bg-white p-2 text-black"
    >
      {formStatus.pending ? "Submitting..." : "Submit"}
    </button>
  );
};

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
    try {
      const response = await createMessage(e.data.content);

      setMessages((prev) => [
        ...prev,
        { content: response.content, createdAt: response.createdAt },
      ]);
    } catch (error) {
      console.log(error);
    }
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
      <ul className="flex flex-col gap-4 overflow-y-auto">
        {messages.map((message, index) => (
          <li
            key={index}
            className="flex justify-between border p-2"
            ref={index === messages.length - 1 ? bottomRef : null}
          >
            <p>{message.content}</p>
            <p>
              {new Intl.DateTimeFormat("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(message.createdAt)}{" "}
              {new Intl.DateTimeFormat("id-ID", {
                timeStyle: "long",
              })
                .format(message.createdAt)
                .replaceAll(".", ":")}
            </p>
          </li>
        ))}
      </ul>
      <Form
        action={async (formData) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const content = formData.get("content") as string;

          if (content) {
            channel.publish("message", {
              content,
            });
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
        <Submit />
      </Form>
      <p className="text-center">Delay 1s (take 100 history message)</p>
      <p className="text-center">Take 100 history message</p>
    </section>
  );
};

export default Chat;
