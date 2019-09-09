import * as React from 'react';
import {ajaj, AjajFunctionOptionsType, AjajMethod} from './tools';

export {AjajMethod};

export default class Component<P= {}, S= {}, SS= any> extends React.PureComponent<P, S, SS> {
    abortController = new AbortController();

    ajaj = async <TRequest, TResponse>(options: AjajFunctionOptionsType<TRequest>) => {
        try {
            return await ajaj<TRequest, TRequest>(options, this.abortController.signal);
        } catch (e) {
            if (e && e.name === 'AbortError' && this.abortController.signal.aborted) {

            }
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
}
