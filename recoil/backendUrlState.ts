import { atom } from "recoil";

export const urls = [
    {
        name: "BiletMajster",
        url: "https://biletmajster.azurewebsites.net/api/v3"
    },
    {
        name: "Dionizos",
        url: "https://dionizos-backend-app.azurewebsites.net"
    },
    {
        name: "IO2Central",
        url: "http://io2central-env.eba-vfjwqcev.eu-north-1.elasticbeanstalk.com"
        // Warning: 
    },
    {
        name: "localhost",
        url: (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + "/api/v3"
        // Warning: 
    }
];

export const backendUrlState = atom<string>({
    key: "backendUrlState",
    default: urls[0].url
})