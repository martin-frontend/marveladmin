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
            <SearchInput :title="LangUtil('越南文')" v-model="listQuery.vi_VN" />
            <SearchInput :title="tableColumns.en_EN.name" v-model="listQuery.en_EN" />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
        <div class="btn-group">
            <div class="row">
                <el-button @click="handlerCreate" type="primary" class="item">{{ LangUtil("新增") }}</el-button>
                <input
                    style="margin-left: 8px"
                    v-show="false"
                    ref="excel-upload-input"
                    class="excel-upload-input"
                    type="file"
                    accept=".xlsx, .xls"
                    @change="handleClick"
                />

                <el-button style="margin-left: 8px" @click="heandlerImport()" type="primary" icon="">
                    <!-- 导入 -->
                    {{ LangUtil("导入") }}
                </el-button>

                <el-button @click="heandlerExport()" type="primary">{{ LangUtil("导出") }}</el-button>

                <el-button style="margin-left: 8px" @click="heandlerGenerate()" type="primary" icon="">
                    <!-- 生成语言包 -->
                    {{ LangUtil("生成语言包") }}
                </el-button>
            </div>
            <div>
                <el-button @click="heandlerTranslateAllLang()" type="primary">{{
                    LangUtil("服务器语言自动插入")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: SystemLangProxy = this.getProxy(SystemLangProxy);
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
    heandlerExport() {
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
    heandlerImport() {
        (this.$refs["excel-upload-input"] as any).click();
    }

    //生成语言包
    heandlerGenerate() {
        this.myProxy.generate();
    }

    heandlerTranslateAllLang() {
        this.myProxy.translateAllLang();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn-group {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}
</style>
