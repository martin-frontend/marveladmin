<template>
    <div>
        <el-button v-if="true" class="item" type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate">{{
            LangUtil("新增")
        }}</el-button>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import EmailVendorProxy from "../proxy/EmailVendorProxy";

@Component
export default class EmailVendorHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: EmailVendorProxy = this.getProxy(EmailVendorProxy);

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
