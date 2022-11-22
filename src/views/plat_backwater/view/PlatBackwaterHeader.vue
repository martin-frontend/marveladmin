<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            :options="myProxy.backWaterData.selectOptions"
            :disabled="myProxy.backWaterData.isEdit"
            v-model="listQuery.plat_id"
            @change="handlerSearch"
            :clearable="false"
            :width="400"
        />

        <el-form>
            <el-form-item>
                <el-col :span="12" class="lineheight">
                    <div v-if="!isShowBackWaterModel" style="color: #F56C6C">
                        {{ LangUtil("实时返水未开启，请联系管理员开启") }}
                    </div>
                    <div v-else>
                        <div style="fontSize: 15px;color:#606266">{{ backWaterModel.name }}</div>
                        <div style="fontSize: 15px;color:#606266">{{ backWaterModel.desc }}</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="end">
                        <div v-if="backWaterModel.name">
                            <el-button type="primary" v-show="myProxy.backWaterData.isEdit" @click="handlerInitModel">{{
                                LangUtil("初始化系统模板")
                            }}</el-button>
                            <el-button
                                type="primary"
                                v-if="checkUnique(unique.plat_backwater_update)"
                                v-show="myProxy.backWaterData.isEdit"
                                @click="handlerSave"
                                >{{ LangUtil("确认保存") }}
                            </el-button>
                            <el-button type="primary" @click="onEdit">{{
                                myProxy.backWaterData.isEdit ? LangUtil("取消编辑") : LangUtil("编辑")
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
import PlatBackwaterProxy from "../proxy/PlatBackwaterProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatBackwaterHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatBackwaterProxy = this.getProxy(PlatBackwaterProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    get backWaterModel() {
        return this.myProxy.backWaterData.backWaterModeDesc;
    }

    get isShowBackWaterModel() {
        return Object.keys(this.myProxy.backWaterData.backWaterModeDesc).length > 0 ? true : false;
    }

    handlerSearch() {
        this.myProxy.onQuery();
    }

    handlerInitModel() {
        this.myProxy.onInitModel();
    }
    handlerSave() {
        this.myProxy.onUpdate();
    }
    onEdit() {
        this.myProxy.onEdit();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.header-content {
    ::v-deep .el-form {
        padding-left: 0;
    }
}
</style>
