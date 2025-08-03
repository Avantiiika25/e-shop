
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaEnvelope } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// Utility function to calculate totals
import { calculateInvoice } from '../utils/invoiceUtils';

const SuccessPage = () => {
  const location = useLocation();
  const { cartItems = [], couponCode = '' } = location.state || {};          // Getting order details

  const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;               // Generate unique order ID and delivery date
  const deliveryDate = new Date(Date.now() + 3 * 86400000).toDateString();

  const customer = {
    // Dummmy customer details (can be dynamic in real)
    name: 'Avantika Gondal',
    phone: '9876543210',
    email: 'avantika@example.com',
    address: '202, Hadapsar, Pune, Maharashtra, 411001',
  };

  // Calculate invoice values using cart and coupon
  const { subtotal, tax, discount, grandTotal } = calculateInvoice(cartItems, couponCode);

  //handel pdf generation
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Tax Invoice', 14, 15);

    doc.setFontSize(12);
    doc.text(`Invoice No: INV-${Date.now()}`, 14, 25);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 32);
    doc.text(`Order ID: ${orderId}`, 14, 39);

    doc.text('Seller:', 14, 50);
    doc.text('E-Shop Pvt. Ltd.', 14, 55);
    doc.text('Mumbai, MH - 400001', 14, 60);
    doc.text('GSTIN: 27AAHCE1234A1Z5', 14, 65);

    doc.text('Customer:', 120, 50);
    doc.text(customer.name, 120, 55);
    doc.text(customer.address, 120, 60);
    doc.text(`Phone: ${customer.phone}`, 120, 65);

    const tableData = cartItems.map(item => {
      const unitPrice = item.price * 80;
      const total = unitPrice * item.quantity;
      return [
        item.title,
        `Qty: ${item.quantity}`,
        item.quantity,
        `₹${unitPrice.toFixed(0)}`,
        '₹0',
        '5%',
        `₹${total.toFixed(0)}`
      ];
    });

    autoTable(doc, {
      head: [['Item', 'Description', 'Qty', 'Unit Price', 'Discount', 'Tax', 'Total']],
      body: tableData,
      startY: 75,
    });

    const finalY = doc.lastAutoTable.finalY;
    doc.text(`Subtotal: ₹${subtotal.toFixed(0)}`, 14, finalY + 10);
    doc.text(`Tax (5%): ₹${tax.toFixed(0)}`, 14, finalY + 16);
    doc.text(`Discount: -₹${discount}`, 14, finalY + 22);
    doc.text(`Grand Total: ₹${grandTotal.toFixed(0)}`, 14, finalY + 28);
    doc.text(`Payment: ${location.state?.paymentMethod || 'Online'}`, 14, finalY + 34);
    doc.text(`Delivery by: ${deliveryDate}`, 14, finalY + 40);

    doc.save(`invoice-${orderId}.pdf`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-10 animate-fadeIn bg-[#F5EBDD]">
      <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
      <h2 className="text-3xl font-bold text-[#6C3428] mb-1">Thank You, Avantika!</h2>
      <p className="text-[#BA704F] mb-6 text-lg">Your order has been placed successfully.</p>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4 animate-slideUp">
        <p><strong>Order ID:</strong> <span className="text-[#DFA878]">{orderId}</span></p>
        <p><strong>Estimated Delivery:</strong> <span className="text-green-600">{deliveryDate}</span></p>
        <p className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <FaEnvelope className="text-[#6C3428]" /> Confirmation email sent to <strong>{customer.email}</strong>
        </p>
        <div className="text-left text-sm text-gray-700">
          <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(0)}</p>
          <p><strong>Tax (5%):</strong> ₹{tax.toFixed(0)}</p>
          <p className="text-green-600"><strong>Discount:</strong> -₹{discount}</p>
          <p className="text-lg font-semibold text-[#6C3428]">Grand Total: ₹{grandTotal.toFixed(0)}</p>
        </div>
        <button
          onClick={generatePDF}
          className="flex items-center justify-center gap-2 bg-[#BA704F] hover:bg-[#6C3428] text-white px-4 py-2 rounded-full w-full"
        >
          <FaDownload /> Download Invoice
        </button>
      </div>

      <div className="mt-6">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-boy-with-parcel-4584717-3822391.png"
          alt="Delivery Cartoon"
          className="w-72 h-auto animate-pulse"
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>

      <Link
        to="/"
        className="mt-6 inline-block bg-[#BA704F] text-white px-6 py-3 rounded-full hover:bg-[#6C3428] transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default SuccessPage;
