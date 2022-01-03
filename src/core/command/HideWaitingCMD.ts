export default class HideWaitingCMD extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        // @ts-ignore
        if (window["g_loading"]) {
            // @ts-ignore
            window["g_loading"].close();
        }
    }
}
