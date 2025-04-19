import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const MotherFetusGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Mother's Weight" />
        <Line type="monotone" dataKey="fetal_height" stroke="#82ca9d" name="Fetal Height" />
        <Line type="monotone" dataKey="heart_rate" stroke="#ffc658" name="Kid's Heart Rate" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MotherFetusGraph;
