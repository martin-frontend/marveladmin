<template>
    <div>
        <el-button v-if="true" class="item" type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate"
            >{{ $t("common.create") }}</el-button
        >
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import EmailTemplateProxy from "../proxy/EmailTemplateProxy";

@Component
export default class EmailTemplateHeader extends AbstractView {
     //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: EmailTemplateProxy = this.getProxy(EmailTemplateProxy);

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
