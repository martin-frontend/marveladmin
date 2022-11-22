import { Message } from "element-ui";
import GlobalEventType from "@/core/global/GlobalEventType";
export default class IOErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        this.sendNotification(GlobalEventType.HIDE_WAITING);
        Message.error("io error");
    }
}
