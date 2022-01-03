import { dateFormat } from "@/core/global/Functions";

export default class GlobalVar {
    /**版本号*/
    static version: number = 0;
    /**host*/
    static host: string = "http://qa1.admin.api_universe_swoole.nqsf9emow.com:27799/";
    /**用户ID*/
    static admin_user_id: number;
    /**用户认证token*/
    static token: string;
    /**设备号*/
    static device: string;
    /**语言 */
    static lang: string = "zh_CN";
    /**最后一次数据返回的时间*/
    static response_time: number = 0;

    /**是否能播放音乐 */
    static play_video: boolean = false;
    /**记录每个页面的查询条件，临时的处理方法 */
    static page_data: any = {};

    /**网络请求状态 */
    static net_status = {
        // 状态
        loading: false,
        // 请求数据
        request: {
            url: "",
            data: <any>{},
        },
    };

    /**API接口版本，当版本改变时，需要刷新页面 */
    static api_version: string = <any>null;
    /**全局图片预览 */
    static preview_image = {
        url: ""
    }
}
