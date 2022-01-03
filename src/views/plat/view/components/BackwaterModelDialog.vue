<template>
    <el-dialog
        :title="tableColumns['backwater_model_id'].name"
        :visible.sync="myProxy.backwaterModelDialogData.bShow"
        width="800px"
    >
        <el-form :model="form" label-position="right" label-width="115px" style="width: 100%;">
            <el-form-item size="mini" :label="tableColumns['plat_name'].name" prop="plat_name">
                {{ form.plat_name }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['backwater_model_id'].name" prop="plat_name">
                <el-select
                    v-model="form.backwater_model_id"
                    filterable
                    clearable
                    class="select"
                    :placeholder="$t('plat.notOpen')"
                >
                    <el-option
                        v-for="(key, value) in tableColumns.backwater_model_id.options"
                        :key="value"
                        :label="key"
                        :value="Number(value)"
                    ></el-option>
                </el-select>
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
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class BackwaterModelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.backwaterModelDialogData.form;

    handlerEdit() {
        this.myProxy.onUpdateBackwaterModel();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
