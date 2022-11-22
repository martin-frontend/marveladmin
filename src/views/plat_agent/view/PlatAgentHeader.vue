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
                        <div v-if="!checkPromotionModel()" class="red">
                            {{ LangUtil("代理功能未开启-请联系客服开启") }}
                        </div>
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
                                LangUtil("额外返佣配置")
                            }}</el-button>
                            <el-button
                                type="primary"
                                v-if="checkUnique(unique.plat_agent_update_banner)"
                                @click="onChangeBanner"
                                >{{ LangUtil("配置代理说明") }}</el-button
                            >
                            <el-button type="primary" v-show="tableData.isEdit" @click="onInitModel">{{
                                LangUtil("初始化系统模板")
                            }}</el-button>
                            <el-button
                                type="primary"
                                v-if="checkUnique(unique.plat_agent_update)"
                                v-show="tableData.isEdit"
                                @click="onSave"
                                >{{ LangUtil("确认保存") }}</el-button
                            >
                            <el-button type="primary" @click="onEditSwitch">{{
                                tableData.isEdit ? LangUtil("取消编辑") : LangUtil("编辑")
                            }}</el-button>
                        </div>
                    </el-row>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentProxy = this.getProxy(PlatAgentProxy);
    // proxy property
    tableData = this.myProxy.tableData;
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    checkPromotionModel() {
        return this.tableData.promotionModel.promotion_model_id == this.tableData.detail.promotion_model_id;
    }

    handlerSearch() {
        this.myProxy.onQuery();
    }

    onEditPromotionDialog() {
        this.myProxy.showPromotionDialog();
    }
    onChangeBanner() {
        this.myProxy.showDialog();
    }

    onInitModel() {
        this.myProxy.onInitModel();
    }

    onSave() {
        this.myProxy.onSave();
    }

    onEditSwitch() {
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
