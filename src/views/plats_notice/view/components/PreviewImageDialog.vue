<template>
    <el-dialog :title="LangUtil('图片预览')" :visible.sync="myProxy.previewImageDialogData.bShow">
        <img :src="previewImage" v-loading="net_status.loading" />
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatsNoticeProxy from "@/views/plats_notice/proxy/PlatsNoticeProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatsNoticeDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatsNoticeProxy = this.getProxy(PlatsNoticeProxy);

    get previewImage() {
        return this.myProxy.previewImageDialogData.url;
    }
}
</script>

<style scoped lang="scss"></style>
