import json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
LOGS = BASE / "data" / "logs"
OUT = BASE / "data" / "classement.json"

def main():
    clubs = []

    for file in LOGS.glob("*.json"):
        data = json.loads(file.read_text())
        indicatif = data["indicatif"]
        total = sum(q["distance_km"] for q in data["qsos"])
        clubs.append({"indicatif": indicatif, "total": total})

    clubs_sorted = sorted(clubs, key=lambda x: x["total"], reverse=True)

    classement = [
        {"rank": i+1, "indicatif": c["indicatif"], "distance": c["total"]}
        for i, c in enumerate(clubs_sorted)
    ]

    OUT.write_text(json.dumps(classement, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
