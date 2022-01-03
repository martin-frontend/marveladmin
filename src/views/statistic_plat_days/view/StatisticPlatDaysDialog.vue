<template>
    <el-dialog :title="$t('statistic_plat_days.dialogTitle')" :visible.sync="myProxy.dialogData.bShow" width="550px">
        <el-form label-width="115px" class="form" v-loading="net_status.loading">
            <el-col :span="8" v-for="(category, key) in form" :key="key">
                <div>{{ category.title }}</div>
                <div v-if="category.category === 'player'">
                    <div v-for="(item, key) in category.options" :key="key">
                        <el-checkbox v-model="item.checked">{{ item.name }}</el-checkbox>
                    </div>
                </div>

                <div v-if="category.category === 'recharge'">
                    <div v-for="(item, key) in category.options" :key="key">
                        <el-checkbox v-model="item.checked">{{ item.name }}</el-checkbox>
                    </div>
                </div>

                <div v-if="category.category === 'game'">
                    <div v-for="(item, key) in category.options" :key="key">
                        <el-checkbox v-model="item.checked">{{ item.name }}</el-checkbox>
                    </div>
                </div>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="handlerClose">
                {{ $t("common.cancel") }}
            </el-button>
            <el-button type="primary" size="mini" @click="handlerSave">
                {{ $t("common.save") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDaysProxy from "@/views/statistic_plat_days/proxy/StatisticPlatDaysProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class StatisticPlatDaysDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticPlatDaysProxy = this.getProxy(StatisticPlatDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.dialogData.form;
    }

    handlerClose() {
        this.myProxy.hideDialog();
    }

    handlerSave() {
        this.myProxy.filterTable();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.form {
    height: 200px;
    ::v-deep .el-checkbox {
        margin-top: 6px;
    }
}
</style>
