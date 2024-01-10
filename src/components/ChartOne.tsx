import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { initialData } from '../data/constants';

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
  month: {
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[];
  };
  week: {
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[];
  };
  day: {
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[];
  };
  [key: string]: {
    series: { name: string; data: number[] }[];
    categories: string[];
  };
}

const ChartOne: React.FC = () => {
  const [selected, setSelected] = useState('day');
  const [state, setState] = useState<ChartOneState>({
    month: {
      series: [],
      categories: [],
    },
    week: {
      series: [],
      categories: [],
    },
    day: {
      series: [],
      categories: [],
    },
  });
  const [chartOptions, setChartOptions] = useState<ApexOptions>(options);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace YOUR_BACKEND_API_ENDPOINT with the actual endpoint
        // const response = await fetch(`YOUR_BACKEND_API_ENDPOINT/${selected}`);
        // const data = await response.json();

        setState(initialData);

        const maxDataValue = Math.max(
          ...initialData[selected].series.flatMap((serie) => serie.data),
        );

        // Update chart options
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: {
            ...prevOptions.yaxis,
            max: Math.ceil(maxDataValue / 10) * 10, // Round up to the nearest 10
          },
          xaxis: {
            type: 'category',
            categories: initialData[selected].categories,
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selected]);

  const handleButtonClick = (dataKey: keyof ChartOneState) => {
    setSelected(dataKey as string);
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
            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card  dark:text-white dark:hover:bg-boxdark ${
              selected === 'day' && 'bg-white shadow-card dark:bg-boxdark'
            }`}
            onClick={() => handleButtonClick('day')}
          >
            Day
          </button>
          <button
            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card  dark:text-white dark:hover:bg-boxdark ${
              selected === 'week' ? 'bg-white shadow-card dark:bg-boxdark' : ''
            }`}
            onClick={() => handleButtonClick('week')}
          >
            Week
          </button>

          <button
            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
              selected === 'month' && 'bg-white shadow-card dark:bg-boxdark'
            }`}
            onClick={() => handleButtonClick('month')}
          >
            Month
          </button>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={chartOptions}
            series={state[selected].series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
