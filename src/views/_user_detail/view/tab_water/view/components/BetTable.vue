<template>
    <el-table
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%"
        size="mini"
        :header-cell-style="{
            'text-align': 'center',
        }"
    >
        <el-table-column :label="$t('common.date')" prop="created_date" class-name="status-col" width="120px">
        </el-table-column>
        <el-table-column :label="columnInfo.total_bet.name" prop="total_bet" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.bet_2.name" prop="bet_2" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.bet_4.name" prop="bet_4" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.bet_8.name" prop="bet_8" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.bet_16.name" prop="bet_16" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.bet_32.name" prop="bet_32" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.bet_64.name" prop="bet_64" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.bet_128.name" prop="bet_128" class-name="status-col"> </el-table-column>
    </el-table>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class BetTable extends AbstractView {
    @Prop({ type: Array, required: true }) tableData!: any;
    @Prop({ type: Object, required: true }) columnInfo!: any;
}
</script>

<style></style>
