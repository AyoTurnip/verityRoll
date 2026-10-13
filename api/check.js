export default function handler(req, res) {
  const user = req.query.user || "Viewer";

  const pool = [
      // Common (Total weight: 2 -> 1 in 5 chance overall)
      { rarity: "Common ⚪", name: "Verity", chance: "1 in 25", weight: 0.4 },
      { rarity: "Common ⚪", name: "Falsity", chance: "1 in 25", weight: 0.4 },
      { rarity: "Common ⚪", name: "Lovity", chance: "1 in 25", weight: 0.4 },
      { rarity: "Common ⚪", name: "Curiosity", chance: "1 in 25", weight: 0.4 },
      { rarity: "Common ⚪", name: "Cruelty", chance: "1 in 25", weight: 0.4 },
  
      // Uncommon (Total weight: 0.4 -> 1 in 25 chance overall)
      { rarity: "Uncommon 🟢", name: "Lovity", chance: "1 in 125", weight: 0.08 },
      { rarity: "Uncommon 🟢", name: "Freakity", chance: "1 in 125", weight: 0.08 },
      { rarity: "Uncommon 🟢", name: "Cuteity", chance: "1 in 125", weight: 0.08 },
      { rarity: "Uncommon 🟢", name: "Obesity", chance: "1 in 125", weight: 0.08 },
      { rarity: "Uncommon 🟢", name: "Moggity", chance: "1 in 125", weight: 0.08 },
  
      // Rare (Total weight: 0.1 -> 1 in 100 chance overall)
      { rarity: "Rare 🔵", name: "Larpity", chance: "1 in 800", weight: 0.0125 },
      { rarity: "Rare 🔵", name: "Spookity", chance: "1 in 800", weight: 0.0125 },
      { rarity: "Rare 🔵", name: "Charity", chance: "1 in 800", weight: 0.0125 },
      { rarity: "Rare 🔵", name: "Neutrality", chance: "1 in 800", weight: 0.0125 },
      { rarity: "Rare 🔵", name: "Smartity", chance: "1 in 800", weight: 0.0125 },
      { rarity: "Rare 🔵", name: "Clarity", chance: "1 in 800", weight: 0.0125 },
      { rarity: "Rare 🔵", name: "Anonymity", chance: "1 in 800", weight: 0.0125 },
      { rarity: "Rare 🔵", name: "Rarity", chance: "1 in 800", weight: 0.0125 },
  
      // Epic (Total weight: 0.01 -> 1 in 1,000 chance overall)
      { rarity: "Epic 🟣", name: "Happity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Profitability", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Kirkity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Antiverity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Luckity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Cubeity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Weirdity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Geometrity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Sussity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Invisibility", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Greedity", chance: "1 in 12,000", weight: 0.0008333 },
      { rarity: "Epic 🟣", name: "Stupidity", chance: "1 in 12,000", weight: 0.0008333 },
  
      // Legendary (Total weight: 0.001 -> 1 in 10,000 chance overall)
      { rarity: "Legendary 🟡", name: "Doggity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Zoinkity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Wpopoffity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Griefity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Heliopolisity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Angelicity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Conixity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Trickity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Bloodbathity", chance: "1 in 100,000", weight: 0.0001 },
      { rarity: "Legendary 🟡", name: "Societity", chance: "1 in 100,000", weight: 0.0001 },
  
      // Mythic (Total weight: 0.0001 -> 1 in 100,000 chance overall)
      { rarity: "Mythic 🔴", name: "Wakeity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "Turnipity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "P Diddity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "2salvity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "Redhotity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "Wasurarity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "Sonic Wavity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "Black Blizzardity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "Josh Bukkity", chance: "1 in 1,000,000", weight: 0.00001 },
      { rarity: "Mythic 🔴", name: "CairoXity", chance: "1 in 1,000,000", weight: 0.00001 },
    ];

  const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  let rolledItem = pool[0];
  for (const item of pool)
  {
    if (random < item.weight)
    {
      rolledItem = item;
      break;
    }
    random -= item.weight;
  }

  // Plain text response for StreamElements (under 400 bytes limit)
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(`${user} rolled ${rolledItem.name}! [${rolledItem.rarity}] (Chance: ${rolledItem.chance})`
  );
}
