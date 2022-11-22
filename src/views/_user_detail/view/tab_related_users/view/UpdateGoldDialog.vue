<template>
    <el-dialog :title="LangUtil('用户扣除金币')" :visible.sync="myProxy.dialogData.bShow" :append-to-body="true">
        <div v-loading="net_status.loading">
            <el-form ref="form" :model="form" label-width="145px" v-loading="net_status.loading">
                <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">
                    <el-input disabled v-model="form.user_id"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">
                    <el-input disabled v-model="form.nick_name"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['gold'].name" prop="gold">
                    <el-input disabled v-model="form.gold"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('扣除金币')">
                    <el-input
                        v-model="form.deductGold"
                        type="number"
                        min="0"
                        onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                    ></el-input>
                    <div style="color: #ff0000">
                        {{ LangUtil("扣除玩家金币只能扣除玩家平台余额。如果金币在厂商以及保险箱里，可进行先提取") }}
                    </div>
                </el-form-item>
                <el-form-item class="dialog-footer">
                    <el-button type="primary" @click="onDeductGold">{{ LangUtil("确定") }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import TabRelatedUsersProxy from "../proxy/TabRelatedUsersProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class UpdateGoldDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabRelatedUsersProxy = getProxy(TabRelatedUsersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    onDeductGold() {
        this.myProxy.onDeductGold();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
