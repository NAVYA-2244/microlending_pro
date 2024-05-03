import React from 'react';
import ReactApexChart from 'react-apexcharts';

class MonochromePieChart extends React.Component {
    // Define randomOptions as a class property


    constructor(props) {
        super(props);
        this.state = {
            series: [6, 8, 1, 4],
            options: {
                chart: {
                    width: '100%',
                    type: 'pie',
                },
                labels: ["good", "excellent", "bad", "fair"],
                colors: ["#4b49ac", "#49ac7c", "#ac4979", "#4979ac"],
                plotOptions: {
                    pie: {
                        dataLabels: {
                            offset: -5
                        }
                    }
                },
                dataLabels: {
                    formatter(val, opts) {
                        const seriesVal = opts.w.globals.series[opts.seriesIndex];
                        const name = opts.w.config.labels[opts.seriesIndex];
                        let randomOptions = [8, 10, 4, 6];
                        return [name, `${seriesVal} - ${randomOptions[opts.seriesIndex]}`];
                    }
                },
                legend: {
                    show: false
                },
            }
        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" />
            </div>
        );
    }
}

export default MonochromePieChart;
