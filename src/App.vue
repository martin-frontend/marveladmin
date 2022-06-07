<template>
    <div id="app">
        <!-- <audio src="@/assets/sound/12025.mp3" id="eventAudio"></audio> -->
        <div v-if="GlobalVar.lang == 'zh_CN'">
            <audio src="@/assets/sound/recharge_order.mp3" id="orderAudio"></audio>
            <audio src="@/assets/sound/withdraw.mp3" id="withdrawAudio"></audio>
        </div>
        <div v-if="GlobalVar.lang == 'vi_VN'">
            <audio src="@/assets/sound/vi/withdraw.mp3" id="withdrawAudio"></audio>
        </div>
        <PreviewImageDialog />
        <CommonLangDialog />
        <CommonLangImgDialog />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractView from "./core/abstract/AbstractView";
import MessagePanel from "./views/layout/view/components/MessagePanel.vue";
import AppMediator from "@/AppMediator";
import PreviewImageDialog from "@/components/PreviewImageDialog.vue";
import i18n from "@/lang";
import GlobalVar from "./core/global/GlobalVar";
import CommonLangDialog from "./views/language_dialog/view/CommonLangDialog.vue";
import CommonLangImgDialog from "./views/lang_img_dialog/view/CommonLangImgDialog.vue"

@Component({
    components: {
        MessagePanel,
        PreviewImageDialog,
        CommonLangDialog,
        CommonLangImgDialog,
    },
})
export default class App extends AbstractView {
    constructor() {
        super(AppMediator);
    }
    private GlobalVar = GlobalVar;
    private title = i18n.t("dashboard.untreated");
    private messageNotify: any;
    showMessagePanel(data: any) {
        if (this.messageNotify) this.messageNotify.close();
        this.messageNotify = this.$notify({
            title: this.title,
            offset: 80,
            duration: 20000,
            type: "info",
            message: this.$createElement(MessagePanel),
        });
    }
}
</script>

<style lang="scss">
body .el-table th.gutter {
    display: table-cell !important;
}
</style>
<style scoped lang="scss">
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
    border-color: black;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
    background-color: black;
}
</style>
