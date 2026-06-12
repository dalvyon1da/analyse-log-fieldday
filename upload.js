const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const status = document.getElementById("uploadStatus");

// ⚠️ Tu devras créer un token GitHub avec droits "repo"
const GITHUB_TOKEN = "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";
const REPO = "TonPseudo/fieldday-vhf";
const BRANCH = "main";

uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    status.textContent = "Choisis un fichier.";
    return;
  }

  const content = await file.text();
  const path = `data/logs/${file.name}`;

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
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

  if (res.ok) {
    status.textContent = "Upload réussi ! Le classement sera mis à jour automatiquement.";
  } else {
    status.textContent = "Erreur d’upload.";
  }
});
