/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { hierarchyData } from './mockData';

const CompanyHierarchy: React.FC = () => {
  return (
    <div className="py-2 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Company Hierarchy</h2>
        <div className="flex justify-center relative">
          <HierarchyNode node={hierarchyData.admin} />
        </div>
      </div>
    </div>
  );
}

interface HierarchyNode {
  name: string;
  role: string;
  profilePicture: string;
  children?: HierarchyNode[];
}

const HierarchyNode: React.FC<{ node: any }> = ({ node }) => {
  return (
    <div className="relative bg-white shadow-md rounded p-4 m-5 text-center">
      <img
        src={node.profilePicture}
        alt={`${node.name}'s profile`}
        className="w-12 h-12 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold">{node.name}</h3>
      <p className="text-gray-500">{node.role}</p>
      {node.children && (
        <div className="flex justify-center mt-8 relative">
          <div className="absolute top-0 left-1/2 w-px h-4 bg-gray-300"></div>
          <div className="absolute top-4 left-0 w-full h-px bg-gray-300"></div>
          <div className="flex justify-center w-full">
            {node.children.map((child: any, index: number) => (
              <div key={index} className="relative flex-1">
                <div className="absolute top-0 left-1/2 w-px h-4 bg-gray-300"></div>
                <HierarchyNode node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyHierarchy;
