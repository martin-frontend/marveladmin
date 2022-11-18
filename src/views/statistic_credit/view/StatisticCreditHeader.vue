<template>
    <div>
        <div class="search_style">
            <div class="search_space">
                <!-- 所属平台 -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["plat_id"].name }}</div>
                    <el-select v-model="listQuery.plat_id" filterable class="select"
                        :placeholder="$t('common.pleaseChoose')" >
                        <el-option v-for="(value, key) in tableColumns.plat_id.options" :key="key" :label="value"
                            :value="key"></el-option>
                    </el-select>
                </div>
                <!-- 账户Id -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["user_id"].name }}</div>
                    <el-input :placeholder="$t('common.pleaseEnter')" v-model="listQuery.user_id" clearable>
                    </el-input>
                </div>

                <!-- 账户账号 -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["username"].name }}</div>
                    <el-input :placeholder="$t('common.pleaseEnter')" v-model="listQuery.username" clearable>
                    </el-input>
                </div>

                <!-- 币种 -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["coin_name_unique"].name }}</div>
                    <el-select v-model="listQuery.coin_name_unique" filterable class="select"
                        :placeholder="$t('common.pleaseChoose')" >
                        <el-option v-for="(value, key) in tableColumns.coin_name_unique.options[listQuery.plat_id]" :key="key" :label="value"
                            :value="key"></el-option>
                    </el-select>
                </div>

                <!-- 结算时间 -->
                <div class="item_group">
                    <SearchDatePicker :title="tableColumns.searchtime.name"
                        :startDate.sync="listQuery.start_date" :endDate.sync="listQuery.end_date"
                        :showTime="true" :tip="$t('plat_users_bet.defaultTime')"
                        :pickerOptions="myProxy.pickerOptions" />
                </div>

                <!-- 搜索、重置 按钮 -->
                <div>
                    <el-button @click="handlerSearch" type="primary" icon="el-icon-search" class="item">{{
                            $t("common.search")
                    }}</el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="item">{{
                            $t("common.reset")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div class="row" v-if="isTipsShow">
            <div>{{ $t("common.credit_tips", timeObj) }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import StatisticCreditProxy from "../proxy/StatisticCreditProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { stringFormat,objectRemoveNull } from "@/core/global/Functions";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})

export default class NicoTestHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    private myProxy: StatisticCreditProxy = this.getProxy(StatisticCreditProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    //private searchInfo = JSON.parse( JSON.stringify( this.listQuery));
    private searchInfo =  this.myProxy.tableData.info_head;

    public get timeObj() : object {
        return {
                0:this.searchInfo.user_id,
                1: this.searchInfo.start_date,
                2:this.searchInfo.end_date
            }
    }

    public get isTipsShow() : boolean {
        if (this.searchInfo.user_id)
        {
            return true;
        }
        return false;
    }

    private errorData ={
        list:[],
        pageInfo:{
            pageCount:1,
            pageCurrent:1,
            pageSize:20,
            pageTotal:0,
        }
    }

    @Watch("listQuery.plat_id")
    onWatchPlat(){
        this.listQuery.coin_name_unique = "USDT";
    }

    @Watch("listQuery.coin_name_unique")
    onWatchCoin(){
        this.myProxy.tableData.list = [];
        this.myProxy.onQuery();
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        //objectRemoveNull(this.myProxy.tableData)

        // this.updataSearchInfo();
        // this.myProxy.setTableData(this.errorData );

        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
