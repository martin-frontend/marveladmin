<template>
    <el-dialog :visible.sync="bShow">
        <div class="contetn">
            <img :src="preview_image.url" alt="" />
        </div>
    </el-dialog>
</template>

<script lang="ts">
import GlobalVar from "@/core/global/GlobalVar";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class PreviewImageDialog extends Vue {
    private preview_image = GlobalVar.preview_image;

    private bShow: boolean = false;

    @Watch("preview_image.url")
    private onWatchUrl() {
        const url = this.preview_image.url;
        this.bShow = !!url && url != "";
    }

    @Watch("bShow")
    private onWatchShow() {
        if (!this.bShow) {
            this.preview_image.url = "";
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.contetn {
    width: 100%;
    text-align: center;
    img {
        max-width: 100%;
    }
}
</style>
