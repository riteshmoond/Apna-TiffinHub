const StatusBadge = ({ status }) => {
  const classes = {
    Pending: "bg-amber-100 text-amber-700",
    Preparing: "bg-blue-100 text-blue-700",
    "Out for Delivery": "bg-violet-100 text-violet-700",
    Delivered: "bg-emerald-100 text-emerald-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${classes[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
