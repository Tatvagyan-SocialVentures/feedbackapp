import axios from "axios";

//* -------------------------For the internal data-----------------------------
export const baseURL = "https://tatvagyan.in/prakashak/";
// const baseURL = "https://tatvagyan.co.in/prakashak/";
// const baseURL = "http://20.51.237.197/prakashak/";

//*-------------For the authentication-----------------------------------------
export const baseURL2 = "https://thinkzone.in.net/thinkzone";
// const baseURL2 = "https://thinkzone.co/thinkzone";
// const baseURL2 = "http://3.142.110.38/thinkzone";

export const Version = {
  version: "1.5.6",
};

export const networkStatus =
  baseURL === "https://thinkzone.in.net/thinkzone"
    ? "Test 🔴"
    : "Production 🟢";

export const dataAPI = axios.create({
  baseURL,
});

export const authenticationAPI = axios.create({
  baseURL: baseURL2,
});
