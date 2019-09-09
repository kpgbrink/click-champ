
export function TestMethod<T>(blach: T): T {
    return blach as T;
}

type METHOD_GET = 'GET';
const METHOD_GET: METHOD_GET = 'GET';
type METHOD_POST = 'POST';
const METHOD_POST: METHOD_POST = 'POST';
type METHOD_PUT = 'PUT';
const METHOD_PUT: METHOD_PUT = 'PUT';
type METHOD_DELETE = 'DELETE';
const METHOD_DELETE: METHOD_DELETE = 'DELETE';

interface IAjajFunctionOptions {
    method: typeof METHOD_GET | typeof METHOD_DELETE;
    uri: string;
}
interface IAjajFunctionOptionsData<TRequest> {
    data: TRequest;
    method: typeof METHOD_PUT | typeof METHOD_POST;
    uri: string;
}
type AjajFunctionOptionsType<TRequest> = IAjajFunctionOptions | IAjajFunctionOptionsData<TRequest>;
interface IAjajFunction {
    <TRequest, TResponse>(options: AjajFunctionOptionsType<TRequest>): Promise<TResponse>;
    METHOD_GET: METHOD_GET;
    METHOD_POST: typeof METHOD_POST;
    METHOD_PUT: typeof METHOD_PUT;
    METHOD_DELETE: typeof METHOD_DELETE;
}

export const ajaj: IAjajFunction = async <TRequest, TResponse>(options: AjajFunctionOptionsType<TRequest>) => {
    const headers: Record<string, string> = {};
    const fetchInit: RequestInit = {
        headers,
        method: options.method,
    };
    if (options.method === METHOD_PUT || options.method === METHOD_POST) {
        fetchInit.body = JSON.stringify(options.data);
        headers['Content-Type'] = 'application/json';
    }
    return await (await fetch(options.uri, fetchInit)).json();
};
ajaj.METHOD_GET = METHOD_GET;
ajaj.METHOD_PUT = METHOD_PUT;
ajaj.METHOD_DELETE = METHOD_DELETE;
ajaj.METHOD_POST = METHOD_POST;
