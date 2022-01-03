<template>
    <el-dialog
        :title="myProxy.imgBatchDialogData.status"
        :visible.sync="myProxy.imgBatchDialogData.bShow"
        width="50%"
        class="dialog"
        :close-on-click-modal="false"
        :show-close="false"
    >
        <el-progress :percentage="myProxy.percentage"></el-progress>
    </el-dialog>
</template>
<script lang='ts'>
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import SystemResourceProxy from "../../proxy/SystemResourceProxy";

@Component
export default class ProgressDialog extends AbstractView {
    // proxy
    private myProxy: SystemResourceProxy = this.getProxy(SystemResourceProxy);
}
</script>
<style scoped lang='scss'>
@import "@/styles/common.scss";
.dialog {
    padding-top: 8rem;
}
</style>