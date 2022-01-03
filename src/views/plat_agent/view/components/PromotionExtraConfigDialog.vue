<template>
    <el-dialog
        :title="$t(`plat_agent.promotionExtraConfig`)"
        :visible.sync="myProxy.promotionDialogData.bShow"
        width="800px"
    >
        <div class="">{{ $t(`plat_agent.promotionExtraDesc`) }}}</div>
        <el-button @click="onAdd()" class="add_level" type="primary" icon="el-icon-circle-plus-outline">{{
            $t("plat_users_vip_model.addLevel")
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
            <el-table-column :label="$t('common.level')" type="index" width="100"></el-table-column>
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
            <el-table-column :label="$t('common.operating')" min-width="100px">
                <template slot-scope="scope">
                    <el-button type="primary" @click="onDelete(scope.$index)" size="small">{{
                        $t("common.delete")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <el-button @click="onConfirm()" type="primary" icon="">{{ $t("common.determine") }}</el-button>
            <el-button @click="myProxy.promotionDialogData.bShow = false">{{ $t("common.cancel") }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentProxy from "@/views/plat_agent/proxy/PlatAgentProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PromotionExtraConfigDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentProxy = this.getProxy(PlatAgentProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private dialogData = this.myProxy.promotionDialogData;

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
