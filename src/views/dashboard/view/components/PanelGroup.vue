<template>
    <el-row :gutter="40" class="panel-group">
        <el-col class="card-panel-col" v-for="(item, index) in panelData" :key="index">
            <div class="card-panel">
                <div class="card-panel-icon-wrapper">
                    <span class="icon-size" :class="item.icon" style="color: #34bfa3"></span>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        {{ item.name }}
                    </div>
                    <span v-if="item.vary">
                        <div class="card-panel-num">
                            {{ $t("common.today") }}
                            <WinLossDisplay :amount="item.today"/>
                        </div>
                        <div class="card-panel-num">
                            {{ $t("common.yesterday") }}
                            <WinLossDisplay :amount="item.yesterday"/>
                        </div>
                    </span>
                    <span v-if="!item.vary">
                        <div class="card-panel-num">
                            {{ $t("common.today") }}
                            <span>{{ item.today }}</span>
                        </div>
                        <div class="card-panel-num">
                            {{ $t("common.yesterday") }}
                            <span>{{ item.yesterday }}</span>
                        </div>
                    </span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
// import CountTo from "vue-count-to";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import DashboardProxy from "@/views/dashboard/proxy/DashboardProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
    },
})
export default class DashboardDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: DashboardProxy = this.getProxy(DashboardProxy);

    get panelData() {
        return this.myProxy.panelData;
    }
}
</script>

<style lang="scss" scoped>
.panel-group {
    margin-top: 18px;
    display: flex;
    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        height: 108px;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #ffffff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);
        border: 1px solid #42b983;
        border-radius: 10px;
        display: flex;

        .icon-size {
            font-size: 55px;
        }

        .card-panel-icon-wrapper {
            margin: 4px 0 0 4px;
            padding: 16px;
            transition: all 0.3s ease-out;
            border-radius: 10px;
        }

        .card-panel-icon {
            float: left;
            font-size: 48px;
        }

        .card-panel-description {
            font-weight: bold;
            margin: 26px;
            margin-left: 16px;
            margin-top: 16px;

            .card-panel-num:last-child {
                color: rgb(177, 177, 177);
                margin-top: 6px;
            }

            .card-panel-text {
                line-height: 18px;
                color: rgb(177, 177, 177);
                font-size: 20px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 18px;
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .card-panel-description {
        float: none !important;
    }
    .card-panel-icon-wrapper {
        padding: 6px !important;
        display: flex;
        align-items: center;
    }

    .card-panel-icon-wrapper {
        height: 100%;
        margin: 0 !important;

        .svg-icon {
            display: block;
            margin: 14px auto !important;
            float: none !important;
        }
    }
}
@media screen and (max-width: 1300px) {
    .panel-group {
        flex-wrap: wrap;
        .card-panel-col {
            width: 50% !important;
        }
    }
}
</style>
