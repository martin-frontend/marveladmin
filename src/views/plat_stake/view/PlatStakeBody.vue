<template>
    <div>
        <el-radio-group v-model="stakeType" class="stake_type">
            <el-radio v-for="(value, key) in stakeOptions" :key="key" :label="Number(key)">
                {{ value }}
            </el-radio>
        </el-radio-group>
        <PlatStakeLog v-if="isStakeLog" />
        <PlatStakePoolLog v-if="isStakePoolLog" />
        <PlatStakeBonusLog v-if="isStakeBonusLog" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatStakeProxy from "../proxy/PlatStakeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import PlatStakeLog from "./components/PlatStakeLog.vue";
import PlatStakePoolLog from "./components/PlatStakePoolLog.vue";
import PlatStakeBonusLog from "./components/PlatStakeBonusLog.vue";
import i18n from "@/lang";

@Component({
    components: {
        PlatStakeLog,
        PlatStakePoolLog,
        PlatStakeBonusLog,
        Pagination,
    },
})
export default class PlatStakeBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    listQuery = this.myProxy.listQuery;

    get isStakeLog() {
        return this.stakeType == StakeType.StakeLog;
    }
    get isStakePoolLog() {
        return this.stakeType == StakeType.StakePool;
    }
    get isStakeBonusLog() {
        return this.stakeType == StakeType.Bonus;
    }
    stakeType = 0;
    stakeOptions: any = {
        0: LangUtil("质押"),
        1: LangUtil("奖池"),
        2: LangUtil("分红"),
    };

    @Watch("stakeType")
    onWatchStakeTpye() {
        this.listQuery.page_count = 1;
        this.myProxy.resetData();
        switch (this.stakeType) {
            case StakeType.StakeLog:
                this.myProxy.onQuery();
                break;
            case StakeType.StakePool:
                this.myProxy.onStakePoolQuery();
                break;
            case StakeType.Bonus:
                this.myProxy.onStakeBonusQuery();
                break;
        }
    }
}
enum StakeType {
    StakeLog = 0,
    StakePool = 1,
    Bonus = 2,
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.stake_type {
    margin-top: 16px;
    margin-bottom: 12px;
}
</style>
