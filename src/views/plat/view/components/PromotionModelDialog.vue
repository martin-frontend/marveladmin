<template>
    <el-dialog :title="tableColumns['promotion_model_id'].name" :visible.sync="myProxy.promotionModelDialogData.bShow">
        <el-form :model="form" label-position="left" label-width="115px" style="width: 100%">
            <el-form-item size="mini" :label="tableColumns['plat_name'].name" prop="plat_name">
                {{ form.plat_name }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['promotion_model_id'].name" prop="promotion_model_id">
                <el-select
                    clearable
                    v-model="form.promotion_model_id"
                    filterable
                    class="select"
                    :placeholder="LangUtil('无模板')"
                >
                    <el-option
                        v-for="(item, index) in myProxy.promotionModelDialogData.promotionModelList"
                        :key="index"
                        :label="item.name"
                        :value="Number(item.promotion_model_id)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('模板描述')" v-if="form.promotion_model_id">
                {{ modelDesc }}
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="checkUnique(unique.plat_update)" type="primary" size="mini" @click="handlerEdit">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatProxy from "@/views/plat/proxy/PlatProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PromotionModelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.promotionModelDialogData.form;

    handlerEdit() {
        this.myProxy.onUpdatePromotionModel();
    }

    get modelDesc() {
        const model = this.myProxy.getPromotionModelById(this.form.promotion_model_id);
        return model ? model.desc : "";
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
