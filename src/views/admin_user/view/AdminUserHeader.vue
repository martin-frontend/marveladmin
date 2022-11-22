<template>
    <div>
        <div class="search_style">
            <div class="cust_title">{{ tableColumns["plat_id"].name }}</div>
            <el-select
                v-model="listQuery.plat_id"
                filterable
                class="select"
                :placeholder="LangUtil('请选择')"
                @change="handlerSearch"
            >
                <el-option
                    v-for="(value, key) in tableColumns.plat_id.options"
                    :key="key"
                    :label="value"
                    :value="key"
                ></el-option>
            </el-select>
            <!-- CONTROLLER START -->
            <div class="search_space">
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["admin_user_id"].name }}</div>
                    <el-input :placeholder="LangUtil('请输入')" v-model="listQuery.admin_user_id" clearable> </el-input>
                </div>

                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["admin_username"].name }}</div>
                    <el-input :placeholder="LangUtil('请输入')" v-model="listQuery.admin_username" clearable>
                    </el-input>
                </div>

                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["nick_name"].name }}</div>
                    <el-input :placeholder="LangUtil('请输入')" v-model="listQuery.nick_name" clearable> </el-input>
                </div>
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["cate"].name }}</div>
                    <el-select
                        v-model="listQuery.cate"
                        filterable
                        clearable
                        class="select"
                        :placeholder="LangUtil('请选择')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.cate.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </div>

                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["type"].name }}</div>
                    <el-select
                        v-model="listQuery.type"
                        filterable
                        clearable
                        class="select"
                        :placeholder="LangUtil('请选择')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.type.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </div>
                <div>
                    <el-button @click="handlerSearch" type="primary" icon="el-icon-search" class="item">{{
                        LangUtil("查询")
                    }}</el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="item">{{
                        LangUtil("重置")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div class="row">
            <el-button @click="handlerCreate" type="primary" class="item" v-if="checkUnique(unique.admin_user_store)">{{
                LangUtil("新增")
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import AdminUserProxy from "../proxy/AdminUserProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class AdminUserHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: AdminUserProxy = this.getProxy(AdminUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
