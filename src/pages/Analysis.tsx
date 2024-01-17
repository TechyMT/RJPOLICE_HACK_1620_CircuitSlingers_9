import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { publicUrl } from '../utils/publicUrl';
import TablePlaceholder from '../components/TablePlaceholder';

type Product = {
  name: string;
  color: string;
  category: string;
  price: string;
};

const Analysis: React.FC = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`${publicUrl()}/admin/getAllAnalysis`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(data);
        setTableData(data.data);
        setIsLoading(false);
      } catch (error: any) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Message Number
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
            <th scope="col" className="px-6 py-3">
              Analysis
            </th>
          </tr>
        </thead>
        {tableData ? (
          <tbody>
            {tableData.map((data: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{data.category}</td>
                <td className="px-6 py-4">{data.message}</td>
                <td className="px-6 py-4">{data.analysis}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                colSpan={4}
              >
                <TablePlaceholder />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Analysis;
