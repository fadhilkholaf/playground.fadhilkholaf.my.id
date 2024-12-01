import { findManyMessage } from "@/database/message";

import Chat from "./_components/Chat";

export const revalidate = 0;

const HomePage = async () => {
  try {
    const messages = await findManyMessage();

    return (
      <main>
        <Chat messagesHistory={messages} />
      </main>
    );
  } catch (error) {
    console.log(error);

    return (
      <main className="flex h-screen w-full items-center justify-center">
        Error loading messages, Please reload!
      </main>
    );
  }
};

export default HomePage;
