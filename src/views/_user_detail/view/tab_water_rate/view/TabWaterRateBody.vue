<template>
    <div v-loading="net_status.loading">
        <div class="notice">
            {{ LangUtil("给该玩家单独设置投注流水比例") }}
        </div>
        <div class="notice red">
            {{ LangUtil("注意：如有修改流水配置要1个多小时后才生效，需要记录更改时间。") }}
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
                    <template v-if="editWaterRateID == row.type">
                        <el-input
                            v-model="editWaterRateValue"
                            style="width: 80px; margin-right: 10px"
                            @input="ChangeNumValue"
                        ></el-input>
                        <el-button class="item" type="warning" size="mini" @click="editWaterRateID = null">{{
                            LangUtil("取消")
                        }}</el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditWaterRate(row)">{{
                            LangUtil("确定")
                        }}</el-button>
                    </template>
                    <template v-else>
                        <span style="margin-right: 10px">{{ (row.water_rate * 100).toFixed(2) }}%</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            @click="
                                editWaterRateID = row.type;
                                editWaterRateValue = (row.water_rate * 100).toFixed(2);
                            "
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                v-if="showSwitch"
                :label="tableColumns.vendor_type_switch.name"
                prop="vendor_type_switch"
                width="120"
            >
                <template slot-scope="{ row }">
                    <el-switch
                        v-if="row.vendor_type_switch != undefined"
                        @change="onSwitch"
                        v-model="row.vendor_type_switch"
                        style="margin-left: 10px"
                        :active-value="1"
                        :inactive-value="0"
                        :disabled="row.vendor_type_switch == -1"
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
import TabWaterRateProxy from "../proxy/TabWaterRateProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {},
})
export default class TabWaterRateBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabWaterRateProxy = getProxy(TabWaterRateProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;

    editWaterRateID = null;
    editWaterRateValue = "";

    get showSwitch() {
        return this.myProxy.tableData.showSwtich;
    }

    ChangeNumValue() {
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

    onEditWaterRate(row: any) {
        this.editWaterRateID = null;
        this.myProxy.water_config[row.type] = parseFloat((parseFloat(this.editWaterRateValue) / 100).toFixed(4));

        this.myProxy.onUpdateWaterRate();
    }

    onSwitch() {
        this.myProxy.onSwitch();
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
