import { useEffect, useState } from "react";
import { api } from "./api";
import { customers } from "./data";

const Customers = () => {
  const [customerList, setCustomerList] = useState(customers);

  useEffect(() => {
    api.getCustomers().then(setCustomerList).catch(() => setCustomerList(customers));
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {customerList.map((customer) => (
        <div key={customer._id || customer.phone} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-xl font-black text-primary">
            {customer.name.charAt(0)}
          </div>
          <h2 className="mt-5 text-xl font-black text-dark">{customer.name}</h2>
          <div className="mt-3 space-y-2 text-sm font-semibold text-gray-600">
            <p>{customer.phone}</p>
            <p>{customer.address}</p>
          </div>
          <div className="mt-5 rounded-xl bg-cream p-4">
            <div className="text-xs font-black uppercase text-gray-500">Total Orders</div>
            <div className="mt-1 text-2xl font-black text-primary">{customer.totalOrders}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Customers;
