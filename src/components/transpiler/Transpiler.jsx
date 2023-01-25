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
            output: undefined
        }
    }

    action() {
        let { rawJsx } = this.state;

        this.setState({ output: rawJsx })
    }

    render() {
        const { rawJsx, output } = this.state;
        return (
            <div className='transformer-container p-3'>
                <Row>
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
                </Row><div id="test-tag"></div>
                <Row className='mt-2'>
                    <Col>
                        {/* <textarea name="output" value={JSON.stringify(output, undefined, 4)} onChange={(e) => this.setState({ output: e.target.value })} /> */}
                        {/* <div className="Container" dangerouslySetInnerHTML={{ __html: output }}></div> */}
                        {/** {!output &&
                            <Sandpack
                                template="react"
                            />} */}
                        {output &&
                            <SandpackProvider template="react" files={{ "/App.js": output }}>
                                <SandpackLayout>
                                    {/* <SandpackCodeEditor /> */}
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