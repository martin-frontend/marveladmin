import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_bonus_all/setting";
import { MessageBox } from "element-ui";
import IPlatBonusAllStockProxy from "./IPlatBonusAllStockProxy";

export default class PlatBonusAllStockProxy extends AbstractProxy implements IPlatBonusAllStockProxy {
    static NAME = "PlatBonusAllStockProxy";

    /**进入页面时调用 */
    enter() {}

    /**离开页面时调用 */
    leave() {}

    /**表格相关数据 剃度模版*/
    tableData: any = {
        columns: {},
        form: {},
        formSource: {}, // 表单的原始数据
        formModel: null,
        templateBShow: false,
    };
    /*显示配置梯度模版 */
    openTemplateSetting() {
        Object.assign(this.tableData.form, JSON.parse(JSON.stringify(this.tableData.formSource)));
        this.tableData.templateBShow = true;
    }

    /**没有 all_bonus_model_id 就写入原本的数据 */
    setOriginalTemplateData(body: any) {
        Object.assign(this.tableData.form, body);
        this.tableData.formSource = JSON.parse(JSON.stringify(body));
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.bShow = true;
    }
    /**关闭弹窗 */
    hideDialog() {
        this.tableData.bShow = false;
        this.tableData.templateBShow = false;
    }
    /*更新梯度模版 onTemplateUpdate*/
    admin_plat_update(plat_id: any) {
        const formCopy: any = formCompared(this.tableData.form, this.tableData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.tableData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.plat_id = plat_id;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_update, formCopy);
    }

    /**写入梯度模版数据 */
    receive_admin_plat_show(body: any) {
        Object.assign(this.tableData.form, body);
        this.tableData.formSource = JSON.parse(JSON.stringify(body));
    }

    /**初始化模板 */
    initTemplate(model: any) {
        this.tableData.form = JSON.parse(JSON.stringify(model));
    }
}
