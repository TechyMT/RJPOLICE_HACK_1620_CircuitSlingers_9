"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { WindupChildren } from "windups";
const Chatbot: React.FC = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: string; message: string }[]
  >([]);

  const toggleChatbox = () => {
    setShowChatbox((prev) => !prev);
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    // Handle user input, e.g., send it to a chatbot API
    console.log("User input:", userInput);

    // Simulate chatbot response (replace this with actual API interaction)
    const newMessages = [
      ...chatMessages,
      { role: "user", message: userInput },
      { role: "chatbot", message: "Hello! How are you?" },
    ];
    setChatMessages(newMessages);

    // Clear the input after submission
    setUserInput("");
  };

  useEffect(() => {
    // Simulate initial chatbot messages
    if (showChatbox && chatMessages.length === 0) {
      setChatMessages([
        { role: "chatbot", message: "Hello! How can I assist you today?" },
      ]);
    }

    // Scroll to the bottom when a new message is added
    const chatbox = document.getElementById("chatbox-content");
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [showChatbox, chatMessages]);

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        className="chatbot-icon w-20 h-20 text-2xl bg-primaryRed rounded-full flex items-center justify-center fixed bottom-10 right-10 cursor-pointer"
        onClick={toggleChatbox}
      >
        🤖
      </div>

      {/* Chatbox */}
      {showChatbox && (
        <div className="chatbox fixed bottom-10 right-10 w-[25vw] h-[70vh] bg-white rounded-2xl shadow-lg flex flex-col justify-between">
          {/* Chatbox Header */}
          <div className="flex justify-between mb-2 p-4 bg-primaryRed rounded-t-2xl">
            <div className="text-lg font-semibold text-white">
              Chat with Expert
            </div>
            <div
              onClick={toggleChatbox}
              className="cursor-pointer text-primary"
            >
              Close
            </div>
          </div>

          {/* Chatbox Content */}
          <div
            id="chatbox-content"
            className="flex flex-col overflow-y-auto flex-grow p-2"
            style={{ minHeight: 0 }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {message.role === "user" ? (
                  <>
                    <div className="flex items-center gap-4 justify-end">
                      <div>{message.message}</div>
                      <div>
                        <Avatar></Avatar>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div>
                        <Avatar />
                      </div>
                      <WindupChildren>{`${message.message}`}</WindupChildren>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 items-center p-2">
            {/* User Input */}
            <Input
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              placeholder="Enter your prompts here"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white",
              }}
              size="sm"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-4 bg-primary text-white"
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
