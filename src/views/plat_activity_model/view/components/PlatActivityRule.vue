<template>
    <div>
        <div class="rules_item" v-for="(item, index) in form.rules" :key="index">
            <el-row type="flex" justify="start" align="middle" :gutter="24">
                <el-col :span="4">
                    <el-button size="mini" icon="el-icon-delete" @click="onDelRule(index)">{{
                        $t("plat_activity_model.deleteRule")
                    }}</el-button>
                </el-col>
                <el-col :span="2" class="vi_div">
                    <div>ID: {{ index + 1 }}</div>
                </el-col>
                <el-col :span="7" class="vi_div">
                    <el-input size="small" v-model="item.name" :placeholder="$t('common.pleaseEnter')"></el-input>
                </el-col>
                <el-col :span="spanWidth" class="vi_div">
                    <el-select v-model="item.open_mode" filterable :placeholder="$t('common.pleaseChoose')">
                        <el-option
                            v-for="(value, key) in tableColumns['open_mode'].options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                </el-col>

                <el-col :span="8" class="vi_div">
                    <el-select
                        v-model="item.run_type"
                        filterable
                        :placeholder="$t('plat_activity_model.settleFrequency')"
                    >
                        <el-option
                            v-for="(value, key) in runTypeOptions"
                            :key="key"
                            :label="runTypeOptions[key]"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="10" class="vi_div">
                    <el-input
                        size="small"
                        v-model="item.icon"
                        :placeholder="$t('plat_activity_model.requireIconName')"
                    ></el-input>
                </el-col>
                <el-col :span="6" class="vi_div">
                    <el-button size="mini" icon="el-icon-circle-plus-outline" @click="onAddSecondLevel(index)"
                        >{{ $t("plat_activity_model.addRewardLogic") }}
                    </el-button>
                </el-col>
            </el-row>

            <div class="rule_list" v-for="(rule, secondIndex) in item.list" :key="secondIndex">
                <el-row type="flex" justify="start" align="middle" :gutter="24">
                    <el-col :span="3">
                        <div>ID: {{ secondIndex + 1 }}</div>
                    </el-col>
                    <el-col :span="10">
                        <el-input
                            size="small"
                            v-model="rule.name"
                            :placeholder="$t('plat_activity_model.ruleName')"
                        ></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="mini" icon="el-icon-delete" @click="onDelSecondLevel(index, secondIndex)"
                            >{{ $t("common.delete") }}
                        </el-button>
                    </el-col>
                </el-row>
                <div class="child_rule_list" v-for="(childRule, thirdIndex) in rule.list" :key="thirdIndex">
                    <el-row type="flex" justify="start" align="middle" :gutter="24">
                        <el-col :span="4">
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                @click="onDelThirdLevel(index, secondIndex, thirdIndex)"
                                >{{ $t("common.delete") }}
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-select
                                v-model="childRule.type"
                                filterable
                                :placeholder="$t('common.pleaseChoose')"
                                @change="onTypeChange(childRule)"
                            >
                                <el-option
                                    v-for="(value, key) in typeOptions"
                                    :key="key"
                                    :label="typeOptions[key]"
                                    :value="key"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-select
                                v-model="childRule.rule_id"
                                filterable
                                :placeholder="$t('common.pleaseChoose')"
                                @change="onRuleIdChange(childRule)"
                            >
                                <el-option
                                    v-for="item in getRulesByType(childRule.type)"
                                    :key="item.id"
                                    :label="item.params_name"
                                    :value="String(item.id)"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                size="small"
                                v-if="childRule.params_type == '1'"
                                v-model="childRule.params"
                                :placeholder="$t('common.pleaseEnter')"
                            ></el-input>
                            <el-radio-group v-model="childRule.params" v-if="childRule.params_type == '2'">
                                <el-radio v-for="(value, key) in boolOptions" :key="key" :label="Number(key)">
                                    {{ value }}
                                </el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="start" align="middle" :gutter="24" style="margin-top: 4px; color: red">
                        <el-col :span="4"> </el-col>
                        <el-col :span="20">
                            {{ getRuleDes(childRule) }}
                        </el-col>
                    </el-row>
                </div>
                <div right>
                    <el-button
                        size="mini"
                        icon="el-icon-circle-plus-outline"
                        @click="onAddThirdLevel(index, secondIndex)"
                        >{{ $t("plat_activity_model.addCondition") }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatActivityModelProxy from "@/views/plat_activity_model/proxy/PlatActivityModelProxy";
import Cookies from "js-cookie";

@Component
export default class PlatActivityRule extends AbstractView {
    // proxy
    private myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;

    get form() {
        return this.myProxy.dialogData.form;
    }

    get spanWidth() {
        let _w: number = 6;
        if (Cookies.get("language") === "vi") {
            _w = 7;
        }
        return _w;
    }

    private runTypeOptions: any = {
        "1": this.$t("plat_activity_model.multipleSettle"),
        "2": this.$t("plat_activity_model.onceSettle"),
    };
    private typeOptions: any = {
        "1": this.$t("common.condition"),
        "21": this.$t("common.consume"),
        "61": this.$t("common.reward"),
        "71": this.$t("common.probabilityPot"),
    };
    private paramsTypeOptions: any = {
        "1": this.$t("plat_activity_model.number"),
        "2": this.$t("plat_activity_model.bool"),
    };
    private boolOptions: any = {
        0: this.$t("common.no"),
        1: this.$t("common.yes"),
    };

    mounted() {
        this.$nextTick(() => {
            this.myProxy.dialogData.loading = false;
        });
    }

    private onDelRule(index: number) {
        this.form.rules.splice(index, 1);
    }
    private onAddSecondLevel(index: number) {
        this.form.rules[index].list.push({
            name: "", //子规则名称
            list: [JSON.parse(JSON.stringify(this.myProxy.conditionRule))],
        });
    }
    onDelSecondLevel(index: number, secondIndex: number) {
        this.form.rules[index].list.splice(secondIndex, 1);
    }

    onAddThirdLevel(index: number, secondIndex: number) {
        this.form.rules[index].list[secondIndex].list.push(JSON.parse(JSON.stringify(this.myProxy.conditionRule)));
    }
    onDelThirdLevel(index: number, secondIndex: number, thirdIndex: number) {
        this.form.rules[index].list[secondIndex].list.splice(thirdIndex, 1);
    }

    private onTypeChange(childRule: any) {
        const list = this.myProxy.activityRuleList.filter((item: any) => item.type == childRule.type);
        if (!list || list.length === 0) return;
        childRule.rule_id = list[0].id.toString();
        childRule.params_type = list[0].params_type;
    }
    private onRuleIdChange(childRule: any) {
        const list = this.myProxy.activityRuleList.filter((item: any) => item.id == childRule.rule_id);
        if (!list || list.length === 0) return;
        childRule.params_type = list[0].params_type;
    }
    private getRulesByType(type: any) {
        return this.myProxy.activityRuleList.filter((item: any) => item.type == type);
    }

    private getRuleDes(rule: any) {
        let result: any = "";
        if (this.myProxy.activityRuleList.length === 0) return result;
        this.myProxy.activityRuleList.find((item: any) => {
            if (item.id.toString() === rule.rule_id.toString()) {
                result = item.desc;
            }
        });
        return result;
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.rules_item {
    [right] {
        text-align: right;
    }
    margin-left: 50px;
    margin-top: 24px;
    border: 1px solid #f08080;
    padding: 12px;
    padding-bottom: 0;
    .edit_section {
        display: flex;
        flex-direction: row;
    }
    .rule_list {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ddd;
        .child_rule_list {
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ddd;
        }
    }
}
.vi_div {
    padding: 0 3px !important;
}
</style>
