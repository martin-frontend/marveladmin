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
            {{$t("plat_load_page_domain.load_page_json_config")}}
            <el-form ref="form" class="border" :model="form" v-loading="net_status.loading">
                <json-editor ref="jsonEditor" v-model="form.load_page_extend" />
            </el-form>
            <el-button @click="handlerSave" icon="el-icon-circle-plus-outline" type="primary" class="item save">{{
                $t("common.save")
            }}</el-button>
        </div>

        <div class="row domain-config">
             {{$t("plat_load_page_domain.load_page_domain_config")}}<el-button
                @click="handlerCreate"
                icon="el-icon-circle-plus-outline"
                type="primary"
                class="item create"
                >{{ $t("common.create") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatLoadPageDomainProxy = this.getProxy(PlatLoadPageDomainProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    private form = this.myProxy.form;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
    private handlerSave() {
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
