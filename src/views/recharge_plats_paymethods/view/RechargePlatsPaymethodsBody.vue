<template>
    <div class="table_list">
        <el-table :data="tableData" style="width: 100%" border v-loading="net_status.loading">
            <el-table-column prop="plat_id" :label="tableColumns['plat_id'].name" align="center" width="150">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["plat_id"].options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="gift_rate" :label="tableColumns['gift_rate'].name" align="center">
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['gift_rate'].tips" placement="top">
                        <div>
                            <span>{{ tableColumns["gift_rate"].name }}</span>
                            <i class="el-icon-question"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <div v-if="editGiftRateID == row.id">
                        <el-input
                            v-model="editGiftRateValue"
                            style="width: 50px; margin-right: 10px"
                            oninput="value=value.replace(/[^\d]/g,'');"
                        ></el-input>
                        <el-button class="item" type="warning" size="mini" @click="editGiftRateID = null">{{
                            LangUtil("取消")
                        }}</el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditGiftRate(row)">{{
                            LangUtil("确定")
                        }}</el-button>
                    </div>
                    <div v-else>
                        <span style="margin-right: 10px">{{ (row.gift_rate * 100) >> 0 }}%</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editGiftRateID = row.id;
                                editGiftRateValue = (row.gift_rate * 100) >> 0;
                                editFeeRateValue = (row.fee_rate * 100) >> 0;
                            "
                            v-if="checkUnique(unique.recharge_plats_paymethods_update)"
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="fee_rate" :label="tableColumns['fee_rate'].name" align="center">
                <template slot-scope="{ row }">
                    <div v-if="editFeeRateID == row.id">
                        <el-input
                            v-model="editFeeRateValue"
                            style="width: 50px; margin-right: 10px"
                            oninput="value=value.replace(/[^\d]/g,'');"
                        ></el-input>
                        <el-button class="item" type="warning" size="mini" @click="editFeeRateID = null">{{
                            LangUtil("取消")
                        }}</el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditFeeRate(row)">{{
                            LangUtil("确定")
                        }}</el-button>
                    </div>
                    <div v-else>
                        <span style="margin-right: auto">{{ (row.fee_rate * 100) >> 0 }}%</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editFeeRateID = row.id;
                                editFeeRateValue = (row.fee_rate * 100) >> 0;
                                editGiftRateValue = (row.gift_rate * 100) >> 0;
                            "
                            v-if="checkUnique(unique.recharge_plats_paymethods_update)"
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="paymethod_id" :label="tableColumns['paymethod_id'].name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.paymethod_id.options[row.paymethod_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['sort'].name" align="center" width="70px">
                <div style="font-size: 1.5rem">
                    <i class="el-icon-rank"></i>
                </div>
            </el-table-column>
            <el-table-column prop="status" :label="tableColumns['status'].name" align="center" width="100px">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        :active-value="1"
                        :inactive-value="98"
                        @change="switchUpdate(scope.row)"
                        :disabled="!checkUnique(unique.recharge_plats_paymethods_update)"
                    ></el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargePlatsPaymethodsProxy from "../proxy/RechargePlatsPaymethodsProxy";
import GlobalVar from "@/core/global/GlobalVar";
import Sortable from "sortablejs";

@Component
export default class RechargePlatsPaymethodsBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: RechargePlatsPaymethodsProxy = this.getProxy(RechargePlatsPaymethodsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    get tableData() {
        return this.myProxy.tableData.list;
    }

    sortItem = {
        id: 0,
        next_id: 0,
    };
    data: any = [];
    rowData: any = "";
    editGiftRateID: any = null;
    editGiftRateValue = "";
    editFeeRateID: any = null;
    editFeeRateValue = "";

    mounted() {
        this.initSort();
    }

    handlerQuery() {
        this.myProxy.onQuery();
    }

    switchUpdate(data: any) {
        this.myProxy.listDate.status = data.status;
        this.myProxy.listDate.id = data.id;
        this.myProxy.listDate.gift_rate = data.gift_rate;
        this.myProxy.listDate.fee_rate = data.fee_rate;

        this.myProxy.onUpdate();
    }

    handlerPageSwitch(page: number) {
        this.myProxy.onQuery();
    }

    errorCode: any = this.LangUtil("赠送比例必须大于等于0，小于等于50");

    // 拖弋排序
    initSort() {
        if (checkUnique(unique.recharge_plats_paymethods_update)) {
            const tbody: any = document.querySelector(".el-table__body-wrapper tbody");
            new Sortable(tbody, {
                onStart: (e: any) => {
                    this.rowData = this.tableData[e.oldIndex];
                },
                onEnd: (e: any) => {
                    let oldIndex = e.oldIndex;
                    let newIndex = e.newIndex;
                    let nextID: any = "";
                    if (oldIndex < newIndex) {
                        if (newIndex + 1 >= this.tableData.length) {
                            nextID = 0;
                        } else {
                            nextID = this.tableData[newIndex + 1].id;
                        }
                    } else {
                        nextID = this.tableData[newIndex].id;
                    }
                    this.$emit("sortEvent", {
                        id: this.rowData.id,
                        next_id: nextID,
                        opt: 11,
                    });

                    this.myProxy.sortableDate.obj.id = this.rowData.id;
                    this.myProxy.sortableDate.obj.next_id = nextID;
                    this.myProxy.sortableDate.obj.opt = 11;
                    this.myProxy.sortableDate.sortable = true;
                    this.myProxy.onUpdate(true);
                },
            });
        } else {
            return;
        }
    }

    onEditGiftRate(row: any) {
        if (this.editGiftRateValue != "" && parseInt(this.editGiftRateValue) <= 50) {
            this.myProxy.listDate.status = "";
            this.myProxy.listDate.id = row.id;
            this.myProxy.listDate.fee_rate = parseInt(this.editFeeRateValue) / 100;
            this.myProxy.listDate.gift_rate = parseInt(this.editGiftRateValue) / 100;
            this.editGiftRateID = null;
            this.myProxy.onUpdate();
        } else {
            this.$message({
                type: "error",
                message: this.errorCode,
            });
        }
    }
    onEditFeeRate(row: any) {
        this.myProxy.listDate.id = row.id;
        this.myProxy.listDate.fee_rate = parseInt(this.editFeeRateValue) / 100;
        this.myProxy.listDate.gift_rate = parseInt(this.editGiftRateValue) / 100;
        this.editFeeRateID = null;
        this.myProxy.onUpdate();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.table_list {
    min-height: calc(100vh - 250px);
    ::v-deep .el-table tr {
        cursor: move;
    }
}
</style>
