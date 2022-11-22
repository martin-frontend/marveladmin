<template>
    <div class="content">
        <div class="row">
            <el-button
                class="item"
                size="mini"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="createDialogVisible = true"
                >新增</el-button
            >
        </div>
        <div class="row">
            <div class="item">
                <el-select v-model="search_select" filterable size="mini" class="select-input">
                    <el-option
                        v-for="item in search_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-input size="mini" class="input" placeholder="请输入搜索关键字" v-model="search_input"></el-input>
            </div>
            <div class="item">
                <span>所属平台：</span>
                <el-select v-model="plat_id_select" filterable size="mini" class="select" placeholder="--请选择--">
                    <el-option
                        v-for="(value, key) in plat_id_options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </div>
            <el-button class="item" size="mini" type="primary" icon="el-icon-search">确定</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" border size="mini">
            <el-table-column label="ID" prop="id" width="50px"></el-table-column>
            <el-table-column label="用户ID" prop="user_id"></el-table-column>
            <el-table-column label="平台名称" prop="plat_id"></el-table-column>
            <el-table-column label="厂商名称" prop></el-table-column>
            <el-table-column label="类型" prop="type">
                <template slot-scope="scope">
                    <div>{{ tableColumns.type.options[scope.row.type] }}</div>
                </template>
            </el-table-column>
            <el-table-column label="应用平台" prop="app_type">
                <template slot-scope="scope">
                    <div>{{ tableColumns.app_type.options[scope.row.app_type] }}</div>
                </template>
            </el-table-column>
            <el-table-column label="设备号" prop="device"></el-table-column>
            <el-table-column label="IP" prop="ip"></el-table-column>
            <el-table-column label="创建时间" prop="created_at"></el-table-column>
            <el-table-column :label="$t('common.operating')" width="90px">
                <template slot-scope="scope">
                    <el-button-group size="mini">
                        <el-button plain size="mini" type="info" @click="onCheck(scope.$index, scope.row)"
                            >查看</el-button
                        >
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="pageSwitch"></Pagination>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import PlatUserLoginLogMediator from "@/views/plat_user_login_log/mediator/PlatUserLoginLogMediator";
import { Component } from "vue-property-decorator";
import { PageInfoVO } from "@/core/vo/PageInfoVO";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUserLoginLog extends AbstractView {
    // 表
    private tableColumns: any = {};
    private columns: string[] = [];
    private tableData: any[] = [];
    private pageInfo: PageInfoVO = { pageTotal: 0, pageCurrent: 0 };
    // 搜索
    private search_select: number = 1;
    private search_options: any[] = [
        { label: "用户ID", value: 1 },
        { label: "ID", value: 2 },
    ];
    private search_input: string = "";
    private plat_id_select: string = "";
    private plat_id_options: any = {};
    //
    constructor() {
        super(PlatUserLoginLogMediator);
    }
    public setTableColumns(value: any) {
        this.tableColumns = value;
        this.columns = Object.keys(value);
    }

    public setTableData(value: any) {
        this.tableData = value.list;
        Object.assign(this.pageInfo, value.pageInfo);
    }

    public pageSwitch(val: number) {
        this.dispatchEvent("pagination", val);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
