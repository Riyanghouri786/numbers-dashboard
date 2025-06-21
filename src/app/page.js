'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const res = await fetch('/api/numbers');
        const data = await res.json();
        setNumbers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching numbers:', error);
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []);

  const total = numbers.length;
  const lastNumber = total > 0 ? numbers[0].number : '-';
  const lastDate =
    total > 0 ? new Date(numbers[0].createdAt).toLocaleString() : '-';

  const copyAll = () => {
  const allNumbers = numbers.map((n) => `+${n.number}`).join(', ');
  navigator.clipboard.writeText(allNumbers);
  toast.success('✅ All numbers copied');
};


  const copySingle = (number) => {
    navigator.clipboard.writeText(number);
    toast.success(`Copied: ${number}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <motion.h1
        className="text-4xl font-extrabold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📊 WhatsApp Checker Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card title="Total Numbers" value={total} color="text-green-600" icon="📱" />
        <Card title="Last Added Number" value={lastNumber} color="text-blue-600" icon="📞" />
        <Card title="Last Saved Date" value={lastDate} color="text-purple-600" icon="🕒" />
      </motion.div>

      {/* Copy All Button */}
      <motion.div
        className="mb-4 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={copyAll}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          📋 Copy All Numbers
        </button>
      </motion.div>

      {/* Data Table */}
      <motion.div
        className="bg-white rounded-xl shadow overflow-x-auto border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        ) : numbers.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No numbers found.</p>
        ) : (
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Phone Number</th>
                <th className="py-3 px-4 text-left">Date Saved</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {numbers.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 font-mono text-green-700">{item.number}</td>
                  <td className="py-2 px-4 text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => copySingle(item.number)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}

function Card({ title, value, color, icon }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
        </div>
      </div>
    </motion.div>
  );
}
