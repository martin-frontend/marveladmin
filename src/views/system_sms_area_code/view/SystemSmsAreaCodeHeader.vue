<template>
    <div class="header-content">
        <div class="group">
            <div>
                <el-button @click="handlerCreate()" type="primary" icon="el-icon-circle-plus-outline">
                    {{ $t("common.create") }}
                </el-button>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ $t("common.search") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ $t("common.reset") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SystemSmsAreaCodeProxy from "../proxy/SystemSmsAreaCodeProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class SystemSmsAreaCodeHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: SystemSmsAreaCodeProxy = this.getProxy(SystemSmsAreaCodeProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
