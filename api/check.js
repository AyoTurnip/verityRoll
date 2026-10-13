export default function handler(req, res) {
  const user = req.query.user || "Viewer";

  const pool = [
    // Common (60% total weight) -> ~12% per item -> 1 in 8.3
    { rarity: "Common", name: "Verity", chance: "1 in 8", weight: 12 },
    { rarity: "Common", name: "Falsity", chance: "1 in 8", weight: 12 },
    { rarity: "Common", name: "Lovity", chance: "1 in 8", weight: 12 },
    { rarity: "Common", name: "Curiosity", chance: "1 in 8", weight: 12 },
    { rarity: "Common", name: "Cruelty", chance: "1 in 8", weight: 12 },

    // Uncommon (25% total weight) -> 5% per item -> 1 in 20
    { rarity: "Uncommon", name: "Lovity", chance: "1 in 20", weight: 5 },
    { rarity: "Uncommon", name: "Freakity", chance: "1 in 20", weight: 5 },
    { rarity: "Uncommon", name: "Cuteity", chance: "1 in 20", weight: 5 },
    { rarity: "Uncommon", name: "Obesity", chance: "1 in 20", weight: 5 },
    { rarity: "Uncommon", name: "Moggity", chance: "1 in 20", weight: 5 },

    // Rare (10% total weight) -> 2% per item -> 1 in 50
    { rarity: "Rare", name: "Larpity", chance: "1 in 50", weight: 2 },
    { rarity: "Rare", name: "Spookity", chance: "1 in 50", weight: 2 },
    { rarity: "Rare", name: "Charity", chance: "1 in 50", weight: 2 },
    { rarity: "Rare", name: "Neutrality", chance: "1 in 50", weight: 2 },
    { rarity: "Rare", name: "Smartity", chance: "1 in 50", weight: 2 },

    // Epic (4% total weight) -> 0.8% per item -> 1 in 125
    { rarity: "Epic", name: "Happity", chance: "1 in 125", weight: 0.8 },
    { rarity: "Epic", name: "Profitability", chance: "1 in 125", weight: 0.8 },
    { rarity: "Epic", name: "Kirkity", chance: "1 in 125", weight: 0.8 },
    { rarity: "Epic", name: "Antiverity", chance: "1 in 125", weight: 0.8 },
    { rarity: "Epic", name: "Luckity", chance: "1 in 125", weight: 0.8 },

    // Legendary (1% total weight) -> 0.2% per item -> 1 in 500
    { rarity: "Legendary", name: "Wakeity", chance: "1 in 500", weight: 0.2 },
    { rarity: "Legendary", name: "Turnipity", chance: "1 in 500", weight: 0.2 },
    { rarity: "Legendary", name: "P Diddity", chance: "1 in 500", weight: 0.2 },
    { rarity: "Legendary", name: "2salvity", chance: "1 in 500", weight: 0.2 },
    { rarity: "Legendary", name: "Redhotity", chance: "1 in 500", weight: 0.2 },
  ];

  const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  let rolledItem = pool[0];
  for (const item of pool) {
    if (random < item.weight) {
      rolledItem = item;
      break;
    }
    random -= item.weight;
  }

  // Plain text response for StreamElements (under 400 bytes limit)
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(
    `[${rolledItem.rarity}] ${rolledItem.name}! (Chance: ${rolledItem.chance})`
  );
}
