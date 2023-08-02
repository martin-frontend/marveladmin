<template>
    <el-dialog :title="LangUtil('提示')" :visible.sync="myProxy.remarkDialogData.bShow" width="550px">
        <div v-loading="net_status.loading">
            <el-form
                ref="form"
                :rules="rules"
                label-width="80px"
                label-position="left"
                v-loading="net_status.loading"
                :model="form"
            >
                <el-form-item :label="tableColumns.remark.name" prop="remark">
                    <el-input
                        show-word-limit
                        clearable
                        maxlength="30"
                        v-model="myProxy.remarkDialogData.form.remark"
                    ></el-input>
                </el-form-item>
                <el-form-item class="dialog-footer">
                    <el-button @click="myProxy.hideRemarkDialog()">
                        {{ LangUtil("取消") }}
                    </el-button>
                    <el-button type="primary" @click="handleUpdate">
                        {{ LangUtil("确定") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatAgentBindProxy from "../../proxy/PlatAgentBindProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { DialogStatus } from "@/core/global/Constant";

@Component
export default class RemarkDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.remarkDialogData.form;

    get rules() {
        return {};
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdateReamrk();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

::v-deep .el-dialog__body {
    padding: 8px 5px;
}
.desc {
    font-size: 18px;
    .el-icon-warning {
        color: #ffba00;
        margin-right: 5px;
    }
}
</style>
