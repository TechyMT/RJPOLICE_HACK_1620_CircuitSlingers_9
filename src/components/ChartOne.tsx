import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#FC0000'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#FC0000'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}


const ChartOne: React.FC = () => {
  const initialData = {
    month: {
      series: [
        {
          name: 'Case One',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
        {
          name: 'Case Two',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
      ],
      categories: [
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
      ],
    },
    week: {
      series: [
        {
          name: 'Case One',
          data: [10, 15, 8, 20, 18, 12, 15],
        },
        {
          name: 'Case Two',
          data: [8, 12, 10, 18, 15, 9, 13],
        },
      ],
      categories: [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
        'Week 5',
        'Week 6',
        'Week 7',
      ],
    },
    day: {
      series: [
        {
          name: 'Case One',
          data: [5, 3, 7, 6, 8, 4, 9, 5, 6, 7, 4, 6, 8, 10, 12],
        },
        {
          name: 'Case Two',
          data: [4, 6, 5, 8, 7, 3, 6, 4, 5, 6, 3, 5, 7, 9, 10],
        },
      ],
      categories: [
        'Day 1',
        'Day 2',
        'Day 3',
        'Day 4',
        'Day 5',
        'Day 6',
        'Day 7',
        'Day 8',
        'Day 9',
        'Day 10',
        'Day 11',
        'Day 12',
        'Day 13',
        'Day 14',
        'Day 15',
      ],
    },
  };

  const [state, setState] = useState<ChartOneState>({
    series: initialData.month.series,
  });
  
  const handleButtonClick = (dataKey: keyof typeof initialData) => {
    setState({ series: initialData[dataKey].series });
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-9 pt-9 pb-7 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">

        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Completed Cases</p>
              <p className="text-sm font-medium">12.12.2023 - 12.01.2024</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Active Cases</p>
              <p className="text-sm font-medium">12.12.2023 - 12.01.2024</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
      <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
        <button
          className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
          onClick={() => handleButtonClick('day')}
        >
          Day
        </button>
        <button
          className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          onClick={() => handleButtonClick('week')}
        >
          Week
        </button>
        <button
          className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          onClick={() => handleButtonClick('month')}
        >
          Month
        </button>
      </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            options={options}
            type="area"
            height={350}
            categories={initialData.month.categories}
          />
        </div>
      </div>
      </div>

  );
};

export default ChartOne;

