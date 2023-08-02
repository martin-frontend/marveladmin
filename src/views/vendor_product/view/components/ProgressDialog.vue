<template>
    <el-dialog
        :title="'progress'"
        :visible.sync="myProxy.exportData.isExportExcel"
        width="50%"
        class="dialog"
        :close-on-click-modal="false"
        :show-close="false"
    >
        <el-progress :percentage="myProxy.percentage"></el-progress>
    </el-dialog>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import VendorProductProxy from "../../proxy/VendorProductProxy";

@Component
export default class ProgressDialog extends AbstractView {
    // proxy
    private myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.dialog {
    padding-top: 8rem;
}
</style>
