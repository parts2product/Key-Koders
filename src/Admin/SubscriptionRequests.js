import React, { useEffect, useState } from "react";

const SubscriptionRequests = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all subscriptions
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("https://keykoder-backend.onrender.com/api/subscriptions");
      const data = await response.json();
      console.log("Fetched subscriptions:", data); // 🛠️ check field names
      setSubscriptions(data);
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Handle approve/reject action
  const handleAction = async (id, action) => {
    try {
      await fetch(`https://keykoder-backend.onrender.com/api/subscriptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      // ✅ Refetch from DB to update state
      setLoading(true);
      await fetchSubscriptions();
    } catch (err) {
      console.error(`Failed to ${action} subscription`, err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        📋 Subscription Requests
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : subscriptions.length === 0 ? (
        <p className="text-gray-500">No subscription requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium">ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Phone</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Course ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Course Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.map((sub, index) => (
                <tr
                  key={sub.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4">{sub.id}</td>
                  <td className="py-3 px-4">{sub.name}</td>
                  <td className="py-3 px-4">{sub.email}</td>
                  <td className="py-3 px-4">{sub.phone}</td>
                  <td className="py-3 px-4">{sub.courseId}</td>
                  <td className="py-3 px-4">{sub.courseName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        sub.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : sub.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    {sub.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAction(sub.id, "approved")}
                          className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(sub.id, "rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 italic text-sm">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionRequests;
