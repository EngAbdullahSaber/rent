"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslate } from "@/config/useTranslation";

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: Date;
}

const ConversationListPage = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();

  useEffect(() => {
    setTimeout(() => {
      setConversations([
        {
          id: "1",
          userId: "user1",
          userName: "John Doe",
          userAvatar: "/avatars/user1.jpg",
          lastMessage: "Hey, how are you doing?",
          unreadCount: 2,
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
        },
        {
          id: "2",
          userId: "user2",
          userName: "Jane Smith",
          userAvatar: "/avatars/user2.jpg",
          lastMessage: "About our meeting tomorrow...",
          unreadCount: 0,
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
        },
        {
          id: "3",
          userId: "user3",
          userName: "Alex Johnson",
          userAvatar: "/avatars/user3.jpg",
          lastMessage: "The documents are ready for review",
          unreadCount: 5,
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header with animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 flex items-center">
            <Icon icon="mdi:message-text" className="mr-2 text-blue-500" />
            {t("Messages")}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Icon icon="mdi:plus" className="text-gray-600 text-xl" />
          </motion.button>
        </div>
      </motion.div>

      {/* Loading state */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <motion.div className="flex flex-col items-center">
            <Icon icon="mdi:loading" className="text-blue-500 text-4xl mb-2" />
            <p className="text-gray-500">{t("Loading conversations")}</p>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Search bar with animation */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-3 border-b border-gray-200 sticky top-16 bg-white z-10"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t("Search messages")}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-2.5 text-gray-400 text-xl"
              />
            </div>
          </motion.div>

          {/* Animated conversation list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="px-2"
          >
            <AnimatePresence>
              {conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <Link
                    href={`/messages/${conversation.id}`}
                    className={`block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={conversation.userAvatar}
                          alt={conversation.userName}
                          className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-white shadow-sm"
                        />
                        <motion.span
                          animate={{
                            scale: [1, 1.1, 1],
                            transition: { repeat: Infinity, duration: 2 },
                          }}
                          className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                        ></motion.span>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900 truncate">
                            {conversation.userName}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                            >
                              {conversation.unreadCount}
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ConversationListPage;
