import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const chartData = {
    series: [
        {
            name: "TEAM A",
            type: "area",
            data: [2, 0, 2, 2],
        }
    ],
    options: {
        stroke: {
          width: [2],
          curve: "smooth",
        },
        fill: {
          opacity: [0.35],
        },
        labels: ["2003-08-25", "2003-08-26", "2003-08-27", "2003-08-28"],
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title: {
            text: "Points",
          },
          min: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y: any) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            },
          },
        },
    }
};

const AreaChart = () => {

  return (
    <div className="app">
        <div className="row">
            <div className="mixed-chart">
            {
                (typeof window !== undefined) &&
                <Chart
                    // options={chartData.options}
                    series={chartData.series}
                    type="line"
                    width="500"
                />
            }
            </div>
        </div>
    </div>
  )
}

export default AreaChart;