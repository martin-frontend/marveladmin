<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.type.name"
                :options="tableColumns.type.options"
                v-model="listQuery.type"
            />
            <SearchInput :title="tableColumns.key.name" v-model="listQuery.key" />
            <SearchInput :title="tableColumns.zh_CN.name" v-model="listQuery.zh_CN" />
            <SearchInput :title="tableColumns.en_EN.name" v-model="listQuery.en_EN" />
            <div class="btn-group">
                <div>
                    <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                        $t("common.search")
                    }}</el-button>
                    <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                        $t("common.reset")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 8px">
            <el-button @click="handlerCreate" type="primary" class="item">{{ $t("common.create") }}</el-button>
            <input
                style="margin-left: 8px"
                v-show="false"
                ref="excel-upload-input"
                class="excel-upload-input"
                type="file"
                accept=".xlsx, .xls"
                @change="handleClick"
            />

            <el-button style="margin-left: 8px" @click="heandlerImport()" type="primary" icon="">导入</el-button>

            <el-button @click="heandlerExport()" type="primary">{{ $t("statistic_plat_days.export") }}</el-button>

            <el-button style="margin-left: 8px" @click="heandlerGenerate()" type="primary" icon="">生成语言包</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SystemLangProxy from "../proxy/SystemLangProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import { readerData } from "@/core/global/Excel";

@Component({
    components: {
        SearchSelect,
        SearchInput,
    },
})
export default class SystemLangHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: SystemLangProxy = this.getProxy(SystemLangProxy);
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
    private heandlerExport() {
        this.myProxy.onQueryAll();
    }

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        this.myProxy.languageImport(excel.results);
    }
    // 汇入用户excel
    private heandlerImport() {
        (this.$refs["excel-upload-input"] as any).click();
    }

    //生成语言包
    heandlerGenerate() {
        this.myProxy.generate();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn-group {
    flex: 1;
    display: flex;
    justify-content: space-between;
}
</style>
