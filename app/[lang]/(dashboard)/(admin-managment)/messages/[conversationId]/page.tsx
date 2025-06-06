"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslate } from "@/config/useTranslation";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
}

const MessageContentPage = () => {
  const router = useRouter();
  const params = useParams();
  const conversationId = params.conversationId as string;
  const { t } = useTranslate();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);

    setTimeout(() => {
      setConversation({
        id: conversationId,
        userId: "user1",
        userName: "John Doe",
        userAvatar: "/avatars/user1.jpg",
      });

      setMessages([
        {
          id: "1",
          senderId: "user1",
          receiverId: "current-user",
          content: "Hey there!",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isRead: true,
        },
        {
          id: "2",
          senderId: "current-user",
          receiverId: "user1",
          content: "Hi! How are you?",
          timestamp: new Date(Date.now() - 1000 * 60 * 25),
          isRead: true,
        },
        {
          id: "3",
          senderId: "user1",
          receiverId: "current-user",
          content: "I was wondering about our project",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isRead: false,
        },
      ]);
      setLoading(false);
    }, 800);
  }, [conversationId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !conversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      receiverId: conversation.userId,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex items-center justify-center bg-gray-50"
      >
        <motion.div className="flex flex-col items-center">
          <Icon icon="mdi:loading" className="text-blue-500 text-4xl mb-2" />
          <p className="text-gray-500">{t("Loading messages")}</p>
        </motion.div>
      </motion.div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">{t("Conversation not found")}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Animated header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 border-b border-gray-200 flex items-center bg-white sticky top-0 z-10"
      >
        <motion.div whileTap={{ scale: 0.9 }}>
          <Link
            href="/messages"
            className="mr-3 text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <Icon icon="mdi:arrow-left" className="text-xl" />
          </Link>
        </motion.div>
        <div className="relative">
          <motion.img
            src={conversation.userAvatar}
            alt={conversation.userName}
            className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-white shadow-sm"
            whileHover={{ scale: 1.05 }}
          />
          <motion.span
            animate={{
              scale: [1, 1.1, 1],
              transition: { repeat: Infinity, duration: 2 },
            }}
            className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
          ></motion.span>
        </div>
        <div className="flex-1">
          <h2 className="font-medium text-gray-900">{conversation.userName}</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </motion.div>

      {/* Messages with animations */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-gray-500"
          >
            <Icon icon="mdi:message-off" className="text-4xl mb-2" />
            <p>{t("No messages yet")}</p>
            <p className="text-sm mt-1">{t("Start the conversation")}</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {messages.map((message, index) => {
                const isCurrentUser = message.senderId === "current-user";
                const showDate =
                  index === 0 ||
                  formatDate(message.timestamp) !==
                    formatDate(messages[index - 1].timestamp);

                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-xs text-gray-500 my-4"
                      >
                        {formatDate(message.timestamp)}
                      </motion.div>
                    )}
                    <motion.div
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className={`flex mb-3 ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                      layout
                    >
                      {!isCurrentUser && (
                        <motion.img
                          src={conversation.userAvatar}
                          alt={conversation.userName}
                          className="w-8 h-8 rounded-full mr-2 self-end object-cover border-2 border-white shadow-sm"
                          whileHover={{ scale: 1.1 }}
                        />
                      )}
                      <motion.div
                        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 relative ${
                          isCurrentUser
                            ? "bg-blue-500 text-white"
                            : "bg-white border border-gray-200"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p>{message.content}</p>
                        <div
                          className={`flex items-center justify-end mt-1 space-x-1 ${
                            isCurrentUser ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          <span className="text-xs">
                            {formatTime(message.timestamp)}
                          </span>
                          {isCurrentUser && (
                            <Icon
                              icon={
                                message.isRead ? "mdi:check-all" : "mdi:check"
                              }
                              className="text-xs"
                            />
                          )}
                        </div>
                        {/* Message triangle */}
                        {!isCurrentUser && (
                          <div className="absolute -left-1.5 bottom-2 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                        )}
                        {isCurrentUser && (
                          <div className="absolute -right-1.5 bottom-2 w-3 h-3 bg-blue-500 transform rotate-45"></div>
                        )}
                      </motion.div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Animated input area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 border-t border-gray-200 bg-white sticky bottom-0"
      >
        <div className="flex items-center space-x-2">
          <motion.div className="flex-1" layout>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </motion.div>
          <motion.button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            whileHover={{ scale: newMessage.trim() ? 1.1 : 1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors ${
              newMessage.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <Icon icon="mdi:send" className="text-xl" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageContentPage;
