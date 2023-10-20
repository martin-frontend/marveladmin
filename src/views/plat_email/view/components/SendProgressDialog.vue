<template>
    <el-dialog
        :title="'progress'"
        :visible.sync="myProxy.sendData.bShow"
        width="50%"
        class="dialog"
        :close-on-click-modal="false"
        :show-close="false"
    >
        <el-progress :percentage="myProxy.sendPercentage"></el-progress>
        <div class="group">
            <el-button @click="cancel" type="primary">
                {{ LangUtil("取消") }}
            </el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatEmailProxy from "../../proxy/PlatEmailProxy";
import LangUtil from "@/core/global/LangUtil";
import { MessageBox } from "element-ui";

@Component
export default class SendProgressDialog extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);

    cancel() {
        MessageBox.confirm(String(this.LangUtil("确定要取消发送邮件")), String(this.LangUtil("提示")), {
            confirmButtonText: String(this.LangUtil("确定")),
            cancelButtonText: String(this.LangUtil("取消")),
            type: "warning",
        })
            .then(() => {
                this.myProxy.resetSendData();
            })
            .catch(() => {});
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.dialog {
    padding-top: 8rem;
}
.group {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
