export interface IEventDispatcher {
    addEventListener(type: string, listener: any, thisObject: any): void;
    removeEventListener(type: string, listener: any, thisObject: any): void;
    dispatchEvent(type: string, data?: any): void;
}
