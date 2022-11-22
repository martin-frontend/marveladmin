<template>
    <div class="levels" v-if="detail.promotion_model_id" v-loading="net_status.loading">
        <el-tabs type="border-card" v-model="tableData.activeName">
            <el-tab-pane
                v-for="(value, key) in promotion_config.options"
                :label="promotion_config.options[key]"
                :name="key"
                :key="key"
            >
                <el-row type="flex" justify="start" align="middle" style="margin-bottom: 20px">
                    <div class="dropdown-item">
                        <div class="label">{{ LangUtil("最高等级") }}</div>
                        <el-select
                            v-model="tableData.maxlevels[key]"
                            filterable
                            class="select"
                            :placeholder="LangUtil('请选择')"
                            @change="onLevelChange(key)"
                            :disabled="!tableData.isEdit"
                        >
                            <el-option
                                v-for="item in getMaxLevel(key)"
                                :key="item"
                                :label="item"
                                :value="Number(item)"
                            ></el-option>
                        </el-select>
                    </div>
                </el-row>
                <el-table
                    :data="detail.promotion_config[key]"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    size="mini"
                >
                    <el-table-column :label="LangUtil('等级')" type="index" width="100"></el-table-column>
                    <el-table-column :label="tableColumns.promotion_config.options_key[0].total_performance">
                        <template slot-scope="{ row }">
                            <el-input-number
                                type="number"
                                v-model="row.total_performance"
                                :placeholder="LangUtil('请输入')"
                                style="width: 150px"
                                :min="0"
                                :disabled="!tableData.isEdit"
                            ></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column :label="tableColumns.promotion_config.options_key[0].commission_num">
                        <template slot-scope="{ row }">
                            <el-input-number
                                :min="0"
                                type="number"
                                v-model="row.commission_num"
                                :placeholder="LangUtil('请输入')"
                                style="width: 150px"
                                :disabled="!tableData.isEdit"
                            ></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="isShowPromotionNumAdded"
                        :label="tableColumns.promotion_config.options_key[0].commission_num_added"
                    >
                        <template slot-scope="scope">
                            <el-input
                                :min="0"
                                type="number"
                                v-model="scope.row.commission_num_added"
                                :placeholder="LangUtil('请输入')"
                                style="width: 150px"
                                :disabled="!tableData.isEdit"
                                @change="onValueChange(key, scope.$index)"
                            ></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentProxy from "../proxy/PlatAgentProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { Message } from "element-ui";
import i18n from "@/lang";

@Component
export default class PlatAgentBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentProxy = this.getProxy(PlatAgentProxy);
    // proxy property
    tableData = this.myProxy.tableData;
    tableColumns = this.myProxy.tableData.columns;
    detail = this.tableData.detail;

    promotion_config: any = { options: { "0": this.LangUtil("全部") } };

    mounted() {
        const promotionModel = this.tableData.promotionModel;
        if (promotionModel.calc_type == 1) {
            this.tableData.activeName = "2";
            this.promotion_config = this.tableColumns.promotion_config;
        } else {
            this.tableData.activeName = "0";
            this.promotion_config = { options: { "0": this.LangUtil("全部") } };
        }
    }

    @Watch("tableData.update")
    onWatchUpdate() {
        this.$forceUpdate();
    }
    /**更新promotion_config.options */
    @Watch("tableData.promotionModel.calc_type")
    onWatchModel() {
        const promotionModel = this.tableData.promotionModel;
        if (promotionModel.calc_type == 1) {
            this.tableData.activeName = "2";
            this.promotion_config = this.tableColumns.promotion_config;
        } else {
            this.tableData.activeName = "0";
            this.promotion_config = { options: { "0": this.LangUtil("全部") } };
        }
    }
    /**获取当前的最大等级 */
    getMaxLevel(type: string) {
        const promotion_config = this.tableData.promotionModel.promotion_config;
        if (promotion_config && promotion_config[type]) {
            return promotion_config[type].length;
        }
        return 0;
    }
    /**从模板中获取等级列表 */
    getLevels(type: string) {
        const levels = [];
        const promotionModel: any = this.tableData.promotionModel;
        if (promotionModel) {
            const len = promotionModel.promotion_config.length;
            for (let i = 0; i < len; i++) {
                levels.push(i + 1);
            }
        }
        return levels;
    }
    /**获取分类 */
    // get promotion_config(){
    //     const promotionModel = this.tableData.promotionModel;
    //     console.log(">>>>>>>>>", promotionModel.calc_type);
    //     if(promotionModel.calc_type == 1) {
    //         this.tableData.activeName = "2";
    //         return this.tableColumns.promotion_config;
    //     }else{
    //         this.tableData.activeName = "0";
    //         return {options: {"0": this.LangUtil('全部')}};
    //     }
    // }
    /**是否显示级差 */
    get isShowPromotionNumAdded() {
        return this.tableData.promotionModel.is_promotion_num_added == 1;
    }

    handlerQuery() {
        this.myProxy.onQuery();
    }

    onLevelChange(type: string) {
        this.myProxy.onLevelChange(type);
    }

    onValueChange(key: number, index: number) {
        const conf = this.detail.promotion_config[key];
        const len = Object.keys(conf).length;

        const currValue = parseInt(conf[index].commission_num_added);
        const lastValue = parseInt(conf[Math.max(index - 1, 0)].commission_num_added);
        const nextValue = parseInt(conf[Math.min(index + 1, len - 1)].commission_num_added);

        if (currValue >= nextValue) {
            conf[index].commission_num_added = nextValue - 1;
            Message.warning(LangUtil("不可大于下个等级的级差").toString());
        } else if (currValue <= lastValue && lastValue != 0 && currValue != 0) {
            conf[index].commission_num_added = lastValue + 1;
            Message.warning(LangUtil("不可小于上个等级的级差").toString());
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
