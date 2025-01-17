<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch(), changePlat()"
            :clearable="false"
        />
        <el-row class="analystics">
            <el-col :span="20" class="stastics"
                ><span>{{ tableColumns.bonus_pool_amount.name }} {{ tableData.summary.bonus_pool_amount }}</span
                ><span class="expect"
                    >{{ tableColumns.bonus_pool_amount_expect.name }}
                    {{ tableData.summary.bonus_pool_amount_expect }}</span
                ></el-col
            >
            <el-col :span="4" class="btn">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handlerSetting()"
                    v-if="checkUnique(unique.plat_stake_config_update)"
                    >{{ LangUtil("设置") }}</el-button
                ></el-col
            >
        </el-row>
        <el-row class="detail">
            <el-col :span="span"
                >{{ tableColumns.put_in_ratio.name }}<span>{{ stake_config.put_in_ratio | toPercent }} </span>
            </el-col>
            <el-col :span="span"
                >{{ tableColumns.put_out_ratio.name }}<span>{{ stake_config.put_out_ratio | toPercent }}</span></el-col
            >
            <el-col :span="span">
                {{ tableColumns.auto_withdraw_stake_fee.name
                }}<span>{{ stake_config.auto_withdraw_stake_fee | toPercent }}</span></el-col
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
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    tableData = this.myProxy.stakeLogtableData;
    tableColumns = this.myProxy.stakeLogtableData.columns;
    listQuery = this.myProxy.listQuery;
    span: number = 5;
    form = this.myProxy.dialogData.form;

    get stake_config() {
        return this.myProxy.stake_bonus_config;
    }
    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    handlerSetting() {
        this.myProxy.showBonusConfigDialog();
    }

    //更换平台切换
    changePlat() {
        this.form.bonus_coin_name_unique_options = "";
        this.form.stake_coin_name_unique_options = "";
        this.tableColumns.bonus_coin_name_unique_options = this.tableColumns.bonus_coin_name_unique.options[
            this.listQuery.plat_id
        ];
        this.tableColumns.stake_coin_name_unique_options = this.tableColumns.stake_coin_name_unique.options[
            this.listQuery.plat_id
        ];
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
