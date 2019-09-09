import * as React from 'react';
import {ajaj, AjajFunctionOptionsType } from './tools';

export default class Component<P= {}, S= {}, SS= any> extends React.PureComponent<P, S, SS> {
    controller = new AbortController();
    ajajTypes = ajaj;

    ajaj = async <TRequest, TResponse>(options: AjajFunctionOptionsType<TRequest>) => {
        return await ajaj<TRequest, TRequest>(options, this.controller.signal);
    }

    componentWillUnmount() {
        this.controller.abort();
    }
}
