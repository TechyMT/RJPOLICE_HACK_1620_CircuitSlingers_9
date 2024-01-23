import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableThree';
import { useEffect, useState } from 'react';
import { publicUrl } from '../utils/publicUrl';
import axios from 'axios';
// import { tableData } from '../data/constants';
import { newTableData } from '../data/constants';

const Tables = () => {
  // console.log(newTableData);
  const [packages, setPackages] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`${publicUrl()}/admin/getSortedReports`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        // console.log(response.data);
        // setPackages(response.data);
        setTimeout(() => {
          setPackages(newTableData);
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log('ayyo', packages);
  if (packages) {
    return (
      <>
        <Breadcrumb pageName="Tables" />

        <div className="flex flex-col gap-10">
          <TableThree loading={loading} packages={packages} />
        </div>
      </>
    );
  }
};

export default Tables;
