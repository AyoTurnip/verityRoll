export default function handler(req, res)
{
  const user = req.query.user || "Viewer";

  // --- EASILY ADJUST CHANCES & WEIGHTS HERE ---
  const TIERS =
  {
    common:    { label: "Common ⚪",    chance: "1 in 5",     weight: 20 },
    uncommon:  { label: "Uncommon 🟢",  chance: "1 in 20",    weight: 5 },
    rare:      { label: "Rare 🔵",      chance: "1 in 50",    weight: 2 },
    epic:      { label: "Epic 🟣",      chance: "1 in 100",   weight: 1 },
    legendary: { label: "Legendary 🟡", chance: "1 in 500",   weight: 0.2 },
    mythic:    { label: "Mythic 🔴",    chance: "1 in 1,000", weight: 0.1 }
  };

  // --- ITEM LIST (Only tier and name are needed now!) ---
  const rawPool =
    [
      // Common
      { tier: "common", name: "Verity" },
      { tier: "common", name: "Falsity" },
      { tier: "common", name: "Lovity" },
      { tier: "common", name: "Curiosity" },
      { tier: "common", name: "Cruelty" },
  
      // Uncommon
      { tier: "uncommon", name: "Lovity" },
      { tier: "uncommon", name: "Freakity" },
      { tier: "uncommon", name: "Cuteity" },
      { tier: "uncommon", name: "Obesity" },
      { tier: "uncommon", name: "Moggity" },
  
      // Rare
      { tier: "rare", name: "Larpity" },
      { tier: "rare", name: "Spookity" },
      { tier: "rare", name: "Charity" },
      { tier: "rare", name: "Neutrality" },
      { tier: "rare", name: "Smartity" },
      { tier: "rare", name: "Clarity" },
      { tier: "rare", name: "Anonymity" },
      { tier: "rare", name: "Rarity" },
  
      // Epic
      { tier: "epic", name: "Happity" },
      { tier: "epic", name: "Profitability" },
      { tier: "epic", name: "Kirkity" },
      { tier: "epic", name: "Antiverity" },
      { tier: "epic", name: "Luckity" },
      { tier: "epic", name: "Cubeity" },
      { tier: "epic", name: "Weirdity" },
      { tier: "epic", name: "Geometrity" },
      { tier: "epic", name: "Sussity" },
      { tier: "epic", name: "Invisibility" },
      { tier: "epic", name: "Greedity" },
      { tier: "epic", name: "Stupidity" },
  
      // Legendary
      { tier: "legendary", name: "Doggity" },
      { tier: "legendary", name: "Zoinkity" },
      { tier: "legendary", name: "Wpopoffity" },
      { tier: "legendary", name: "Griefity" },
      { tier: "legendary", name: "Heliopolisity" },
      { tier: "legendary", name: "Angelicity" },
      { tier: "legendary", name: "Conixity" },
      { tier: "legendary", name: "Trickity" },
      { tier: "legendary", name: "Bloodbathity" },
      { tier: "legendary", name: "Societity" },
  
      // Mythic
      { tier: "mythic", name: "Wakeity" },
      { tier: "mythic", name: "Turnipity" },
      { tier: "mythic", name: "P Diddity" },
      { tier: "mythic", name: "2salvity" },
      { tier: "mythic", name: "Redhotity" },
      { tier: "mythic", name: "Wasurarity" },
      { tier: "mythic", name: "Sonic Wavity" },
      { tier: "mythic", name: "Black Blizzardity" },
      { tier: "mythic", name: "Josh Bukkity" },
      { tier: "mythic", name: "CairoXity" },
  ];

  // Automatically builds the full item pool using your settings above
  const pool = rawPool.map(item =>
  {
    const t = TIERS[item.tier];
    return { rarity: t.label, name: item.name, chance: t.chance, weight: t.weight };
  });

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
  res.status(200).send(`${rolledItem.name}! [${rolledItem.rarity}] (Chance: ${rolledItem.chance})`
  );
}
