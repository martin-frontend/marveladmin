<template>
    <div>
        <div class="search_style">
            <div class="search_space">
                <!-- 所属平台 -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["plat_id"].name }}</div>
                    <el-select v-model="listQuery.plat_id" filterable class="select" :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns.plat_id.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </div>
                <!-- 账户Id -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["user_id"].name }}</div>
                    <el-input :placeholder="LangUtil('请输入')" v-model="listQuery.user_id" clearable> </el-input>
                </div>

                <!-- 账户账号 -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["username"].name }}</div>
                    <el-input :placeholder="LangUtil('请输入')" v-model="listQuery.username" clearable> </el-input>
                </div>

                <!-- 币种 -->
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["coin_name_unique"].name }}</div>
                    <el-select
                        v-model="listQuery.coin_name_unique"
                        filterable
                        class="select"
                        :placeholder="LangUtil('请选择')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.coin_name_unique.options[listQuery.plat_id]"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </div>

                <!-- 结算时间 -->
                <div class="item_group">
                    <SearchDatePicker
                        :title="LangUtil('结算时间')"
                        :startDate.sync="listQuery.start_date"
                        :endDate.sync="listQuery.end_date"
                        :showTime="true"
                        :tip="LangUtil('（北京时间）')"
                        :pickerOptions="myProxy.pickerOptions"
                    />
                </div>

                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["vendor_type"].name }}</div>
                    <el-select
                        v-model="listQuery.vendor_type"
                        filterable
                        class="select"
                        :placeholder="LangUtil('请选择')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.vendor_type.options"
                            :key="Number(key)"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                </div>
                <!-- 搜索、重置 按钮 -->
                <div>
                    <el-button @click="handlerSearch" type="primary" icon="el-icon-search" class="item">{{
                        LangUtil("查询")
                    }}</el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="item">{{
                        LangUtil("重置")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div v-if="isTipsShow">
            <template v-if="bind_relation.length > 2">
                <span 
                    v-for="n in bind_relation.length-2" 
                    :key="n" 
                >
                    <span 
                        @click="handlerQuery(bind_relation[n])" 
                        class="bind"
                    >
                        {{ bind_relation[n] + '(' + bind_relation_username[n] + ')' }}
                    </span>
                    {{ ' - ' }} 
                </span>
            </template>
            <span>{{ agent.user_id + '(' + agent.username + ')' }}</span>
            <div>{{ LangUtil("用户{0} 统计时间{1}至{2}", ...timeObj) }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import StatisticCreditProxy from "../proxy/StatisticCreditProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { stringFormat, objectRemoveNull } from "@/core/global/Functions";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class NicoTestHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticCreditProxy = this.getProxy(StatisticCreditProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    agent = this.myProxy.tableData.agent;

    // searchInfo = JSON.parse( JSON.stringify( this.listQuery));
    searchInfo = this.myProxy.tableData.info_head;

    get bind_relation(){
        if (this.myProxy.tableData.bind_relation == '-') {
            return [];
        } else {
            return this.myProxy.tableData.bind_relation.split('-');
        }
    }

    get bind_relation_username(){
        if (this.myProxy.tableData.bind_relation_username == '--') {
            return [];
        } else {
            return this.myProxy.tableData.bind_relation_username.split('-');
        }
    }

    public get timeObj(): any {
        return [this.searchInfo.user_id, this.searchInfo.start_date, this.searchInfo.end_date];
    }

    public get isTipsShow(): boolean {
        if (this.searchInfo.user_id) {
            return true;
        }
        return false;
    }

    errorData = {
        list: [],
        pageInfo: {
            pageCount: 1,
            pageCurrent: 1,
            pageSize: 20,
            pageTotal: 0,
        },
    };

    @Watch("listQuery.plat_id")
    onWatchPlat() {
        this.listQuery.coin_name_unique = "USDT";
    }

    @Watch("listQuery.coin_name_unique")
    onWatchCoin() {
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

    handlerQuery(user_id: any) {
        this.myProxy.onQueryUser(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.bind{
    display: inline-block;
    cursor: pointer;
    text-decoration: underline;
}
</style>
