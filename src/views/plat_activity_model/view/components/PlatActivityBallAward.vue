<template>
    <div>
        <el-form-item size="mini" :label="tableColumns['show_types'].name" prop="show_types">
            <el-checkbox-group v-model="form.show_types">
                <el-checkbox
                    v-for="(value, key) in tableColumns['show_types'].options"
                    :key="key"
                    :label="Number(key)"
                    @change="onShowTypeChange($event, key)"
                >
                    {{ value }}
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item size="mini" :label="tableColumns['bonus_multiple'].name" prop="bonus_multiple" class="mini_input">
            <el-input type="number" v-model="form.bonus_multiple" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>
        <el-form-item
            size="mini"
            :label="tableColumns['init_prize_pool'].name"
            prop="init_prize_pool"
            class="mini_input"
        >
            <el-input type="number" v-model="form.init_prize_pool" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>
        <el-form-item size="mini" :label="tableColumns['prize_pool_add'].name" prop="prize_pool_add" class="mini_input">
            <el-input type="number" v-model="form.prize_pool_add" :placeholder="LangUtil('请输入')"></el-input>
        </el-form-item>

        <el-form-item size="mini" :label="tableColumns['update_cycle_type'].name" prop="update_cycle_type">
            <el-checkbox-group v-model="form.update_cycle_types">
                <el-checkbox
                    v-for="(value, key) in tableColumns['update_cycle_type'].options"
                    :key="key"
                    :label="Number(key)"
                >
                    {{ value }}
                </el-checkbox>
            </el-checkbox-group>
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
                <el-button type="primary" size="mini" @click="onAddItem(form.lottery_cons)">{{
                    LangUtil("添加")
                }}</el-button>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.lottery_cons" :key="index" class="item_mini_input">
                    <el-button size="mini" icon="el-icon-delete" @click="onDeleteItem(form.lottery_cons, index)">{{
                        LangUtil("刪除")
                    }}</el-button>

                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("起始次数") }}
                        </span>
                        <el-input
                            type="number"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("结束次数") }}
                        </span>
                        <el-input
                            type="number"
                            v-model="item.interval[1]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </span>

                    <span class="title_width">{{ LangUtil("消耗类型") }}</span>
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['lottery_cons_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </div>
            </div>
        </div>

        <!-- 抽奖奖励 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["lottery_award"].name }}
                </span>
                <el-button type="primary" size="mini" @click="onAddItem(form.lottery_award)">{{
                    LangUtil("添加")
                }}</el-button>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.lottery_award" :key="index" class="item_mini_input">
                    <el-button size="mini" icon="el-icon-delete" @click="onDeleteItem(form.lottery_award, index)">{{
                        LangUtil("刪除")
                    }}</el-button>

                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("抽奖轮数") }}
                        </span>
                        <el-input
                            type="number"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("权重") }}
                        </span>
                        <el-input
                            type="number"
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
                </div>
            </div>
        </div>

        <!-- 彩球奖励 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["ball_award"].name }}
                </span>
                <el-button type="primary" size="mini" @click="onAddItem(form.ball_award)">{{
                    LangUtil("添加")
                }}</el-button>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.ball_award" :key="index" class="item_mini_input">
                    <el-button size="mini" icon="el-icon-delete" @click="onDeleteItem(form.ball_award, index)">{{
                        LangUtil("刪除")
                    }}</el-button>

                    <span style="margin: 0px 10px;">
                        <span>
                            {{ LangUtil("权重") }}
                        </span>
                        <el-input
                            type="number"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("球号") }}
                        </span>
                        <el-input
                            type="number"
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
                <el-button type="primary" size="mini" @click="onAddItem(form.rank_award)">{{
                    LangUtil("添加")
                }}</el-button>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.rank_award" :key="index" class="item_mini_input">
                    <el-button size="mini" icon="el-icon-delete" @click="onDeleteItem(form.rank_award, index)">{{
                        LangUtil("刪除")
                    }}</el-button>

                    <span style="margin: 0px 10px;">
                        <!-- <el-input
                            v-for="(ele, key) of item.interval"
                            type="number"
                            :key="key"
                            v-model="item.interval[key]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input> -->
                        <span>
                            {{ LangUtil("起始排名") }}
                        </span>
                        <el-input
                            type="number"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <span>
                            {{ LangUtil("结束排名") }}
                        </span>
                        <el-input
                            type="number"
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
                </div>
            </div>
        </div>

        <!-- 每日次数重置消耗 -->
        <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["day_num_init_config"].name }}
                </span>
                <el-button type="primary" size="mini" @click="onAddItem(form.day_num_init_config)">{{
                    LangUtil("添加")
                }}</el-button>
            </div>
            <div class="border_div">
                <div v-for="(item, index) of form.day_num_init_config" :key="index" class="item_mini_input">
                    <el-button
                        size="mini"
                        icon="el-icon-delete"
                        @click="onDeleteItem(form.day_num_init_config, index)"
                        >{{ LangUtil("刪除") }}</el-button
                    >

                    <span style="margin: 0px 10px;">
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
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['lottery_cons_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
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
export default class PlatActivityBallAward extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;

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

    // 展示方式變動
    onShowTypeChange(event: any, key: number) {
        // 點選客戶端處理
        if (key == 0 && event == true) {
            this.form.show_types = [0];
        } else if (key > 0 && event == true) {
            Object.keys(this.form.show_types).forEach(element => {
                if (this.form.show_types[element] == 0) {
                    delete this.form.show_types[element];
                }
            });
        }
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
