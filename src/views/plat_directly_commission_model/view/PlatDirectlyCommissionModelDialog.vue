<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns['name'].name" prop="name">
                <div class="flex d-flex">
                    <el-input
                        v-model="form.name"
                        :placeholder="LangUtil('请输入')"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate('name')">
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns['desc'].name" prop="desc">
                <div class="flex d-flex">
                    <el-input
                        type="textarea"
                        v-model="form.desc"
                        :placeholder="LangUtil('请输入')"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate('desc')">
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns['settlement_type'].name" prop="settlement_type">
                <el-select v-model="form.settlement_type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['settlement_type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns['settlement_period'].name" prop="settlement_period">
                <el-select v-model="form.settlement_period" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['settlement_period'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <div>
                {{
                    LangUtil(
                        "结算时间说明：如果分红周期是1个自然月，分红发放时间为每月1日；如果分红周期选择的是半个自然月，分红发放时间为每月1日和16日；如果分红周期选择的是1周，分红发放时间为每周一。"
                    )
                }}
            </div>
            <div class="levels">
                <div>
                    <div class="level_setting">
                        <el-button size="mini" type="primary" @click="addLevel(form.commission_config)"
                            >{{ LangUtil("添加等级") }}
                        </el-button>
                        {{ LangUtil("最高配置等级") }}
                        <span style="color: red">{{ form.commission_config.length }}</span>
                        {{ LangUtil("等级") }}
                    </div>

                    <el-table
                        class="status-col"
                        :data="form.commission_config"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%"
                        size="mini"
                    >
                        <el-table-column :label="LangUtil('操作')" width="100">
                            <template slot-scope="{ $index }">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteLevel($index, form.commission_config)"
                                    >{{ LangUtil("删除") }}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column :label="LangUtil('等级')" type="index" width="80"></el-table-column>
                        <el-table-column :label="LangUtil('等级描述名称')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input
                                    v-model="row.level_desc"
                                    :placeholder="LangUtil('请输入')"
                                    style="width: 100%"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="LangUtil('直属亏损金额$')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.loss_amount"
                                    style="width: 100%"
                                    :min="0"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :label="LangUtil('直属亏损分红百分比')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.loss_bonus_ratio"
                                    style="width: 100%"
                                    :min="0"
                                    :max="30"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="!isStatusUpdate ? handleAdd() : handleUpdate()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatDirectlyCommissionModelProxy from "../proxy/PlatDirectlyCommissionModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class PlatDirectlyCommissionModelDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatDirectlyCommissionModelProxy = this.getProxy(PlatDirectlyCommissionModelProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
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
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            settlement_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            settlement_period: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let errorCode1: any = this.LangUtil("等级描述名称没有输入数据");
                let errorCode2: any = this.LangUtil("直属亏损金额没有输入数据");
                let errorCode3: any = this.LangUtil("直属亏损分红百分比没有输入数据");
                let errorCode4: any = this.LangUtil("等级没有输入数据");
                let errorCode5: any = this.LangUtil("直属亏损金额需要大于0，没有小数点");
                let errorCode6: any = this.LangUtil("等级描述名称最多50个字符");
                let isValide = true;
                const config: any = this.myProxy.dialogData.form.commission_config;

                const element = config;
                if (!element || element.length == 0) {
                    this.$message.warning(errorCode4);
                    isValide = false;
                    return;
                }
                element.forEach((item: any) => {
                    if (!isValide) return;
                    if (item.level_desc === "") {
                        this.$message.warning(errorCode1);
                        isValide = false;
                        return;
                    } else if (!this.isMaxLength50(item.level_desc)) {
                        this.$message.warning(errorCode6);
                        isValide = false;
                        return;
                    } else if (item.loss_amount === undefined) {
                        this.$message.warning(errorCode2);
                        isValide = false;
                        return;
                    } else if (item.loss_bonus_ratio === undefined) {
                        this.$message.warning(errorCode3);
                        isValide = false;
                        return;
                    } else if (!this.isPositiveInteger(item.loss_amount)) {
                        this.$message.warning(errorCode5);
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

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let errorCode1: any = this.LangUtil("等级描述名称没有输入数据");
                let errorCode2: any = this.LangUtil("直属亏损金额没有输入数据");
                let errorCode3: any = this.LangUtil("直属亏损分红百分比没有输入数据");
                let errorCode4: any = this.LangUtil("等级没有输入数据");
                let errorCode5: any = this.LangUtil("直属亏损金额需要大于0，没有小数点");
                let errorCode6: any = this.LangUtil("等级描述名称最多50个字符");
                let isValide = true;
                const config: any = this.myProxy.dialogData.form.commission_config;

                const element = config;
                if (!element || element.length == 0) {
                    this.$message.warning(errorCode4);
                    isValide = false;
                    return;
                }
                element.forEach((item: any) => {
                    if (!isValide) return;
                    if (item.level_desc === "") {
                        this.$message.warning(errorCode1);
                        isValide = false;
                        return;
                    } else if (!this.isMaxLength50(item.level_desc)) {
                        this.$message.warning(errorCode6);
                        isValide = false;
                        return;
                    } else if (item.loss_amount === undefined) {
                        this.$message.warning(errorCode2);
                        isValide = false;
                        return;
                    } else if (item.loss_bonus_ratio === undefined) {
                        this.$message.warning(errorCode3);
                        isValide = false;
                        return;
                    } else if (!this.isPositiveInteger(item.loss_amount)) {
                        this.$message.warning(errorCode5);
                        isValide = false;
                        return;
                    }
                });

                if (!isValide) {
                    return;
                }
                this.myProxy.onUpdate();
            }
        });
    }

    isMaxLength50(str: any) {
        return str.length <= 50;
    }

    isPositiveInteger(number: any) {
        return Number.isInteger(number) && number >= 0;
    }

    addLevel(value: any) {
        value.push({
            level_desc: "", // 等级描述名称
            loss_amount: 0, // 直属亏损金额
            loss_bonus_ratio: 0, // 直属亏损分红百分比
        });
    }

    deleteLevel(index: any, value: any[]) {
        value.splice(index, 1);
    }

    handleTranslate(source: string) {
        const data: any = {};
        // data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_EMAIL;
        //@ts-ignore
        data.sentence = this.form[source] || source;
        data.refForm = this.form;
        data.useKey = source;
        this.langProxy.showDialog(data, true);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.levels {
    margin-top: 16px;
    .level_setting {
        margin-bottom: 16px;
    }
}
.dialog-footer {
    margin-top: 16px;
}
</style>
