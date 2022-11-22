<template>
    <div class="header-content">
        <div class="group">
            <div>
                <el-button @click="handlerCreate()" type="primary" icon="el-icon-circle-plus-outline">
                    {{ LangUtil("新增") }}
                </el-button>
                <!-- <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ LangUtil('查询') }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil('重置') }}
                </el-button> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SystemSmsAreaCodeProxy from "../proxy/SystemSmsAreaCodeProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class SystemSmsAreaCodeHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: SystemSmsAreaCodeProxy = this.getProxy(SystemSmsAreaCodeProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
