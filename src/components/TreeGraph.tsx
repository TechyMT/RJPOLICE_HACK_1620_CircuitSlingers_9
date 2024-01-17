import React from 'react';
import Avatar from '../images/user/avatar.jpg';
const TreeGraph = ({ nodes }: { nodes: any[] }) => {
  return (
    <div className="absolute -mb-48 top-4 ml-20">
      {nodes.map((node, index) => (
        <div
          key={node.id}
          className={`w-[78px] h-[84px] absolute rounded-2xl bg-${
            node.flag ? 'meta-3' : 'secondary'
          }`}
          style={{
            left: node.position.left,
            right: node.position.right,
            top: node.position.top,
          }}
        >
          <img
            src={Avatar}
            className="w-10 h-10 flex items-center justify-center mx-auto mt-4 rounded-full"
          />
          <div className="flex justify-center text-white">
            Police {index + 1}
          </div>
        </div>
      ))}
      <div
        className={`w-[78px] h-[84px] bg-primary absolute top-[540px] left-[510px]`}
      >
        {' '}
        <div className='flex items-center mx-auto my-auto'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            className="w-12 h-12 items-center mx-auto mt-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
        </div>
      </div>
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
