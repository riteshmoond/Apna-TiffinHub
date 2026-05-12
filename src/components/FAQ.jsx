import React from "react";

const faqs = [
  {
    q: "Delivery kis area me hoti hai?",
    a: "Jaipur ke major areas jaise Mansarovar, Vaishali Nagar, PG zones, aur offices me delivery available hai.",
  },
  {
    q: "Payment kaise kar sakte hain?",
    a: "Cash on delivery, UPI, aur online payment options available hain.",
  },
  {
    q: "Subscription cancel ya pause kaise karein?",
    a: "WhatsApp par message karke aap apna plan pause/cancel kar sakte hain.",
  },
  {
    q: "Food hygienic hai?",
    a: "Bilkul! Daily fresh ingredients aur hygienic kitchen me khana banta hai.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-orange/5">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-dark mb-10">FAQ</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 border-l-4 border-orange">
              <div className="font-semibold text-orange mb-2">Q. {faq.q}</div>
              <div className="text-green-dark">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
