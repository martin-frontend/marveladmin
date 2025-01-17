<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column class-name="status-col" :label="tableColumns.id.name" prop="id" min-width="70px">
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.activity_name.name"
                prop="activity_name"
                min-width="180px"
            >
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.show_types.name"
                prop="show_types"
                min-width="200px"
            >
                <template slot-scope="{ row }"> {{ getShowTypes(row.show_types) }} </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.settlement_type.name"
                prop="settlement_type"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.settlement_type.options[row.settlement_type] }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.settlement_period.name"
                prop="settlement_period"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.settlement_period.options[row.settlement_period] }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.bonus_multiple.name"
                prop="bonus_multiple"
                min-width="100px"
            >
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.plat_id_count.name"
                prop="plat_id_count"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.is_once.name" prop="is_once" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.is_once.options[row.is_once] }}
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" :label="LangUtil('操作')" :width="width">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.plat_activity_model_show)"
                        size="mini"
                        type="primary"
                        @click="onCopyModule(row)"
                    >
                        {{ LangUtil("复制模板") }}
                    </el-button>
                    <el-button size="mini" type="danger" @click="onSettingPlat(row)">
                        {{ LangUtil("平台设置") }}
                    </el-button>
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.plat_activity_model_show)"
                        type="danger"
                        @click="handleEdit(row)"
                    >
                        {{ LangUtil("編輯模板") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityModelProxy from "../proxy/PlatActivityModelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatActivityModelBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    getShowTypes(types: number[]) {
        let typeNames = "";
        types.forEach((item, index) => {
            const option = this.tableColumns.show_types.options[item];
            if (option) {
                typeNames += index > 0 ? "," + option : option;
            }
        });
        return typeNames;
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    onCopyModule(data: any) {
        this.myProxy.showCopyDialog(DialogStatus.create, data);
    }
    onSettingPlat(data: any) {
        this.myProxy.showPlatSettingDialog(data.id);
    }

    get width() {
        let _w: string = "300px";
        if (Cookies.get("language") === "vi") {
            _w = "370px";
        }
        return _w;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
