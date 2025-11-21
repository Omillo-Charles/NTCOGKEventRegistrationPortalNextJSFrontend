const churchesByRegion = {
  "Western Region": [
    "Busia Possibility Center",
    "Busia Restoration Center",
    "Christ Blessing Center Busia",
    "Oyato Praise Center",
    "Shiloh Worship Center"
  ],
  "Nairobi Region": [
    "Nairobi International Church",
    "Agape Restoration Center",
  ],
};

// Get all regions that have churches
export const getRegionsWithChurches = () => {
  return Object.keys(churchesByRegion);
};

// Get churches for a specific region
export const getChurchesByRegion = (region) => {
  return churchesByRegion[region] || [];
};

export default churchesByRegion;
