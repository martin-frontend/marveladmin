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
            <el-table-column prop="key" :label="tableColumns.key.name" align="center" min-width="120"></el-table-column>

            <!-- 参数类型 -->
            <el-table-column prop="type" :label="tableColumns.type.name" align="center" min-width="90">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="zh_CN"
                :label="tableColumns.zh_CN.name"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="zh_TW"
                :label="tableColumns.zh_TW.name"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="en_EN"
                :label="tableColumns.en_EN.name"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="th_TH"
                :label="tableColumns.th_TH.name"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="vi_VN"
                :label="tableColumns.vi_VN.name"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="jp_JP"
                :label="tableColumns.jp_JP.name"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="ar_AR"
                :label="tableColumns.ar_AR.name"
                align="center"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="ko_Kr"
                :label="tableColumns.ko_Kr.name"
                align="center"
                min-width="120"
            ></el-table-column>

            <!-- 动态添加无效果 -->
            <!-- <div v-for="(value, key) in tableColumns.language.options" :key="key" :value="value">
                <el-table-column 
                    :label="value" 
                    prop = “key”
                    align="center"
                    min-width="120">
                </el-table-column>
            </div> -->

            <el-table-column :label="$t('common.operating')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ $t("common.update") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatLangProxy from "../proxy/PlatLangProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatLangBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatLangProxy = this.getProxy(PlatLangProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.align-left {
    text-align: left;
}
</style>
