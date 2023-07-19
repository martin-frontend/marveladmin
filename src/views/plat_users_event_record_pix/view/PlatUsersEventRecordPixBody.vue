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
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            :span-method="spanMethod"
        >
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns["plat_id"].options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['channel_id'].name"
                prop="channel_id"
                min-width="100px"
            ></el-table-column>

            <el-table-column :label="tableColumns['event_type'].options[12]" :prop="getName_count(12)">
            </el-table-column>

            <el-table-column
                :label="tableColumns['coin_name_unique'].name"
                prop="coin_name_unique"
                min-width="100px"
            ></el-table-column>

            <template v-for="(item, index) in myProxy.sortList" >
                <el-table-column v-if="item != 12" :key="index" :label="tableColumns['event_type'].options[item]">
                    <el-table-column :label="LangUtil('事件数')" :prop="getName_count(item)"> </el-table-column>
                    <el-table-column  :label="LangUtil('金额')" :prop="getName_gold(item)">
                    </el-table-column>
                </el-table-column>
            </template>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersEventRecordPixProxy from "../proxy/PlatUsersEventRecordPixProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { Row } from "element-ui";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUsersEventRecordPixBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersEventRecordPixProxy = this.getProxy(PlatUsersEventRecordPixProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    // eventList = this.myProxy.tableData.eventList;
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    getName_gold(item: any) {
        return `eventtype_${item}_gold`;
    }
    getName_count(item: any) {
        return `eventtype_${item}_count`;
    }

    chickIsSame(obj_1: any, obj_2: any): boolean {
        return obj_1.plat_id == obj_2.plat_id && obj_1.channel_id == obj_2.channel_id;
    }

    /**栏位合并 */
    spanMethod({ row, column, rowIndex, columnIndex }: { [key: string]: number }) {
        // if (rowIndex === 0) {
        //     let mergeCols: number = 2;
        //     if (columnIndex === 0) {
        //         return {
        //             rowspan: 5, //合并的行数
        //             colspan: mergeCols, //合并的列数，设为0则直接不显示
        //         };
        //     } else if (columnIndex < mergeCols) {
        //         //  隐藏单元格，否则单元格会错位，必不可少
        //         return {
        //             rowspan: 0,
        //             colspan: 0,
        //         };
        //     }
        // }
        if (column.label === this.tableColumns.plat_id.name || column.label === this.tableColumns.channel_id.name || column.label === this.tableColumns['event_type'].options[12]) {
            let list = this.tableData;
            let len = list.length;
            let _row = 0;

            if (rowIndex - 1 >= 0 && this.chickIsSame(list[rowIndex], list[rowIndex - 1])) {
                return {
                    // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                    rowspan: 0,
                    colspan: 0,
                };
            }
            for (let j = rowIndex; j < len; j++) {
                if (this.chickIsSame(list[rowIndex], list[j])) {
                    _row++;
                } else break;
            }
            const _col = _row > 0 ? 1 : 0;
            return {
                // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                rowspan: _row,
                colspan: _col,
            };
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
