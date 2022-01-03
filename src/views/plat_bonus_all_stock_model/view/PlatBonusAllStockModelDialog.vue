<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="850px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input v-model="form.name" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['desc'].name" prop="desc">
                <el-input type="textarea" v-model="form.desc" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['calc_type'].name" prop="calc_type">
                <el-select v-model="form.calc_type" filterable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns['calc_type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <div class="levels">
                <div>
                    <div class="level_setting">
                        <el-button size="mini" type="primary" @click="addLevel(form.all_bonus_config)"
                            >{{ $t("plat_users_vip_model.addLevel") }}
                        </el-button>
                        {{ $t("common.topLevel") }}
                        <span style="color: red">{{ form.all_bonus_config.length }}</span>
                        {{ $t("common.level") }}
                    </div>

                    <el-table
                        class="status-col"
                        :data="form.all_bonus_config"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%"
                        size="mini"
                    >
                        <el-table-column :label="$t('common.operating')" width="100">
                            <template slot-scope="{ $index }">
                                <el-button size="mini" type="danger" @click="deleteLevel($index, form.all_bonus_config)"
                                    >{{ $t("common.delete") }}
                                </el-button>
                            </template>
                        </el-table-column>
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
                <el-button type="primary" size="mini" @click="!isStatusUpdate ? handleAdd() : handleUpdate()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBonusAllStockModelProxy from "@/views/plat_bonus_all_stock_model/proxy/PlatBonusAllStockModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatBonusAllStockModelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBonusAllStockModelProxy = this.getProxy(PlatBonusAllStockModelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

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

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            desc: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            calc_type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let errorCode1: any = this.$t("plat_bonus_all_stock_model.levelDescNoData");
                let errorCode2: any = this.$t("plat_bonus_all_stock_model.performanceNoData");
                let errorCode3: any = this.$t("plat_bonus_all_stock_model.stockNoData");
                let errorCode4: any = this.$t("plat_bonus_all_stock_model.levelNoData");
                let isValide = true;
                const config: any = this.myProxy.dialogData.form.all_bonus_config;

                const element = config;
                if (!element || element.length == 0) {
                    this.$message.warning(errorCode4);
                    isValide = false;
                    return;
                }
                element.forEach((item: any) => {
                    if (!isValide) return;
                    if (item.name === "") {
                        this.$message.warning(errorCode1);
                        isValide = false;
                        return;
                    } else if (item.total_performance === undefined) {
                        this.$message.warning(errorCode2);
                        isValide = false;
                        return;
                    } else if (item.stock_num === undefined) {
                        this.$message.warning(errorCode3);
                        isValide = false;
                        return;
                    }
                });

                if (!isValide) {
                    return;
                }
                this.myProxy.onAdd();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    addLevel(value: any) {
        value.push({
            name: "", // 等级描述名称
            total_performance: 0, // 团队业绩
            stock_num: 0, // 每万占股
        });
    }
    deleteLevel(index: any, value: any[]) {
        value.splice(index, 1);
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
