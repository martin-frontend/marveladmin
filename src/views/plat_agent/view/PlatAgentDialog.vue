<template>
    <el-dialog :title="LangUtil('配置推广代理说明图片')" :visible.sync="myProxy.dialogData.bShow">
        <div class="banner-list" v-loading="net_status.loading">
            <div v-for="(value, key) in tableColumns.app_type.options" :key="key">
                <div style="display: flex">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :on-change="handleChange"
                        :auto-upload="false"
                        :multiple="false"
                        :show-file-list="false"
                        v-if="!form[key]"
                        class="upload"
                        @click.native="onChange(key)"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div
                        class="upload-box"
                        @mouseover="dialogData.activeKey = key"
                        @mouseleave="dialogData.activeKey = ''"
                        v-if="form[key]"
                    >
                        <div class="mask" v-show="dialogData.activeKey == key">
                            <div class="icon-bar">
                                <i class="el-icon-delete" @click="handleRemove(key)"></i>
                                <i class="el-icon-zoom-in" @click="handlePictureCardPreview(key)"></i>
                            </div>
                        </div>
                        <img :src="formatImageUrl(form[key])" />
                    </div>
                </div>
                <div style="text-align: center;margin-top: 24px">
                    <el-tag type="primary"> {{ value }}{{ LangUtil("推广图") }} </el-tag>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="setPromotionBanner">{{ LangUtil("确认保存") }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentProxy from "@/views/plat_agent/proxy/PlatAgentProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { formatImageUrl } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatAgentDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentProxy = this.getProxy(PlatAgentProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    dialogData = this.myProxy.dialogData;
    form = this.myProxy.dialogData.form;

    // 图片地址转换
    formatImageUrl = formatImageUrl;

    @Watch("myProxy.dialogData.update")
    onWatchUpdate() {
        this.$nextTick(() => {
            this.$forceUpdate();
        });
    }

    handleChange(file: any) {
        this.myProxy.onHandleChange({
            type: 0,
            file: file.raw,
        });
    }

    handleRemove(key: any) {
        this.form[key] = "";
    }

    handlePictureCardPreview(key: any) {
        GlobalVar.preview_image.url = this.form[key];
    }

    onChange(key: any) {
        this.myProxy.dialogData.currentKey = key;
    }

    setPromotionBanner() {
        this.myProxy.onSetBanner();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.banner-list {
    display: flex;
    justify-content: space-around;
    border: 1px solid #999999;
    padding: 20px 0;
}
.upload-box {
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
    cursor: pointer;
    position: relative;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);
        .icon-bar {
            display: flex;
            justify-content: space-around;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            i {
                color: #fff;
                font-size: 20px;
            }
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
