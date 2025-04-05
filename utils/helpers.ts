// Format number as INR currency
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  
  // Format date to readable string
  export const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };
  
  // Generate unique ride ID (simple example)
  export const generateRideId = (): string => {
    return 'RIDE-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };
  
  // Capitalize first letter of a word
  export const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  