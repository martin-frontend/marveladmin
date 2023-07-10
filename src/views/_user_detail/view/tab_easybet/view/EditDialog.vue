<template>
    <el-dialog
        :title="LangUtil('编辑')"
        :visible.sync="dialogData.bShow"
        width="600px"
        :append-to-body="true"
        style="margin-top: 15vh !important;"
    >
        <div v-loading="net_status.loading">
            <div style="min-height:100px">
                <el-form ref="form" :model="form" label-width="140px" :rules="rules">
                    <el-form-item :label="label_text">
                        <el-autocomplete
                            ref="autocomplete"
                            v-model="selectedItem"
                            :fetch-suggestions="querySearch"
                            :placeholder="LangUtil('请选择等级')"
                            @select="handleSelect"
                            @blur="handleBlur"
                        >
                            <template slot-scope="{ item }">
                                <span>{{ item }}</span>
                            </template>
                        </el-autocomplete>

                        <el-button class="item" type="primary" @click="handlerClear" style="margin-left: 8px;">
                            {{ LangUtil("清除") }}
                        </el-button>
                    </el-form-item>
                    <el-form-item v-if="form.level_type == 'EASY_BET'">
                        <el-radio-group v-model="form.update_type">
                            <el-radio
                                v-for="(label, key) of tableColumns.update_type.options"
                                :key="key"
                                :label="Number(key)"
                            >
                                {{ label }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <div class="confirm">
                <el-button class="item" type="primary" @click="handlerSubmit" :disabled="!check">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>
<style scoped>
.autocomplete-container {
    position: relative;
}
.el-autocomplete .el-input__inner {
    position: relative;
    z-index: 2;
}
.el-autocomplete .el-autocomplete-suggestion {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 3;
    width: 100%;
}
</style>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";
import TabEasybetProxy from "../proxy/TabEasybetProxy";
import { Message } from "element-ui";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabEasybetProxy = getProxy(TabEasybetProxy);
    tableColumns: any = this.myProxy.tableColumns;
    dialogData = this.myProxy.dialogData;
    form = this.myProxy.dialogData.form;
    userInfo = this.myProxy.userInfo;

    public get label_text(): string {
        return LangUtil("{0}设置", this.tableColumns.level_type.options[this.form.level_type]);
        //return this.form.level_type == 1 ? this.LangUtil("easybet等级设置") : this.LangUtil("板球等级设置");
    }
    get rules() {
        return {
            user_level: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
        };
    }
    get check() {
        if (this.selectedItem && (this.selectItemLevel != this.form.user_level || this.form.update_type != 1 )) {
            return true;
        }
        return false;
    }
    /**转换当前的输入 到 等级 */
    get selectItemLevel() {
        const keys = Object.keys(this.dialogData.org_option_data);
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            if (this.dialogData.org_option_data[keys[index]] == this.selectedItem) {
                return keys[index];
            }
        }
        return -1;
    }
    selectedItem = "";
    querySearch(queryString: string, cb: any) {
        //console.log("--当前的数据为",this.optionsData);
        const results = queryString
            ? this.dialogData.optionData.filter((option: any) => {
                  return option.toLowerCase().includes(queryString.toLowerCase());
              })
            : this.dialogData.optionData;
        cb(results);
    }
    handleBlur() {
        if (!this.selectedItem && this.$refs.autocomplete && this.$refs.autocomplete.suggestions.length > 0) {
            const firstMatch = this.$refs.autocomplete.suggestions.find((option: any) =>
                option.toLowerCase().startsWith((this.selectedItem || "").toLowerCase())
            );

            this.selectedItem = firstMatch ? firstMatch : this.$refs.autocomplete.suggestions[0];
        }
    }
    handleSelect(item: any) {
        this.selectedItem = item;
        this.$refs.autocomplete.$refs.input.$el.blur();
    }
    handlerSubmit() {
        //提交的时候根据用户选择的找出对应的值
        const keys = Object.keys(this.dialogData.org_option_data);
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            if (this.dialogData.org_option_data[keys[index]] == this.selectedItem) {
                this.myProxy.dialogData.form.user_level = keys[index];
                break;
            }
        }
        this.myProxy.dialogData.form.user_level = this.selectItemLevel;
        console.log("发送信息为", this.form);
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }
    handlerClear() {
        this.selectedItem = "";
    }
}
</script>

<style scoped lang="scss">
.input_title {
    margin-bottom: 20px;
    margin-left: 25px;
}
.dialog_input {
    width: 400px;
    margin-bottom: 10px;
    margin-left: 25px;
}
.confirm {
    text-align: center;
    margin-top: 30px;
}
.ps {
    color: red;
}
</style>
