import * as React from 'react';
import {ajaj, AjajFunctionOptionsType, AjajMethod} from '../tools';

export {AjajMethod};

export default class Component<P= {}, S= {}, SS= any> extends React.PureComponent<P, S, SS> {
    abortController = new AbortController();

    ajaj = async <TRequest, TResponse>(options: AjajFunctionOptionsType<TRequest>) => {
        try {
            const response: TResponse = await ajaj<TRequest, TRequest>(options, this.abortController.signal);
            return response;
        } catch (e) {
            if (e && e.name === 'AbortError' && this.abortController.signal.aborted) {
                // empty
                // tslint:disable-next-line: no-console
                console.log("The abort thing happened");
            }
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
}
