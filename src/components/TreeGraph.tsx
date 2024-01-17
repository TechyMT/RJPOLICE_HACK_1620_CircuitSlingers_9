import React from 'react';

const TreeGraph = ({ nodes }: { nodes: any[] }) => {
  return (
    <div className="absolute -mb-48 top-4 ml-20">
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`w-[78px] h-[84px] absolute rounded-3xl bg-${
            node.flag ? 'meta-3' : 'secondary'
          }`}
          style={{
            left: node.position.left,
            right: node.position.right,
            top: node.position.top,
          }}
        ></div>
      ))}
      <div
        className={`w-[78px] h-[84px] bg-primary absolute top-[540px] left-[510px]`}
      ></div>
      {/* Add other lines or connections between nodes if needed */}
      <div className="w-[315px] h-[0px] left-[540px] top-[544px] absolute origin-top-left -rotate-[64deg] border border-black"></div>
      <div className="w-[285px] h-[0px] left-[540px] top-[544px] absolute origin-top-left -rotate-[85deg] border border-black"></div>
      <div className="w-[315px] h-[0px] left-[390px] top-[264px] absolute origin-top-left rotate-[62deg] border border-black"></div>
      <div className="w-[397.92px] h-[0px] left-[257px] top-[262px] absolute origin-top-left rotate-45 border border-black"></div>
      <div className="w-[405.92px] h-[0px] right-[157px] top-[447px] absolute origin-top-left -rotate-45 border border-black"></div>
    </div>
  );
};

export default TreeGraph;
