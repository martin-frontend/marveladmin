import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_event_record_pix/setting";
import { MessageBox } from "element-ui";
import IPlatUsersEventRecordPixProxy from "./IPlatUsersEventRecordPixProxy";
import LangUtil from "@/core/global/LangUtil";

export default class PlatUsersEventRecordPixProxy extends AbstractProxy implements IPlatUsersEventRecordPixProxy {
    static NAME = "PlatUsersEventRecordPixProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_event_record_pix_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
    }

    /**表格相关数据 */
    tableData = {
        columns: <any>{
            // TODO
            bet_id: { name: "", options: {} },
            plat_id: { name: "所属平台", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            coin_name_unique: { name: "币种" },
            user_id: { name: "所属玩家ID", options: {} },
            username: { name: "所属玩家帐号", options: {} },
            event_type: { name: "事件类型", options: {} },
            event_status: { name: "是否发送给三方", options: {} },
            event_time: { name: "时间", options: {} },
            created_by: { name: "创建人", options: {} },
            created_at: { name: "创建时间", options: {} },
            gold: { name: "金额" },
        },
        eventList: <any>[], //所有事件的数组
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false,
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        user_id: "",
        event_type: "",
        "event_time-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
        "event_time-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
    };

    timezoneOption = {
        "-8:00": LangUtil("GMT-8_desc"),
        "-7:00": LangUtil("GMT-7_desc"),
        "-6:00": LangUtil("GMT-6_desc"),
        "-5:00": LangUtil("GMT-5_desc"),
        "-4:00": LangUtil("GMT-4_desc"),
        "-3:00": LangUtil("GMT-3_desc"),
        "-2:00": LangUtil("GMT-2_desc"),
        "-1:00": LangUtil("GMT-1_desc"),

        "+0:00": LangUtil("GMT+0_desc"),
        "+1:00": LangUtil("GMT+1_desc"),
        "+2:00": LangUtil("GMT+2_desc"),
        "+3:00": LangUtil("GMT+3_desc"),

        "+3:30": LangUtil("GMT+3-30_desc"),
        "+4:00": LangUtil("GMT+4_desc"),
        "+4:30": LangUtil("GMT+4-30_desc"),
        "+5:00": LangUtil("GMT+5_desc"),

        "+5:30": LangUtil("GMT+5-30_desc"),
        "+5:45": LangUtil("GMT+5-45_desc"),
        "+6:00": LangUtil("GMT+6_desc"),
        "+6:30": LangUtil("GMT+6-30_desc"),
        "+7:00": LangUtil("GMT+7_desc"),
        "+8:00": LangUtil("GMT+8_desc"),

        "+9:00": LangUtil("GMT+9_desc"),
        "+10:00": LangUtil("GMT+10_desc"),
        "+11:00": LangUtil("GMT+11_desc"),
        "+12:00": LangUtil("GMT+12_desc"),

        "+13:00": LangUtil("GMT+13_desc"),
        "+14:00": LangUtil("GMT+14_desc"),
    };

    curTimeZone = "+8:00";
    /**
     * 将输入的时间转换为北京时间，如果平台不需要转换时间 会返回 传入值
     * @param datetimeString 需要转换的时间文本
     * @returns 转换之后的文本
     */
    convertTime_to_Beijing(datetimeString: string): string {
        let newstr = this.curTimeZone;
        if (newstr[0] === "-") {
            newstr = newstr.replace(/-/g, "+");
        } else {
            newstr = newstr.replace(/\+/g, "-");
        }
        //console.log(" 修改之后的 ---" ,newstr);
        const newdata = this.addTime(datetimeString, newstr);
        return this.addTime(newdata, "+8:00");
    }
    /**
     * 时间的加减   传入时间格式为 2023-04-29 12:05:45  传入 与这个时间之间的偏差 输出  计算之后的 时间
     * @param timeStr 时间格式为 2023-04-29 12:05:45
     * @param duration 传入时间之间的偏差 例如 +2：15
     * @returns
     */
    addTime(timeStr: string, duration: string): string {
        const [hours, minutes] = duration.split(":").map(Number);
        const time = new Date(timeStr.replace(/-/g, "/"));
        time.setHours(time.getHours() + hours);
        time.setMinutes(time.getMinutes() + minutes);
        const year = time.getFullYear();
        const month = this.padZero(time.getMonth() + 1);
        const day = this.padZero(time.getDate());
        const hours24 = this.padZero(time.getHours());
        const minutes24 = this.padZero(time.getMinutes());
        const seconds24 = this.padZero(time.getSeconds());
        return `${year}-${month}-${day} ${hours24}:${minutes24}:${seconds24}`;
    }
    /**时间补齐 00 */
    padZero(n: number): string {
        return n < 10 ? `0${n}` : `${n}`;
    }

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
        },
        formSource: null, // 表单的原始数据
    };
    sortList = [12, 1, 8, 3, 10, 2, 9, 4, 11, 5, 6, 7];
    /**设置事件数组 */
    setEventList() {
        // this.tableData.eventList = <any>[];

        const eventData = this.tableData.columns.event_type.options;
        const keys = Object.keys(eventData);
        // let sortList = [12, 1, 8, 3, 10, 2, 9, 4, 11, 5, 6, 7];
        // sortList = sortList.reverse();
        // for (let index = 0; index < keys.length; index++) {
        //     const element = eventData[keys[index]];

        //     const item = {
        //         title: element,
        //         key: keys[index],
        //         sort_id: sortList.indexOf(Number(keys[index])),
        //     };
        //     this.tableData.eventList.push(item);
        // }
        // this.tableData.eventList = this.tableData.eventList.sort((a: any, b: any) => b.sort_id - a.sort_id);
        //  console.log("设置 事件数据 -- ",this.tableData.eventList);

        for (let index = 0; index < keys.length; index++) {
            this.tableData.columns[`eventtype_${keys[index]}_count`] = {};
            this.tableData.columns[`eventtype_${keys[index]}_count`].name = eventData[keys[index]] + LangUtil("事件数");
            if (keys[index] != 12) {
                this.tableData.columns[`eventtype_${keys[index]}_gold`] = {};
                this.tableData.columns[`eventtype_${keys[index]}_gold`].name =
                    eventData[keys[index]] + LangUtil("金额");
            }
        }
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const channel_id_options_keys = Object.keys(this.tableData.columns.channel_id.options);
        this.setEventList();
        if (plat_id_options_keys.length > 0 && channel_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
                // this.listQuery.plat_id = "30024";
            }

            this.onQuery();
        }
    }

    resetListdata(data: any) {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (element.gold_info) {
                for (let n = 0; n < element.gold_info.length; n++) {
                    const goldinfo_item = element.gold_info[n];
                    element[`eventtype_${goldinfo_item.event_type}_count`] = goldinfo_item.count;
                    element[`eventtype_${goldinfo_item.event_type}_gold`] = goldinfo_item.gold;
                }
            }
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.resetListdata(data.list);
        this.tableData.list.push(...data.list);
        // console.log("重组之后的数据为", this.tableData.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            channel_id: "",
            user_id: "",
            event_type: "",
            "event_time-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
            "event_time-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            // this.sendNotification(HttpType.undefined, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {}

    /**查询 */
    onQuery() {
        const listQuery = JSON.parse(JSON.stringify(this.listQuery));
        listQuery["event_time-{>=}"] = this.convertTime_to_Beijing(listQuery["event_time-{>=}"]);
        listQuery["event_time-{<=}"] = this.convertTime_to_Beijing(listQuery["event_time-{<=}"]);

        this.sendNotification(HttpType.admin_plat_users_event_record_pix_index, objectRemoveNull(listQuery));
    }
    onQuery_export(pageInfo: any) {
        const obj = JSON.parse(JSON.stringify(this.listQuery));
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        obj["event_time-{>=}"] = this.convertTime_to_Beijing(obj["event_time-{>=}"]);
        obj["event_time-{<=}"] = this.convertTime_to_Beijing(obj["event_time-{<=}"]);
        this.sendNotification(HttpType.admin_plat_users_event_record_pix_index, objectRemoveNull(obj));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = {
            // TODO
        };
        // this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        // TODO
        // 发送消息
        // this.sendNotification(HttpType.undefined, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                // this.sendNotification(HttpType.undefined, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
    get _userList() {
        const list = <any>["plat_id", "channel_id", "coin_name_unique"];
        for (let index = 0; index < this.sortList.length; index++) {
            list.push(`eventtype_${this.sortList[index]}_count`);
            if (this.sortList[index] != 12) list.push(`eventtype_${this.sortList[index]}_gold`);
        }
        return list;
    }
    myExportPagedata = <any>{};
    /**导出excel */
    exportExcel(data: any) {
        if (data && data.list) {
            this.resetListdata(data.list);
        }
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }
}
