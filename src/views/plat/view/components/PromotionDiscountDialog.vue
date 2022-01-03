<template>
    <el-dialog
        :title="tableColumns['promotion_discount'].name"
        :visible.sync="myProxy.promotionDiscountDialogData.bShow"
        width="600px"
    >
        <el-form
            :model="form"
            label-position="right"
            label-width="120px"
            style="width: 100%"
            v-loading="net_status.loading"
        >
            <div v-for="(value, key) in tableColumns.vendor_type.options" :key="key">
                <div class="group headline">
                    <div class="title">{{ tableColumns.vendor_type.options[key] }}</div>
                    <el-switch v-model="form[key].is_open" :active-value="true" :inactive-value="false"></el-switch>
                </div>
                <div class="group">
                    <div class="group">
                        <div class="title">折扣数量</div>
                        <div>
                            <el-input
                                type="number"
                                min="0"
                                v-model="form[key].start_num"
                                oninput="value=value.replace(/[^\d]/g,'');"
                            ></el-input>
                        </div>
                    </div>
                    <div class="group">
                        <div class="title">每日玩家条数</div>
                        <div>
                            <el-input
                                type="number"
                                min="0"
                                v-model="form[key].start_limit_num"
                                oninput="value=value.replace(/[^\d]/g,'');"
                            ></el-input>
                        </div>
                    </div>
                    <div class="group">
                        <div class="title">流水限制金额</div>
                        <div>
                            <el-input
                                type="number"
                                min="0"
                                step="0.001"
                                v-model="form[key].start_limit_water"
                                @keydown.native="inputOnlyPositive"
                            ></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <el-form-item class="dialog-footer">
                <el-button v-if="checkUnique(unique.plat_update)" type="primary" size="mini" @click="handlerEdit()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatProxy from "@/views/plat/proxy/PlatProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { inputOnlyPositive } from "@/core/global/Functions";
@Component
export default class PromotionDiscountDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;

    get form() {
        return this.myProxy.promotionDiscountDialogData.form.promotion_discount;
    }

    private inputOnlyPositive = inputOnlyPositive;

    private handlerEdit() {
        this.myProxy.onUpdatePromotionDiscount();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";

.group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    align-items: center;
    .group {
        justify-content: space-around;
    }
    .title {
        min-width: 100px;
        line-height: 36px;
    }
    ::v-deep .el-input--medium {
        width: 120px;
        padding-right: 16px;
    }
}
.headline {
    font-size: 16px;
}
</style>
