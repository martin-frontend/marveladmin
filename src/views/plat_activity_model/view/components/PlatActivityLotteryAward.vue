<template>
    <div>
        <el-form-item size="mini" :label="tableColumns['bonus_multiple'].name" prop="bonus_multiple" class="mini_input">
            <el-input type="number" v-model="form.bonus_multiple" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>
        <!-- 用户期限 -->
        <el-form-item size="mini" :label="tableColumns['user_term'].name" prop="user_term" class="mini_input">
            <el-input
                v-model="form.user_term"
                :placeholder="LangUtil('请输入')"
                oninput="value=value.replace(/[^\d]/g,'');"
                @blur="inputUserTerm"
            >
            </el-input>
        </el-form-item>
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ LangUtil("每日任务") }}
                </span>
                <el-button type="primary" size="mini" @click="onAdd(form.every_task)">
                    {{ LangUtil("添加") }}
                </el-button>
            </div>
            <div class="border_div" v-for="(daily_item, daily_index) of form.every_task" :key="daily_index">
                <div class="item_mini_input">
                    <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                        <span>
                            <span>
                                {{ LangUtil("第{0}天", daily_index + 1) }}
                            </span>
                            <el-button type="primary" size="mini" @click="onAddCycleTask(form.every_task, daily_index)">
                                {{ LangUtil("添加") }}
                            </el-button>
                        </span>
                        <span>
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                @click="onDelete(form.every_task, daily_index)"
                            >
                                {{ LangUtil("删除") }}
                            </el-button>
                        </span>
                    </span>
                </div>
                <div class="border_div" v-for="(item, index) of form.every_task[daily_index]" :key="index">
                    <div class="item_mini_input">
                        <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                            <span>
                                <span>
                                    {{ LangUtil("条件") }}
                                </span>
                                <el-select v-model="item.condition.type" filterable :placeholder="LangUtil('请选择')">
                                    <el-option
                                        v-for="(value, key) in tableColumns['every_point_every_condition_type'].options"
                                        :key="key"
                                        :label="value"
                                        :value="Number(key)"
                                    >
                                    </el-option>
                                </el-select>
                                <el-input
                                    v-if="item.condition.type != 80 && item.condition.type != ''"
                                    v-model="item.condition.params[0]"
                                    type="number"
                                    :placeholder="LangUtil('请输入')"
                                    style="margin: 0px 4px;"
                                    @change="OnChangeParams(item.condition.params)"
                                >
                                </el-input>
                            </span>
                            <span>
                                <el-button
                                    size="mini"
                                    icon="el-icon-delete"
                                    @click="onDeleteCycleTask(form.every_task, daily_index, index)"
                                >
                                    {{ LangUtil("删除") }}
                                </el-button>
                            </span>
                        </span>
                    </div>
                    <div class="item_mini_input">
                        <span style="margin: 0px 10px;">
                            <span>
                                {{ LangUtil("奖励") }}
                            </span>
                            <el-select v-model="item.award.type" filterable :placeholder="LangUtil('请选择')">
                                <el-option
                                    v-for="(value, key) in tableColumns['every_point_award_type'].options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                >
                                </el-option>
                            </el-select>
                            <el-select
                                v-model="item.award.settlement_type"
                                filterable
                                :placeholder="LangUtil('请选择')"
                                style="margin: 0px 4px;"
                            >
                                <el-option
                                    v-for="(value, key) in tableColumns['every_point_award_settlement_type'].options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                >
                                </el-option>
                            </el-select>
                            <!-- 数值 -->
                            <span v-if="item.award.settlement_type == 70">
                                <el-input
                                    v-model="item.award.params[0]"
                                    type="number"
                                    :placeholder="LangUtil('请输入')"
                                    style="margin: 0px 4px;"
                                    @change="OnChangeParams(item.award.params)"
                                >
                                </el-input>
                            </span>
                            <!-- 随机 -->
                            <span v-if="item.award.settlement_type == 71">
                                <el-input
                                    v-model="item.award.params[0]"
                                    type="number"
                                    :placeholder="LangUtil('请输入')"
                                    style="margin: 0px 4px;"
                                >
                                </el-input>
                                <el-input
                                    v-model="item.award.params[1]"
                                    type="number"
                                    :placeholder="LangUtil('请输入')"
                                    style="margin: 0px 4px;"
                                >
                                </el-input>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ LangUtil("循环任务") }}
                </span>
                <el-button type="primary" size="mini" @click="onAdd(form.cycle_task)">
                    {{ LangUtil("添加") }}
                </el-button>
            </div>
            <div class="border_div" v-for="(item, index) of form.cycle_task" :key="index">
                <div class="item_mini_input">
                    <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                        <span>
                            <span>
                                {{ LangUtil("条件") }}
                            </span>
                            <el-select v-model="item.condition.type" filterable :placeholder="LangUtil('请选择')">
                                <el-option
                                    v-for="(value, key) in tableColumns['every_point_cycle_condition_type'].options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                >
                                </el-option>
                            </el-select>
                            <el-input
                                v-model="item.condition.params[0]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                                @change="OnChangeParams(item.condition.params)"
                            >
                            </el-input>
                        </span>
                        <span>
                            <el-button size="mini" icon="el-icon-delete" @click="onDelete(form.cycle_task, index)">
                                {{ LangUtil("删除") }}
                            </el-button>
                        </span>
                    </span>
                </div>
                <div class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("奖励") }}
                        </span>
                        <el-select v-model="item.award.type" filterable :placeholder="LangUtil('请选择')">
                            <el-option
                                v-for="(value, key) in tableColumns['every_point_award_type'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                            v-model="item.award.settlement_type"
                            filterable
                            :placeholder="LangUtil('请选择')"
                            style="margin: 0px 4px;"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns['every_point_award_settlement_type'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            >
                            </el-option>
                        </el-select>
                        <!-- 数值 -->
                        <span v-if="item.award.settlement_type == 70">
                            <el-input
                                v-model="item.award.params[0]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                                @change="OnChangeParams(item.award.params)"
                            >
                            </el-input>
                        </span>
                        <!-- 随机 -->
                        <span v-if="item.award.settlement_type == 71">
                            <el-input
                                v-model="item.award.params[0]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                            >
                            </el-input>
                            <el-input
                                v-model="item.award.params[1]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                            >
                            </el-input>
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ LangUtil("抽奖消耗") }}
                </span>
            </div>
            <div class="item_mini_input">
                <el-select v-model="form.point_lottery_cons[0].type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['every_point_cons_type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
                <el-input
                    v-model="form.point_lottery_cons[0].params[0]"
                    type="number"
                    :placeholder="LangUtil('请输入')"
                    style="margin: 0px 4px;"
                    @change="OnChangeParams(form.point_lottery_cons[0].params)"
                >
                </el-input>
            </div>
        </div>
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["lottery_award"].name }}
                </span>
                <el-button type="primary" size="mini" @click="onAdd(form.point_lottery_award)">
                    {{ LangUtil("添加") }}
                </el-button>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.point_lottery_award" :key="index" class="item_mini_input">
                    <el-button size="mini" icon="el-icon-delete" @click="onDelete(form.point_lottery_award, index)">
                        {{ LangUtil("刪除") }}
                    </el-button>
                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("权重") }}
                        </span>
                        <el-input
                            type="number"
                            v-model="item.weight"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        >
                        </el-input>
                    </span>
                    <span class="title_width">{{ LangUtil("奖励类型") }}</span>
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['every_point_award_type'].options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        v-if="item.type != 3"
                        v-model="item.params[0]"
                        type="number"
                        :placeholder="LangUtil('请输入')"
                        style="margin: 0px 4px;"
                        @change="OnChangeParams(item.params)"
                    >
                    </el-input>
                </div>
            </div>
        </div>
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ LangUtil("普通任务") }}
                </span>
                <el-button type="primary" size="mini" @click="onAdd(form.routine_task)">
                    {{ LangUtil("添加") }}
                </el-button>
            </div>
            <div class="border_div" v-for="(item, index) of form.routine_task" :key="index">
                <div class="item_mini_input">
                    <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                        <span>
                            <span>
                                {{ LangUtil("条件") }}
                            </span>
                            <el-select v-model="item.condition.type" filterable :placeholder="LangUtil('请选择')">
                                <el-option
                                    v-for="(value, key) in tableColumns['every_point_routine_condition_type'].options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                >
                                </el-option>
                            </el-select>
                            <el-input
                                v-model="item.condition.params[0]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                                @change="OnChangeParams(item.condition.params)"
                            >
                            </el-input>
                        </span>
                        <span>
                            <el-button size="mini" icon="el-icon-delete" @click="onDelete(form.routine_task, index)">
                                {{ LangUtil("删除") }}
                            </el-button>
                        </span>
                    </span>
                </div>
                <div class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("奖励") }}
                        </span>
                        <el-select v-model="item.award.type" filterable :placeholder="LangUtil('请选择')">
                            <el-option
                                v-for="(value, key) in tableColumns['every_point_award_type'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                            v-model="item.award.settlement_type"
                            filterable
                            :placeholder="LangUtil('请选择')"
                            style="margin: 0px 4px;"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns['every_point_award_settlement_type'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            >
                            </el-option>
                        </el-select>
                        <!-- 数值 -->
                        <span v-if="item.award.settlement_type == 70">
                            <el-input
                                v-model="item.award.params[0]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                                @change="OnChangeParams(item.award.params)"
                            >
                            </el-input>
                        </span>
                        <!-- 随机 -->
                        <span v-if="item.award.settlement_type == 71">
                            <el-input
                                v-model="item.award.params[0]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                            >
                            </el-input>
                            <el-input
                                v-model="item.award.params[1]"
                                type="number"
                                :placeholder="LangUtil('请输入')"
                                style="margin: 0px 4px;"
                            >
                            </el-input>
                        </span>
                    </span>
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

@Component
export default class PlatActivityLotteryAward extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;

    get form() {
        return this.myProxy.dialogData.form;
    }

    onAdd(arr: any) {
        let obj = null;
        if (arr && arr.length >= 0) {
            obj = JSON.parse(JSON.stringify(arr[0]));
        }
        arr.push(obj);
    }

    onDelete(arr: any, key: any, isArr: boolean = true) {
        // if (arr.length == 1) {
        //     return;
        // }
        if (isArr) {
            arr.splice(key, 1);
        } else {
            delete arr[key];
        }
    }

    onAddCycleTask(arr: any, daily_index: any) {
        let obj = null;
        if (arr[0] && arr[0].length >= 0) {
            obj = JSON.parse(JSON.stringify(arr[0][0]));
        }
        arr[daily_index].push(obj);
    }

    onDeleteCycleTask(arr: any, daily_index: any, cycle_index: any, isArr: boolean = true) {
        // if (arr[daily_index].length == 1) {
        //     return;
        // }
        if (isArr) {
            arr[daily_index].splice(cycle_index, 1);
        } else {
            delete arr[daily_index][cycle_index];
        }
    }

    inputUserTerm(e: any) {
        this.form.user_term = e.target.value;
    }

    OnChangeParams(arr: any) {
        arr.splice(1, 1, arr[0]);
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.mini_input {
    .el-input {
        width: 200px;
    }
}
.item_mini_input {
    margin: 8px 0px;
    .el-input {
        width: 100px;
    }
}
.border_div {
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
}
.border_div_max {
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    padding: 10px;
    margin: 16px 4px;
}
.title_width {
    margin-right: 10px;
}
.title_font {
    font-weight: 700;
}
</style>
