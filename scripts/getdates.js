document.addEventListener("DOMContentLoaded", () => {
    
    const currentYear = new Date().getFullYear();
    const yearSpan = document.querySelector("#currentyear");
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }

    const lastModParagraph = document.querySelector("#lastModified");
    if (lastModParagraph) {
        const lastMod = document.lastModified;
        lastModParagraph.textContent = `Last Modification: ${lastMod}`;
    }
});