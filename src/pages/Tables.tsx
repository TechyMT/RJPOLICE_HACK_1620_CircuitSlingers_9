import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableThree';
import { useEffect, useState } from 'react';
import { publicUrl } from '../utils/publicUrl';
import axios from 'axios';

const Tables = () => {
  const [packages, setPackages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${publicUrl()}/admin/allStatus`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableThree packages={packages} loading={loading} />
      </div>
    </>
  );
};

export default Tables;
