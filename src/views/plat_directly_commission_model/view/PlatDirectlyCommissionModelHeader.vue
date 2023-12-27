<template>
    <div class="header-content">
        <div class="group">
            <div class="group">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate()">
                    {{ LangUtil("新增") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatDirectlyCommissionModelProxy from "../proxy/PlatDirectlyCommissionModelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {},
})
export default class PlatDirectlyCommissionModelHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatDirectlyCommissionModelProxy = this.getProxy(PlatDirectlyCommissionModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;

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
