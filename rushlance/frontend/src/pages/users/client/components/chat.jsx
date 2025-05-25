import { useEffect, useState } from "react";
import { chatData } from "../utils/chat";
import { sendChat } from "../utils/chat";

export default function ClientChat() {
  const [users, setUsers] = useState([]); // other users you've chatted with
  const [chatLogs, setChatLogs] = useState({}); // { userName: [messages] }
  const [selectedUser, setSelectedUser] = useState(null);
  const [msg, setMsg] = useState("");

  const myName = localStorage.getItem("user_name") || "";

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!msg.trim() || !selectedUser) return;

    // Add message locally immediately
    setChatLogs((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), { me: true, text: msg.trim() }],
    }));

    try {
      await sendChat(selectedUser, localStorage.getItem("email"), msg.trim());
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    setMsg("");
  };

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const data = await chatData();
        const parsed = typeof data === "string" ? JSON.parse(data) : data;

        const grouped = {};

        parsed.forEach(({ sender_name, receiver_name, content, is_read }) => {
          // Determine the other user in the conversation
          let otherUserName = null;

          if (sender_name === myName && receiver_name !== myName) {
            otherUserName = receiver_name;
          } else if (receiver_name === myName && sender_name !== myName) {
            otherUserName = sender_name;
          }

          // If neither side is me (maybe irrelevant?), skip
          if (!otherUserName) return;

          const isMe = sender_name === myName;

          if (!grouped[otherUserName]) grouped[otherUserName] = [];
          grouped[otherUserName].push({ me: isMe, text: content, is_read });
        });

        setChatLogs(grouped);

        const userList = Object.keys(grouped).filter((u) => u !== myName);

        setUsers(userList);

        setSelectedUser((prev) =>
          prev && userList.includes(prev) ? prev : userList[0] || null
        );
      } catch (err) {
        console.error("Failed to fetch chat data:", err);
      }
    };

    fetchChatData();

    const intervalId = setInterval(fetchChatData, 100);
    return () => clearInterval(intervalId);
  }, [myName]);

  return (
    <div className="flex h-full bg-gray-100 rounded-2xl overflow-hidden shadow">
      {/* LEFT: User List */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Contacts</h2>
        {users.length === 0 && (
          <p className="text-gray-500 text-sm">No contacts found</p>
        )}
        {users.map((userName) => (
          <div
            key={userName}
            onClick={() => setSelectedUser(userName)}
            className={`p-2 rounded-lg cursor-pointer mb-2 ${
              selectedUser === userName
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-50"
            }`}
          >
            {userName}
          </div>
        ))}
      </aside>

      {/* RIGHT: Chat */}
      <main className="flex-1 flex flex-col h-full bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Chat with {selectedUser || "No user selected"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(chatLogs[selectedUser] || []).map((m, i) => (
            <p
              key={i}
              className={`px-4 py-2 rounded-lg w-fit max-w-[80%] text-sm ${
                m.me
                  ? "ml-auto bg-gray-800 text-white"
                  : "mr-auto bg-gray-100 text-gray-800"
              }`}
            >
              {m.text}
            </p>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 flex gap-3">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm hover:opacity-90"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
