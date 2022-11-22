/* eslint-disable */
import { Vue } from "vue-property-decorator";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { generateUUID } from "@/core/global/Functions";

export default class AbstractView extends Vue {
    private facde = puremvc.Facade.getInstance();
    private readonly mediator!: AbstractMediator;
    private readonly model!: puremvc.Proxy;
    private eventMaps: any = {};

    constructor(mediatorClass?: any, proxyClass?: any, proxyInstance?: any) {
        super();
        if (proxyClass) {
            if (!this.facde.hasProxy(proxyClass.NAME)) {
                this.model = new proxyClass();
                this.facde.registerProxy(this.model);
            }
        }
        if (proxyInstance) {
            this.facde.registerProxy(proxyInstance);
        }
        if (mediatorClass) {
            this.mediator = new mediatorClass();
            this.mediator.mediatorName = generateUUID();
            this.mediator.setViewComponent(this);
            this.mediator.setModel(this.model);
            this.facde.registerMediator(this.mediator);
        }
    }

    public addEventListener(type: string, listener: any, thisObject: any) {
        if (!this.eventMaps[type]) {
            this.eventMaps[type] = [];
        }
        for (const item of this.eventMaps[type]) {
            if (item.listener === listener && item.thisObject === thisObject) {
                return;
            }
        }
        this.eventMaps[type].push({ listener, thisObject });
    }

    public removeEventListener(type: string, listener: any, thisObject: any) {
        if (this.eventMaps[type]) {
            for (const item of this.eventMaps[type]) {
                if (item.listener === listener && item.thisObject === thisObject) {
                    const idx = this.eventMaps[type].indexOf(item);
                    this.eventMaps[type].splice(idx, 1);
                    return;
                }
            }
        }
    }

    public dispatchEvent(type: string, data?: any) {
        if (this.eventMaps[type]) {
            for (const item of this.eventMaps[type]) {
                item.listener.apply(item.thisObject, [data]);
            }
        }
    }

    public getModel(modelName?: string): any {
        if (modelName) {
            return this.facde.retrieveProxy(modelName);
        }
        return this.model;
    }

    public getProxy(proxyClass: any): any {
        if (!this.facde.hasProxy(proxyClass.NAME)) {
            this.facde.registerProxy(new proxyClass(proxyClass.NAME));
        }
        return this.facde.retrieveProxy(proxyClass.NAME);
    }

    public getProxySnap(proxyClass: any, snapName: string): any {
        const pName = proxyClass.NAME + snapName;
        if (!this.facde.hasProxy(pName)) {
            this.facde.registerProxy(new proxyClass(pName));
        }
        return this.facde.retrieveProxy(pName);
    }

    destroyed() {
        if (this.mediator) {
            this.facde.removeMediator(this.mediator.mediatorName);
        }
        if (this.model) {
            this.facde.removeProxy(this.model.proxyName);
        }
    }
}
