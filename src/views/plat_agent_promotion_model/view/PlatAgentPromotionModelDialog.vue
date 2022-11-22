<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="850px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input v-model="form.name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['desc'].name" prop="desc">
                <el-input type="textarea" v-model="form.desc" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['type'].name" prop="type">
                <el-select v-model="form.type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                size="mini"
                :label="tableColumns['promotion_reward_coin_ratio'].name"
                prop="promotion_reward_coin_ratio"
            >
                <el-input v-model="form.promotion_reward_coin_ratio" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>

            <el-form-item :label="tableColumns.is_promotion_num_added.name" prop="promotion_model_id">
                <el-switch
                    v-model="form.is_promotion_num_added"
                    :active-value="1"
                    :inactive-value="98"
                    :active-text="tableColumns.is_promotion_num_added.options[1]"
                    :inactive-text="tableColumns.is_promotion_num_added.options[98]"
                ></el-switch>
            </el-form-item>
            <el-form-item :label="tableColumns.calc_type.name" prop="calc_type">
                <el-radio v-model="form.calc_type" label="1">{{ tableColumns.calc_type.options[1] }}</el-radio>
                <el-radio v-model="form.calc_type" label="2">{{ tableColumns.calc_type.options[2] }}</el-radio>
            </el-form-item>

            <div class="levels" v-if="form.calc_type == 1">
                <el-tabs type="border-card" v-model="configIndex">
                    <el-tab-pane
                        :name="key"
                        :label="tableColumns['promotion_config'].options[key]"
                        v-for="(value, key) in form.promotion_config"
                        :key="key"
                    >
                        <div class="level_setting">
                            <el-button size="mini" type="primary" @click="addLevel(value)"
                                >{{ LangUtil("添加等级") }}
                            </el-button>
                            {{ LangUtil("最高配置等级") }} <span style="color: red">{{ value.length }}</span>
                            {{ LangUtil("等级") }}
                        </div>

                        <el-table
                            class="status-col"
                            :data="value"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%"
                            size="mini"
                        >
                            <el-table-column :label="LangUtil('操作')" width="100">
                                <template slot-scope="{ $index }">
                                    <el-button size="mini" type="danger" @click="deleteLevel($index, value)"
                                        >{{ LangUtil("删除") }}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column :label="LangUtil('等级')" type="index" width="80"></el-table-column>
                            <el-table-column :label="LangUtil('总业绩')" min-width="100">
                                <template slot-scope="{ row }">
                                    <el-input-number
                                        type="number"
                                        v-model="row.total_performance"
                                        :placeholder="LangUtil('输入总业绩')"
                                        style="width: 100%"
                                        :min="0"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column :label="LangUtil('每万返佣')" min-width="100">
                                <template slot-scope="{ row }">
                                    <el-input-number
                                        type="number"
                                        v-model="row.commission_num"
                                        :placeholder="LangUtil('输入每万返佣')"
                                        style="width: 100%"
                                        :min="0"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                v-if="isPromotionNumAddedOpen"
                                :label="tableColumns.is_promotion_num_added.name"
                                min-width="100"
                            >
                                <template slot-scope="{ row }">
                                    <el-input-number
                                        type="number"
                                        v-model="row.commission_num_added"
                                        style="width: 100%"
                                        :min="0"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- 全部 -->
            <div class="levels" v-if="form.calc_type == '2'">
                <el-tabs type="border-card" v-model="configAll">
                    <el-tab-pane
                        :label="tableColumns.calc_type.options[2]"
                        v-for="(value, key) in form.promotion_config2"
                        :key="key"
                        :name="key"
                    >
                        <div class="level_setting">
                            <el-button size="mini" type="primary" @click="addLevel(value)"
                                >{{ LangUtil("添加等级") }}
                            </el-button>
                            {{ LangUtil("最高配置等级") }} <span style="color: red">{{ value.length }}</span>
                            {{ LangUtil("等级") }}
                        </div>

                        <el-table
                            class="status-col"
                            :data="value"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%"
                            size="mini"
                        >
                            <el-table-column :label="LangUtil('操作')" width="100">
                                <template slot-scope="{ $index }">
                                    <el-button size="mini" type="danger" @click="deleteLevel($index, value)"
                                        >{{ LangUtil("删除") }}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column :label="LangUtil('等级')" type="index" width="80"></el-table-column>
                            <el-table-column :label="LangUtil('总业绩')" min-width="100">
                                <template slot-scope="{ row }">
                                    <el-input-number
                                        type="number"
                                        v-model="row.total_performance"
                                        :placeholder="LangUtil('输入总业绩')"
                                        style="width: 100%"
                                        :min="0"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column :label="LangUtil('每万返佣')" min-width="100">
                                <template slot-scope="{ row }">
                                    <el-input-number
                                        type="number"
                                        v-model="row.commission_num"
                                        :placeholder="LangUtil('输入每万返佣')"
                                        style="width: 100%"
                                        :min="0"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                v-if="isPromotionNumAddedOpen"
                                :label="tableColumns.is_promotion_num_added.name"
                                min-width="100"
                            >
                                <template slot-scope="{ row }">
                                    <el-input-number
                                        type="number"
                                        v-model="row.commission_num_added"
                                        style="width: 100%"
                                        :min="0"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="!isStatusUpdate ? handleAdd() : handleUpdate()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentPromotionModelProxy from "@/views/plat_agent_promotion_model/proxy/PlatAgentPromotionModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatAgentPromotionModelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentPromotionModelProxy = this.getProxy(PlatAgentPromotionModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    configIndex = "2";
    configAll = "0";

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get isPromotionNumAddedOpen() {
        return this.myProxy.dialogData.form.is_promotion_num_added == 1;
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            promotion_reward_coin_ratio: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let isValide = true;
                const promotion_config: any = this.myProxy.dialogData.form.promotion_config;
                for (const vConf of Object.keys(promotion_config)) {
                    const element = promotion_config[vConf];
                    if (!element || element.length == 0) {
                        this.$message(
                            `${this.tableColumns.promotion_config.options[vConf]}` + this.LangUtil("没有输入数据")
                        );
                        isValide = false;
                        return;
                    }
                    element.forEach((item: any) => {
                        if (!isValide) return;
                        if (item.commission_num === undefined || item.total_performance === undefined) {
                            this.$message(
                                `${this.tableColumns.promotion_config.options[vConf]}` + this.LangUtil("没有输入数据")
                            );
                            isValide = false;
                            return;
                        }
                    });
                }
                if (!isValide) {
                    return;
                }

                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    addLevel(value: any) {
        value.push({
            commission_num: 0,
            total_performance: 0,
            commission_num_added: 0,
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
