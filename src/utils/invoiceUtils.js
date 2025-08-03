

export const calculateInvoice = (cartItems, couponCode = '') => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * 80 * item.quantity, 0);
  const tax = subtotal * 0.05;
  const discount = couponCode === 'avantika25' ? 250 : 0;
  const grandTotal = subtotal + tax - discount;

  return {
    subtotal,
    tax,
    discount,
    grandTotal,
  };
};
