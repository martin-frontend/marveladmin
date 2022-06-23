<template>
    <el-dialog
        :title="$t('plat_agent_bind.guaranteedSetting')"
        :visible.sync="myProxy.promotionFloorDialogData.bShow"
        width="680px"
    >
        <el-form ref="form" :model="form" label-width="130px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.vendor_type_0.name">
                <el-input
                    v-model="form.vendor_type_0"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["0"].min }}-{{
                        floorRange["0"].max
                    }}</span
                >
            </el-form-item>
            <!-- <el-form-item size="mini" :label="tableColumns.vendor_type_2.name">
                <el-input
                    v-model="form.vendor_type_2"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["2"].min }}-{{
                        floorRange["2"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_4'].name" prop="vendor_type_4">
                <el-input
                    v-model="form.vendor_type_4"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["4"].min }}-{{
                        floorRange["4"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_8'].name" prop="vendor_type_8">
                <el-input
                    v-model="form.vendor_type_8"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["8"].min }}-{{
                        floorRange["8"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_16'].name" prop="vendor_type_16">
                <el-input
                    v-model="form.vendor_type_16"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["16"].min }}-{{
                        floorRange["16"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_32'].name" prop="vendor_type_32">
                <el-input
                    v-model="form.vendor_type_32"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["32"].min }}-{{
                        floorRange["32"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_64'].name" prop="vendor_type_64">
                <el-input
                    v-model="form.vendor_type_64"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["64"].min }}-{{
                        floorRange["64"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_128'].name" prop="vendor_type_128">
                <el-input
                    v-model="form.vendor_type_128"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ $t("plat_agent_bind.guaranteedAmount") }}：{{ floorRange["128"].min }}-{{
                        floorRange["128"].max
                    }}</span
                >
            </el-form-item> -->
            <div class="remarks">
                <div>{{ $t("plat_agent_bind.note") }}</div>
                <ol>
                    <li>{{ $t("plat_agent_bind.noteText1") }}</li>
                    <li>{{ $t("plat_agent_bind.noteText2") }}</li>
                    <li>{{ $t("plat_agent_bind.noteText3") }}</li>
                    <li>{{ $t("plat_agent_bind.noteText4") }}</li>
                    <li>{{ $t("plat_agent_bind.noteText5") }}</li>
                </ol>
            </div>
            <div class="dialog-footer">
                <el-button type="primary" @click="myProxy.promotionFloorDialogData.bShow = false">{{
                    $t("common.cancel")
                }}</el-button>
                <el-button type="primary" @click="onSbumit">{{ $t("common.save") }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentBindProxy from "@/views/plat_agent_bind/proxy/PlatAgentBindProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatAgentBindDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.promotionFloorDialogData.form;
    }
    get floorRange() {
        return this.myProxy.promotionFloorDialogData.range;
    }

    private checkPromotionFloor(type: string): boolean {
        const value = this.form[`vendor_type_${type}`];
        const range = this.floorRange[type];
        if (value && (value < range.min || value > range.max)) {
            this.$message({
                type: "warning",
                message: this.tableColumns[`vendor_type_${type}`].name + this.$t("plat_agent_bind.errorCode"),
            });
            return false;
        }
        return true;
    }

    private onSbumit() {
        const arr = ["0", "2", "4", "8", "16", "32", "64", "128"];
        for (const type of arr) {
            if (!this.checkPromotionFloor(type)) {
                return false;
            }
        }
        this.myProxy.onFloorUpdate();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-form-item__content {
    display: flex;
    input {
        width: 230px;
    }
    span {
        width: 100%;
        margin-left: 16px;
        color: red;
    }
    button {
        span {
            margin: 0;
            color: #fff;
        }
    }
    .dialog-footer {
        display: flex;
        justify-content: flex-end;
    }
}

.remarks {
    color: red;
}
</style>
