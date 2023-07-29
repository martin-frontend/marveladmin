<template>
    <div class="content" :style="contentWidth">
        <span v-if="isNeedTitle" class="title">
            {{ title }}
            <el-tooltip v-if="tip" effect="dark" :content="tip" placement="top">
                <i class="el-icon-question"></i>
            </el-tooltip>
        </span>

        <el-select
            v-model="selectValue"
            filterable
            :clearable="clearable"
            :placeholder="placeholder"
            :disabled="getDisabled"
            @change="onChange"
        >
            <template v-if="!isUseKey">
                <el-option
                    v-for="(value, key) in options"
                    :key="key"
                    :label="value.name || value"
                    :value="key"
                ></el-option>
            </template>
            <template v-else>
                <el-option v-for="(value, key) in options" :key="key" :label="key || value" :value="key"></el-option>
            </template>
        </el-select>
    </div>
    <!-- 父组件用法 -->
    <!-- <SearchSelect
        :title="tableColumns.status.name"
        v-model="listQuery.status"
        :options="tableColumns.status.options"
        :placeholder=""
        :width=""
    /> -->
    <!-- placeholder 如不设定 预设使用 title -->
    <!-- width 如不设定 则使用预设宽度 280px -->
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import i18n from "@/lang";

@Component
export default class SearchSelect extends Vue {
    LangUtil = LangUtil;
    @Prop() title!: string;
    @Prop() options!: any;
    @Prop({ default: true }) clearable!: boolean;
    @Prop({ default: "" }) width!: string;
    // @Prop({ default: "" }) placeholder!: string;
    @Prop({ default: false }) disabled!: boolean;
    @Prop({ default: true }) isNeedTitle!: boolean;
    @Prop() tip!: string;
    @Prop({ default: false }) isUseKey!: boolean;

    selectValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.selectValue = this.value;
    }

    get getValue() {
        return this.value != undefined ? this.value : "";
    }

    get contentWidth() {
        return this.width ? `width:${this.width}px` : "";
    }

    placeholder: any = this.LangUtil("请选择");

    // get getPlaceholder() {
    //     return this.placeholder ? this.placeholder : this.title;
    // }

    get getDisabled() {
        return this.disabled;
    }

    onChange(value: any) {
        this.$emit("input", value);
        this.$emit("change", value);
    }
}
</script>

<style scoped lang="scss">
.title {
    min-width: 97px;
    text-align: center;
    border-radius: 4px 0 0px 4px;
    border: 1px solid #dcdfe6;
    border-right: 0;
    font-size: 14px;
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
}
.content {
    display: inline-table;
    // width: 280px;
    margin-right: 10px;
    margin-bottom: 10px;
    el-select {
        width: 100%;
    }

    ::v-deep .el-input__inner {
        width: 100%;
        border-radius: 0px 4px 4px 0px;
    }
}
</style>
