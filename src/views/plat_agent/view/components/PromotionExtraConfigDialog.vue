<template>
    <el-dialog :title="LangUtil('额外返佣配置')" :visible.sync="myProxy.promotionDialogData.bShow" width="800px">
        <div class="">{{ LangUtil("每日代理业绩(自营+团队) 根据以下等级配置,获取平台赠送的额外佣金奖励") }}}</div>
        <el-button @click="onAdd()" class="add_level" type="primary" icon="el-icon-circle-plus-outline">{{
            LangUtil("添加等级")
        }}</el-button>
        <el-table
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            :data="myProxy.promotionDialogData.extraConfig"
        >
            <el-table-column :label="LangUtil('等级')" type="index" width="100"></el-table-column>
            <el-table-column :label="tableColumns.promotion_extra_config.gold" prop="gold">
                <template slot-scope="scope">
                    <el-input
                        maxlength="10"
                        v-model="extraConfig[scope.$index].gold"
                        oninput="value=value.replace(/[^\d]/g,'');"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.promotion_extra_config.gift_rate" prop="gift_rate">
                <template slot-scope="scope">
                    <el-input
                        maxlength="10"
                        type="number"
                        step="0.1"
                        v-model="extraConfig[scope.$index].gift_rate"
                        oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,1})?).*$/g, '$1')"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" min-width="100px">
                <template slot-scope="scope">
                    <el-button type="primary" @click="onDelete(scope.$index)" size="small">{{
                        LangUtil("删除")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <el-button @click="onConfirm()" type="primary" icon="">{{ LangUtil("确定") }}</el-button>
            <el-button @click="myProxy.promotionDialogData.bShow = false">{{ LangUtil("取消") }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentProxy from "@/views/plat_agent/proxy/PlatAgentProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PromotionExtraConfigDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentProxy = this.getProxy(PlatAgentProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    dialogData = this.myProxy.promotionDialogData;

    get extraConfig() {
        return this.myProxy.promotionDialogData.extraConfig;
    }

    onAdd() {
        this.myProxy.addPromotionConfig();
    }
    onDelete(index: number) {
        this.myProxy.deletePromotionConfig(index);
    }
    onConfirm() {
        this.myProxy.onSavePromotionConfig();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.add_level {
    margin: 16px 0 16px 0;
}
.footer {
    margin-top: 16px;
    text-align: right;
}
::v-deep .el-input__inner {
    width: 100%;
    text-align: center;
}
</style>
