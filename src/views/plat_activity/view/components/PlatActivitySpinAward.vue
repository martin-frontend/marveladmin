<template>
    <div>
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
                        <span>{{ index + 1 }}</span>
                        <!-- <span>
                            {{ LangUtil("起始次数") }}
                        </span> -->
                        <el-input
                            type="number"
                            v-model="item.interval[0]"
                            :disabled="!isCanEdit"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <!-- <span>
                            {{ LangUtil("结束次数") }}
                        </span>
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[1]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input> -->
                    </span>

                    <span class="title_width">{{ LangUtil("消耗类型") }}</span>
                    <el-select v-model="item.type" filterable :placeholder="LangUtil('请选择')" :disabled="!isCanEdit">
                        <el-option
                            v-for="(value, key) in tableColumns['spin_lottery_cons_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>

                    <template v-if="item.params">
                        <el-select v-model="item.params.key" :placeholder="LangUtil('请选择')" style="margin-left:10px">
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
                        <span>{{ index + 1 }}</span>
                        <!-- <span>
                            {{ LangUtil("抽奖轮数") }}
                        </span> -->
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[0]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                        <!-- <span>
                            {{ LangUtil("权重") }}
                        </span> -->
                        <el-input
                            type="number"
                            :disabled="!isCanEdit"
                            v-model="item.interval[1]"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        ></el-input>
                    </span>
                    <span class="title_width">{{ LangUtil("奖励类型") }}</span>
                    <el-select
                        v-model="item.type"
                        filterable
                        :placeholder="LangUtil('请选择')"
                        @change="onChangeType(item)"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns['spin_lottery_award_type'].options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                    <template v-if="item.params">
                        <el-select
                            v-if="item.type == 3"
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
                        <el-input
                            v-if="item.type == 99"
                            v-model="item.params.key"
                            :placeholder="LangUtil('请输入')"
                            style="margin: 0px 4px;"
                        >
                        </el-input>
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
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatActivityModelProxy from "@/views/plat_activity/proxy/PlatActivityProxy";
import { DialogStatus } from "@/core/global/Constant";

@Component
export default class PlatActivitySpinAward extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    //是否能编辑
    isCanEdit = true;
    get form() {
        return this.myProxy.dialogData.form;
    }
    dialogStatus = DialogStatus;
    get status() {
        return this.myProxy.dialogData.status;
    }
    get isStatusUpdate() {
        return this.status == DialogStatus.update;
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
    onChangeType(data: any) {
        data.params.key = "";
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
