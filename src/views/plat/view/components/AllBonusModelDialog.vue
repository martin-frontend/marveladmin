<template>
    <el-dialog title="质押分红" :visible.sync="myProxy.allBonusModelDialogData.bShow">
        <el-form :model="form" label-position="left" label-width="115px" style="width: 100%">
            <el-form-item size="mini" :label="tableColumns['plat_name'].name" prop="plat_name">
                {{ form.plat_name }}
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button v-if="checkUnique(unique.plat_update)" type="primary" size="mini" @click="handlerInit">
                    <!-- 初始化基础设置 -->
                    {{ LangUtil("初始化基础设置") }}
                </el-button>
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
    form = this.myProxy.allBonusModelDialogData.form;

    handlerInit() {
        this.myProxy.onInitSetting();
    }

    //  get modelDesc() {
    //     const model = this.myProxy.getAllBonusModelById(this.form.all_bonus_model_id);
    //     return model ? model.desc : "";
    // }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
