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
        <el-table-column :label="columnInfo.total_win_loss.name" prop="total_win_loss" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.total_win_loss" />
            </template>
        </el-table-column>
        <el-table-column :label="columnInfo.win_loss_2.name" prop="win_loss_2" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.win_loss_2" />
            </template>
        </el-table-column>
        <el-table-column :label="columnInfo.win_loss_4.name" prop="win_loss_4" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.win_loss_4" />
            </template>
        </el-table-column>
        <el-table-column :label="columnInfo.win_loss_8.name" prop="win_loss_8" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.win_loss_8" />
            </template>
        </el-table-column>
        <el-table-column :label="columnInfo.win_loss_16.name" prop="win_loss_16" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.win_loss_16" />
            </template>
        </el-table-column>
        <el-table-column :label="columnInfo.win_loss_32.name" prop="win_loss_32" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.win_loss_32" />
            </template>
        </el-table-column>
        <el-table-column :label="columnInfo.win_loss_64.name" prop="win_loss_64" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.win_loss_64" />
            </template>
        </el-table-column>
        <el-table-column :label="columnInfo.win_loss_128.name" prop="win_loss_128" class-name="status-col">
            <template slot-scope="{ row }">
                <WinLoss :amount="row.win_loss_128" />
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Prop } from "vue-property-decorator";
import WinLoss from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLoss,
    },
})
export default class WinLossTable extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ type: Array, required: true }) tableData!: any;
    @Prop({ type: Object, required: true }) columnInfo!: any;
}
</script>

<style></style>
