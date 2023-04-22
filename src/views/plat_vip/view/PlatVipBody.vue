<template>
    <div>
        <div v-for="(item, index) in vipConfig" :key="index" class="config-item">
            <el-form label-width="70px" :inline="false" v-loading="net_status.loading">
                <el-form-item :label="LangUtil('等级') + (index + 1)">
                    <el-input
                        v-if="item.total_water"
                        class="input"
                        clearable
                        v-model="item.total_water"
                        :disabled="!myProxy.isEdit"
                        oninput="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')"
                        @keydown.native="inputLimit"
                    >
                        <template slot="prepend">{{ LangUtil("有效流水") }}</template>
                    </el-input>

                    <el-input
                        v-if="item.total_recharge"
                        class="input"
                        type="number"
                        clearable
                        v-model="item.total_recharge"
                        :disabled="!myProxy.isEdit"
                        oninput="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')"
                        @keydown.native="inputLimit"
                    >
                        <template slot="prepend">{{ LangUtil("总充值") }}</template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-row>
                        <el-input
                            style="width: 180px"
                            v-for="(value, key) in tableColumns.vip_config.options_key[1]"
                            :key="key"
                            class="input"
                            type="number"
                            step="0.0001"
                            v-model="item.backwater_config[key].backwater_rate"
                            :disabled="!myProxy.isEdit"
                            oninput="if(value.length>6)value=value.slice(0,6)"
                            @keydown.native="inputLimit"
                        >
                            <template slot="prepend">{{ value }}</template>
                        </el-input>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatVipProxy from "../proxy/PlatVipProxy";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatVipBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatVipProxy = this.getProxy(PlatVipProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    listQuery = this.myProxy.listQuery;

    get vipConfig() {
        return this.myProxy.vipData;
    }

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    inputLimit(e: any) {
        let key = e.key;
        if (key === "-" || key === "e") {
            e.returnValue = false;
            return false;
        }
        return true;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.config-item {
    border: 1px solid #ddd;
    margin-top: 10px;
    width: 100%;
    ::v-deep .el-form {
        padding-left: 15px;
        margin-top: 22px;
        .el-form-item {
            margin-bottom: 6px;
        }
    }
}
</style>
