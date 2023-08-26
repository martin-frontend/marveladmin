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
                    :header-cell-style="{
                        'text-align': 'center',
                    }"
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
                            {{ tableColumns["model_id"].options[row.model_id] || LangUtil("自定义") }}
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
                    <el-table-column
                        v-if="listQuery.model_type == 12"
                        :label="tableColumns['prize_pool_amount'].name"
                        width="210px"
                        class-name="status-col"
                    >
                        <template slot-scope="{ row }">
                            <div
                                v-if="isWaterRate && editWaterRateID == row.id"
                                class="d-flex align-center justify-center"
                            >
                                <el-input
                                    v-model="editWaterRateValue"
                                    style="width: 120px; margin-right: 10px"
                                    oninput="value=value.replace(/[^\d]/g,'');"
                                ></el-input>
                                <div class="d-flex flex-column align-center">
                                    <el-button
                                        class="item"
                                        type="warning"
                                        size="mini"
                                        style="margin-left: 2px;"
                                        @click="
                                            editWaterRateID = null;
                                            isWaterRate = false;
                                        "
                                        >{{ LangUtil("取消") }}</el-button
                                    >
                                    <el-button
                                        class="item"
                                        type="danger"
                                        size="mini"
                                        @click="onUpdateAwardPool(row, false)"
                                        >{{ LangUtil("减少") }}</el-button
                                    >

                                    <el-button
                                        class="item"
                                        type="success"
                                        size="mini"
                                        @click="onUpdateAwardPool(row)"
                                        >{{ LangUtil("增加") }}</el-button
                                    >
                                </div>
                            </div>
                            <div v-else>
                                <span style="margin-right: 10px">{{ row.prize_pool_amount }}</span>
                                <el-button
                                    class="item"
                                    type="primary"
                                    size="mini"
                                    @click="
                                        editWaterRateID = row.id;
                                        isWaterRate = true;
                                        editWaterRateValue = '0';
                                    "
                                    >{{ LangUtil("编辑") }}</el-button
                                >
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        aling="left"
                        :label="tableColumns['languages'].name"
                        prop="languages"
                        min-width="260px"
                    >
                        <template slot-scope="{ row }">
                            <el-tag v-for="item of row.languages" :key="item">{{
                                tableColumns["languages"].options[item]
                            }}</el-tag>
                            <el-button class="item ml-1" type="primary" size="mini" @click="onUpdateLanguages(row)">{{
                                LangUtil("编辑")
                            }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="LangUtil('操作')" width="110px" class-name="status-col">
                        <template slot-scope="{ row }">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(row)"
                                v-if="checkUnique(unique.plat_activity_show)"
                                >{{ LangUtil("编辑") }}</el-button
                            >
                        </template>
                    </el-table-column>
                    <el-table-column :label="LangUtil('排序')" class-name="status-col" :width="width">
                        <template slot-scope="{ row }">
                            <div v-if="checkUnique(unique.plat_activity_order)">
                                <el-button size="mini" @click="handlerOrder(row.id, 1)">{{
                                    LangUtil("置顶")
                                }}</el-button>
                                <el-button size="mini" @click="handlerOrder(row.id, 2)">{{
                                    LangUtil("置底")
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
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityProxy = this.getProxy(PlatActivityProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    editWaterRateID: any = null;
    isWaterRate = false;
    editWaterRateValue = "";

    handlerPageSwitch(page: number) {
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

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handleClick(type: any) {
        this.listQuery.model_type = type.name;
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerOrder(id: any, opt: string) {
        this.myProxy.tableData.orderData.id = id;
        this.myProxy.tableData.orderData.opt = opt;
        this.myProxy.tableData.orderData.plat_id = this.listQuery.plat_id;
        this.myProxy.onOrderList();
    }

    onUpdateLanguages(row: any) {
        this.myProxy.showLanguagesDialog(DialogStatus.update, row);
    }
    onUpdateAwardPool(data: any, isAdd: boolean = true) {
        const obj = {
            id: data.id,
            pool_prize_update: isAdd ? Number(this.editWaterRateValue) : Number(this.editWaterRateValue) * -1,
        };
        this.isWaterRate = false;
        this.myProxy.admin_plat_activity_ball_prize_update(obj);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.ml-1 {
    margin-left: 12px;
}
.d-flex {
    display: flex;
}
.align-center {
    align-items: center;
}
.flex-column {
    flex-direction: column;
}
.justify-center {
    justify-content: center;
}
</style>
