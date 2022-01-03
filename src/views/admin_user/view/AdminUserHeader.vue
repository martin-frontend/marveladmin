<template>
    <div>
        <div class="search_style">
            <div class="cust_title">{{ tableColumns["plat_id"].name }}</div>
            <el-select
                v-model="listQuery.plat_id"
                filterable
                class="select"
                :placeholder="$t('common.pleaseChoose')"
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
                    <el-input :placeholder="$t('common.pleaseEnter')" v-model="listQuery.admin_user_id" clearable>
                    </el-input>
                </div>

                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["admin_username"].name }}</div>
                    <el-input :placeholder="$t('common.pleaseEnter')" v-model="listQuery.admin_username" clearable>
                    </el-input>
                </div>

                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["nick_name"].name }}</div>
                    <el-input :placeholder="$t('common.pleaseEnter')" v-model="listQuery.nick_name" clearable>
                    </el-input>
                </div>
                <div class="item_group">
                    <div class="cust_title">{{ tableColumns["cate"].name }}</div>
                    <el-select
                        v-model="listQuery.cate"
                        filterable
                        clearable
                        class="select"
                        :placeholder="$t('common.pleaseChoose')"
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
                        :placeholder="$t('common.pleaseChoose')"
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
                        $t("common.search")
                    }}</el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="item">{{
                        $t("common.reset")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div class="row">
            <el-button @click="handlerCreate" type="primary" class="item" v-if="checkUnique(unique.admin_user_store)">{{
                $t("common.create")
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import AdminUserProxy from "../proxy/AdminUserProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class AdminUserHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: AdminUserProxy = this.getProxy(AdminUserProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
