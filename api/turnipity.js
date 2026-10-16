
export default function handler(req, res) {
  const user = req.query.user || "Viewer";

  // hey it's me it's rarity
  const TIERS = {
    common:    { label: "Common ⚪",    weight: 20 },
    uncommon:  { label: "Uncommon 🟢",  weight: 5 },
    rare:      { label: "Rare 🔵",      weight: 2 },
    epic:      { label: "Epic 🟣",      weight: 1 },
    legendary: { label: "Legendary 🟡", weight: 0.2 },
    mythic:    { label: "Mythic 🔴",    weight: 0.1 }
  };

  // variants
  const rawPool = 
    [
    // common
    { tier: "common", name: "Verity" },
    { tier: "common", name: "Falsity" },
    { tier: "common", name: "Lovity" },
    { tier: "common", name: "Curiosity" },
    { tier: "common", name: "Cruelty" },

    // uncommon
    { tier: "uncommon", name: "Helpity" },
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
    { tier: "epic", name: "Liability" },
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
    { tier: "mythic", name: "Turnipity" },
    { tier: "mythic", name: "Drongity" },
    { tier: "mythic", name: "Kadenity" },
    { tier: "mythic", name: "Kermity" },
    { tier: "mythic", name: "Biletity" },
    { tier: "mythic", name: "Dangerity" },
    { tier: "mythic", name: "Juberonity" },
    { tier: "mythic", name: "Wakeity" },
    { tier: "mythic", name: "Arcity" },
    { tier: "mythic", name: "Bepility" },
    { tier: "mythic", name: "Verdant Landcapity" },
    { tier: "mythic", name: "Rustity" },
    { tier: "mythic", name: "Bloomity" },
    { tier: "mythic", name: "Nhelvity" }
  ];

  // item poll
  const pool = rawPool.map(item => ({
    ...item,
    rarity: TIERS[item.tier].label,
    weight: TIERS[item.tier].weight
  }));

  const totalWeight = pool.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  // roll
  let roll = Math.random() * totalWeight;
  let rolledItem = pool[pool.length - 1];

  for (const item of pool) 
  {
    roll -= item.weight;

    if (roll < 0) 
    {
      rolledItem = item;
      break;
    }
  }

  // variant of variant
  const variants = 
    [
    {
      prefix: "",
      emoji: "",
      multiplier: 1,
      probability: 0.90
    },
    {
      prefix: "Shiny ",
      emoji: " ✨",
      multiplier: 10,
      probability: 0.09
    },
    {
      prefix: "Golden ",
      emoji: " 👑",
      multiplier: 100,
      probability: 0.009
    },
    {
      prefix: "Rainbow ",
      emoji: " 🌈",
      multiplier: 1000,
      probability: 0.001
    }
  ];

  const variantRoll = Math.random();
  let cumulative = 0;
  let variant = variants[variants.length - 1];

  for (const v of variants) 
  {
    cumulative += v.probability;

    if (variantRoll < cumulative) 
    {
      variant = v;
      break;
    }
  }

  // probability
  const itemProbability = rolledItem.weight / totalWeight;
  const finalProbability =
    itemProbability * variant.probability;

  // percentage
  const chance = (finalProbability * 100)
    .toLocaleString("en-US", {
      maximumSignificantDigits: 6
    }) + "%";

  const finalName = variant.prefix + rolledItem.name;
  const finalRarity = rolledItem.rarity + variant.emoji;

  // streamelements response
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(
    `${finalName}! [${finalRarity}] (${chance})`
  );
}
