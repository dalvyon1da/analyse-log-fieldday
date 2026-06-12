const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const uploadStatus = document.getElementById("uploadStatus");

// 🔐 Mets TON TOKEN ici
const GITHUB_TOKEN = "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";

const REPO = "dalvyon1da/analyse-log-fieldday";
const BRANCH = "principal";

uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        uploadStatus.textContent = "Choisis un fichier.";
        return;
    }

    const content = await file.text();
    const path = `donnees/logs/${file.name}`;

    const encoded = btoa(unescape(encodeURIComponent(content)));

    const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: `Upload log ${file.name}`,
            content: encoded,
            branch: BRANCH
        })
    });

    if (response.ok) {
        uploadStatus.textContent = "Upload réussi !";
    } else {
        uploadStatus.textContent = "Erreur d’upload.";
    }
});
