<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
            style="width: 350px"
        />
        <div class="group">
            <SearchInput :title="tableColumns.category.name" v-model="listQuery.category" />
            <div>
                <el-button @click="handlerSearch" class="header-button" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="header-button">{{
                    LangUtil("重置")
                }}</el-button>
                <el-button
                    class="header-button"
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    @click="handlerCreate"
                >
                    {{ LangUtil("新增") }}
                </el-button>
                <el-button class="header-button" type="primary" @click="handlerCopy" :disabled="!isCanCopy">
                    {{ LangUtil("复制") }}
                </el-button>
                <el-button class="header-button" type="primary" @click="handlerPaste" :disabled="!isCanPaste">
                    {{ LangUtil("粘贴") }}
                </el-button>
            </div>
        </div>
        <div>
            <el-radio-group v-model="listQuery.type" style="margin-right: 10px" filterable @change="onFilterChange">
                <el-radio class="radio" v-for="(value, key) in tableColumns.type.options" :key="key" :label="key">{{
                    value
                }}</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CateVendorProductsProxy from "../proxy/CateVendorProductsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { MessageBox, Message } from "element-ui";
@Component({
    components: {
        SearchInput,
        SearchSelect,
    },
})
export default class CateVendorProductsHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: CateVendorProductsProxy = this.getProxy(CateVendorProductsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.clearCopyData();
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
        this.handlerSearch();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
    /**复制 */
    handlerCopy() {
        //复制的时候 记录下 当前 的分类与数据
        this.myProxy.copy_data.type = this.myProxy.listQuery.type;
        this.myProxy.copy_data.list = JSON.parse(JSON.stringify(this.myProxy.select_list_temp));
        //console.log("复制的数据为",this.myProxy.copy_data);
        Message.success(LangUtil("复制成功"));
    }

    //是否可以复制
    public get isCanCopy(): boolean {
        return this.myProxy.select_list_temp && this.myProxy.select_list_temp.length > 0;
    }

    //是否可以粘贴
    public get isCanPaste(): boolean {
        return this.myProxy.copy_data.list && this.myProxy.copy_data.list.length > 0;
    }

    /**粘贴*/
    handlerPaste() {
        const str = `确定将${this.tableColumns.type.options[this.myProxy.copy_data.type]}中的 ${
            this.myProxy.copy_data.list.length
        } 个 复制到 ${this.tableColumns.type.options[this.myProxy.listQuery.type]} 中吗`;
        MessageBox.confirm(String(this.LangUtil(str)), String(this.LangUtil("提示")), {
            confirmButtonText: String(this.LangUtil("确定")),
            cancelButtonText: String(this.LangUtil("取消")),
            type: "warning",
        })
            .then(() => {
                this.myProxy.onBatchCopy();
            })
            .catch(() => {});
    }
    onFilterChange() {
        console.log("---修改---", this.listQuery.type);
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
