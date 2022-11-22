<template>
    <el-dialog :title="LangUtil('配置梯度模版')" :visible.sync="myProxy.tableData.templateBShow" width="850px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <div class="levels">
                <div>
                    <el-table
                        class="status-col"
                        :data="form.all_bonus_config"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%"
                        size="mini"
                    >
                        <el-table-column :label="LangUtil('等级')" type="index" width="80"></el-table-column>
                        <el-table-column :label="LangUtil('等级描述名称')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input
                                    v-model="row.name"
                                    :placeholder="LangUtil('请输入')"
                                    style="width: 100%"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="LangUtil('团队业绩')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.total_performance"
                                    style="width: 100%"
                                    :min="0"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :label="LangUtil('每万占股')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.stock_num"
                                    style="width: 100%"
                                    :min="0"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="initTemplate">{{ LangUtil("初始化模版") }}</el-button>
                <el-button type="primary" size="mini" @click="handleUpdate">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import PlatBonusAllStockProxy from "../proxy/PlatBonusAllStockProxy";
import PlatBonusAllProxy from "../proxy/PlatBonusAllProxy";

@Component
export default class DialogPlatBonusAllStockModel extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBonusAllStockProxy = this.getProxy(PlatBonusAllStockProxy);
    bounsAllProxy: PlatBonusAllProxy = this.getProxy(PlatBonusAllProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    //  form = this.myProxy.tableData.form;
    get form() {
        return this.myProxy.tableData.form;
    }

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            calc_type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.admin_plat_update(this.bounsAllProxy.listQuery.plat_id);
            }
        });
    }

    initTemplate() {
        this.myProxy.initTemplate(this.bounsAllProxy.tableData.model);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.levels {
    .level_setting {
        margin-bottom: 16px;
    }
}
.dialog-footer {
    margin-top: 16px;
}
</style>
