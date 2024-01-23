"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { WindupChildren } from "windups";
import UserAvatar from "../../assets/images/avatar_user.jpeg";
import AIAvatar from "../../assets/images/avatar.jpg";
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

  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    // Handle user input, e.g., send it to a chatbot API
    console.log("User input:", userInput);
    const newUserMessage = { role: "user", message: userInput };
    setChatMessages((prevData) => [...prevData, newUserMessage]);
    console.log("chatMessages", chatMessages);
    // Clear the input after submission
    setUserInput("");
    setLoading(true);
    try {
      // const response = await fetch("api/chat", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     query: userInput,
      //   }),
      // });
      // const message = await response.json();
      // console.log("message", message);
      const message = { title: "This is a test response, as we have stopped the model, and this is the demo stream of text for you. To see an actual demo contact us." };

      // Simulate chatbot response (replace this with actual API interaction)
      const newChatbotMessage = { role: "chatbot", message: message.title };
      setChatMessages((prevData) => [...prevData, newChatbotMessage]);
      console.log("chatMessages", chatMessages);
      const chatbox = document.getElementById("chatbox-content");
      if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setLoading(false);
    }
    // Scroll to the bottom when a new message is added
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
        <div className="chatbox fixed bottom-10 w-[70vw] right-10 md:w-[25vw] h-[70vh] bg-white rounded-2xl shadow-lg flex flex-col justify-between">
          {/* Chatbox Header */}
          <div className="flex justify-between mb-2 p-4 bg-primary rounded-t-2xl">
            <div className="text-lg font-semibold text-white">
              Chat with Expert
            </div>
            <div
              onClick={toggleChatbox}
              className="cursor-pointer bg-primaryRed border-1 border-primaryRed rounded-2xl p-2 text-white"
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
                className={`mb-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } flex items-center`}
              >
                {message.role !== "user" ? (
                  <Avatar src="/avatar.jpg"></Avatar>
                ) : (
                  <></>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.role === "user"
                      ? "bg-primary text-white self-end"
                      : "bg-gray-200"
                  }`}
                >
                  <WindupChildren>{message.message}</WindupChildren>
                </div>
                <div className="ml-2">
                  {message.role === "user" ? (
                    <Avatar src="/avatar_user.jpeg"></Avatar>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Loading Animation with Chatbot Avatar */}
          {loading && (
            <div className="flex justify-start items-end">
              <div>
                <Avatar src="/avatar.jpg"></Avatar>
              </div>
              <div className="p-3 bg-gray-200 rounded-lg max-w-[70%]">
                {/* You can replace this with your loading animation or component */}
                Loading...
              </div>
            </div>
          )}

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
