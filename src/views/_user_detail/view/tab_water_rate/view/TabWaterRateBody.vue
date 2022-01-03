<template>
    <div v-loading="net_status.loading">
        <div class="notice">
            {{ $t("user_detail.waterRateDesc") }}
        </div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns.vendor_type.name" prop="type">
                <template slot-scope="{ row }">
                    {{ tableColumns.vendor_type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.water_config.name" prop="water_rate">
                <template slot-scope="{ row }">
                    <div v-if="editWaterRateID == row.type">
                        <el-input
                            v-model="editWaterRateValue"
                            style="width: 60px; margin-right: 10px"
                            oninput="value=value.replace(/[^\d]/g,'');if(value>100)value =100;"
                        ></el-input>
                        <el-button class="item" type="warning" size="mini" @click="editWaterRateID = null">{{
                            $t("common.cancel")
                        }}</el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditWaterRate(row)">{{
                            $t("common.determine")
                        }}</el-button>
                    </div>
                    <div v-else>
                        <span style="margin-right: 10px">{{ (row.water_rate * 100) >> 0 }}%</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editWaterRateID = row.type;
                                editWaterRateValue = (row.water_rate * 100) >> 0;
                            "
                            >{{ $t("common.update") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabWaterRateProxy from "../proxy/TabWaterRateProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {},
})
export default class TabWaterRateBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabWaterRateProxy = getProxy(TabWaterRateProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;

    private editWaterRateID = null;
    private editWaterRateValue = "";

    private onEditWaterRate(row: any) {
        this.editWaterRateID = null;
        this.myProxy.water_config[row.type] = parseInt(this.editWaterRateValue) / 100;
        this.myProxy.onUpdateWaterRate();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.notice {
    font-size: 18px;
    margin-bottom: 10px;
}
</style>
