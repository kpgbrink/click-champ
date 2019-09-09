
type DELETE = 'DELETE';
type GET = 'GET';
type POST = 'POST';
type PUT = 'PUT';

export const AjajMethod: {
    DELETE: DELETE,
    GET: GET,
    POST: POST,
    PUT: PUT,
} = {
    DELETE: 'DELETE',
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
};

interface IAjajFunctionOptions {
    method: typeof AjajMethod.GET | typeof AjajMethod.DELETE;
    uri: string;
}
interface IAjajFunctionOptionsData<TRequest> {
    data: TRequest;
    method: typeof AjajMethod.PUT | typeof AjajMethod.POST;
    uri: string;
}
export type AjajFunctionOptionsType<TRequest> = IAjajFunctionOptions | IAjajFunctionOptionsData<TRequest>;

export const ajaj = async <TRequest, TResponse>(options: AjajFunctionOptionsType<TRequest>, signal: AbortSignal | null = null) => {
    const headers: Record<string, string> = {};
    const fetchInit: RequestInit = {
        headers,
        method: options.method,
        signal,
    };
    if (options.method === AjajMethod.PUT || options.method === AjajMethod.POST) {
        fetchInit.body = JSON.stringify(options.data);
        headers['Content-Type'] = 'application/json';
    }
    return await (await fetch(options.uri, fetchInit)).json();
};
