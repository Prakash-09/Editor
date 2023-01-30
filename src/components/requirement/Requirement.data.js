module.exports.EDITOR_DATA = `import React from 'react';
import Chart from 'react-apexcharts';
import 'bootstrap/dist/css/bootstrap.css';

export default class Trend extends React.Component{
    constructor (props){
        super(props);

        this.state= {
            apiData: {
                "category": "Foregone Savings",
                "amount": "888",
                "data": [ 10, 13, 14, 14, 12 ],
                "chartData": {
                    "series": [
                        {
                            "name": "Desktops",
                            "data": [ 10, 13, 14, 14, 12 ]
                        }
                    ],
                    "options": {
                        "chart": {
                            "sparkline": { "enabled": true },
                            "type": "line",
                            "zoom": { "enabled": false }
                        },
                        "colors": [ "#313649" ],
                        "labels": [],
                        "dataLabels": { "enabled": false },
                        "stroke": { "curve": "straight" },
                        "markers": { "size": 10 },
                        "xaxis": {
                            "categories": [ "2018", "2019", "2020", "2021", "2022" ],
                            "convertedCatToNumeric": true
                        }
                    }
                }
            }
        }
    }
    render(){
        const {apiData,line} = this.state;
        return(
            <div className='yearly-trend-container align-items-center'>
                <div className='text-dark' style={{ width: '30%' }}>{apiData.category}</div>
                <div className='text-dark font-weight-bold'>\${apiData.amount}</div>
                <Chart options={apiData.chartData.options} series={apiData.chartData.series} type={'line'} width={170} height={45} />
            </div>
        )
    }
}`