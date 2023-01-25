import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";

export default class SandboxEditor extends React.Component {
    render() {
        return (
            <div>
                <Sandpack
                    template="react"
                    options={{
                        autorun: false
                    }}
                />
            </div>
        )
    }
}