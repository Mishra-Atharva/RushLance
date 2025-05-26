import { fetchData } from "../../../../utils/fetch.js";

export async function serviceData()
{
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const result = await fetchData("dashboard-freelancer-service", "POST", 
        {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
        }, {email: email});

    // Success or Fail
    if (result)
    {
        console.log(JSON.parse(result))
        return result;
    }
    else 
    {
        console.log("[!] Can't get profile data");
        return false;
    }
}


// CREATE TABLE services (
//     id SERIAL PRIMARY KEY,
//     freelancer_id INTEGER NOT NULL,
//     category TEXT NOT NULL,
//     title VARCHAR(100) NOT NULL,
//     description TEXT,
//     price DECIMAL(10,2) NOT NULL,
//     is_active BOOLEAN DEFAULT TRUE,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
// );

export async function createService(f_id, category, title, desc, price, active)
{
    const token = localStorage.getItem("token");

    const result = await fetchData("service", "POST", {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
        }, 
        {
            freelancer_id: f_id,
            category: category,
            title: title,
            description: desc,
            price: price,
            is_active: active
        }
    );

    if (result)
    {
        return true;
    }
    return false;
}

export async function deleteService(id) {
    const token = localStorage.getItem("token");
    
    const result = await fetchData("service", "DELETE", {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
        }, 
        {
            id: id
        }
    );
}