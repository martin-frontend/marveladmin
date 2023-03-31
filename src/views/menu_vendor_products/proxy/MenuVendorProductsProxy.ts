import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/menu_vendor_products/setting";
import { MessageBox } from "element-ui";
import IMenuVendorProductsProxy from "./IMenuVendorProductsProxy";

export default class MenuVendorProductsProxy extends AbstractProxy implements IMenuVendorProductsProxy {
    static NAME = "MenuVendorProductsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_menu_vendor_products_table_columns);
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
            alias: { name: '别名', options: {} },
            created_at: { name: '创建时间', options: {} },
            created_by: { name: '创建人', options: {} },
            data_belong: { name: '数据归属标记', options: {} },
            game_desc: { name: '描述', options: {} },
            entrance_game: { name: '入口游戏', options: <any>{} },
            entrance_icon: { name: '入口图标', options: {} },
            entrance_type: { name: '入口类型', options: {} },
            id: { name: '编号', options: {} },
            index_no: { name: '排序序号', options: {} },
            is_delete: { name: '是否删除', options: {} },
            menu_icon: { name: '主菜单缩略图', options: {} },
            plat_id: { name: '平台ID', options: {} },
            updated_at: { name: '修改时间', options: {} },
            updated_by: { name: '更新人', options: {} },
            vendor_icon: { name: '厂商图标', options: {} },
            vendor_id: { name: '游戏厂商', options: {}, options_key: <any>{} },
            vendor_type: { name: '游戏类型', options: {} },
            vendor_id_option: {},
            vendor_id_options_key: {},
            languages: { name: "", options: {} },
        },
        entrance_game_options: {},
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isResort: false, // 是否重新排序
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        vendor_type: "",
        languages: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            id: null,
            vendor_type: "",
            vendor_id: "",
            alias: "",
            game_desc: "",
            entrance_type: "",
            entrance_game: "",
            menu_icon: "",
            menu_icon_url: "",
            entrance_icon: "",
            entrance_icon_urls: "",
            vendor_icon: "",
            vendor_icon_url: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**弹窗相关数据 */
    dialogLanguagesData = {
        bShow: false,
        status: DialogStatus.update,
        form: <any>{
            languages: [],
        },
        formSource: <any>null, // 表单的原始数据
    };

    /**排序数据 */
    sortData = {
        id: null,
        opt: "1", //0-更新标签|1-置底|2-置顶|3-上调|4-下调
    };
    sortDialogData = {
        bShow: false,
        data: <any>[],
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        //首页设定选取平台第一个与游戏类型第一个
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const vendor_type_options_keys = Object.keys(this.tableData.columns.vendor_type.options);
        if (plat_id_options_keys.length > 0 && vendor_type_options_keys.length > 0) {
            //平台选取
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            //游戏类型选取
            if (!vendor_type_options_keys.includes(this.listQuery.vendor_type)) {
                this.listQuery.vendor_type = vendor_type_options_keys[0];
            }
            this.onQuery();
        }
        //表单设定游戏类型第一个
        if (vendor_type_options_keys.length > 0) {
            this.dialogData.form.vendor_type = Number(vendor_type_options_keys[0]);
            if (this.dialogData.form.vendor_type) {
                //依选定平台设定游戏厂商
                this.tableData.columns.vendor_id_option = this.tableData.columns.vendor_id.options_key[this.listQuery.plat_id];
                //依选定游戏类型设定游戏厂商
                this.tableData.columns.vendor_id_options_key = this.tableData.columns.vendor_id_option[this.dialogData.form.vendor_type];
            }
        }
    }

    /**更换平台切换游戏资料 */
    changePlat() {
        const vendor_type_options_keys = Object.keys(this.tableData.columns.vendor_type.options);
        //表单设定游戏类型第一个
        if (vendor_type_options_keys.length > 0) {
            this.dialogData.form.vendor_type = Number(vendor_type_options_keys[0]);
            if (this.dialogData.form.vendor_type) {
                //依平台与游戏类型设定游戏厂商
                this.tableData.columns.vendor_id_option = this.tableData.columns.vendor_id.options_key[this.listQuery.plat_id];
                this.tableData.columns.vendor_id_options_key = this.tableData.columns.vendor_id_option[this.dialogData.form.vendor_type];
            }
        }
    }
    //更换游戏类型切换对应游戏厂商
    changeVendorType() {
        if (this.dialogData.form.vendor_type) {
            //依平台与游戏类型设定游戏厂商
            this.tableData.columns.vendor_id_option = this.tableData.columns.vendor_id.options_key[this.listQuery.plat_id];
            this.tableData.columns.vendor_id_options_key = this.tableData.columns.vendor_id_option[this.dialogData.form.vendor_type];
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isResort = true;
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        this.tableData.entrance_game_options =
            this.tableData.columns.entrance_game.options[data.vendor_id][data.vendor_type];
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            vendor_type: "",
            vendor_id: "",
            alias: "",
            game_desc: "",
            entrance_type: "",
            entrance_game: "",
            menu_icon: "",
            entrance_icon: "",
            vendor_icon: "",
            languages: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_menu_vendor_products_show, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
    }

    /**显示弹窗 */
    showLanguagesDialog(status: string, data?: any) {
        this.dialogLanguagesData.bShow = true;

        if (status == DialogStatus.update) {
            this.dialogLanguagesData.formSource = data;
            Object.assign(this.dialogLanguagesData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.dialogLanguagesData.form.languages = [];
            this.dialogLanguagesData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**隐藏弹窗 */
    hideLanguagesDialog() {
        this.dialogLanguagesData.bShow = false;
    }

    hideSortDialog() {
        this.sortDialogData.bShow = false;
    }

    showSort() {
        const { plat_id } = this.listQuery;
        this.sendNotification(HttpType.admin_plat_show, objectRemoveNull({ id: plat_id }));
    }
    setVendorSort(data: any) {
        this.sortDialogData.bShow = true;
        let initData = [];
        if (data.menu_order == null) {
            //初始化
            initData = [2, 4, 8, 16, 32, 64, 128]
        } else {
            initData = JSON.parse(data.menu_order)
        }
        this.sortDialogData.data = initData.map((val: any) => ({
            vendor_type: val
        }));
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            vendor_id: "",
            alias: "",
            game_desc: "",
            entrance_type: "",
            entrance_game: "",
            menu_icon: "",
            menu_icon_url: "",
            entrance_icon: "",
            entrance_icon_url: "",
            vendor_icon: "",
            vendor_icon_url: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_menu_vendor_products_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        let { vendor_type,
            vendor_id, alias,
            game_desc,
            entrance_type,
            entrance_game,
            menu_icon,
            entrance_icon,
            menu_icon_url,
            entrance_icon_url,
            vendor_icon,
            vendor_icon_url,
        } = this.dialogData.form;
        const { plat_id } = this.listQuery;
        menu_icon = JSON.stringify(menu_icon);
        entrance_icon = JSON.stringify(entrance_icon);
        vendor_icon = JSON.stringify(vendor_icon);
        menu_icon_url = JSON.stringify(menu_icon_url);
        entrance_icon_url = JSON.stringify(entrance_icon_url);
        vendor_icon_url = JSON.stringify(vendor_icon_url);
        const formCopy: any = {
            vendor_type,
            vendor_id,
            alias,
            game_desc,
            entrance_type,
            entrance_game,
            plat_id,
            menu_icon,
            menu_icon_url,
            entrance_icon,
            entrance_icon_url,
            vendor_icon,
            vendor_icon_url,
        };
        this.sendNotification(HttpType.admin_menu_vendor_products_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const { id } = this.dialogData.form;
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = id;
        // 发送消息
        this.sendNotification(HttpType.admin_menu_vendor_products_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_menu_vendor_products_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }

    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_menu_vendor_products_update, { id: id, next_id: next_id, opt: 11 });
    }

    /**图片上传 */
    private isMin = 0;
    onUploadImage(data: any, isMin: number = 0) {
        this.isMin = isMin;
        this.sendNotification(HttpType.admin_resource_upload, data);
    }

    /**图片上传 回传url*/
    setImageUrl(body: any) {
        if (this.isMin == 0) {
            this.dialogData.form.vendor_icon = this.dialogData.form.vendor_icon || {};
            this.dialogData.form.vendor_icon_url = this.dialogData.form.vendor_icon_url || {};
            this.dialogData.form.vendor_icon[0] = body.uri;
            this.dialogData.form.vendor_icon_url[0] = body.url;
        } else if (this.isMin == 1) {
            this.dialogData.form.menu_icon = this.dialogData.form.menu_icon || {};
            this.dialogData.form.menu_icon_url = this.dialogData.form.menu_icon_url || {};
            this.dialogData.form.menu_icon[0] = body.uri;
            this.dialogData.form.menu_icon_url[0] = body.url;
        } else {
            this.dialogData.form.entrance_icon = this.dialogData.form.entrance_icon || {};
            this.dialogData.form.entrance_icon_url = this.dialogData.form.entrance_icon_url || {};
            this.dialogData.form.entrance_icon[0] = body.uri;
            this.dialogData.form.entrance_icon_url[0] = body.url;
        }
    }

    onUpdateSort(list: any) {
        const { plat_id } = this.listQuery;
        let menu_order = JSON.stringify(list);
        this.sendNotification(HttpType.admin_plat_update, { id: plat_id, menu_order: menu_order });
    }

    /**更新数据 */
    onUpdateLanguages(id: any) {
        const formCopy: any = formCompared(this.dialogLanguagesData.form, this.dialogLanguagesData.formSource);
        if (Object.keys(formCopy).length == 0) {
            this.dialogLanguagesData.bShow = false;
            return false;
        }
        formCopy.id = id;
        this.sendNotification(HttpType.admin_menu_vendor_products_update, formCopy);
    }
}
