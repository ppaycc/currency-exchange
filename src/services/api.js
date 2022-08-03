import {baseCurrency, currency} from "../utils/constant";

const headers = {
    // "apikey": "ydJWHTGqhEHSXXAd274hhlw1OWvEMWMY"
    "apikey": "6NDwy8EmJ7N0m33DeqwQU5yo87HwyNHm"
};

const optionsGet = {
    method: "GET",
    redirect: "follow",
    headers: headers
};

const baseUrl = "https://api.apilayer.com/exchangerates_data";

export const getLatest = async () => {
    const symbols = Object.keys(currency)
        .filter(c => c !== baseCurrency)
        .join(",");
    const request = await fetch(
        `${baseUrl}/latest?base=${baseCurrency}&symbols=${symbols}`,
        optionsGet
    );

    const response = await request.json();
    return response;
}

export const getConvert = async ({to, from, amount = 1}) => {
    const request = await fetch(`${baseUrl}/convert?to=${to}&from=${from}&amount=${amount}`, optionsGet);
    const response = await request.json();
    return response;
}