<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
        />
        <el-row class="analystics">
            <el-col :span="20" class="stastics"
                ><span>{{ tableColumns.bonus_pool_amount.name }} {{ tableData.summary.bonus_pool_amount }}</span
                ><span class="expect">{{ tableColumns.bonus_pool_amount_expect.name }} {{ tableData.summary.bonus_pool_amount_expect }}</span></el-col
            >
            <el-col :span="4" class="btn">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handlerSetting()"
                    v-if="checkUnique(unique.admin_user_show)"
                    >{{ $t("common.setting") }}</el-button
                ></el-col
            >
        </el-row>
        <el-row class="detail">
            <el-col :span="span"
                >{{ tableColumns.put_in_ratio.name }}<span>{{ stake_config.put_in_ratio | toPercent }}</span></el-col
            >
            <el-col :span="span"
                >{{ tableColumns.put_out_ratio.name }}<span>{{ stake_config.put_out_ratio | toPercent }}</span></el-col
            >
            <el-col :span="span">
                {{ tableColumns.auto_withdraw_stake_fee.name}}<span>{{ stake_config.auto_withdraw_stake_fee | toPercent }}</span></el-col
            >
        </el-row>
        <el-row class="detail">
            <el-col :span="span"
                >{{ tableColumns.manual_withdraw_stake_fee.name
                }}<span>{{ stake_config.manual_withdraw_stake_fee | toPercent }}</span></el-col
            >
            <el-col :span="span"
                >{{ tableColumns.min_coin_count.name }}<span>{{ stake_config.min_coin_count }}</span></el-col
            >
            <el-col :span="span"
                >{{ tableColumns.is_open_stake.name
                }}<span>{{ tableColumns.is_open_stake.options[stake_config.is_open_stake] }}</span></el-col
            >
        </el-row>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatStakeProxy from "../proxy/PlatStakeProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
    },
    filters: {
        toPercent(value: number) {
            let dec = (value * 100).toFixed(2);
            return parseFloat(dec).toString() + "%";
        },
    },
})
export default class PlatStakeHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    private tableData = this.myProxy.stakeLogtableData;
    private tableColumns = this.myProxy.stakeLogtableData.columns;
    private listQuery = this.myProxy.listQuery;
    private span: number = 5;

    get stake_config() {
        return this.myProxy.stake_bonus_config;
    }
    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    private handlerSetting() {
        this.myProxy.showBonusConfigDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.analystics {
    margin-left: 16px;
    font-size: 14px;
    .stastics {
        color: red;
        .expect {
            margin-left: 30px;
        }
    }
    .btn {
        display: flex;
        justify-content: flex-end;
    }
}
.detail {
    margin-left: 16px;
    font-size: 14px;
    margin-bottom: 16px;
    span {
        margin-left: 16px;
    }
}
</style>
