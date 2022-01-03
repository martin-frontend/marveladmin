<template>
    <el-dialog
        :title="$t('plat_bonus_all_stock_model.text8')"
        :visible.sync="myProxy.tableData.templateBShow"
        width="850px"
    >
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <div class="levels">
                <div>
                    <el-table
                        class="status-col"
                        :data="form.all_bonus_config"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%"
                        size="mini"
                    >
                        <el-table-column :label="$t('common.level')" type="index" width="80"></el-table-column>
                        <el-table-column :label="$t('plat_bonus_all_stock_model.levelDesc')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input
                                    v-model="row.name"
                                    :placeholder="$t('common.pleaseEnter')"
                                    style="width: 100%"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('plat_bonus_all_stock_model.performance')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.total_performance"
                                    style="width: 100%"
                                    :min="0"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('plat_bonus_all_stock_model.stock')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.stock_num"
                                    style="width: 100%"
                                    :min="0"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="initTemplate">{{
                    $t("plat_bonus_all_stock_model.text9")
                }}</el-button>
                <el-button type="primary" size="mini" @click="handleUpdate">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import PlatBonusAllStockProxy from "../proxy/PlatBonusAllStockProxy";
import PlatBonusAllProxy from "../proxy/PlatBonusAllProxy";

@Component
export default class DialogPlatBonusAllStockModel extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBonusAllStockProxy = this.getProxy(PlatBonusAllStockProxy);
    private bounsAllProxy: PlatBonusAllProxy = this.getProxy(PlatBonusAllProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    // private form = this.myProxy.tableData.form;
    get form() {
        return this.myProxy.tableData.form;
    }

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            desc: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            calc_type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.admin_plat_update(this.bounsAllProxy.listQuery.plat_id);
            }
        });
    }

    private initTemplate() {
        this.myProxy.initTemplate(this.bounsAllProxy.tableData.model);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.levels {
    .level_setting {
        margin-bottom: 16px;
    }
}
.dialog-footer {
    margin-top: 16px;
}
</style>
