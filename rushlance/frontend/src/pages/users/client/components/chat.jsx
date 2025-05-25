import { useEffect, useState } from "react";
import { chatData } from "../utils/chat";

export default function ClientChat() {
  const [users, setUsers] = useState([]); // receivers from backend
  const [chatLogs, setChatLogs] = useState({}); // { receiver_name: [messages] }
  const [selectedUser, setSelectedUser] = useState(null);
  const [msg, setMsg] = useState("");

  // Send message handler adds new message to chatLogs of selected user
  const sendMessage = (e) => {
    e.preventDefault();
    if (!msg.trim() || !selectedUser) return;

    setChatLogs((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), { me: true, text: msg.trim() }],
    }));

    setMsg("");
  };

  // Fetch backend chat data and process it
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const data = await chatData();
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;

        const grouped = parsedData.reduce((acc, msg) => {
          const receiver = msg.receiver_name || "Unknown";
          if (!acc[receiver]) acc[receiver] = [];
          acc[receiver].push({ me: false, text: msg.content, is_read: msg.is_read });
          return acc;
        }, {});

        setChatLogs(grouped);

        const userList = Object.keys(grouped);
        setUsers(userList);

        if (userList.length > 0 && !selectedUser) {
          setSelectedUser(userList[0]);
        }
      } catch (error) {
        console.error("Error fetching or parsing chat data:", error);
      }
    };

    fetchChatData();

    const intervalId = setInterval(fetchChatData, 5000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="flex h-full bg-gray-100 rounded-2xl overflow-hidden shadow">
      {/* LEFT: User List */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Contacts</h2>
        {users.map((user) => (
          <div
            key={user}
            onClick={() => setSelectedUser(user)}
            className={`p-2 rounded-lg cursor-pointer mb-2 ${
              selectedUser === user ? "bg-gray-200 font-semibold" : "hover:bg-gray-50"
            }`}
          >
            {user}
          </div>
        ))}
      </aside>

      {/* RIGHT: Chat */}
      <main className="flex-1 flex flex-col h-full bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Chat with {selectedUser}</h2>
        </div>

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(chatLogs[selectedUser] || []).map((m, i) => (
            <p
              key={i}
              className={`px-4 py-2 rounded-lg w-fit max-w-[80%] text-sm ${
                m.me ? "ml-auto bg-gray-800 text-white" : "mr-auto bg-gray-100 text-gray-800"
              }`}
            >
              {m.text}
            </p>
          ))}
        </div>

        {/* Input */}
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
