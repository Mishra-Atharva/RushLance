import { useEffect, useState } from "react";
import { chatData, sendChat } from "../../client/utils/chat";

export default function ClientChat() {
  const [users, setUsers] = useState([]);
  const [chatLogs, setChatLogs] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [msg, setMsg] = useState("");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvc: "" });
  const [paypalEmail, setPaypalEmail] = useState("");

  const myName = localStorage.getItem("user_name") || "";

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!msg.trim() || !selectedUser) return;

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

  const handlePay = () => setShowPaymentModal(true);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Replace this with real API/payment gateway logic
    setShowPaymentModal(false);
    alert("Payment submitted!");
  };

  const handleRequestPayment = () => {
    // Replace this with real backend trigger or message
    alert("Payment request sent to client!");
  };

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const data = await chatData();
        const parsed = typeof data === "string" ? JSON.parse(data) : data;

        const grouped = {};
        parsed.forEach(({ sender_name, receiver_name, content, is_read }) => {
          let otherUserName = null;

          if (sender_name === myName && receiver_name !== myName) {
            otherUserName = receiver_name;
          } else if (receiver_name === myName && sender_name !== myName) {
            otherUserName = sender_name;
          }

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
        {users.length === 0 && <p className="text-gray-500 text-sm">No contacts found</p>}
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

      {/* RIGHT: Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-white">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Chat with {selectedUser || "No user selected"}
          </h2>
          <div className="flex gap-2">
            {/* <button
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              onClick={handlePay}
            >
              Pay
            </button> */}
            <button
              className="bg-yellow-600 text-white px-3 py-1 rounded text-sm"
              onClick={handleRequestPayment}
            >
              Request Payment
            </button>
          </div>
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handlePaymentSubmit}
            className="bg-white p-6 rounded shadow flex flex-col gap-3 min-w-[300px]"
          >
            <h2 className="text-lg font-semibold mb-2">Choose Payment Method</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select method</option>
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>

            {paymentMethod === "card" && (
              <>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvc: e.target.value })
                  }
                  required
                />
              </>
            )}

            {paymentMethod === "paypal" && (
              <input
                type="email"
                placeholder="PayPal Email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                required
              />
            )}

            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Submit Payment
              </button>
              <button
                type="button"
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
