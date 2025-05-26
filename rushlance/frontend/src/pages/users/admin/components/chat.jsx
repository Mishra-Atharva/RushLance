//  src/pages/users/admin/components/chat.jsx
import { useState } from "react";

export default function Chat() {
  const [rooms, setRooms] = useState(initialRooms);
  const [roomIdx, setRoomIdx] = useState(0);
  const [draft, setDraft]   = useState("");

  const active = rooms[roomIdx];

  const sendMsg = () => {
    if (!draft.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "admin",
      text: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    const copy = [...rooms];
    copy[roomIdx].messages.push(newMsg);
    setRooms(copy);
    setDraft("");
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white h-[600px] flex">
      {/* room list */}
      <aside className="w-[220px] border-r border-gray-200 overflow-y-auto">
        {rooms.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setRoomIdx(i)}
            className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
              i === roomIdx ? "bg-gray-200" : ""
            }`}
          >
            <div className="font-medium truncate">{r.name}</div>
            {r.unread > 0 && (
              <span className="inline-block mt-1 text-xs text-gray-500">
                {r.unread} unread
              </span>
            )}
          </button>
        ))}
      </aside>

      {/* chat window */}
      <div className="flex-1 flex flex-col">
        {/* header */}
        <header className="px-5 py-4 border-b border-gray-200 font-semibold">
          {active.name}
        </header>

        {/* messages */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {active.messages.map(m => (
            <div
              key={m.id}
              className={`max-w-[70%] text-sm px-4 py-2 rounded-lg ${
                m.from === "admin"
                  ? "bg-gray-800 text-white ml-auto"
                  : "bg-gray-100 text-black"
              }`}
            >
              {m.text}
              <span className="block mt-1 text-[10px] text-gray-400 text-right">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* composer */}
        <footer className="px-4 py-3 border-t border-gray-200 flex gap-3">
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMsg()}
            placeholder="Type a message…"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={sendMsg}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm hover:opacity-90"
          >
            Send
          </button>
        </footer>
      </div>
    </section>
  );
}
