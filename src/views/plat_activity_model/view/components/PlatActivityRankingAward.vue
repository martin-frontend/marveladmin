<template>
    <div>
        <el-form-item :label="tableColumns['rank_type'].name" prop="rank_type">
            <el-select v-model="form.rank_type" filterable :placeholder="LangUtil('请选择')">
                <el-option
                    v-for="(value, key) in tableColumns['rank_type'].options"
                    :key="key"
                    :label="value"
                    :value="Number(key)"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="tableColumns['lowest_score'].name" prop="lowest_score" class="mini_input">
            <el-input
                v-model="form.lowest_score"
                :placeholder="LangUtil('请输入')"
                onkeyup="this.value=(this.value.match(/\d+(.\d{0,2})?/)||[''])[0]"
                @blur="inputLowestScoreChange"
            >
            </el-input>
        </el-form-item>
        <el-form-item
            :label="tableColumns['vendor_type'].name"
            prop="vendor_type"
            v-if="form.rank_type == 1 || form.rank_type == 2 || form.rank_type == 3"
        >
            <div style="display: flex;">
                <el-select v-model="form.vendor_type" filterable :placeholder="LangUtil('游戏类型')">
                    <el-option
                        v-for="(value, key) in tableColumns['vendor_type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
                <el-form-item prop="vendor_id">
                    <el-select
                        v-model="form.vendor_id"
                        filterable
                        :placeholder="LangUtil('游戏厂商')"
                        @change="OnChangeVendorId"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns['vendor_id'].options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="vendor_product_id">
                    <el-select
                        multiple
                        v-model="form.vendor_product_id"
                        filterable
                        :placeholder="LangUtil('指定游戏(多选)')"
                        class="multiple"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns['vendor_product_id'].options[form.vendor_id]"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form-item>
        <!-- 抽奖消耗 -->
        <!-- <div class="border_div_max">
            <div class="title_font">
                <span>
                    {{ tableColumns["rank_award"].name }}
                </span>
                <el-button type="primary" size="mini" @click="onAddItem(form.rank_award)">
                    {{ LangUtil("添加") }}
                </el-button>
            </div>
            <div class="border_div">
                <div
                    v-for="(item, index) of form.rank_award"
                    :key="index"
                    class="item_mini_input"
                    style="display: flex;"
                >
                    <el-button
                        size="mini"
                        icon="el-icon-delete"
                        @click="onDeleteItem(form.rank_award, index)"
                        style="height: 30px;"
                    >
                        {{ LangUtil("刪除") }}
                    </el-button>
                    <div>
                        <div style="margin-left: 34px; margin-bottom: 18px;">
                            <span>
                                <span style="color:red;">* </span>
                                <span class="title_width">
                                    {{ LangUtil("奖励排名") }}
                                </span>
                                <el-input v-model="item.interval[0]" :placeholder="LangUtil('开始排名')"> </el-input>
                                <el-input v-model="item.interval[1]" :placeholder="LangUtil('结束排名')"> </el-input>
                                <span style="color:red; margin-left: 34px;">* </span>
                                <span class="title_width">
                                    {{ LangUtil("奖励内容") }}
                                </span>
                                <el-select v-model="item.award.key" filterable :placeholder="LangUtil('奖励币种')">
                                    <el-option
                                        v-for="(value, key) in tableColumns['reward_coin'].options"
                                        :key="key"
                                        :label="value"
                                        :value="key"
                                    >
                                    </el-option>
                                </el-select>
                                <el-input v-model="item.award.value" :placeholder="LangUtil('奖励数量')"></el-input>
                            </span>
                        </div>
                        <div>
                            <span style="margin: 0px 10px;">
                                <span style="color:red;">* </span>
                                <span class="title_width">{{ LangUtil("提现流水倍数") }}</span>
                                <el-input
                                    v-model="item.bonus_multiple"
                                    :placeholder="LangUtil('提现流水倍数')"
                                ></el-input>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatActivityModelProxy from "@/views/plat_activity_model/proxy/PlatActivityModelProxy";

@Component
export default class PlatActivityRankingAward extends AbstractView {
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

    OnChangeVendorId() {
        this.form.vendor_product_id = "";
    }

    inputLowestScoreChange(e: any) {
        this.form.lowest_score = e.target.value;
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
    margin-bottom: 18px;
    .el-input {
        width: 130px;
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
.multiple {
    ::v-deep .el-input {
        width: 500px;
    }
}
</style>
