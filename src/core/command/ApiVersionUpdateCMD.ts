import { MessageBox } from 'element-ui';
export default class ApiVersionUpdateCMD extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        MessageBox.alert("发现新版本更新").then(()=>{
            location.reload();
        });
    }
}
