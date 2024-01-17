import React, { useState } from 'react';
import TreeGraph from '../components/TreeGraph';
import axios from 'axios';
import { publicUrl } from '../utils/publicUrl';

const Simulation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [nodes, setNodes] = useState([
    { id: 1, flag: true, position: { left: 218, top: 178 } },
    { id: 2, flag: false, position: { left: 364, top: 182 } },
    { id: 3, flag: true, position: { left: 628, top: 178 } },
    { id: 4, flag: false, position: { left: 525, top: 178 } },
  ]);

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleInputChange = async () => {
    // Find the first node with a true flag
    const nodeToTurnRed = nodes.find((node) => node.flag);

    // If found, set its flag to false
    if (nodeToTurnRed) {
      const updatedNodes = nodes.map((node) =>
        node.id === nodeToTurnRed.id ? { ...node, flag: false } : node,
      );
      setNodes(updatedNodes);
    } else {
      // If no node with a true flag is found, do nothing or handle as needed
      setLoading(true);
      await axios
        .get(`${publicUrl()}admin/sendEmailNotif?email=${input}`)
        .then((res) => {
          console.log(res);
        });
      setLoading(false);
      alert('Email sent to the user');
    }
  };

  return (
    <div className="flex">
      <div className="">
        <TreeGraph nodes={nodes} />
      </div>
      <div className="flex">
        <input type="text" onChange={handleChange} />
        <button
          className="bg-primary p-2 text-white"
          onClick={handleInputChange}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Simulation;
