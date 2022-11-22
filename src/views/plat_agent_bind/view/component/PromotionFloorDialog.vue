<template>
    <el-dialog :title="LangUtil('保底设定')" :visible.sync="myProxy.promotionFloorDialogData.bShow" width="680px">
        <el-form ref="form" :model="form" label-width="130px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.vendor_type_0.name">
                <el-input
                    v-model="form.vendor_type_0"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span>{{ LangUtil("保底金额") }}：{{ floorRange["0"].min }}-{{ floorRange["0"].max }}</span>
            </el-form-item>
            <!-- <el-form-item size="mini" :label="tableColumns.vendor_type_2.name">
                <el-input
                    v-model="form.vendor_type_2"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ LangUtil('保底金额') }}：{{ floorRange["2"].min }}-{{
                        floorRange["2"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_4'].name" prop="vendor_type_4">
                <el-input
                    v-model="form.vendor_type_4"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ LangUtil('保底金额') }}：{{ floorRange["4"].min }}-{{
                        floorRange["4"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_8'].name" prop="vendor_type_8">
                <el-input
                    v-model="form.vendor_type_8"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ LangUtil('保底金额') }}：{{ floorRange["8"].min }}-{{
                        floorRange["8"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_16'].name" prop="vendor_type_16">
                <el-input
                    v-model="form.vendor_type_16"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ LangUtil('保底金额') }}：{{ floorRange["16"].min }}-{{
                        floorRange["16"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_32'].name" prop="vendor_type_32">
                <el-input
                    v-model="form.vendor_type_32"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ LangUtil('保底金额') }}：{{ floorRange["32"].min }}-{{
                        floorRange["32"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_64'].name" prop="vendor_type_64">
                <el-input
                    v-model="form.vendor_type_64"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ LangUtil('保底金额') }}：{{ floorRange["64"].min }}-{{
                        floorRange["64"].max
                    }}</span
                >
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type_128'].name" prop="vendor_type_128">
                <el-input
                    v-model="form.vendor_type_128"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span
                    >{{ LangUtil('保底金额') }}：{{ floorRange["128"].min }}-{{
                        floorRange["128"].max
                    }}</span
                >
            </el-form-item> -->
            <div class="remarks">
                <div>{{ LangUtil("备注") }}</div>
                <ol>
                    <li>{{ LangUtil("默认保底最高金额为平台设定最高保底金额;") }}</li>
                    <li>{{ LangUtil("如果该用户存在代理上级，则保底金额不能超过代理上级的保底基金额;") }}</li>
                    <li>{{ LangUtil("如果该用户存在直属代理下级，则保底金额不能低于直属代理下级;") }}</li>
                    <li>{{ LangUtil("如果保底金设置为0，则该游戏类型不进行保底。(适用第三条规则，既不能设置0);") }}</li>
                    <li>{{ LangUtil("设置保底的用户，如果未绑定上级，则该用户不能进行绑定用户;") }}</li>
                </ol>
            </div>
            <div class="dialog-footer">
                <el-button type="primary" @click="myProxy.promotionFloorDialogData.bShow = false">{{
                    LangUtil("取消")
                }}</el-button>
                <el-button type="primary" @click="onSbumit">{{ LangUtil("确认保存") }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentBindProxy from "@/views/plat_agent_bind/proxy/PlatAgentBindProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatAgentBindDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.promotionFloorDialogData.form;
    }
    get floorRange() {
        return this.myProxy.promotionFloorDialogData.range;
    }

    checkPromotionFloor(type: string): boolean {
        const value = this.form[`vendor_type_${type}`];
        const range = this.floorRange[type];
        if (value && (value < range.min || value > range.max)) {
            this.$message({
                type: "warning",
                message: this.tableColumns[`vendor_type_${type}`].name + this.LangUtil("，取值范围错误"),
            });
            return false;
        }
        return true;
    }

    onSbumit() {
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
