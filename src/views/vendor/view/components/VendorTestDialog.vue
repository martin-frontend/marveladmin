<template>
    <el-dialog
        :title="`${tableColumns['proxy_key'].name}`"
        :visible.sync="myProxy.testDialogData.bShow"
        width="500px"
        v-loading="net_status.loading"
    >
        <el-form>
            <el-table :data="configAry" border fit highlight-current-row style="width: 100%" size="mini">
                <el-table-column
                    :label="`${tableColumns['proxy_key'].name}`"
                    prop="value"
                    class-name="status-col"
                ></el-table-column>
                <el-table-column :label="$t('common.operating')" class-name="status-col" width="100px">
                    <template slot-scope="{ row }">
                        <el-button v-if="checkUnique(unique.test_vendor)" size="mini" type="danger" @click="handlerTest(row)">{{
                            $t("plat_sms.test")
                        }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="dialog_footer">
                <el-button type="primary" size="mini" @click="handlerClose">{{ $t("common.close") }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
<script lang='ts'>
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import VendorProxy from "@/views/vendor/proxy/VendorProxy";
import { Component, Vue } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class VendorTestDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VendorProxy = this.getProxy(VendorProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;

    get configAry() {
        let ary: any = [];
        Object.values(this.myProxy.tableData.columns.proxy_key.options).forEach((element: any) => {
            ary.push({ value: element });
        });
        return ary;
    }

    private handlerTest(data: any) {
        this.myProxy.onTest(data.value);
    }

    private handlerClose() {
        this.myProxy.testDialogData.bShow = false;
    }
}
</script>
<style scoped lang='scss'>
@import "@/styles/common.scss";

.dialog_footer {
    margin-top: 16px;
    text-align: right;
}
</style>