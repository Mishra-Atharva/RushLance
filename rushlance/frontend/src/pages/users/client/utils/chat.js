import { fetchData } from "../../../../utils/fetch.js";

export async function chatData()
{
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    
    const result = await fetchData("chat", "POST", {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, {email: email});

    if (result)
    {
        return result;
    }
    return null;
}

// CREATE TABLE messages (
//     id SERIAL PRIMARY KEY,
//     sender_id INTEGER NOT NULL,
//     receiver_id INTEGER NOT NULL,
//     booking_id INTEGER,
//     content TEXT NOT NULL,
//     sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     is_read BOOLEAN DEFAULT FALSE,
//     FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
//     FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
//     FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
// );

export async function chatData(r_name, email, )