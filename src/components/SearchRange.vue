<template>
    <div class="content">
        <span class="title">
            {{ title }}
            <el-tooltip v-if="tip" effect="dark" :content="tip" placement="top">
                <i class="el-icon-question"></i>
            </el-tooltip>
        </span>
        <div class="input_group" :class="$slots.default?'input_group-slot':''">
            <el-input
                :min="min"
                :max="max"
                type="number"
                :disabled="getDisabled"
                clearable
                v-model.trim="rangeMinValue"
                @input="onMinValueInput()"
                :placeholder="placeholders[0]"
            ></el-input>
            <span>-</span>
            <el-input
                :min="min"
                :max="max"
                type="number"
                :disabled="getDisabled"
                clearable
                v-model.trim="rangeMaxValue"
                @input="onMaxValueInput()"
                :placeholder="placeholders[1]"
            ></el-input>
        </div>
        <div class="slot-content" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
    <!-- 父组件用法 -->
    <!-- <SearchRange
        :title="tableColumns.vip_level.name"
        :min="0"
        :max="tableColumns.vip_level.options[listQuery.plat_id]"
        :minValue.sync="listQuery.min_level"
        :maxValue.sync="listQuery.max_level"
        :placeholders="['最小等级', '最大等级']"
    /> -->
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class SearchRange extends Vue {
    @Prop() title!: string;
    @Prop() options!: any;
    @Prop() placeholders!: Array<string>;
    @Prop() tip!: string;

    @Prop({ default: false }) disabled!: boolean;

    @Prop({ default: 0 }) min!: number;
    @Prop({ default: Number.MAX_VALUE }) max!: number;

    @Prop() minValue!: number;
    @Prop() maxValue!: number;

    private rangeMaxValue: any = this.getMaxValue;
    private rangeMinValue: any = this.getMinValue;

    @Watch("minValue")
    onMinValueChange() {
        this.rangeMinValue = this.minValue;
    }

    @Watch("maxValue")
    onMaxValueChange() {
        this.rangeMaxValue = this.maxValue;
    }

    get getMinValue() {
        return this.minValue ? this.minValue : "";
    }

    get getMaxValue() {
        return this.maxValue ? this.maxValue : "";
    }

    private onMinValueInput() {
        // this.rangeMinValue = this.rangeMinValue.replace(/[^\d]/g, "");
        this.$emit("update:minValue", this.rangeMinValue);
        this.$emit("change", this.rangeMinValue);
    }

    private onMaxValueInput() {
        // this.rangeMaxValue = this.rangeMaxValue.replace(/[^\d]/g, "");
        this.$emit("update:maxValue", this.rangeMaxValue);
        this.$emit("change", this.rangeMaxValue);
    }

    get getDisabled() {
        return this.disabled;
    }
}
</script>

<style scoped lang="scss">
::v-deep .input_group {
    display: flex;
    position: relative;
    border: 1px solid #dcdfe6;
    height: 36px;
    border-radius: 0px 4px 4px 0px;

    .el-input {
        display: table-cell;
        // box-sizing: border-box;
        width: 130px !important;
        input {
            border: 0;
            height: 33px;
            text-align: center;
        }
    }
    span {
        line-height: 36px;
    }
}
.input_group-slot {
    border-radius: 0px 0px 0px 0px;
}
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
    margin-right: 10px;
    margin-bottom: 10px;
    el-select {
        width: 100%;
    }
}
::v-deep .el-input__inner {
    width: 100%;
    border-radius: 0px 4px 4px 0px;
}
.slot-content {
    border-radius: 0px 4px 4px 0px;
    border: 1px solid #dcdfe6;
    border-left: 0;
    display: table-cell;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
