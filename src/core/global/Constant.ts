import LangUtil from "@/core/global/LangUtil";
import i18n from "@/lang";
/**弹窗状态 */
export var DialogStatus = {
    create: "create",
    update: "update",
};
/**操作成功显示的消息 */
export var SuccessMessage = {
    create: <any>LangUtil("新增成功"),
    update: <any>LangUtil("编辑成功"),
};
