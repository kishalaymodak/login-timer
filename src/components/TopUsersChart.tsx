import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopUsersChart() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    async function fetchTopUsers() {
      try {
        const response = await fetch("/api/top-users");
        const data = await response.json();

        // Extract only the first name of each user
        const formattedData = data.map(
          (user: { name: string; totalLoginTime: number }) => ({
            name: user.name.split(" ")[0], // Get first name
            totalLoginTime: user.totalLoginTime,
          })
        );

        setTopUsers(formattedData);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    }

    fetchTopUsers();
  }, []);

  return (
    <div className="p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Top 10 Users by Time Spent</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topUsers}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalLoginTime" fill="#4CAF50" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
