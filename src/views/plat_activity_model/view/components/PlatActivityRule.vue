<template>
    <div>
        <div class="rules_item" v-for="(item, index) in form.rules" :key="index">
            <el-row type="flex" justify="start" align="middle" :gutter="24">
                <el-col :span="4">
                    <el-button size="mini" icon="el-icon-delete" @click="onDelRule(index)">{{
                        LangUtil("刪除规则")
                    }}</el-button>
                </el-col>
                <el-col :span="2" class="vi_div">
                    <div>ID: {{ index + 1 }}</div>
                </el-col>
                <el-col :span="7" class="vi_div">
                    <el-input size="small" v-model="item.name" :placeholder="LangUtil('请输入')"></el-input>
                </el-col>
                <el-col :span="spanWidth" class="vi_div">
                    <el-select v-model="item.open_mode" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['open_mode'].options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-model="item.open_mode_url"
                        filterable
                        allow-create
                        default-first-option
                        :placeholder="LangUtil('跳转url')"
                    >
                        <el-option
                            v-for="(value, key) in openOptions"
                            :key="key"
                            :label="value.name"
                            :value="value.value"
                        ></el-option>
                    </el-select>
                </el-col>

                <el-col :span="8" class="vi_div">
                    <el-select v-model="item.run_type" filterable :placeholder="LangUtil('选择结算次数')">
                        <el-option
                            v-for="(value, key) in runTypeOptions"
                            :key="key"
                            :label="runTypeOptions[key]"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="10" class="vi_div">
                    <el-input size="small" v-model="item.icon" :placeholder="LangUtil('请输入图标名称')"></el-input>
                </el-col>
                <el-col :span="6" class="vi_div">
                    <el-button size="mini" icon="el-icon-circle-plus-outline" @click="onAddSecondLevel(index)"
                        >{{ LangUtil("新增奖励逻辑") }}
                    </el-button>
                </el-col>
            </el-row>

            <div class="rule_list" v-for="(rule, secondIndex) in item.list" :key="secondIndex">
                <el-row type="flex" justify="start" align="middle" :gutter="24">
                    <el-col :span="3">
                        <div>ID: {{ secondIndex + 1 }}</div>
                    </el-col>
                    <el-col :span="10">
                        <el-input size="small" v-model="rule.name" :placeholder="LangUtil('请输入规则名称')"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-button size="mini" icon="el-icon-delete" @click="onDelSecondLevel(index, secondIndex)"
                            >{{ LangUtil("删除") }}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <div>{{ tableColumns["bonus_multiple"].name }}</div>
                    </el-col>
                    <el-col :span="2">
                        <el-input
                            size="small"
                            v-model="rule.bonus_multiple"
                            :placeholder="LangUtil('请输入')"
                            style="width: 80px"
                        ></el-input>
                    </el-col>
                </el-row>
                <div class="child_rule_list" v-for="(childRule, thirdIndex) in rule.list" :key="thirdIndex">
                    <el-row type="flex" justify="start" align="middle" :gutter="24">
                        <el-col :span="4">
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                @click="onDelThirdLevel(index, secondIndex, thirdIndex)"
                                >{{ LangUtil("删除") }}
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-select
                                v-model="childRule.type"
                                filterable
                                :placeholder="LangUtil('请选择')"
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
                                :placeholder="LangUtil('请选择')"
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
                                :placeholder="LangUtil('请输入')"
                            ></el-input>
                            <el-input
                                size="small"
                                v-if="
                                    childRule.params_type == '6' &&
                                        childRule.rule_id != '93' &&
                                        childRule.rule_id != '94'
                                "
                                v-model="childRule.params"
                                :placeholder="LangUtil('请输入')"
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
                        >{{ LangUtil("添加条件") }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatActivityModelProxy from "@/views/plat_activity_model/proxy/PlatActivityModelProxy";
import Cookies from "js-cookie";
import { ClientModuleUrl } from "@/core/global/Constant";

@Component
export default class PlatActivityRule extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    openOptions = ClientModuleUrl;
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

    runTypeOptions: any = {
        "1": this.LangUtil("多次结算"),
        "2": this.LangUtil("单次结算"),
    };
    typeOptions: any = {
        "1": this.LangUtil("条件"),
        "21": this.LangUtil("消耗"),
        "61": this.LangUtil("奖励"),
        "71": this.LangUtil("概率奖池"),
    };
    paramsTypeOptions: any = {
        "1": this.LangUtil("数值"),
        "2": this.LangUtil("布林值"),
    };
    boolOptions: any = {
        0: this.LangUtil("否"),
        1: this.LangUtil("是"),
    };

    mounted() {
        this.$nextTick(() => {
            this.myProxy.dialogData.loading = false;
        });
    }

    onDelRule(index: number) {
        this.form.rules.splice(index, 1);
    }
    onAddSecondLevel(index: number) {
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

    onTypeChange(childRule: any) {
        const list = this.myProxy.activityRuleList.filter((item: any) => item.type == childRule.type);
        if (!list || list.length === 0) return;
        childRule.rule_id = list[0].id.toString();
        childRule.params_type = list[0].params_type;
    }
    onRuleIdChange(childRule: any) {
        const list = this.myProxy.activityRuleList.filter((item: any) => item.id == childRule.rule_id);
        if (!list || list.length === 0) return;
        childRule.params_type = list[0].params_type;
    }
    getRulesByType(type: any) {
        return this.myProxy.activityRuleList.filter((item: any) => item.type == type);
    }

    getRuleDes(rule: any) {
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
