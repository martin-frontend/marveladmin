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
            <el-table-column prop="id" :label="`${tableColumns.id.name}`" class-name="status-col" width="60px">
            </el-table-column>
            <el-table-column
                prop="coin_name_unique"
                :label="`${tableColumns.coin_name_unique.name}`"
                class-name="status-col"
                width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="coin_name"
                :label="`${tableColumns.coin_name.name}`"
                class-name="status-col"
                width="90px"
            >
            </el-table-column>
            <el-table-column prop="icon" :label="`${tableColumns.icon.name}`" class-name="status-col" width="120px">
            </el-table-column>
            <el-table-column
                prop="icon_url"
                :label="`${tableColumns.icon_url.name}`"
                class-name="status-col"
                width="120px"
            >
                <template slot-scope="{ row }">
                    <img
                        style="width: 40px; height: 40px; object-fit: contain"
                        :src="row.icon_url"
                        v-if="row.icon_url"
                    />
                    <span v-if="!row.icon_url">-</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="coin_tag"
                :label="`${tableColumns.coin_tag.name}`"
                class-name="status-col"
                width="150px"
            >
            </el-table-column>
            <el-table-column
                prop="is_digital_currency"
                :label="`${tableColumns.is_digital_currency.name}`"
                class-name="status-col"
                ><template slot-scope="{ row }">
                    <div>{{ tableColumns.is_digital_currency.options[row.is_digital_currency] }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="remark" :label="`${tableColumns.remark.name}`" class-name="status-col">
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
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
import BlockSystemCoinsProxy from "../proxy/BlockSystemCoinsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class BlockSystemCoinsBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: BlockSystemCoinsProxy = this.getProxy(BlockSystemCoinsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
