// 📁 File: /src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Upload, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import userName from "../assets/y1.jpg"

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL || "http://localhost:8080/bot",
        {
          message: input,
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = {
        sender: "bot",
        text: "Oops! Something went wrong. Try again later.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="gh-dark-app flex flex-col h-screen w-full overflow-hidden relative">
      {/* Top Bar */}
      <div className="topbar flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <img
            src="/bot1.png"
            alt="Bot Logo"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-lg font-Italic text-white">LMS Bot</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 hidden sm:inline"></span>
          <img
            src={userName}
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>

      {/* Welcome Prompt */}
      {messages.length === 0 && (
        <div className="text-center text-gray-400 text-base md:text-lg font-medium mt-4 md:mt-6">
          What's on your mind? 
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 px-4 py-4 md:py-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div className={`message ${msg.sender === "user" ? "msg-user" : "msg-bot"}`}>
                  {msg.text && msg.text.startsWith("Oops!") ? (
                    <span className="error-pill">{msg.text.replace("⚠️", "").trim()}</span>
                  ) : (
                    <div className="whitespace-pre-line break-words text-sm font-medium">{msg.text}</div>
                  )}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} /> Thinking....
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-3xl mx-auto px-4 pb-4 sticky bottom-0">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1 text-sm px-2 py-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-full p-2"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;


// // File: /src/components/Chatbot.jsx     1
// import React, { useState } from "react";
// import axios from "axios";
// import { Send, Upload, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/bot", {
//         message: input,
//       });

//       const botMessage = {
//         sender: "bot",
//         text: response.data.reply,
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const botMessage = {
//         sender: "bot",
//         text: "⚠️ Oops! Something went wrong. Try again later.",
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col items-center py-8 px-4">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 text-xl font-semibold">
//           LMS Chatbot 🤖
//         </div>
//         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 h-[500px]">
//           {messages.map((msg, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2 }}
//               className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`rounded-xl px-4 py-3 max-w-[75%] text-sm font-medium shadow-md ${
//                   msg.sender === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </motion.div>
//           ))}
//           {loading && (
//             <div className="flex items-center gap-2 text-gray-500">
//               <Loader2 className="animate-spin" size={18} />
//               Typing...
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-2 p-4 border-t">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Ask your question..."
//             className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl"
//           >
//             <Send size={18} />
//           </button>
//           <button className="bg-gray-100 p-2 rounded-xl hover:bg-gray-200">
//             <Upload size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


// // 📁 File: /src/components/Chatbot.jsx      2
// import React, { useState } from "react";
// import axios from "axios";
// import { Send, Upload, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/bot", {
//         message: input,
//       });

//       const botMessage = {
//         sender: "bot",
//         text: response.data.reply,
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const botMessage = {
//         sender: "bot",
//         text: "⚠️ Oops! Something went wrong. Try again later.",
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div className="h-screen flex overflow-hidden">
//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r p-4 overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Your Questions</h2>
//         <ul className="space-y-2">
//           {messages.map((msg, index) =>
//             msg.sender === "user" ? (
//               <li
//                 key={index}
//                 className={`p-2 rounded-lg cursor-pointer text-sm truncate ${
//                   activeIndex === index ? "bg-blue-100 font-medium" : "hover:bg-gray-100"
//                 }`}
//                 onClick={() => setActiveIndex(index)}
//               >
//                 {msg.text}
//               </li>
//             ) : null
//           )}
//         </ul>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-100 to-blue-200">
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 text-xl font-semibold">
//           LMS Chatbot 🤖
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {messages.map((msg, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2 }}
//               className={`flex ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`rounded-xl px-4 py-3 max-w-[75%] text-sm font-medium shadow-md ${
//                   msg.sender === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </motion.div>
//           ))}
//           {loading && (
//             <div className="flex items-center gap-2 text-gray-500">
//               <Loader2 className="animate-spin" size={18} />
//               Typing...
//             </div>
//           )}
//         </div>

//         {/* Input Fixed to Bottom */}
//         <div className="border-t p-4 bg-white flex items-center gap-2">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Ask your question..."
//             className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl"
//           >
//             <Send size={18} />
//           </button>
//           <button className="bg-gray-100 p-2 rounded-xl hover:bg-gray-200">
//             <Upload size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

// 📁 File: /src/components/Chatbot.jsx         3
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { Send, Upload, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/bot", {
//         message: input,
//       });

//       const botMessage = {
//         sender: "bot",
//         text: response.data.reply,
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const botMessage = {
//         sender: "bot",
//         text: "⚠️ Oops! Something went wrong. Try again later.",
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-200">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 text-xl font-semibold">
//         LMS Chatbot 🤖
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
//         {messages.map((msg, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//             className={`flex ${
//               msg.sender === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`rounded-xl px-4 py-3 max-w-[75%] text-sm font-medium shadow-md ${
//                 msg.sender === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </motion.div>
//         ))}
//         {loading && (
//           <div className="flex items-center gap-2 text-gray-500">
//             <Loader2 className="animate-spin" size={18} />
//             Typing...
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="border-t p-4 bg-white sticky bottom-0 w-full flex items-center gap-2 z-10">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           placeholder="Ask your question..."
//           className="flex-1 border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading}
//           className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
//         >
//           <Send size={18} />
//         </button>
//         <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
//           <Upload size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

// 📁 File: /src/components/Chatbot.jsx                                       4(finalized)
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { Send, Upload, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/bot", {
//         message: input,
//       });

//       const botMessage = {
//         sender: "bot",
//         text: response.data.reply,
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const botMessage = {
//         sender: "bot",
//         text: "⚠️ Oops! Something went wrong. Try again later.",
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen w-full items-center justify-between bg-gradient-to-b from-purple-100 to-blue-200">
//       {/* Chat Area */}
//       <div className="flex-1 w-full max-w-3xl overflow-y-auto px-4 py-6">
//         {messages.map((msg, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//             className={`flex ${
//               msg.sender === "user" ? "justify-end" : "justify-start"
//             } mb-4`}
//           >
//             <div
//               className={`rounded-2xl px-5 py-3 max-w-[75%] text-sm font-medium shadow ${
//                 msg.sender === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </motion.div>
//         ))}
//         {loading && (
//           <div className="text-sm text-gray-500 flex items-center gap-2">
//             <Loader2 className="animate-spin" size={16} /> Thinking...
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Box */}
//       <div className="w-full max-w-3xl px-4 pb-6 sticky bottom-0">
//         <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your question here..."
//             className="flex-1 text-sm px-2 py-2 focus:outline-none"
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="text-white bg-blue-600 hover:bg-blue-700 rounded-full p-2"
//           >
//             <Send size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

