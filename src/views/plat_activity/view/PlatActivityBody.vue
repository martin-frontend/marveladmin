<template>
    <div>
        <el-tabs type="border-card" v-model="listQuery.model_type" @tab-click="handleClick">
            <el-tab-pane
                :label="value"
                :name="key"
                v-for="(value, key) in tableColumns['model_type'].options"
                :key="key"
            >
                <el-table
                    :data="tableData"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    size="mini"
                    v-loading="net_status.loading"
                >
                    <el-table-column
                        :label="tableColumns['id'].name"
                        width="65px"
                        prop="id"
                        class-name="status-col"
                    ></el-table-column>
                    <el-table-column :label="tableColumns['plat_id'].name" min-width="100px" align="center">
                        <template slot-scope="{ row }">
                            {{ tableColumns.plat_id.options[row.plat_id] }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="tableColumns['activity_name'].name"
                        prop="activity_name"
                        align="center"
                        min-width="100px"
                    ></el-table-column>
                    <el-table-column
                        :label="tableColumns['activity_category'].name"
                        prop="activity_category"
                        align="center"
                        min-width="100px"
                    ></el-table-column>
                    <el-table-column
                        :label="tableColumns['publish_status'].name"
                        class-name="status-col"
                        align="center"
                        min-width="80px"
                    >
                        <template slot-scope="{ row }">
                            {{ tableColumns["publish_status"].options[row.publish_status] }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="tableColumns['process_status'].name"
                        class-name="status-col"
                        align="center"
                        width="80px"
                    >
                        <template slot-scope="{ row }">
                            {{ tableColumns["process_status"].options[row.process_status] }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="tableColumns['start_time'].name"
                        prop="start_time"
                        class-name="status-col"
                        align="center"
                        min-width="100px"
                    ></el-table-column>
                    <el-table-column
                        :label="tableColumns['end_time'].name"
                        prop="end_time"
                        class-name="status-col"
                        align="center"
                        min-width="100px"
                    ></el-table-column>
                    <el-table-column :label="tableColumns['model_id'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            {{ tableColumns["model_id"].options[row.model_id] || $t("plat_activity.customize") }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="tableColumns['award_type'].name" align="center" width="80px">
                        <template slot-scope="{ row }">
                            {{ tableColumns["award_type"].options[row.award_type] || "-" }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="tableColumns['award_timing'].name" align="center" width="85px">
                        <template slot-scope="{ row }">
                            {{ row.model_id ? row.award_timing : "-" }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="tableColumns['bonus_multiple'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            {{ row.model_id ? row.bonus_multiple : "-" }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.operating')" width="110px" class-name="status-col">
                        <template slot-scope="{ row }">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(row)"
                                v-if="checkUnique(unique.plat_activity_show)"
                                >{{ $t("common.update") }}</el-button
                            >
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.sort')" class-name="status-col" :width="width">
                        <template slot-scope="{ row }">
                            <div v-if="checkUnique(unique.plat_activity_order)">
                                <el-button size="mini" @click="handlerOrder(row.id, 1)">{{
                                    $t("common.setTop")
                                }}</el-button>
                                <el-button size="mini" @click="handlerOrder(row.id, 2)">{{
                                    $t("common.setBottom")
                                }}</el-button>
                                <el-button size="mini" icon="el-icon-top" @click="handlerOrder(row.id, 3)"></el-button>
                                <el-button
                                    size="mini"
                                    icon="el-icon-bottom"
                                    @click="handlerOrder(row.id, 4)"
                                ></el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityProxy from "../proxy/PlatActivityProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatActivityBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatActivityProxy = this.getProxy(PlatActivityProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    get width() {
        let _w: any = "";
        if (this.myProxy.tableData.lang === "zh") {
            _w = "280px";
        } else if (this.myProxy.tableData.lang === "vi") {
            _w = "330px";
        }
        return _w;
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handleClick(type: any) {
        this.listQuery.model_type = type.name;
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerOrder(id: any, opt: string) {
        this.myProxy.tableData.orderData.id = id;
        this.myProxy.tableData.orderData.opt = opt;
        this.myProxy.tableData.orderData.plat_id = this.listQuery.plat_id;
        this.myProxy.onOrderList();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
