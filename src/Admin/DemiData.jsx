// Generates demo data for Categories and Menu Items
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sampleText = [
  "Classic recipe with fresh ingredients",
  "Spicy & flavorful, customer favorite",
  "Made-to-order with gluten-free option",
  "Signature dish with house sauce",
  "Seasonal special, limited availability",
  "Creamy texture and rich aroma",
  "Topped with fresh herbs and olive oil",
  "Crispy outside, soft inside perfection",
];

const sampleCategories = [
  "Pizzas",
  "Pasta",
  "Salads",
  "Desserts",
  "Starters",
  "Beverages",
  "Sides",
];

const samplePositions = [
  "Top Seller",
  "New Arrival",
  "Chef’s Choice",
  "Limited Edition",
  "Featured",
  "Seasonal Pick",
];

const tiktokHandles = ["@foodlover", "@tastehub", "@yumzone", "@dailydish", "@cheflife"];
const instaHandles = ["@foodiegram", "@delish_corner", "@plate_perfect", "@spoonmagic"];

const makeUUID = (i = 0) =>
  (Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9) + "-" + i).slice(0, 16);

export function generateCategories(count = 34) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      uuid: makeUUID(i),
      name: `${sampleCategories[i % sampleCategories.length]} ${i + 1}`,
      description: sampleText[i % sampleText.length],
      enabled: Math.random() > 0.4,
    });
  }
  return arr;
}

export function generateMenuItems(count = 128) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const category = sampleCategories[i % sampleCategories.length];
    const price = (randInt(300, 2500) / 100).toFixed(2);
    items.push({
      uuid: makeUUID(i),
      name: `${category} Item ${i + 1}`,
      category,
      price,
      description: sampleText[i % sampleText.length],
      tiktok: tiktokHandles[i % tiktokHandles.length],
      insta: instaHandles[i % instaHandles.length],
      position: samplePositions[i % samplePositions.length],
      enabled: Math.random() > 0.45,
    });
  }
  return items;
}
