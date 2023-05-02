<template>
    <div class="group">
        <div class="content">
            <span class="title">
                {{ LangUtil("统计开始时间") }}
            </span>
            <el-date-picker
                type="date"
                align="right"
                value-format="yyyy-MM-dd"
                :placeholder="LangUtil('请选择')"
                :pickerOptions="myProxy.pickerOptions"
                v-model="statsQuery.start_date"
                @change="onChangeStart"
            >
            </el-date-picker>
        </div>
        <div class="content">
            <span class="title">
                {{ LangUtil("统计结束时间") }}
            </span>
            <el-date-picker
                type="date"
                align="right"
                value-format="yyyy-MM-dd"
                :placeholder="LangUtil('请选择')"
                :pickerOptions="myProxy.pickerOptions"
                v-model="statsQuery.end_date"
                @change="onChangeEnd"
            >
            </el-date-picker>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import DashboardProxy from "@/views/dashboard/proxy/DashboardProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { dateFormat } from "@/core/global/Functions";

@Component
export default class DashboardDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: DashboardProxy = this.getProxy(DashboardProxy);
    statsQuery = this.myProxy.statsQuery;

    onChangeStart() {
        if (this.statsQuery.start_date) {
            if (this.statsQuery.start_date == dateFormat(new Date(), "yyyy-MM-dd")) {
                // 开始时间选今天 结束时间为今天
                this.statsQuery.end_date = this.statsQuery.start_date;
            } else {
                this.statsQuery.end_date = this.incrementDate(this.statsQuery.start_date, 1);
            }
        }
    }

    onChangeEnd() {
        if (this.statsQuery.end_date) {
            this.statsQuery.start_date = this.incrementDate(this.statsQuery.end_date, -1);
        }
    }

    incrementDate(date_str: string, incrementor: number) {
        var parts = date_str.split("-");
        var dt = new Date(
            parseInt(parts[0], 10), // year
            parseInt(parts[1], 10) - 1, // month (starts with 0)
            parseInt(parts[2], 10) // date
        );
        dt.setDate(dt.getDate() + incrementor);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
            parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
            parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    }
}
</script>

<style lang="scss" scoped>
.title {
    min-width: 97px;
    text-align: center;
    border-radius: 4px 0 0px 4px;
    border: 1px solid #dcdfe6;
    border-right: 0;
    font-size: 14px;
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
}
.content {
    display: inline-table;
    // width: 280px;
    margin-right: 10px;
    margin-bottom: 10px;
    el-select {
        width: 100%;
    }

    ::v-deep .el-input__inner {
        width: 100%;
        border-radius: 0px 4px 4px 0px;
    }
}
</style>
