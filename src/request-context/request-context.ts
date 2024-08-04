import { AsyncLocalStorage } from 'async_hooks';
import * as UUID from 'uuid';
import { Context } from './context';

export class RequestContext {
    static contextMap: Map<string, Context> = new Map();
    static asyncLocalStorage = new AsyncLocalStorage<string>();
    static async startContext<T>(handler: () => void | Promise<T>) {
        const contextId = UUID.v4();
        const initialContext: Context = {
            transaction: null,
        };
        RequestContext.contextMap.set(contextId, initialContext);
        const res = await RequestContext.asyncLocalStorage.run(contextId, handler);
        RequestContext.contextMap.delete(contextId);
        return res as T;
    }
    static getContext(): Context {
        const id = RequestContext.asyncLocalStorage.getStore();
        return RequestContext.contextMap.get(id) || {};
    }
    static setContext(data: Partial<Context>): void {
        const id = RequestContext.asyncLocalStorage.getStore();
        const context = RequestContext.getContext();
        RequestContext.contextMap.set(id, {
            ...context,
            ...data,
        });
    }
}
