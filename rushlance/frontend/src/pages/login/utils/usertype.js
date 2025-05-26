import { fetchData } from "../../../utils/fetch.js";

// Handles user login and sets user data in localStorage
export async function userType(email, token) {
    // Try both endpoints to maintain compatibility or fallback support
    const primaryResult = await fetchData("getUserType", "POST", {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }, { email });

    if (primaryResult && primaryResult.userType) {
        localStorage.setItem("userType", primaryResult.userType);
        return primaryResult.userType;
    }

    // Fallback to older method
    const legacyResult = await fetchData("user-email", "POST", {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }, { email });

    if (legacyResult) {
    const parsed = JSON.parse(legacyResult);
    localStorage.setItem("type", parsed[0]);
    localStorage.setItem("userType", parsed[0]);
    localStorage.setItem("user_name", parsed[1]);
    localStorage.setItem("id", parsed[2]);
    console.log("After setItem, userType is:", localStorage.getItem("userType"));
    return parsed[0];
}




    console.log("[!] Couldn't get user type!");
    return null;
}
