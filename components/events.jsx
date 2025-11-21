const getAvailableEvents = () => {
  const currentDate = new Date();
  
  // All events with their details and expiry dates
  const allEvents = [
    {
      id: 1,
      name: "The Annual General Meeting",
      price: 0,
      type: "free",
      expiryDate: new Date("2025-11-28"), // Expires after November 28, 2025
    },
    {
      id: 2,
      name: "National Youth Explosion",
      price: 1500,
      type: "paid",
      expiryDate: new Date("2025-12-13"), // Expires after December 13, 2025
    },
  ];

  // Filter events that haven't expired yet
  const availableEvents = allEvents.filter((event) => {
    return currentDate <= event.expiryDate;
  });

  return availableEvents;
};

export default getAvailableEvents;
