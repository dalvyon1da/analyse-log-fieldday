const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const uploadStatus = document.getElementById("uploadStatus");

// 🔐 Mets ton NOUVEAU token ici
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
    const path = `data/logs/${file.name}`;

    const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: `Upload log ${file.name}`,
            content: btoa(content),
            branch: BRANCH
        })
    });

    if (response.ok) {
        uploadStatus.textContent = "Upload réussi !";
    } else {
        uploadStatus.textContent = "Erreur d’upload.";
    }
});
