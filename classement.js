async function loadRanking() {
  const res = await fetch("data/classement.json");
  const ranking = await res.json();

  const tbody = document.querySelector("#ranking-table tbody");
  tbody.innerHTML = "";

  ranking.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.rank}</td>
      <td>${row.indicatif}</td>
      <td>${row.distance.toLocaleString("fr-FR")}</td>
    `;

    tbody.appendChild(tr);
  });
}

loadRanking();
