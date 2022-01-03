export default class GlobalEventType {
    /**网络请求开始*/
    static REQUEST_START = "REQUEST_START";
    /**网络请求结束*/
    static REQUEST_END = "REQUEST_END";
    /**网络错误*/
    static IO_ERROR = "IO_ERROR";
    /**服务器返回错误*/
    static REQUEST_ERROR = "REQUEST_ERROR";
    /**显示waiting*/
    static SHOW_WAITING = "SHOW_WAITING";
    /**隐藏waiting*/
    static HIDE_WAITING = "HIDE_WAITING";
    /**显示用户详情 */
    static SHOW_USER_DETAIL = "SHOW_USER_DETAIL";
    /**页面更新*/
    static REFRESH_PAGE = "REFRESH_PAGE";
    /**用户信息*/
    static UPDATE_USERINFO = "UPDATE_USERINFO";

    /**显示消息面板 */
    static SHOW_MESSAGE_PANEL = "SHOW_MESSAGE_PANEL";
    /**API接口更新 */
    static API_VERSION_UPDATE = "API_VERSION_UPDATE";
}
