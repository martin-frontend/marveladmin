<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
        />
        <div class="editor-container config">
            {{ LangUtil("落地页文件配置") }}
            <el-form ref="form" class="border" :model="form" v-loading="net_status.loading">
                <json-editor ref="jsonEditor" v-model="form.load_page_extend" />
            </el-form>
            <el-button @click="handlerSave" icon="el-icon-circle-plus-outline" type="primary" class="item save">{{
                LangUtil("确认保存")
            }}</el-button>
        </div>

        <div class="row domain-config">
            {{ LangUtil("落地页域名配置")
            }}<el-button @click="handlerCreate" icon="el-icon-circle-plus-outline" type="primary" class="item create">{{
                LangUtil("新增")
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatLoadPageDomainProxy from "../proxy/PlatLoadPageDomainProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import JsonEditor from "@/components/JsonEditor/index.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        JsonEditor,
        SearchSelect,
    },
})
export default class PlatLoadPageDomainHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatLoadPageDomainProxy = this.getProxy(PlatLoadPageDomainProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    form = this.myProxy.form;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
    handlerSave() {
        this.myProxy.onSaveLoadPage();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.config {
    position: relative;
    margin-top: 10px;
    .save {
        position: absolute;
        right: 60px;
        bottom: 20px;
    }
    .border {
        padding-left: 0px;
        margin-top: 10px;
        border: 1px solid #dfe6ec;
    }
}
.domain-config {
    margin-top: 30px;
}
.create {
    margin-left: 10px;
}
</style>
