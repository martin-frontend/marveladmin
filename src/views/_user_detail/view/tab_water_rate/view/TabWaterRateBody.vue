<template>
    <div v-loading="net_status.loading">
        <div class="notice">
            {{ $t("user_detail.waterRateDesc") }}
        </div>
        <div class="notice red">
            {{ $t("user_detail.settingDesc") }}
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
                            style="width: 80px; margin-right: 10px"
                            @input="ChangeNumValue"
                        ></el-input>
                        <el-button class="item" type="warning" size="mini" @click="editWaterRateID = null">{{
                            $t("common.cancel")
                        }}</el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditWaterRate(row)">{{
                            $t("common.determine")
                        }}</el-button>
                    </div>
                    <div v-else>
                        <span style="margin-right: 10px">{{ (row.water_rate * 100).toFixed(2) }}%</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editWaterRateID = row.type;
                                editWaterRateValue = (row.water_rate * 100).toFixed(2);
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

    private ChangeNumValue() {
        if (this.editWaterRateValue) {
            this.editWaterRateValue = this.editWaterRateValue.replace(/[^\d\.]/g, "");
            var reg = /^(0|([1-9]\d*))(\.\d{1,2})?$/; //正则验证保留 最多允许后输入两位小数
            if (!reg.test(this.editWaterRateValue)) {
                this.editWaterRateValue = this.editWaterRateValue + "";
                this.editWaterRateValue = this.editWaterRateValue.substring(
                    0,
                    this.editWaterRateValue.indexOf(".") + 3
                );
                var n = this.editWaterRateValue.split(".").length - 1;
                if (n > 1) {
                    this.editWaterRateValue = this.editWaterRateValue.substring(
                        0,
                        this.editWaterRateValue.indexOf(".")
                    );
                }
            }
            if (parseFloat(this.editWaterRateValue) > 200) {
                this.editWaterRateValue = "200";
            }
            return this.editWaterRateValue;
        } else {
            return "";
        }
    }

    private onEditWaterRate(row: any) {
        this.editWaterRateID = null;
        this.myProxy.water_config[row.type] = parseFloat((parseFloat(this.editWaterRateValue) / 100).toFixed(4));

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
.red {
    color: red;
}
</style>
