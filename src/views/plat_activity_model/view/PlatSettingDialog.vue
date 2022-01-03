<template>
    <el-dialog
        :title="$t('plat_activity_model.activityModuleAuthorization')"
        :visible.sync="platSettingDialogData.bShow"
    >
        <el-checkbox-group v-model="platSettingDialogData.form.authorize_plats">
            <el-checkbox
                v-for="(value, key) in platSettingDialogData.form.all_plats"
                :key="key"
                :label="Number(key)"
                class="checkbox"
            >
                {{ value }}
            </el-checkbox>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer plat">
            <el-checkbox v-model="platSettingDialogData.selectedAll" @change="handleCheckAllChange">
                {{ $t("plat_activity_model.selectAll") }}
            </el-checkbox>
            <div>
                <el-button
                    v-if="checkUnique(unique.plat_activity_model_update)"
                    type="primary"
                    size="mini"
                    @click="onSave"
                    >{{ $t("common.save") }}</el-button
                >
                <el-button size="mini" @click="onCancel"> {{ $t("common.cancel") }} </el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityModelProxy from "@/views/plat_activity_model/proxy/PlatActivityModelProxy";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatSettingDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;

    get platSettingDialogData() {
        return this.myProxy.platSettingDialogData;
    }
    handleCheckAllChange(val: boolean) {
        if (val) {
            let arr: Number[] = [];
            Object.keys(this.platSettingDialogData.form.all_plats).forEach(element => {
                arr.push(Number(element));
            });
            this.platSettingDialogData.form.authorize_plats = arr;
        } else {
            this.platSettingDialogData.form.authorize_plats = [];
        }
    }
    private onSave() {
        this.myProxy.onUpdatePlatSetting();
    }
    private onCancel() {
        this.myProxy.hidePlatSettingDialog();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";

.checkbox {
    width: fit-content;
    min-width: 120px;
}
</style>
