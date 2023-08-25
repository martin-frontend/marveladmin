<template>
    <div>
        <el-form-item size="mini" :label="tableColumns['bonus_multiple'].name" prop="bonus_multiple" class="mini_input">
            <el-input type="number" v-model="form.bonus_multiple" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>
        <el-form-item
            size="mini"
            :label="tableColumns['init_prize_pool'].name"
            prop="init_prize_pool"
            class="mini_input"
        >
            <el-input v-model="form.init_prize_pool" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>
        <el-form-item size="mini" :label="tableColumns['prize_pool_add'].name" prop="prize_pool_add" class="mini_input">
            <el-input type="number" v-model="form.prize_pool_add" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>

        <el-form-item size="mini" :label="tableColumns['update_cycle_type'].name" prop="update_cycle_type">
            <!-- <el-checkbox-group v-model="form.update_cycle_types">
                <el-checkbox
                    v-for="(value, key) in tableColumns['update_cycle_type'].options"
                    :key="key"
                    :label="Number(key)"
                >
                    {{ value }}
                </el-checkbox>
            </el-checkbox-group> -->

            <el-radio-group v-model="form.update_cycle_type">
                <template v-for="(value, key) in tableColumns['update_cycle_type'].options">
                    <el-radio v-if="form.update_cycle_types.includes(Number(key))" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </template>
            </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" :label="tableColumns['day_init_num'].name" prop="day_init_num" class="mini_input">
            <el-input type="number" v-model="form.day_init_num" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>

        <!-- 抽奖消耗 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["lottery_cons"].name }}
                </span>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.lottery_cons" :key="index" class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>{{ index+1 }}</span>
                        <span>
                            {{ LangUtil("起始次数") }}
                        </span>
                        <el-input
                            type="number"
                            v-model="item.interval[0]"
                            :disabled="!isCanEdit"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("结束次数") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[1]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </span>

                    <span class="title_width">{{ LangUtil("消耗类型") }}</span>
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')" :disabled="!isCanEdit">
                        <el-option
                            v-for="(value, key) in tableColumns['lottery_cons_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>

                    <template v-if="item.params">
                        <el-select
                            v-model="item.params.key"
                            :placeholder="LangUtil('请选择')"
                            style="margin-left:10px"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns.reward_coin.options[form.plat_id]"
                                :key="key"
                                :label="value"
                                :value="key"
                            ></el-option>
                        </el-select>
                        <span class="title_width">{{ LangUtil("数量") }}</span>
                        <el-input
                            type="number"
                            v-model="item.params.value"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </template>
                </div>
            </div>
        </div>

        <!-- 抽奖奖励 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["lottery_award"].name }}
                </span>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.lottery_award" :key="index" class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>{{ index+1 }}</span>
                        <span>
                            {{ LangUtil("抽奖轮数") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("权重") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[1]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </span>
                    <span class="title_width">{{ LangUtil("奖励类型") }}</span>
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['lottery_award_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                    <template v-if="item.params">
                        <el-select
                            v-if="item.type != 4"
                            v-model="item.params.key"
                            :placeholder="LangUtil('请选择')"
                            style="margin-left:10px"
                            @change="onChange"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns.reward_coin.options[form.plat_id]"
                                :key="key"
                                :label="value"
                                :value="key"
                            ></el-option>
                        </el-select>
                        <span class="title_width">{{ LangUtil("数量") }}</span>
                        <el-input
                            type="number"
                            v-model="item.params.value"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span v-if="item.type == 4">%</span>
                    </template>
                </div>
            </div>
        </div>

        <!-- 彩球奖励 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["ball_award"].name }}
                </span>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.ball_award" :key="index" class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>{{ index+1 }}</span>
                        <span>
                            {{ LangUtil("权重") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("球号") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[1]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </span>
                </div>
            </div>
        </div>

        <!-- 排名奖励 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["rank_award"].name }}
                </span>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.rank_award" :key="index" class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>{{ index+1 }}</span>
                        <span>
                            {{ LangUtil("起始排名") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("结束排名") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[1]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </span>
                    <span class="title_width">{{ LangUtil("奖励类型") }}</span>
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['lottery_award_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                    <template v-if="item.params">
                        <el-select
                            v-if="item.type != 4"
                            v-model="item.params.key"
                            :placeholder="LangUtil('请选择')"
                            style="margin-left:10px"
                            @change="onChange"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns.reward_coin.options[form.plat_id]"
                                :key="key"
                                :label="value"
                                :value="key"
                            ></el-option>
                        </el-select>
                        <span class="title_width">{{ LangUtil("数量") }}</span>
                        <el-input
                            type="number"
                            v-model="item.params.value"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span v-if="item.type == 4">%</span>
                    </template>
                </div>
            </div>
        </div>

        <!-- 每日次数重置消耗 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["day_num_init_config"].name }}
                </span>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.day_num_init_config" :key="index" class="item_mini_input">
                    <span style="margin: 0px 10px;">
                        <span>{{ index+1 }}</span>
                        <!-- <el-input
                            v-for="(ele, key) of item.interval"
                            type="number"
                            :key="key"
                            v-model="item.interval[key]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input> -->
                    </span>
                    <span class="title_width">{{ LangUtil("消耗类型") }}</span>
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')" :disabled="!isCanEdit">
                        <el-option
                            v-for="(value, key) in tableColumns['lottery_cons_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                    <template v-if="item.params">
                        <el-select
                            v-model="item.params.key"
                            :placeholder="LangUtil('请选择')"
                            style="margin-left:10px"
                            @change="onChange"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns.reward_coin.options[form.plat_id]"
                                :key="key"
                                :label="value"
                                :value="key"
                            ></el-option>
                        </el-select>
                        <span class="title_width">{{ LangUtil("数量") }}</span>
                        <el-input
                            type="number"
                            v-model="item.params.value"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </template>
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

@Component
export default class PlatActivityBallAward extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    //是否能编辑
    isCanEdit = false;
    get form() {
        return this.myProxy.dialogData.form;
    }
    //添加一个元素
    onAddItem(arr: any) {
        console.log("----添加与纳素-----");
        let obj = null;
        if (arr && arr.length > 0) {
            obj = JSON.parse(JSON.stringify(arr[0]));
        }

        arr.push(obj);
    }
    onDeleteItem(arr: any, key: any, isArr: boolean = true) {
        console.log("删除对象");
        if (isArr) {
            arr.splice(key, 1);
        } else {
            delete arr[key];
        }
    }
    onChange()
    {

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
