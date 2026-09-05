// Cole a URL do seu Google Apps Script aqui.
// Deve terminar com /exec
const CONFIG_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxE_6f-3vwVS4pKZ48pDrLFM4V65xkRIen0dhb_o-7N7gyQCP0cRcwpn9DzI612ciTKig/exec";

// Helper universal para evitar bloqueios CORS de Preflight no Google Apps Script
async function apiCall(payload) {
    try {
        const res = await fetch(CONFIG_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (e) {
        console.error("Fetch Error: ", e);
        throw e;
    }
}
