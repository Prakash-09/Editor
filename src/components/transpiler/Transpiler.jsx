import React from 'react';
import { Row, Col } from 'reactstrap';
// import { Sandpack } from "@codesandbox/sandpack-react";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
} from "@codesandbox/sandpack-react";

import './Transpiler.css';

export default class Transpiler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rawJsx: ``,
            output: `import React from 'react';
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
        }
    }

    componentDidMount() {
        console.log('process.env', process.env)
    }

    action() {
        let { rawJsx } = this.state;

        this.setState({ output: rawJsx })
    }

    render() {
        const { rawJsx, output } = this.state;
        return (
            <div className='transformer-container p-3'>
                {/* <Row>
                    <Col>
                        <textarea name="rawJsx" value={rawJsx} onChange={(e) => this.setState({ rawJsx: e.target.value })} />
                    </Col>
                </Row>
                <Row>
                    <Col className='text-right'>
                        <button onClick={this.action.bind(this, "text", "test")} className={'btn btn-sm btn-round btn-primary'} >
                            <span className={'px-1'}>{'Submit'}</span>
                        </button>
                    </Col>
                </Row> */}
                {/* <div id="test-tag"></div> */}
                <Row className='mt-2'>
                    <Col>
                        {/* <textarea name="output" value={JSON.stringify(output, undefined, 4)} onChange={(e) => this.setState({ output: e.target.value })} /> */}
                        {/* <div className="Container" dangerouslySetInnerHTML={{ __html: output }}></div> */}
                        {/** {!output &&
                            <Sandpack
                                template="react"
                            />} */}
                        {output &&
                            <SandpackProvider template="react" files={{ "/App.js": output }}
                                customSetup={{
                                    dependencies: {
                                        "apexcharts": "^3.36.3",
                                        "bootstrap": "^4.6.1",
                                        "react-apexcharts": "^1.4.0",
                                    }
                                }}
                            >
                                <SandpackLayout>
                                    <SandpackCodeEditor />
                                    <SandpackPreview />
                                </SandpackLayout>
                            </SandpackProvider>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}