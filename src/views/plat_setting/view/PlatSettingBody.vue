<template>
    <div class="_body">
        <div class="water_config">
            <p>{{ tableColumns.water_config.name }}</p>
            <p>{{ tableColumns.water_config.tips }}</p>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column :label="tableColumns.vendor_type.options[2]">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ title.t1 }}</span>
                        <span>{{ tableColumns.vendor_type.options_type[0][row[2].type] }}</span>
                    </div>
                    <div>
                        <span>{{ title.t2 }}</span>
                        <span>{{ row[2].rate }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="tableColumns.vendor_type.options[4]">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ title.t1 }}</span>
                        <span>{{ tableColumns.vendor_type.options_type[0][row[4].type] }}</span>
                    </div>
                    <div>
                        <span>{{ title.t2 }}</span>
                        <span>{{ row[4].rate }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="tableColumns.vendor_type.options[8]">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ title.t1 }}</span>
                        <span>{{ tableColumns.vendor_type.options_type[0][row[8].type] }}</span>
                    </div>
                    <div>
                        <span>{{ title.t2 }}</span>
                        <span>{{ row[8].rate }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="tableColumns.vendor_type.options[16]">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ title.t1 }}</span>
                        <span>{{ tableColumns.vendor_type.options_type[0][row[16].type] }}</span>
                    </div>
                    <div>
                        <span>{{ title.t2 }}</span>
                        <span>{{ row[16].rate }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="tableColumns.vendor_type.options[32]">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ title.t1 }}</span>
                        <span>{{ tableColumns.vendor_type.options_type[0][row[32].type] }}</span>
                    </div>
                    <div>
                        <span>{{ title.t2 }}</span>
                        <span>{{ row[32].rate }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="tableColumns.vendor_type.options[64]">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ title.t1 }}</span>
                        <span>{{ tableColumns.vendor_type.options_type[0][row[64].type] }}</span>
                    </div>
                    <div>
                        <span>{{ title.t2 }}</span>
                        <span>{{ row[64].rate }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="tableColumns.vendor_type.options[128]">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ title.t1 }}</span>
                        <span>{{ tableColumns.vendor_type.options_type[0][row[128].type] }}</span>
                    </div>
                    <div>
                        <span>{{ title.t2 }}</span>
                        <span>{{ row[128].rate }}</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatSettingProxy from "../proxy/PlatSettingProxy";

@Component
export default class PlatSettingBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatSettingProxy = this.getProxy(PlatSettingProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private listQuery = this.myProxy.listQuery;

    private title: any = {
        t1: this.$t("plat_setting.way"),
        t2: this.$t("plat_setting.proportion"),
    };
}
</script>

<style scoped lang="scss">
._body {
    border: 1px solid rgb(170, 170, 170);
    margin: 26px 0;
    padding: 0 16px;
    .water_config {
        margin: 16px 0;
        p {
            margin: 3px 0;
            font-size: 14px;
            font-weight: 600;
            color: #909399;
            &:last-child {
                font-weight: 300;
                color: #606266;
            }
        }
    }
    ::v-deep .el-table {
        thead tr th {
            background-color: #fff;
        }
        .is-leaf {
            border-bottom: 0;
            padding-bottom: 0;
        }
        div {
            > span {
                margin-right: 16px;
            }
        }
        .el-table__row {
            &:hover td {
                background-color: #fff;
            }
        }
    }
}
</style>
