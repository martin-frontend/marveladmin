<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['vendor_name'].name" prop="vendor_name">
                <el-input v-model="form.vendor_name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['api_url'].name" prop="api_url">
                <el-input v-model="form.api_url" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['app_key'].name" prop="app_key">
                <el-input v-model="form.app_key" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <!-- <el-form-item size="mini" :label="tableColumns['app_secret'].name" prop="app_secret">
                <el-input v-model="form.app_secret" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item> -->
            <el-form-item size="mini" :label="tableColumns['redirect_url'].name" prop="redirect_url">
                <el-input v-model="form.redirect_url" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['unique_name'].name" prop="unique_name">
                <el-input v-model="form.unique_name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['extend_params'].name" prop="extend_params">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.extend_params" />
                </div>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">
                    {{ LangUtil("删除") }}
                </el-button>
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import ThirdPartyVendorLoginProxy from "@/views/third_party_vendor_login/proxy/ThirdPartyVendorLoginProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class ThirdPartyVendorLoginDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: ThirdPartyVendorLoginProxy = this.getProxy(ThirdPartyVendorLoginProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            vendor_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            api_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            vendor_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            app_key: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            // app_secret: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            redirect_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            unique_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            extend_params: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    private handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
