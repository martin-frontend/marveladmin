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
        >
            <el-table-column
                align="center"
                :label="tableColumns['lobby_vendor_product_id'].name"
                prop="lobby_vendor_product_id"
                min-width="80px"
            ></el-table-column>
            <el-table-column align="center" :label="tableColumns['vendor_id'].name" prop="vendor_id" min-width="120px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_id.options[row.vendor_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :label="tableColumns['vendor_product_name'].name"
                prop="vendor_product_name"
                min-width="120px"
            ></el-table-column>
            <el-table-column align="center" :label="tableColumns['vendor_type'].name" min-width="80px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_type.options[row.vendor_type] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :label="tableColumns['ori_product_id'].name"
                prop="ori_product_id"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                align="center"
                :label="tableColumns['is_activity_task_water'].name"
                prop="is_activity_task_water"
                min-width="120px"
            >
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.is_activity_task_water"
                        :active-value="1"
                        :inactive-value="98"
                        @change="onSwitchTaskWater(row)"
                    ></el-switch>
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="water_rate"
                :label="tableColumns['water_rate'].name"
                min-width="220px"
            >
                <template slot-scope="{ row }">
                    <div v-if="isWaterRate && editWaterRateID == row.lobby_vendor_product_id">
                        <el-input
                            v-model="editWaterRateValue"
                            style="width: 60px; margin-right: 10px"
                            oninput="value=value.replace(/[^\d]/g,'');if(value>100) value=100"
                        ></el-input>
                        <el-button
                            class="item"
                            type="warning"
                            size="mini"
                            @click="
                                editWaterRateID = null;
                                isWaterRate = false;
                            "
                            >{{ LangUtil("取消") }}</el-button
                        >
                        <el-button class="item" type="success" size="mini" @click="onEditWaterRate(row)">{{
                            LangUtil("确定")
                        }}</el-button>
                    </div>
                    <div v-else>
                        <span style="margin-right: 10px">{{ (row.water_rate * 100) >> 0 }}%</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editWaterRateID = row.lobby_vendor_product_id;
                                isWaterRate = true;
                                editWaterRateValue = (row.water_rate * 100) >> 0;
                            "
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="water_rate_accelerate"
                :label="tableColumns['water_rate_accelerate'].name"
                min-width="220px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div v-if="isWaterRateAccelerate && editWaterRateID == row.lobby_vendor_product_id">
                        <el-input
                            v-model="editWaterRateAccelerateValue"
                            style="width: 60px; margin-right: 10px"
                            oninput="value=value.replace(/[^\d]/g,'');if(value>100) value=100"
                        ></el-input>
                        <el-button
                            class="item"
                            type="warning"
                            size="mini"
                            @click="
                                editWaterRateID = null;
                                isWaterRateAccelerate = false;
                            "
                            >{{ LangUtil("取消") }}</el-button
                        >
                        <el-button
                            class="item"
                            type="success"
                            size="mini"
                            @click="onEditWaterRateAccelerateValue(row)"
                            >{{ LangUtil("确定") }}</el-button
                        >
                    </div>
                    <div v-else>
                        <span style="margin-right: 10px">{{ (row.water_rate_accelerate * 100) >> 0 }}%</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editWaterRateID = row.lobby_vendor_product_id;
                                isWaterRateAccelerate = true;
                                editWaterRateAccelerateValue = (row.water_rate_accelerate * 100) >> 0;
                            "
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="icon" :label="tableColumns['icon'].name" min-width="220px" align="center">
                <template slot-scope="{ row }">
                    <div v-if="isIcon && editWaterRateID == row.lobby_vendor_product_id">
                        <el-input v-model="editIcon" style="width: 60px; margin-right: 10px"></el-input>
                        <el-button
                            class="item"
                            type="warning"
                            size="mini"
                            @click="
                                editWaterRateID = null;
                                isIcon = false;
                            "
                        >
                            {{ LangUtil("取消") }}
                        </el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditIcon(row)">
                            {{ LangUtil("确定") }}
                        </el-button>
                    </div>
                    <div v-else>
                        <span style="margin-right: 10px">{{ row.icon }}</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editWaterRateID = row.lobby_vendor_product_id;
                                isIcon = true;
                                editIcon = row.icon;
                            "
                        >
                            {{ LangUtil("编辑") }}
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column aling="left" :label="tableColumns['languages'].name" prop="languages" min-width="260px">
                <template slot-scope="{ row }">
                    <el-tag v-for="item of row.languages" :key="item">{{
                        tableColumns["languages"].options[item]
                    }}</el-tag>
                    <el-button class="item ml-1" type="primary" size="mini" @click="onUpdateLanguages(row)">{{
                        LangUtil("编辑")
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                align="left"
                :label="tableColumns['vendor_languages'].name"
                prop="vendor_languages"
                min-width="260px"
            >
                <template slot-scope="{ row }">
                    <el-tag v-for="item of row.vendor_languages" :key="item">{{
                        tableColumns["vendor_languages"].options[item]
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('状态')" class-name="status-col" width="240px">
                <template slot-scope="{ row }">
                    <el-radio-group v-model="row.status" @change="onUpdateStatus(row)" class="row_status">
                        <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">{{
                            value
                        }}</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column v-if="!isCantEditOrderno" :label="LangUtil('排序')" class-name="status-col" width="300px">
                <template slot-scope="{ row }">
                    <div>
                        <el-button
                            size="mini"
                            @click="handlerOpt(row, { opt: 1 })"
                            :disabled="row.index_no == 1 || isCantEditOrderno"
                            >{{ LangUtil("置顶") }}
                        </el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-top"
                            :disabled="row.index_no == 1 || isCantEditOrderno"
                            @click="onUpdate(row, 3)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-bottom"
                            @click="onUpdate(row, 4)"
                            :disabled="isCantEditOrderno"
                        ></el-button>
                        <el-button size="mini" @click="handlerOpt(row, { opt: 2 })" :disabled="isCantEditOrderno">{{
                            LangUtil("置底")
                        }}</el-button>
                    </div>

                    <div style="margin-top: 10px;">
                        <div v-if="isorderno && editOrdernoID == row.lobby_vendor_product_id">
                            <el-input
                                v-model="editOrdernoValue"
                                style="width: 60px; margin-right: 10px"
                                oninput="value=value.replace(/[^\d]/g,'');"
                            ></el-input>
                            <el-button
                                class="item"
                                type="warning"
                                size="mini"
                                @click="
                                    editOrdernoID = null;
                                    isorderno = false;
                                "
                                >{{ LangUtil("取消") }}</el-button
                            >
                            <el-button class="item" type="success" size="mini" @click="onEditOrderNo(row)">{{
                                LangUtil("确定")
                            }}</el-button>
                        </div>
                        <div v-else>
                            <span style="margin-right: 10px">{{ row.index_no }}</span>
                            <el-button
                                class="item"
                                type="primary"
                                size="mini"
                                :disabled="isCantEditOrderno"
                                @click="
                                    editOrdernoID = row.lobby_vendor_product_id;
                                    isorderno = true;
                                    editOrdernoValue = row.index_no;
                                "
                                >{{ LangUtil("编辑") }}</el-button
                            >
                        </div>
                    </div>
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
import LobbyVendorProductsProxy from "../proxy/LobbyVendorProductsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
                99: "info",
            };
            return statusMap[status];
        },
    },
})
export default class VendorProductBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: LobbyVendorProductsProxy = this.getProxy(LobbyVendorProductsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    editWaterRateID: any = null;
    isWaterRate = false;
    isWaterRateAccelerate = false;
    isIcon = false;
    editWaterRateValue = "";
    editWaterRateAccelerateValue = "";
    editIcon = "";

    editOrdernoID: any = null;
    isorderno = false;
    editOrdernoValue = "";

    /** 不能编辑*/
    get isCantEditOrderno() {
        return !this.myProxy.lastTimeListQuery || !this.myProxy.lastTimeListQuery.vendor_id;
        //return (!this.myProxy.listQuery.vendor_id || !this.myProxy.listQuery.vendor_id.trim());
    }
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    onUpdate(row: any, opt: any, index_no: any = null) {
        this.myProxy.tableData.ctrlData.lobby_vendor_product_id = row.lobby_vendor_product_id;
        this.myProxy.tableData.ctrlData.opt = opt;
        this.myProxy.tableData.ctrlData.status = "";
        if (index_no) {
            this.myProxy.tableData.ctrlData.index_no = index_no;
        } else {
            this.myProxy.tableData.ctrlData.index_no = index_no;
        }
        this.myProxy.onUpdate();
    }

    /**更新排序 */
    handlerOpt(row: any, value: any) {
        const { opt } = value;
        this.onUpdate(row, opt);
    }

    onUpdateStatus(row: any) {
        this.myProxy.tableData.ctrlData.lobby_vendor_product_id = row.lobby_vendor_product_id;
        this.myProxy.tableData.ctrlData.status = row.status;
        this.myProxy.tableData.ctrlData.opt = "0";
        this.myProxy.onUpdate();
    }

    onEditOrderNo(row: any) {
        this.editOrdernoID = null;
        this.isorderno = false;
        this.onUpdate(row, 6, this.editOrdernoValue);
    }

    onEditWaterRate(row: any) {
        this.myProxy.rowRateData.lobby_vendor_product_id = row.lobby_vendor_product_id;
        this.myProxy.rowRateData.water_rate = parseInt(this.editWaterRateValue) / 100;
        this.editWaterRateID = null;
        this.isWaterRate = false;
        this.myProxy.onUpdateWaterRate();
    }

    onEditWaterRateAccelerateValue(row: any) {
        this.myProxy.rowRateAccelerateData.lobby_vendor_product_id = row.lobby_vendor_product_id;
        this.myProxy.rowRateAccelerateData.water_rate_accelerate = parseInt(this.editWaterRateAccelerateValue) / 100;
        this.editWaterRateID = null;
        this.isWaterRateAccelerate = false;
        this.myProxy.onUpdateWaterRateAccelerate();
    }

    onEditIcon(row: any) {
        this.myProxy.rowIcon.lobby_vendor_product_id = row.lobby_vendor_product_id;
        this.myProxy.rowIcon.icon = this.editIcon;
        this.editWaterRateID = null;
        this.isIcon = false;
        this.myProxy.onUpdateIcon();
    }

    onUpdateLanguages(row: any) {
        this.myProxy.showDialog(DialogStatus.update, row);
    }

    onSwitchTaskWater(row: any) {
        this.myProxy.rowActivityTaskWaterData.lobby_vendor_product_id = row.lobby_vendor_product_id;
        this.myProxy.rowActivityTaskWaterData.is_activity_task_water = row.is_activity_task_water;
        this.myProxy.onUpdateActivithTaskWaterData();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.row_status {
    display: flex;
}

.ml-1 {
    margin-left: 12px;
}
</style>
