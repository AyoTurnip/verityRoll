export default function handler(req, res) {
  const user = req.query.user || "Viewer";

  const pool = [
      // Common (50% total weight) -> 10% per item (~1 in 10)
      { rarity: "Common ⚪", name: "Verity", chance: "1 in 10", weight: 10 },
      { rarity: "Common ⚪", name: "Falsity", chance: "1 in 10", weight: 10 },
      { rarity: "Common ⚪", name: "Lovity", chance: "1 in 10", weight: 10 },
      { rarity: "Common ⚪", name: "Curiosity", chance: "1 in 10", weight: 10 },
      { rarity: "Common ⚪", name: "Cruelty", chance: "1 in 10", weight: 10 },
  
      // Uncommon (25% total weight) -> 5% per item (1 in 20)
      { rarity: "Uncommon 🟢", name: "Lovity", chance: "1 in 20", weight: 5 },
      { rarity: "Uncommon 🟢", name: "Freakity", chance: "1 in 20", weight: 5 },
      { rarity: "Uncommon 🟢", name: "Cuteity", chance: "1 in 20", weight: 5 },
      { rarity: "Uncommon 🟢", name: "Obesity", chance: "1 in 20", weight: 5 },
      { rarity: "Uncommon 🟢", name: "Moggity", chance: "1 in 20", weight: 5 },
  
      // Rare (12% total weight) -> 2% per item (1 in 50)
      { rarity: "Rare 🔵", name: "Larpity", chance: "1 in 50", weight: 2 },
      { rarity: "Rare 🔵", name: "Spookity", chance: "1 in 50", weight: 2 },
      { rarity: "Rare 🔵", name: "Charity", chance: "1 in 50", weight: 2 },
      { rarity: "Rare 🔵", name: "Neutrality", chance: "1 in 50", weight: 2 },
      { rarity: "Rare 🔵", name: "Smartity", chance: "1 in 50", weight: 2 },
      { rarity: "Rare 🔵", name: "Clarity", chance: "1 in 50", weight: 2 },
      { rarity: "Rare 🔵", name: "Anonymity", chance: "1 in 50", weight: 2 },
      { rarity: "Rare 🔵", name: "Rarity", chance: "1 in 50", weight: 2 },
  
      // Epic (8% total weight) -> 1% per item (1 in 100)
      { rarity: "Epic 🟣", name: "Happity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Profitability", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Kirkity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Antiverity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Luckity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Cubeity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Weirdity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Geometrity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Sussity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Invisibility", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Greedity", chance: "1 in 100", weight: 1 },
      { rarity: "Epic 🟣", name: "Stupidity", chance: "1 in 100", weight: 1 },
  
      // Legendary (4% total weight) -> 0.2% per item (1 in 500)
      { rarity: "Legendary 🟡", name: "Doggity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Zoinkity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Wpopoffity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Griefity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Heliopolisity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Angelicity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Conixity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Trickity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Bloodbathity", chance: "1 in 500", weight: 0.2 },
      { rarity: "Legendary 🟡", name: "Societity", chance: "1 in 500", weight: 0.2 },
  
      // Mythic (1% total weight) -> 0.1% per item (1 in 1000)
      { rarity: "Mythic 🔴", name: "Wakeity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "Turnipity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "P Diddity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "2salvity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "Redhotity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "Wasuretity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "Sonic Wavity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "Black Blizzardity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "Josh Bukkity", chance: "1 in 1,000", weight: 0.1 },
      { rarity: "Mythic 🔴", name: "CairoXity", chance: "1 in 1,000", weight: 0.1 },
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
    `${rolledItem.name}! [${rolledItem.rarity}] (Chance: ${rolledItem.chance})`
  );
}
