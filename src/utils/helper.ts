// Add at least one export
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// OR if you don't need functions yet:
export {}; // ✅ Empty export statement