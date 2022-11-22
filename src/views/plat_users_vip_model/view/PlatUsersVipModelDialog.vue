<template>
    <el-dialog
        :title="`${textMap[status]}` + LangUtil('VIP配置')"
        :visible.sync="myProxy.dialogData.bShow"
        width="1120px"
        min-width="500px"
    >
        <el-form ref="form" :rules="rules" :model="form" label-width="150px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="LangUtil('模版名称')" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('模版描述')" prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item size="mini">
                <div class="add_level">
                    <el-button
                        class="add_btn"
                        size="mini"
                        type="primary"
                        icon="el-icon-circle-plus-outline"
                        @click="handlerAddLevel"
                        >{{ LangUtil("添加等级") }}
                    </el-button>
                    <el-checkbox-group v-model="form.types">
                        <el-checkbox :label="1" name="type" @change="handlerTypesChange">{{
                            LangUtil("有效流水")
                        }}</el-checkbox>
                        <el-checkbox :label="2" name="type" @change="handlerTypesChange">{{
                            LangUtil("总充值")
                        }}</el-checkbox>
                    </el-checkbox-group>
                    <span v-show="form.types.length == 0" class="red"> {{ LangUtil("至少选择一项") }}</span>
                </div>
            </el-form-item>
            <div>
                {{ LangUtil("最高配置等级") }}<span class="red">{{ form.vip_config.length }}</span
                >{{ LangUtil("等级") }}
            </div>
            <el-row :gutter="20" class="border" v-for="(item, index) in form.vip_config" :key="index">
                <el-col :span="3">
                    <el-button size="mini" type="primary" icon="el-icon-delete" @click="handlerDeleteLeve(index)"
                        >{{ LangUtil("删除") }}
                    </el-button>
                </el-col>
                <el-col :span="20">
                    <div class="inner_border">
                        <div class="level_setting">
                            <div class="level">{{ LangUtil("等级") }} {{ index + 1 }}</div>
                            <div>
                                <el-form-item
                                    v-if="form.types.indexOf(1) != -1"
                                    size="mini"
                                    :label="LangUtil('有效流水')"
                                >
                                    <el-input
                                        v-model="item.total_water"
                                        controls-position="right"
                                        :min="0"
                                        :step="0.01"
                                        :precision="2"
                                        type="number"
                                        onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                                        style="width: 200px"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    v-if="form.types.indexOf(2) != -1"
                                    size="mini"
                                    :label="LangUtil('总充值')"
                                >
                                    <el-input
                                        v-model="item.total_recharge"
                                        type="number"
                                        :min="0"
                                        :step="0.01"
                                        :precision="2"
                                        onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                                        style="width: 200px"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="gap_line">{{ LangUtil("返水比例") }}</div>
                        <el-form :inline="true" class="demo-form-inline">
                            <el-form-item
                                size="mini"
                                :label="tableColumns.vip_config.options_key[1][citem]"
                                v-for="(citem, cindex) in Object.keys(tableColumns.vip_config.options_key[1])"
                                :key="cindex"
                            >
                                <el-input-number
                                    v-model="item.backwater_config[citem].backwater_rate"
                                    controls-position="right"
                                    :min="0"
                                    :max="0.99999"
                                    :step="0.00001"
                                    :precision="5"
                                ></el-input-number>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <el-form-item class="dialog-footer">
                <el-button type="danger" size="mini" @click="myProxy.dialogData.bShow = false">{{
                    LangUtil("关闭")
                }}</el-button>
                <el-button
                    type="primary"
                    size="mini"
                    @click="
                        isStatusUpdate && checkUnique(unique.plat_users_vip_model_update) ? handleUpdate() : handleAdd()
                    "
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersVipModelProxy from "@/views/plat_users_vip_model/proxy/PlatUsersVipModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUsersVipModelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersVipModelProxy = this.getProxy(PlatUsersVipModelProxy);
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
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
        };
    }

    handlerTypesChange() {
        this.myProxy.typesChange();
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
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

    handleDelete() {
        this.myProxy.onDelete(this.form.vip_model_id);
    }

    handlerAddLevel() {
        this.myProxy.addLevel();
    }

    handlerDeleteLeve(index: number) {
        this.myProxy.deleteLevel(index);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.red {
    color: red;
}
.add_level {
    display: flex;
    flex-direction: row;
    .add_btn {
        margin-right: 16px;
    }
    span {
        margin-left: 16px;
    }
}
.el-input {
    text-align: right;
    input {
        text-align: right;
    }
}
.border {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;

    .gap_line {
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .inner_border {
        padding: 10px;
        border: 1px solid #ddd;

        .level_setting {
            display: flex;
            flex-direction: row;
            .level {
                width: 150px;
                line-height: 30px;
            }
        }
    }
}
</style>
