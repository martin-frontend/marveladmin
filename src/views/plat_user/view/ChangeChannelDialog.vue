<template>
    <el-dialog width="500px" :title="LangUtil('更换渠道')" :visible.sync="myProxy.changeChannelDialogData.bShow">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.channel_id.name" prop="channel_id">
                <el-select filterable v-model="form.channel_id">
                    <el-option
                        v-for="(value, key) in tableColumns.channel_id.options[form.plat_id]"
                        :key="key"
                        :label="key"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">{{ LangUtil("确定") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUserProxy from "@/views/plat_user/proxy/PlatUserProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class ChangeChannelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.changeChannelDialogData.form;
    dialogData = this.myProxy.changeChannelDialogData;
    rules = {};

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onChangeChannel();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
