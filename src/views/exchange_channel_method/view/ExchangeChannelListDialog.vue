<template>
    <el-dialog :title="LangUtil('兑换参数设置')" :visible.sync="myProxy.dialogDataChannelData.bShow" width="80%">
        <div class="header">
            <!-- 所属平台 -->
            <div>
                <span class="title">{{ tableColumns.plat_id.name }}</span>
                <span>{{ tableColumns.plat_id.options[row.plat_id] }} </span>
            </div>
            <!-- 兑换厂商 -->
            <div>
                <span class="title">{{ tableColumns.vendor_name.name }}</span>
                <span>{{ row.vendor_name }}</span>
            </div>
            <!-- 兑换渠道 -->
            <div>
                <span class="title">{{ tableColumns.name.name }}</span>
                <span>{{ row.name }}</span>
            </div>
        </div>
        <!-- 新增 -->
        <el-button class="item" size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate">{{
            LangUtil("新增")
        }}</el-button>
        <!-- table -->
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column
                :label="methodTableColumns.coin_name_unique.name"
                class-name="status-col"
                prop="coin_name_unique"
            />

            <el-table-column
                :label="methodTableColumns.block_network_id.name"
                class-name="status-col"
                prop="block_network_id"
            >
                <template slot-scope="{ row }">
                    {{ methodTableColumns.block_network_id.options[row.block_network_id] }}
                </template>
            </el-table-column>

            <el-table-column :label="methodTableColumns.min_gold.name" class-name="status-col" prop="min_gold" />
            <el-table-column :label="methodTableColumns.max_gold.name" class-name="status-col" prop="max_gold" />
            <el-table-column :label="methodTableColumns.free_time.name" class-name="status-col" prop="free_time" />
            <el-table-column :label="methodTableColumns.fee.name" class-name="status-col" prop="fee" />
            <el-table-column :label="methodTableColumns.explain.name" class-name="status-col" prop="explain" />
            <el-table-column :label="methodTableColumns.status.name" class-name="status-col" prop="status">
                <template slot-scope="{ row }">
                    {{ methodTableColumns.status.options[row.status] }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="120px">
                <template slot-scope="{ row }">
                    <el-button class="item" type="primary" size="mini" @click="handleEdit(row)">{{
                        LangUtil("设置")
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('排序')" class-name="status-col" width="320px">
                <template slot-scope="{ row, $index }">
                    <div v-if="checkUnique(unique.plat_activity_order)">
                        <el-button size="mini" @click="handlerOrder(row.id, 1)" :disabled="$index == 0">
                            {{ LangUtil("置顶") }}
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handlerOrder(row.id, 2)"
                            :disabled="$index == tableData.length - 1"
                            >{{ LangUtil("置底") }}</el-button
                        >
                        <el-button
                            size="mini"
                            icon="el-icon-top"
                            @click="handlerOrder(row.id, 3)"
                            :disabled="$index == 0"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-bottom"
                            @click="handlerOrder(row.id, 4)"
                            :disabled="$index == tableData.length - 1"
                        ></el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import ExchangeChannelMethodProxy from "@/views/exchange_channel_method/proxy/ExchangeChannelMethodProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { checkUnique, unique } from "@/core/global/Permission";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class ExchangeChannelListDialog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    // columns
    tableColumns = this.myProxy.tableData.columns;
    methodTableColumns = this.myProxy.methodTableData.columns;

    // table Data
    tableData = this.myProxy.dialogDataChannelData.list;
    row = this.myProxy.dialogDataChannelData.row;
    pageInfo = this.myProxy.dialogDataChannelData.pageInfo;

    //网络状态
    net_status = GlobalVar.net_status;

    methodQuery = this.myProxy.methodQuery;
    listQuery = this.myProxy.listQuery;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }
    handlerPageSwitch(page: number) {
        this.methodQuery.page_count = page;
        this.myProxy.api_admin_exchange_channel_method_index();
    }

    handlerCreate() {
        console.log("handlerCreate ---", DialogStatus.create);
        this.myProxy.showDialog(DialogStatus.create);
    }

    handleEdit(data: any) {
        console.log("handleEdit ---");
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerOrder(id: any, opt: string) {
        this.myProxy.tableData.orderDialogData.id = id;
        this.myProxy.tableData.orderDialogData.opt = opt;
        this.myProxy.tableData.orderDialogData.plat_id = this.listQuery.plat_id;
        this.myProxy.onOrderDialogList();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.header {
    margin-bottom: 6px;
    > div {
        margin-bottom: 6px;
    }
    span {
        margin-right: 16px;
    }
    .title {
        width: 100px;
        display: inline-block;
    }
}
</style>
