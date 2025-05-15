import React from 'react'
import ReactApexChart from "react-apexcharts";

const ChartVolume = () => {
    const data = {
        series: [{
            data: [210, 280, 1000, 850, 523, 759, 353]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                    }
                },
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            axisPointer: {
                show: false,
            },
            colors: ["#000000"],
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
            },
            xaxis: {
                categories: [
                    ['Sun'],
                    ['Mon'],
                    ['Tue'],
                    ['Wed'],
                    ['Tue'],
                    ['Fri'],
                    ['Sun'],
                ],
                labels: {
                    style: {
                        colors: ["#000000"],
                        fontSize: '12px'
                    }
                }
            },
            tooltip: {
                enabled: false, // Set to false to disable the tooltip on hover
            },
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={data?.options} series={data?.series} type="bar" height={350} />
        </div>
    )
}

export default ChartVolume
