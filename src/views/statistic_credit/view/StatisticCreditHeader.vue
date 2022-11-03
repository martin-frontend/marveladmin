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
            <p>{{ $t("common.credit_tips", timeObj) }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
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
    
    private searchInfo = JSON.parse( JSON.stringify( this.listQuery));

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

    private updataSearchInfo()
    {
        let isNeedUpdata = true;
        if (this.searchInfo == this.listQuery)
        {
            isNeedUpdata = false;
        }
        else
        {
            if ( this.searchInfo.plat_id == this.listQuery.plat_id && 
            this.searchInfo.user_id == this.listQuery.user_id && 
            this.searchInfo.username == this.listQuery.username && 
            this.searchInfo.page_count == this.listQuery.page_count && 
            this.searchInfo.page_size == this.listQuery.page_size && 
            this.searchInfo.start_date == this.listQuery.start_date && 
            this.searchInfo.end_date == this.listQuery.end_date
            ) 
            {
                isNeedUpdata = false;
            }
            else
            {
                //console.log("两个文件不同" , this.searchInfo,this.listQuery);
            }
        }
        if (isNeedUpdata)
        {
            this.searchInfo = JSON.parse( JSON.stringify( this.listQuery));
        }
        return isNeedUpdata
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
    handlerSearch() {
        this.listQuery.page_count = 1;
        //objectRemoveNull(this.myProxy.tableData)
        this.updataSearchInfo();
        this.myProxy.setTableData(this.errorData );
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
