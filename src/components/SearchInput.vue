<template>
    <div class="content" :style="contentWidth">
        <el-input
            :placeholder="placeholder"
            :disabled="getDisabled"
            :maxlength="maxLength"
            clearable
            v-model="inputValue"
            @input="onInput"
        >
            <template slot="prepend">
                <span>
                    {{ title }}
                    <el-tooltip v-if="tip" effect="dark" :content="tip" placement="top">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </span>
            </template>
        </el-input>
    </div>
    <!-- 父组件用法 -->
    <!-- <SearchInput
        :title="tableColumns.channel_id.name"
        v-model="listQuery.channel_id"
        :placeholder=""
        :width=""
    /> -->
    <!-- placeholder 如不设定 预设使用 title -->
    <!-- width 如不设定 则使用预设宽度 -->
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class SearchInput extends Vue {
    LangUtil = LangUtil;
    @Prop() title!: string;
    @Prop() options!: any;
    @Prop({ default: "" }) width!: String;
    // @Prop({ default: "" }) placeholder!: String;
    @Prop() tip!: string;
    @Prop({ default: false }) disabled!: boolean;
    @Prop() maxLength!: number;

    inputValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }

    onInput(value: any) {
        this.$emit("input", value);
    }

    get getValue() {
        return this.value ? this.value : "";
    }

    get contentWidth() {
        return this.width ? `width:${this.width}px` : "";
    }

    placeholder: any = this.LangUtil("请输入");

    // get getPlaceholder() {
    //     return this.placeholder ? this.placeholder : this.title;
    // }

    get getDisabled() {
        return this.disabled;
    }
}
</script>

<style scoped lang="scss">
.content {
    // width: 280px;
    margin-right: 10px;
    margin-bottom: 10px;
}
::v-deep .el-input-group__prepend {
    min-width: 97px;
    text-align: center;
}
</style>
