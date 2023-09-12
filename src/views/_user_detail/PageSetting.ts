import { generateUUID } from "@/core/global/Functions";

export var page1 = {
    bShow: false,
    user_id: 0,
    plat_id: 0,
    proxyName: generateUUID(),
};

export var page2 = {
    bShow: false,
    user_id: 0,
    plat_id: 0,
    proxyName: generateUUID(),
};

export var userShow = {
    finished: false,
};

export function getPageSetting() {
    return page2.bShow ? page2 : page1;
}

export function getProxy(proxyClass: any) {
    const proxyName = proxyClass.NAME + (page2.bShow ? page2.proxyName : page1.proxyName);
    const facade = puremvc.Facade.getInstance();
    if (!facade.hasProxy(proxyName)) {
        facade.registerProxy(new proxyClass(proxyName));
    }
    return <any>facade.retrieveProxy(proxyName);
}
