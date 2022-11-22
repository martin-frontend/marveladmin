<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="850px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input v-model="form.name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['desc'].name" prop="desc">
                <el-input type="textarea" v-model="form.desc" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['calc_type'].name" prop="calc_type">
                <el-select v-model="form.calc_type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['calc_type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <div class="levels">
                <div>
                    <div class="level_setting">
                        <el-button size="mini" type="primary" @click="addLevel(form.all_bonus_config)"
                            >{{ LangUtil("添加等级") }}
                        </el-button>
                        {{ LangUtil("最高配置等级") }}
                        <span style="color: red">{{ form.all_bonus_config.length }}</span>
                        {{ LangUtil("等级") }}
                    </div>

                    <el-table
                        class="status-col"
                        :data="form.all_bonus_config"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%"
                        size="mini"
                    >
                        <el-table-column :label="LangUtil('操作')" width="100">
                            <template slot-scope="{ $index }">
                                <el-button size="mini" type="danger" @click="deleteLevel($index, form.all_bonus_config)"
                                    >{{ LangUtil("删除") }}
                                </el-button>
                            </template>
                        </el-table-column>
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
                <el-button type="primary" size="mini" @click="!isStatusUpdate ? handleAdd() : handleUpdate()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBonusAllStockModelProxy from "@/views/plat_bonus_all_stock_model/proxy/PlatBonusAllStockModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatBonusAllStockModelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBonusAllStockModelProxy = this.getProxy(PlatBonusAllStockModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

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

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            calc_type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let errorCode1: any = this.LangUtil("等级描述名称没有输入数据");
                let errorCode2: any = this.LangUtil("团队业绩没有输入数据");
                let errorCode3: any = this.LangUtil("每万占股没有输入数据");
                let errorCode4: any = this.LangUtil("等级没有输入数据");
                let isValide = true;
                const config: any = this.myProxy.dialogData.form.all_bonus_config;

                const element = config;
                if (!element || element.length == 0) {
                    this.$message.warning(errorCode4);
                    isValide = false;
                    return;
                }
                element.forEach((item: any) => {
                    if (!isValide) return;
                    if (item.name === "") {
                        this.$message.warning(errorCode1);
                        isValide = false;
                        return;
                    } else if (item.total_performance === undefined) {
                        this.$message.warning(errorCode2);
                        isValide = false;
                        return;
                    } else if (item.stock_num === undefined) {
                        this.$message.warning(errorCode3);
                        isValide = false;
                        return;
                    }
                });

                if (!isValide) {
                    return;
                }
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    addLevel(value: any) {
        value.push({
            name: "", // 等级描述名称
            total_performance: 0, // 团队业绩
            stock_num: 0, // 每万占股
        });
    }
    deleteLevel(index: any, value: any[]) {
        value.splice(index, 1);
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
