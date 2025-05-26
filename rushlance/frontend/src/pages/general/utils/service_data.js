import { fetchData } from "../../../utils/fetch.js";

export async function serviceData()
{
    const result = await fetchData("service", "GET", {"Content-Type": "application/json"}, null);

    // Success or Fail
    if (result)
    {
        return result;
    }
    else 
    {
        console.log("[!] Login unsuccessful!");
        return false;
    }
}

export async function bookService(c_id, s_id, f_id, date)
{
    const token = localStorage.getItem("token");

    const result = await fetchData("bookings", "POST", 
        {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`

        }, 
        {
            client_id: c_id,
            service_id: s_id,
            freelancer_id: f_id,
            status: "pending",
            booked_at: date
        }
    );

    if (result)
    {
        return true;
    }
    return false;
}