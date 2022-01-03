<template>
    <div class="header-content">
        <div class="group">
            <el-button
                v-if="checkUnique(unique.system_fag_store)"
                @click="handlerCreate()"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                >{{ $t("common.create") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SystemFagProxy from "../proxy/SystemFagProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class SystemFagHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: SystemFagProxy = this.getProxy(SystemFagProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
