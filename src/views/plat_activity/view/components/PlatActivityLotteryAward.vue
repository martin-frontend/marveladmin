<template>
    <div>
        <!-- 用户期限 -->
        <el-form-item size="mini" :label="tableColumns['user_term'].name" prop="user_term" class="mini_input">
            <el-input
                v-model="form.user_term"
                :placeholder="LangUtil('请输入')"
                oninput="value=value.replace(/[^\d]/g,'');"
                @blur="inputUserTerm"
            ></el-input>
        </el-form-item>
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ LangUtil("每日任务") }}
                </span>
            </div>
            <div class="border_div" v-for="(daily_item, daily_index) of form.every_task" :key="daily_index">
                <div class="item_mini_input">
                    <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                        <span>
                            <span>
                                {{ LangUtil("第{0}天", daily_index + 1) }}
                            </span>
                        </span>
                        <span> </span>
                    </span>
                </div>
                <div class="border_div" v-for="(item, index) of form.every_task[daily_index]" :key="index">
                    <div class="item_mini_input">
                        <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                            <span>
                                <span>
                                    {{ LangUtil("条件") }}
                                </span>
                                <el-select
                                    v-model="item.condition.type"
                                    filterable
                                    :placeholder="LangUtil('请选择')"
                                    disabled
                                >
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
                            <span> </span>
                        </span>
                    </div>
                    <div class="item_mini_input">
                        <span style="margin: 0px 10px;">
                            <span>
                                {{ LangUtil("奖励") }}
                            </span>
                            <el-select v-model="item.award.type" filterable :placeholder="LangUtil('请选择')" disabled>
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
            </div>
            <div class="border_div" v-for="(item, index) of form.cycle_task" :key="index">
                <div class="item_mini_input">
                    <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                        <span>
                            <span>
                                {{ LangUtil("条件") }}
                            </span>
                            <el-select
                                v-model="item.condition.type"
                                filterable
                                :placeholder="LangUtil('请选择')"
                                disabled
                            >
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
                        <span> </span>
                    </span>
                </div>
                <div class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("奖励") }}
                        </span>
                        <el-select v-model="item.award.type" filterable :placeholder="LangUtil('请选择')" disabled>
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
                <el-select
                    v-model="form.point_lottery_cons[0].type"
                    filterable
                    :placeholder="LangUtil('请选择')"
                    disabled
                >
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
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.point_lottery_award" :key="index" class="item_mini_input">
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
                            v-for="(value, key) in tableColumns['lottery_award_type'].options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        >
                        </el-option>
                    </el-select>
                    <!-- 代币 -->
                    <span v-if="item.type == 3">
                        <el-select v-model="item.params[0]" filterable :placeholder="LangUtil('请选择')">
                            <el-option
                                v-for="(value, key) in tableColumns['all_coin'].options[form.plat_id]"
                                :key="key"
                                :label="value"
                                :value="key"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            v-model="item.params[1]"
                            type="number"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        >
                        </el-input>
                    </span>

                    <!-- 奖池百分比 -->
                    <el-input
                        v-else
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
            </div>
            <div class="border_div" v-for="(item, index) of form.routine_task" :key="index">
                <div class="item_mini_input">
                    <span style="margin: 0px 10px; display: flex; justify-content: space-between;">
                        <span>
                            <span>
                                {{ LangUtil("条件") }}
                            </span>
                            <el-select
                                v-model="item.condition.type"
                                filterable
                                :placeholder="LangUtil('请选择')"
                                disabled
                            >
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
                    </span>
                </div>
                <div class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("奖励") }}
                        </span>
                        <el-select v-model="item.award.type" filterable :placeholder="LangUtil('请选择')" disabled>
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
import PlatActivityModelProxy from "@/views/plat_activity/proxy/PlatActivityProxy";
import { DialogStatus } from "@/core/global/Constant";

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

    inputUserTerm(e: any) {
        this.form.user_term = e.target.value;
    }

    OnChangeParams(arr: any) {
        arr.splice(1, 1, arr[0]);
    }

    // onChangeAwardType(award: any) {
    //     if (award.type == 3) {
    //         award.params = {
    //             key: "",
    //             value: "",
    //         };
    //     } else {
    //         award.params = [0, 0];
    //     }
    // }
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
    height: 50px;
    font-weight: 700;
}
</style>
