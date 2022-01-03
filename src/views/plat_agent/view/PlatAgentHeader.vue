<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            :options="tableColumns.plat_id.options"
            :disabled="tableData.isEdit"
            v-model="listQuery.plat_id"
            @change="handlerSearch"
            :clearable="false"
        />

        <el-form v-loading="net_status.loading">
            <el-form-item>
                <el-col :span="12">
                    <el-row type="flex">
                        <div v-if="!checkPromotionModel()" class="red">{{ $t("plat_agent.tableStr") }}</div>
                        <div v-else>
                            <div>{{ tableData.promotionModel.name }}</div>
                            <div>{{ tableData.promotionModel.desc }}</div>
                        </div>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row v-if="checkPromotionModel()">
                        <div class="btn_group">
                            <el-button type="primary" @click="onEditPromotionDialog">{{
                                $t(`plat_agent.promotionExtraConfig`)
                            }}</el-button>
                            <el-button
                                type="primary"
                                v-if="checkUnique(unique.plat_agent_update_banner)"
                                @click="onChangeBanner"
                                >{{ $t("plat_agent.buttonStr1") }}</el-button
                            >
                            <el-button type="primary" v-show="tableData.isEdit" @click="onInitModel">{{
                                $t("common.initTemplate")
                            }}</el-button>
                            <el-button
                                type="primary"
                                v-if="checkUnique(unique.plat_agent_update)"
                                v-show="tableData.isEdit"
                                @click="onSave"
                                >{{ $t("common.save") }}</el-button
                            >
                            <el-button type="primary" @click="onEditSwitch">{{
                                tableData.isEdit ? $t("common.unUpdate") : $t("common.update")
                            }}</el-button>
                        </div>
                    </el-row>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatAgentProxy from "../proxy/PlatAgentProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatAgentHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentProxy = this.getProxy(PlatAgentProxy);
    // proxy property
    private tableData = this.myProxy.tableData;
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private checkPromotionModel() {
        return this.tableData.promotionModel.promotion_model_id == this.tableData.detail.promotion_model_id;
    }

    private handlerSearch() {
        this.myProxy.onQuery();
    }

    private onEditPromotionDialog() {
        this.myProxy.showPromotionDialog();
    }
    private onChangeBanner() {
        this.myProxy.showDialog();
    }

    private onInitModel() {
        this.myProxy.onInitModel();
    }

    private onSave() {
        this.myProxy.onSave();
    }

    private onEditSwitch() {
        this.tableData.isEdit = !this.tableData.isEdit;
        if (!this.tableData.isEdit) {
            this.myProxy.onCancel();
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.header-content {
    .red {
        color: rgb(196, 38, 38);
    }
    ::v-deep .el-form {
        padding-left: 0;
    }
}

.btn_group {
    display: flex;
    flex-wrap: wrap;
    ::v-deep .el-button--medium {
        margin-top: 10px;
    }
}
</style>
