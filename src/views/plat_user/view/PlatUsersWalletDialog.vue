<template>
    <el-dialog :title="LangUtil('平台当前用户余额')" :visible.sync="myProxy.walletDialogData.bShow">
        <div v-for="(data, key) of tableData" :key="key">
            <p>{{ tableColumns.is_credit_user.options[key] }}</p>
            <el-table
                :data="data"
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
                    :label="LangUtil('币种')"
                    prop="coin_name_unique"
                    min-width="100px"
                    class-name="status-col"
                ></el-table-column>
                <el-table-column
                    :label="LangUtil('余额')"
                    prop="total_curreny"
                    min-width="100px"
                    class-name="status-col"
                >
                    <template slot-scope="{ row }">
                        <WinLossDisplay
                            :amount="row.total_curreny"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                            :isShowAllDecimal="true"
                        />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUserProxy from "@/views/plat_user/proxy/PlatUserProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
    },
})
export default class PlatUserDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.walletDialogData.data;

    onDeductGold() {
        this.myProxy.onDeductGold();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
