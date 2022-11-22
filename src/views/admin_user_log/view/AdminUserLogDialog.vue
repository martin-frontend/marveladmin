<template>
    <el-dialog :title="LangUtil('操作日志详情')" :visible.sync="myProxy.dialogData.bShow" width="800px">
        <el-form ref="form" :model="form" label-width="140px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name">
                {{ tableColumns.plat_id.options[form.plat_id] }}
            </el-form-item>
            <el-form-item :label="tableColumns.admin_user_id.name">
                {{ form.admin_user_id }}
            </el-form-item>
            <el-form-item :label="tableColumns.admin_username.name"> {{ form.admin_username }} </el-form-item>
            <el-form-item :label="tableColumns.cate.name"> {{ tableColumns.cate.options[form.cate] }} </el-form-item>
            <el-form-item :label="tableColumns.type.name">
                {{ tableColumns.type.options[form.type] }}
            </el-form-item>
            <el-form-item :label="tableColumns.created_at.name">
                {{ form.created_at }}
            </el-form-item>
            <el-form-item :label="tableColumns.permission_id.name">
                {{ tableColumns.permission_id.options[form.permission_id] }}
            </el-form-item>
            <el-form-item :label="LangUtil('操作内容')">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.content" :readOnly="true" />
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminUserLogProxy from "@/views/admin_user_log/proxy/AdminUserLogProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class AdminUserLogDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminUserLogProxy = this.getProxy(AdminUserLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
