import * as React from 'react';
import {ajaj, AjajFunctionOptionsType, AjajMethod} from '../tools';

export {AjajMethod};

export default class Component<P= {}, S= {}, SS= any> extends React.PureComponent<P, S, SS> {

    abortController = new AbortController();

    componentWillUnmount() {
        this.abortController.abort();
    }

    protected ajaj = async <TRequest, TResponse>(options: AjajFunctionOptionsType<TRequest>) => {
        const res: TResponse = await ajaj<TRequest, TRequest>(options, this.abortController.signal);
        // tslint:disable-next-line: no-console
        console.log(options.uri, res);
        return res;
    }

  // Sets before state
  // Runs actionsAsync
  // Set after state no matter what
  // doCatch runs after 'afterState'
  protected async runCancellableStatefulAsync<K1 extends keyof S, K2 extends keyof S>(
        beforeState: Pick<S, K1>,
        actionAsync: () => Promise<void|{}>,
        afterState: Pick<S, K2>,
        doCatch: (ex: any) => void,
        throwCancel: boolean = false) {
    try {
        this.setState(beforeState);
        await actionAsync();
        this.setState(afterState);
    } catch (ex) {
        if (ex && ex.name === 'AbortError' && this.abortController.signal.aborted) {
            // tslint:disable-next-line: no-console
            return;
        }
        setImmediate(() => this.setState(afterState));
        doCatch(ex);
    }
  }
}
