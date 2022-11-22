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
        <el-table-column :label="LangUtil('日期')" prop="created_date" class-name="status-col" width="120px">
        </el-table-column>
        <el-table-column :label="columnInfo.total_water.name" prop="total_water" class-name="status-col">
        </el-table-column>
        <el-table-column :label="columnInfo.water_2.name" prop="water_2" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.water_4.name" prop="water_4" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.water_8.name" prop="water_8" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.water_16.name" prop="water_16" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.water_32.name" prop="water_32" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.water_64.name" prop="water_64" class-name="status-col"> </el-table-column>
        <el-table-column :label="columnInfo.water_128.name" prop="water_128" class-name="status-col"> </el-table-column>
    </el-table>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class WaterTable extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ type: Array, required: true }) tableData!: any;
    @Prop({ type: Object, required: true }) columnInfo!: any;
}
</script>

<style></style>
