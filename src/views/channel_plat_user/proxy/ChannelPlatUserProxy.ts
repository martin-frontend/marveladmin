import PlatUserProxy from "@/views/plat_user/proxy/PlatUserProxy";

export default class ChannelPlatUserProxy extends PlatUserProxy {
    static NAME = "ChannelPlatUserProxy";
    protected isChannelUser = true;
}
