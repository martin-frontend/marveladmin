export default class AbstractMediator extends puremvc.Mediator {
    public model!: any;

    setViewComponent(viewComponent: any) {
        super.setViewComponent(viewComponent);
        this.initViewData();
    }

    setModel(model: any) {
        this.model = model;
    }

    protected initViewData() {
        // 子类实现
    }

    public getProxy(proxyClass: any): any {
        if (!this.facade.hasProxy(proxyClass.NAME)) {
            this.facade.registerProxy(new proxyClass(proxyClass.NAME));
        }
        return this.facade.retrieveProxy(proxyClass.NAME);
    }

    public getProxySnap(proxyClass: any, snapName: string): any {
        const pName = proxyClass.NAME + snapName;
        if (!this.facade.hasProxy(pName)) {
            this.facade.registerProxy(new proxyClass(pName));
        }
        return this.facade.retrieveProxy(pName);
    }
}
