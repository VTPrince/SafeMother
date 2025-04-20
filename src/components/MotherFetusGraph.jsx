import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const MotherFetusGraph = ({ data, lineKey }) => {
  return (
    <ResponsiveContainer width={500} height={200}>
      <LineChart data={data}>
        <CartesianGrid/>
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={lineKey} stroke="#8884d8" name={lineKey} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MotherFetusGraph;
