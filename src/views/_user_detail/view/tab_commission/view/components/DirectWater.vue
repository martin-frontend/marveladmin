<template>
    <div>
        <el-table
            @sort-change="tableSortChange"
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
            class="table"
        >
            <el-table-column
                :label="tableColumns.nick_name.name"
                prop="nick_name"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.user_id.name"
                prop="user_id"
                class-name="status-col"
                min-width="90px"
            ></el-table-column>
            <el-table-column
                :label="`${tableColumns.group_users.name}` + '(' + $t('common.create') + ')'"
                prop="group_users"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }"> {{ row.group_users }}({{ row.new_group_users }}) </template>
            </el-table-column>
            <el-table-column sortable="custom" :label="options[2]" class-name="status-col" min-width="160px" prop="2">
                <template slot-scope="{ row }">
                    <template v-if="row.water_info[2]">
                        <span>
                            <p>
                                {{ tableColumns.water_info.self_water.name }}：<span
                                    :style="checkNumber(row.water_info[2].self_water)"
                                    >{{ row.water_info[2].self_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.group_water.name }}：<span
                                    :style="checkNumber(row.water_info[2].group_water)"
                                    >{{ row.water_info[2].group_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.commission_num.name }}：<span
                                    :style="checkNumber(row.water_info[2].commission_num)"
                                    >{{ row.water_info[2].commission_num }}</span
                                >
                                <span v-if="row.water_info[2].is_promotion_floor == 1" class="red_text"
                                    >({{ $t("user_detail.keep") }})</span
                                >
                            </p>
                        </span>
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column sortable="custom" :label="options[4]" class-name="status-col" min-width="160px" prop="4">
                <template slot-scope="{ row }">
                    <template v-if="row.water_info[4]">
                        <span>
                            <p>
                                {{ tableColumns.water_info.self_water.name }}：<span
                                    :style="checkNumber(row.water_info[4].self_water)"
                                    >{{ row.water_info[4].self_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.group_water.name }}：<span
                                    :style="checkNumber(row.water_info[4].group_water)"
                                    >{{ row.water_info[4].group_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.commission_num.name }}：<span
                                    :style="checkNumber(row.water_info[4].commission_num)"
                                    >{{ row.water_info[4].commission_num }}</span
                                >
                                <span v-if="row.water_info[4].is_promotion_floor == 1" class="red_text"
                                    >({{ $t("user_detail.keep") }})</span
                                >
                            </p>
                        </span>
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column sortable="custom" :label="options[8]" class-name="status-col" min-width="160px" prop="8">
                <template slot-scope="{ row }">
                    <template v-if="row.water_info[8]">
                        <span>
                            <p>
                                {{ tableColumns.water_info.self_water.name }}：<span
                                    :style="checkNumber(row.water_info[8].self_water)"
                                    >{{ row.water_info[8].self_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.group_water.name }}：<span
                                    :style="checkNumber(row.water_info[8].group_water)"
                                    >{{ row.water_info[8].group_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.commission_num.name }}：<span
                                    :style="checkNumber(row.water_info[8].commission_num)"
                                    >{{ row.water_info[8].commission_num }}</span
                                >
                                <span v-if="row.water_info[8].is_promotion_floor == 1" class="red_text"
                                    >({{ $t("user_detail.keep") }})</span
                                >
                            </p>
                        </span>
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column sortable="custom" :label="options[16]" class-name="status-col" min-width="160px" prop="16">
                <template slot-scope="{ row }">
                    <template v-if="row.water_info[16]">
                        <span>
                            <p>
                                {{ tableColumns.water_info.self_water.name }}：<span
                                    :style="checkNumber(row.water_info[16].self_water)"
                                    >{{ row.water_info[16].self_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.group_water.name }}：<span
                                    :style="checkNumber(row.water_info[16].group_water)"
                                    >{{ row.water_info[16].group_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.commission_num.name }}：<span
                                    :style="checkNumber(row.water_info[16].commission_num)"
                                    >{{ row.water_info[16].commission_num }}</span
                                >
                                <span v-if="row.water_info[16].is_promotion_floor == 1" class="red_text"
                                    >({{ $t("user_detail.keep") }})</span
                                >
                            </p>
                        </span>
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column sortable="custom" :label="options[32]" class-name="status-col" min-width="160px" prop="32">
                <template slot-scope="{ row }">
                    <template v-if="row.water_info[32]">
                        <span>
                            <p>
                                {{ tableColumns.water_info.self_water.name }}：<span
                                    :style="checkNumber(row.water_info[32].self_water)"
                                    >{{ row.water_info[32].self_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.group_water.name }}：<span
                                    :style="checkNumber(row.water_info[32].group_water)"
                                    >{{ row.water_info[32].group_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.commission_num.name }}：<span
                                    :style="checkNumber(row.water_info[32].commission_num)"
                                    >{{ row.water_info[32].commission_num }}</span
                                >
                                <span v-if="row.water_info[32].is_promotion_floor == 1" class="red_text"
                                    >({{ $t("user_detail.keep") }})</span
                                >
                            </p>
                        </span>
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column sortable="custom" :label="options[64]" class-name="status-col" min-width="160px" prop="64">
                <template slot-scope="{ row }">
                    <template v-if="row.water_info[64]">
                        <span>
                            <p>
                                {{ tableColumns.water_info.self_water.name }}：<span
                                    :style="checkNumber(row.water_info[64].self_water)"
                                    >{{ row.water_info[64].self_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.group_water.name }}：<span
                                    :style="checkNumber(row.water_info[64].group_water)"
                                    >{{ row.water_info[64].group_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.commission_num.name }}：<span
                                    :style="checkNumber(row.water_info[64].commission_num)"
                                    >{{ row.water_info[64].commission_num }}</span
                                >
                                <span v-if="row.water_info[64].is_promotion_floor == 1" class="red_text"
                                    >({{ $t("user_detail.keep") }})</span
                                >
                            </p>
                        </span>
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column
                sortable="custom"
                :label="options[128]"
                class-name="status-col"
                min-width="150px"
                prop="128"
            >
                <template slot-scope="{ row }">
                    <template v-if="row.water_info[128]">
                        <span>
                            <p>
                                {{ tableColumns.water_info.self_water.name }}：<span
                                    :style="checkNumber(row.water_info[128].self_water)"
                                    >{{ row.water_info[128].self_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.group_water.name }}：<span
                                    :style="checkNumber(row.water_info[128].group_water)"
                                    >{{ row.water_info[128].group_water }}</span
                                >
                            </p>
                            <p>
                                {{ tableColumns.water_info.commission_num.name }}：<span
                                    :style="checkNumber(row.water_info[128].commission_num)"
                                    >{{ row.water_info[128].commission_num }}</span
                                >
                                <span v-if="row.water_info[128].is_promotion_floor == 1" class="red_text"
                                    >({{ $t("user_detail.keep") }})</span
                                >
                            </p>
                        </span>
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCommissionProxy from "../../proxy/TabCommissionProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";
// component
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class DirectWater extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabCommissionProxy = getProxy(TabCommissionProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns.directs_water;
    private tableData = this.myProxy.dialogData.directData.tableData.list;
    private listQuery = this.myProxy.dialogData.directData.listQuery;
    private pageInfo = this.myProxy.dialogData.directData.tableData.pageInfo;
    get options() {
        return this.tableColumns.water_info.vendor_type.options;
    }

    private checkNumber(num: number) {
        if (num > 0) {
            return "color:green";
        }
    }
    // 排序
    private tableSortChange(column: any) {
        let order_by = "";
        if (column.order === "descending") {
            order_by = "DESC";
        } else {
            order_by = "ASC";
        }

        // 团队
        Object.assign(this.listQuery, {
            order_by_type: "2",
            order_by_rule: order_by,
            order_by_vendor_type: column.prop,
            page_count: 1,
        });
        this.myProxy.getDirectWater();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.getDirectWater();
    }
}
</script>
<style scoped lang="scss">
.table {
    span {
        text-align: left;
    }
}
.red_text {
    color: red;
}
</style>
