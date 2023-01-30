import React from 'react';
import { Row, Col } from 'reactstrap';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";

import { EDITOR_DATA } from './Requirement.data';

import './Requirement.css';

export default class Requirement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            renderLayout: 0,
            input: ''
        }
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    action(mode) {
        let editorData = JSON.parse(JSON.stringify(EDITOR_DATA));

        this.setState({ mode: mode, renderLayout: 1, output: (mode === 'CONFIGURE' ? editorData : undefined) })
    }

    renderSandpackPreview() {
        const { output } = this.state;
        return (
            <SandpackProvider template="react" files={{ "/App.js": output }}
                options={{
                    previewHeight: 450,
                    classes: {
                        "sp-stack": "custom-sp-preview"
                    },
                }}
                customSetup={{
                    dependencies: {
                        "apexcharts": "^3.36.3",
                        "bootstrap": "^4.6.1",
                        "react-apexcharts": "^1.4.0",
                    }
                }}
            >
                <SandpackLayout>
                    <SandpackPreview />
                </SandpackLayout>
            </SandpackProvider>
        )
    }

    render() {
        const { loading, renderLayout, mode, input, output } = this.state;
        return (
            <section>
                {loading && <h5 className='text-center'>Loading...</h5>}
                {(!loading && renderLayout === 0) && < div className='text-left'>
                    <button onClick={this.action.bind(this, 'DESIGN')} className={'btn btn-sm btn-round btn-primary m-2'} >
                        <span className={'px-1'}>{'Design'}</span>
                    </button>
                    <button onClick={this.action.bind(this, 'CONFIGURE')} className={'btn btn-sm btn-round btn-primary'} >
                        <span className={'px-1'}>{'Configure'}</span>
                    </button>
                </div>}
                {(!loading && renderLayout === 1) &&
                    <div className='p-2 text-left'>
                        <div className='text-right pb-2'>
                            <button onClick={() => { this.setState({ mode: undefined, renderLayout: 0, input: '', output: undefined }) }} className={'btn btn-sm btn-round btn-warning'} >
                                <span className={'px-1'}>{'Cancel'}</span>
                            </button>
                        </div>
                        {mode === 'DESIGN' && <Row>
                            <Col>
                                <h5>Editor</h5>
                                <textarea
                                    className='w-100'
                                    name='editor'
                                    rows={'20'}
                                    value={input}
                                    onChange={(e) => { this.setState({ input: e.target.value }) }}
                                />
                            </Col>
                            <Col xs='auto' className='h-auto action-btn-container'>
                                <button onClick={() => { this.setState({ output: input }) }} className={'btn btn-sm btn-round btn-primary'} >
                                    <span className={'px-1'}>{'Submit'}</span>
                                </button>
                            </Col>
                            <Col>
                                <h5>Preview</h5>
                                {!output && <textarea className='w-100' rows={'20'} />}
                                {output && this.renderSandpackPreview()}
                            </Col>
                        </Row>}
                        {mode === 'CONFIGURE' && <div>{this.renderSandpackPreview()}</div>}
                    </div>
                }
            </section >
        )
    }
}