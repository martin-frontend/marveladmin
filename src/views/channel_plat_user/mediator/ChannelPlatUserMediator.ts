import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelPlatUserProxy from "../proxy/ChannelPlatUserProxy";
import PlatUserMediator from "@/views/plat_user/mediator/PlatUserMediator";

interface IChannelPlatUser extends IEventDispatcher {
    
}

export default class ChannelPlatUserMediator extends PlatUserMediator {
    myProxy: ChannelPlatUserProxy = <any>this.getProxy(ChannelPlatUserProxy);
}
