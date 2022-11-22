<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.iconDialogData.bShow" width="600px">
        <el-form ref="form" :model="form" label-width="80px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                <el-input v-model="form.icon"></el-input>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleUpdate()">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import LobbyProductProxy from "@/views/lobby_product/proxy/LobbyProductProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class LobbyProductDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: LobbyProductProxy = this.getProxy(LobbyProductProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.iconDialogData.form;
    listQuery = this.myProxy.listQuery;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.iconDialogData.status;
    }

    handleUpdate() {
        this.myProxy.onUpdateIcon();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
