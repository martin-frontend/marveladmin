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
        >
            <el-table-column :label="`${tableColumns.id.name}`" class-name="status-col" min-width="60px">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.sms_id.name}`" class-name="status-col" min-width="95px">
                <template slot-scope="{ row }">
                    {{ tableColumns.sms_id.options[row.sms_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.sms_api_uname.name}`" class-name="status-col" min-width="120px">
                <template slot-scope="{ row }">
                    {{ row.sms_api_uname }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.sms_api_key.name}`" class-name="status-col" min-width="120px">
                <template slot-scope="{ row }">
                    {{ row.sms_api_key }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.type.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('plat_sms.smsRemain')" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    <el-popover placement="top" width="200" trigger="click">
                        {{ $t("plat_sms.smsBalance") }}： {{ myProxy.tableData.balance }}
                        <el-button
                            type="primary"
                            slot="reference"
                            @click="onCheck(row.id)"
                            v-if="checkUnique(unique.plat_sms_balance)"
                            >{{ $t("common.lookOver") }}</el-button
                        >
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.head_sign.name}`" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }">
                    {{ row.head_sign }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.tpl_id.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.tpl_id }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.status.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.updated_at.name}`" class-name="status-col" min-width="130px">
                <template slot-scope="{ row }">
                    {{ row.updated_at }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="160px">
                <template slot-scope="{ row }">
                    <div class="btns">
                        <el-button
                            type="primary"
                            class="item"
                            @click="handleEdit(row)"
                            v-if="checkUnique(unique.plat_sms_update)"
                            >{{ $t("common.update") }}</el-button
                        >
                        <el-button
                            @click="onTest(row)"
                            class="item"
                            type="primary"
                            v-if="checkUnique(unique.plat_sms_send)"
                            >{{ $t("plat_sms.test") }}</el-button
                        >
                    </div>
                    <div class="btns">
                        <el-button
                            @click="onDeactivate(row.id)"
                            class="item"
                            type="primary"
                            v-if="row.status == SmsStatusType.Activate && checkUnique(unique.plat_sms_update)"
                            >{{ $t("plat_sms.inActive") }}</el-button
                        >
                        <el-button
                            @click="onActivate(row.id)"
                            class="item"
                            type="primary"
                            v-if="row.status == SmsStatusType.Disactivate && checkUnique(unique.plat_sms_update)"
                            >{{ $t("plat_sms.active") }}</el-button
                        >
                        <el-button
                            @click="handlerDelete(row)"
                            class="item"
                            type="danger"
                            v-if="checkUnique(unique.plat_sms_delete)"
                            >{{ $t("common.delete") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatSmsProxy from "../proxy/PlatSmsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { SmsStatusType } from "../proxy/IPlatSmsProxy";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatSmsBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatSmsProxy = this.getProxy(PlatSmsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private SmsStatusType = SmsStatusType;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
    /**查看短信余量 */
    onCheck(id: number) {
        this.myProxy.getBalance(id);
    }
    /**停用 */
    onDeactivate(id: number) {
        this.myProxy.onDisactivate(id);
    }
    /**启用 */
    onActivate(id: number) {
        this.myProxy.onActivate(id);
    }
    /**測試 */
    onTest(data: any) {
        this.myProxy.showMessageDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.btns {
    min-width: 160px;
}
</style>
