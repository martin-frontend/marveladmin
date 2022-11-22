<template>
    <div>
        <el-button
            v-if="checkUnique(unique.sms_store)"
            class="item"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="handlerCreate"
            >{{ LangUtil("新增") }}</el-button
        >
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SmsProxy from "../proxy/SmsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class SmsHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: SmsProxy = this.getProxy(SmsProxy);

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
