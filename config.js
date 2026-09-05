// Cole a URL do seu Google Apps Script aqui.
// Deve terminar com /exec
const CONFIG_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwvmte4eJvSpG2CdS-d0JVFOHBgpRjgH8XH1WJEC2aoQhN6CM8QwGHwsOeFg7KU-3dhkg/exec";

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
