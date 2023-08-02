<template>
    <div>
        <div v-loading="net_status.loading" style="min-height:500px;">
            <el-form ref="form" label-position="right" label-width="150px" :model="userInfo.user_level">
                <el-form-item
                    v-for="(value, key) in tableColumns.level_type.options"
                    :key="key"
                    size="mini"
                    :label="value"
                >
                    <el-input disabled :placeholder="showText(key)" style="width: 200px"></el-input>
                    <el-button class="item" type="primary" @click="handlerEdit(key)" style="margin-left: 20px">
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <EditDialog v-if="myProxy.dialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabEasybetMediator from "../mediator/TabEasybetMediator";
import TabEasybetProxy from "../proxy/TabEasybetProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import EditDialog from "./EditDialog.vue";

@Component({
    components: {
        EditDialog,
    },
})
export default class TabEasybet extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabEasybetProxy = getProxy(TabEasybetProxy);
    userInfo = this.myProxy.userInfo;
    tableColumns = this.myProxy.tableColumns;

    showText(key: any) {
        if (!this.tableColumns.user_level.options || !this.tableColumns.user_level.options[this.userInfo.plat_id]) {
            return "";
        }
        if (this.userInfo.user_level[key] < 0) {
            return LangUtil("未设置");
        } else {
            return this.tableColumns.user_level.options[this.userInfo.plat_id][key][this.userInfo.user_level[key]];
        }
    }
    constructor() {
        super(TabEasybetMediator);
    }
    handlerEdit(key: any) {
        //初始化 打开的表格
        this.myProxy.resetDialogForm();

        this.myProxy.dialogData.form.level_type = key;
        this.myProxy.dialogData.form.user_level = this.userInfo.user_level[key];

        //将数组转为对象
        const obj = [];
        this.myProxy.dialogData.org_option_data = this.tableColumns.user_level.options[this.userInfo.plat_id][key];
        const keys = Object.keys(this.tableColumns.user_level.options[this.userInfo.plat_id][key]);
        for (let index = 0; index < keys.length; index++) {
            const element = this.tableColumns.user_level.options[this.userInfo.plat_id][key][keys[index]];
            obj.push(element);
        }
        this.myProxy.dialogData.optionData = obj;

        this.myProxy.showDialog();
    }
    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
