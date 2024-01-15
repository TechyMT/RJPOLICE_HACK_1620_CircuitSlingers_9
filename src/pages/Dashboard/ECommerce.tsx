import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import MapOne from '../../components/MapOne.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WidgetPlaceholder from '../../components/WidgetPlaceholder.tsx';
import { publicUrl } from '../../utils/publicUrl.ts';
import { cardData, chartData } from '../../data/constants.ts';

const ECommerce = () => {
  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // const result = await axios.get(`${publicUrl()}/admin/allDetails`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   params: {
      //     city: 'Pune',
      //   },
      // });
      // console.log(result.data);
      // setData(result.data);
      setData(cardData);

      // const chartResult = await axios.get(`${publicUrl()}/admin/chart-data`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // console.log('chartResult', chartResult.data);
      // setChartData(chartResult.data);
      setChartData(chartData);
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {loading ? (
          <>
            <WidgetPlaceholder />
            <WidgetPlaceholder />
            <WidgetPlaceholder />
            <WidgetPlaceholder />
          </>
        ) : (
          data && (
            <>
              <CardOne data={data} />
              <CardTwo data={data} />
              <CardThree data={data} />
              <CardFour data={data} />
            </>
          )
        )}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {loading ? (
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-9 pt-9 pb-7 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
            <WidgetPlaceholder />
          </div>
        ) : (
          chartData && (
            <>
              <ChartOne data={chartData} />
            </>
          )
        )}
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8"></div>
      </div>
    </>
  );
};

export default ECommerce;
