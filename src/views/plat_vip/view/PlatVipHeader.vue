<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            :options="myProxy.selectOptions"
            :disabled="myProxy.isEdit"
            v-model="listQuery.plat_id"
            @change="handlerSearch"
        />

        <el-form>
            <el-form-item>
                <el-col :span="12">
                    <div class="red" v-if="!isShowVipModel">{{ LangUtil("VIP未开启，请联系管理员开启") }}</div>
                    <div v-else>
                        <div>{{ vipModel.name }}</div>
                        <div>{{ vipModel.desc }}</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="end">
                        <div v-if="vipModel.name">
                            <el-button type="primary" v-show="myProxy.isEdit" @click="handlerInitModel">{{
                                LangUtil("初始化系统模板")
                            }}</el-button>
                            <el-button
                                type="primary"
                                v-if="checkUnique(unique.plat_vip_update)"
                                v-show="myProxy.isEdit"
                                @click="handlerSave"
                                >{{ LangUtil("确认保存") }}</el-button
                            >
                            <el-button type="primary" @click="onEdit">{{
                                myProxy.isEdit ? LangUtil("取消编辑") : LangUtil("编辑")
                            }}</el-button>
                        </div>
                    </el-row>
                </el-col>
            </el-form-item>
        </el-form>

        <div class="row">
            <SearchSelect
                :title="LangUtil('最高等级')"
                :disabled="!myProxy.isEdit"
                :options="levelOptions"
                v-if="vipModel.name"
                v-model="myProxy.maxLevel"
                @change="handlerLevelChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatVipProxy from "../proxy/PlatVipProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatVipHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatVipProxy = this.getProxy(PlatVipProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    maxLevel = this.getMaxLevel;
    get vipModel() {
        return this.myProxy.vipModeDesc;
    }

    get getMaxLevel() {
        return this.myProxy.levelOptions;
    }

    get isShowVipModel() {
        return Object.keys(this.myProxy.vipModeDesc).length > 0 ? true : false;
    }

    get levelOptions() {
        return this.myProxy.levelOptions;
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerInitModel() {
        this.myProxy.onInitModel();
    }
    handlerSave() {
        this.myProxy.onUpdate();
    }
    onEdit() {
        this.myProxy.isEdit = !this.myProxy.isEdit;
    }

    handlerLevelChange(e: any) {
        this.myProxy.onLevelChange(e);
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
</style>
