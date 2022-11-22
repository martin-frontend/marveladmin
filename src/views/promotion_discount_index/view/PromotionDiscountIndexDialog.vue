<template>
    <el-dialog title="添加投注记录" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable clearable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.user_id.name" prop="user_id">
                <el-input v-model="form.user_id" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="LangUtil('添加投注记录')" prop="order_ids">
                <el-input
                    :rows="3"
                    type="textarea"
                    filterable
                    clearable
                    class="select"
                    :placeholder="LangUtil('请输入')"
                    v-model="form.order_ids"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="checkUnique(unique.store_fake_bet)"
                    type="primary"
                    size="mini"
                    @click="handlerSave()"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PromotionDiscountIndexProxy from "@/views/promotion_discount_index/proxy/PromotionDiscountIndexProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PromotionDiscountIndexDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PromotionDiscountIndexProxy = this.getProxy(PromotionDiscountIndexProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            user_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            order_ids: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handlerSave() {
        this.myProxy.store_fake_bet();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
