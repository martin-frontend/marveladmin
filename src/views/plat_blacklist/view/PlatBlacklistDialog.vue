<template>
    <el-dialog :title="LangUtil('新增')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.plat_id.options"
                        :key="key"
                        :label="item"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="tableColumns.black_type.name" prop="black_type">
                <el-select v-model="form.black_type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.black_type.options"
                        :key="key"
                        :label="item"
                        :value="key"
                    ></el-option>
                </el-select>
                <p class="desc">
                    {{
                        LangUtil(
                            "手机号、IP地址、MAC地址可限制用户登入，充值，兑换;支付宝和银行卡类型只限制用户充值和兑换"
                        )
                    }}
                </p>
            </el-form-item>

            <el-form-item :label="tableColumns.black_content.name" prop="black_contents">
                <el-input type="textarea" v-model="form.black_contents"></el-input>
                <p class="desc">
                    {{ LangUtil("黑名单可以批量输入，以换行进行分割，一次堆多支持录入5000条，例如：") }}
                    <br />{{ LangUtil("192.168.0.1") }} <br />{{ LangUtil("168.182.1.3") }} <br />{{
                        LangUtil('IP地址支持*通配符，例如:"192.168.*.*"，这样将限制192.168开头的所有IP')
                    }}
                </p>
            </el-form-item>

            <el-form-item :label="tableColumns.limit_type.name" prop="limit_type">
                <el-select v-model="form.limit_type" multiple :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.limit_type.options"
                        :key="key"
                        :label="item"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleAdd()">{{ LangUtil("确认保存") }}</el-button>
                <el-button @click="myProxy.hideDialog()">{{ LangUtil("取消") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBlacklistProxy from "@/views/plat_blacklist/proxy/PlatBlacklistProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatBlacklistDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBlacklistProxy = this.getProxy(PlatBlacklistProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

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
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            black_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            black_contents: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            limit_type: [
                {
                    type: "array",
                    required: true,
                    message: this.LangUtil("必须选择"),
                    trigger: "blur",
                },
            ],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.el-select--medium {
    width: 100%;
}
.desc {
    line-height: 1.5;
    margin: 6px;
}
</style>
