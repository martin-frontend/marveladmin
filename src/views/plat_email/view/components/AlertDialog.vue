<template>
    <el-dialog :title="$t('plat_email.userError')" class="alert_dialog" append-to-body :visible.sync="dialogData.bShow">
        <p>{{ dialogData.form.content }}</p>
        <div class="btn"><el-button type="primary" @click="dialogData.bShow = false">{{ $t("plat_email.confirm") }}</el-button></div></el-dialog
    >
</template>
<script lang='ts'>
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatEmailProxy from "../../proxy/PlatEmailProxy";

@Component
export default class AlertDialog extends AbstractView {
    // proxy
    private myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    // proxy property
    private dialogData = this.myProxy.alertDialogData;
}
</script>
<style scoped lang='scss'>
@import "@/styles/common.scss";
.alert_dialog {
    p {
        line-height: 24px;
    }
    .btn {
        text-align: right;
    }
}
</style>