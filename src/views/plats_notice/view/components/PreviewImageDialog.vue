<template>
    <el-dialog :title="$t('common.imagePreview')" :visible.sync="myProxy.previewImageDialogData.bShow">
        <img :src="previewImage" v-loading="net_status.loading" />
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatsNoticeProxy from "@/views/plats_notice/proxy/PlatsNoticeProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatsNoticeDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatsNoticeProxy = this.getProxy(PlatsNoticeProxy);

    get previewImage() {
        return this.myProxy.previewImageDialogData.url;
    }
}
</script>

<style scoped lang="scss"></style>
