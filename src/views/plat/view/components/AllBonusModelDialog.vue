<template>
    <el-dialog :title="tableColumns['all_bonus_model_id'].name" :visible.sync="myProxy.allBonusModelDialogData.bShow">
        <el-form :model="form" label-position="left" label-width="115px" style="width: 100%">
            <el-form-item size="mini" :label="tableColumns['plat_name'].name" prop="plat_name">
                {{ form.plat_name }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['all_bonus_model_id'].name" prop="all_bonus_model_id">
                <el-select
                    clearable
                    v-model="form.all_bonus_model_id"
                    filterable
                    class="select"
                    :placeholder="$t('plat.noModule')"
                >
                    <el-option
                        v-for="(item, index) in myProxy.allBonusModelDialogData.allBonusModelList"
                        :key="index"
                        :label="item.name"
                        :value="Number(item.all_bonus_model_id)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="$t('common.templateDesc')" v-if="form.all_bonus_model_id">
                {{ modelDesc }}
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="checkUnique(unique.plat_update)" type="primary" size="mini" @click="handlerEdit">{{
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
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PromotionModelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.allBonusModelDialogData.form;

    private handlerEdit() {
        this.myProxy.onUpdateAllBonusModel();
    }

    private get modelDesc() {
        const model = this.myProxy.getAllBonusModelById(this.form.all_bonus_model_id);
        return model ? model.desc : "";
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
