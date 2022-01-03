<template>
    <section class="app-main" :class="langCss">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>

<script>
import Cookies from "js-cookie";
export default {
    name: "AppMain",
    props: {
        tags: {
            type: Object,
            default: null,
        },
    },
    computed: {
        cachedViews() {
            return this.$props.tags.cachedViews;
        },
        key() {
            return this.$route.path;
        },
        langCss() {
            return Cookies.get("language") || "zh";
        },
    },
};
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 0 15px 15px 15px;
}

.fixed-header + .app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
