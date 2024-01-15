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
      {
        role: "chatbot",
        message:
          "Great question! Protecting your personal information and privacy online is crucial in today's digital age. Here are some measures you can take to safeguard your private data:\n\n1. Use strong, unique passwords: Use a combination of uppercase and lowercase letters, numbers, and special characters to create a sturdy password for each of your online accounts. Avoidusing the same password for multiple accounts.\n2. Enable two-factor authentication (2FA): This adds an extra layer of security to your accounts by requiring a second form of verification, such as a code sent to your phone or a biometric scan.\n3. Keep your software and apps up-to-date: Regularly update your operating system, browser, and apps to ensure you have the latest security patches and features.\n4. Be cautious of emails and messages: Be wary of suspicious emails or messages that ask for personal information or direct you to click on links or download attachments from unfamiliar sources.\n5. Use a reputable antivirus software: Install and regularly update antivirus software to protect your device from malware and viruses.\n6. Use a VPN: A virtual private network (VPN) can help encrypt your internet connection and protect your personal information when browsing public Wi-Fi networks.\n7. Use a password manager: Consider using a password manager to generate and store unique, complex passwords for each of your online accounts.\n8. Review your privacy settings: Take a close look at the privacy settings for your social media accounts, email, and other online platforms to ensure you're sharing your information with the right people.\n9. Use a browser extension to block trackers: Consider installing a browser extension that can block online trackers, which can help protect your personal information.\n10. Educate yourself: Stay informed about the latest online threats and cybersecurity measures by regularly reading reputable sources and subscribing to cybersecurity newsletters.\n\nRemember, protecting your personal information and privacy online requires ongoing effort and vigilance. By taking these measures, you can significantly reduce the risk of your information being compromised.",
      },
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
