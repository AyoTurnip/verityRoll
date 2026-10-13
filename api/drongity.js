export default function handler(req, res)
{
  const user = req.query.user || "Viewer";

  // tiers
  const TIERS =
  {
    common:    { label: "Common ⚪",    chance: "1 in 5",     weight: 20 },
    uncommon:  { label: "Uncommon 🟢",  chance: "1 in 20",    weight: 5 },
    rare:      { label: "Rare 🔵",      chance: "1 in 50",    weight: 2 },
    epic:      { label: "Epic 🟣",      chance: "1 in 100",   weight: 1 },
    legendary: { label: "Legendary 🟡", chance: "1 in 500",   weight: 0.2 },
    mythic:    { label: "Mythic 🔴",    chance: "1 in 1,000", weight: 0.1 }
  };

  // verity variants
  const rawPool =
    [
      // common
      { tier: "common", name: "Verity" },
      { tier: "common", name: "Falsity" },
      { tier: "common", name: "Lovity" },
      { tier: "common", name: "Curiosity" },
      { tier: "common", name: "Cruelty" },
  
      // uncommon
      { tier: "uncommon", name: "Lovity" },
      { tier: "uncommon", name: "Freakity" },
      { tier: "uncommon", name: "Cuteity" },
      { tier: "uncommon", name: "Obesity" },
      { tier: "uncommon", name: "Moggity" },
      { tier: "uncommon", name: "Neutrality" },
      { tier: "uncommon", name: "Clarity" },
      { tier: "uncommon", name: "Community" },
      { tier: "uncommon", name: "Smartity" },
      { tier: "uncommon", name: "Equality" },
  
      // rare
      { tier: "rare", name: "Spookity" },
      { tier: "rare", name: "Charity" },
      { tier: "rare", name: "Anonymity" },
      { tier: "rare", name: "Rarity" },
      { tier: "rare", name: "Vulnerability" },
      { tier: "rare", name: "Fatality" },
      { tier: "rare", name: "Happity" },
      { tier: "rare", name: "Profitability" },
      { tier: "rare", name: "Antiverity" },
      { tier: "rare", name: "Luckity" },
      { tier: "rare", name: "Cubeity" },
      { tier: "rare", name: "Weirdity" },
      { tier: "rare", name: "Invisibility" },
      { tier: "rare", name: "Gravity" },
      { tier: "rare", name: "Disability" },
  
      // epic
      { tier: "epic", name: "Kirkity" },
      { tier: "epic", name: "Geometrity" },
      { tier: "epic", name: "Sussity" },
      { tier: "epic", name: "Greedity" },
      { tier: "epic", name: "Stupidity" },
      { tier: "epic", name: "Homosexuality" },
      { tier: "epic", name: "Phonkity" },
      { tier: "epic", name: "Israelity" },
      { tier: "epic", name: "Humanity" },
      { tier: "epic", name: "Entity" },
      { tier: "epic", name: "Jerkity" },
      { tier: "epic", name: "Sexuality" },
      { tier: "epic", name: "Larpity" },
      { tier: "epic", name: "Phonkity" },
      { tier: "epic", name: "Burgerity" },
  
      // legendary
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
  
      // mythic
      { tier: "mythic", name: "Drongity" },
      { tier: "mythic", name: "Turnipity" },
      { tier: "mythic", name: "Kadenity" },
      { tier: "mythic", name: "Kermity" },
      { tier: "mythic", name: "Biletity" },
      { tier: "mythic", name: "Dangerity" },
      { tier: "mythic", name: "Juberonity" },
      { tier: "mythic", name: "Arcity" },
      { tier: "mythic", name: "Brian_Cheesity" },
      { tier: "mythic", name: "Cattomoodity" },
      { tier: "mythic", name: "Ordinarity" },
      { tier: "mythic", name: "Starlight Summity" },
      { tier: "mythic", name: "In Thisity" },
      { tier: "mythic", name: "Shardscapity" },
  ];

  // item pool
  const pool = rawPool.map(item => {
    const t = TIERS[item.tier];
    return { tier: item.tier, rarity: t.label, name: item.name, chance: t.chance, weight: t.weight };
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

  // types of verities
  let prefix = "";
  let emoji = "";
  let multiplier = 1;

  const modRoll = Math.random();
  if (modRoll < 0.0001) {
    prefix = "Rainbow ";
    emoji = " 🌈";
    multiplier = 10000;
  } else if (modRoll < 0.001) {
    prefix = "Golden ";
    emoji = " 🌟";
    multiplier = 1000;
  } else if (modRoll < 0.01) {
    prefix = "Shiny ";
    emoji = " ✨";
    multiplier = 100;
  }

  let finalName = prefix + rolledItem.name;
  let finalRarity = rolledItem.rarity + emoji;
  let finalChance = rolledItem.chance;

  // chance text
  if (multiplier > 1) {
    const baseDenom = TIERS[rolledItem.tier].denom;
    const newDenom = baseDenom * multiplier;
    finalChance = `1 in ${newDenom.toLocaleString()}`;
  }

  // streamelements message
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(`${finalName}! [${finalRarity}] (Chance: ${finalChance})`);
}
