<template>
    <el-dialog title="添加投注记录" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable clearable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.user_id.name" prop="user_id">
                <el-input v-model="form.user_id" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item label="添加投注纪录" prop="order_ids">
                <el-input
                    :rows="3"
                    type="textarea"
                    filterable
                    clearable
                    class="select"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.order_ids"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="checkUnique(unique.store_fake_bet)"
                    type="primary"
                    size="mini"
                    @click="handlerSave()"
                    >{{ $t("common.save") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PromotionDiscountIndexProxy from "@/views/promotion_discount_index/proxy/PromotionDiscountIndexProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PromotionDiscountIndexDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PromotionDiscountIndexProxy = this.getProxy(PromotionDiscountIndexProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: "编辑",
        create: "新增",
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            user_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            order_ids: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    private handlerSave() {
        this.myProxy.store_fake_bet();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
