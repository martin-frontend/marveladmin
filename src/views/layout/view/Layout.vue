<template>
    <div :class="classObj()" class="app-wrapper">
        <div v-if="app.device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" :sidebar="sidebar" :device="app.device" />
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': false }">
                <navbar :sidebar="sidebar" :device="app.device" @handleToggleSideBar="handleToggleSideBar" />
                <tags-view
                    v-if="needTagsView"
                    :tags="tags"
                    @addVisitedView="addVisitedView"
                    @addView="addView"
                    @updateVisitedView="updateVisitedView"
                    @delCachedView="delCachedView"
                    @delView="delView"
                    @delOthersViews="delOthersViews"
                    @delAllViews="delAllViews"
                />
            </div>
            <app-main :tags="tags" v-loading="loading" />
            <!-- <right-panel v-if="showSettings">
                <settings />
            </right-panel> -->
        </div>
        <UserDetail :page="1" />
        <UserDetail :page="2" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import "element-ui/lib/theme-chalk/display.css";
import { layoutRouteSetting } from "@/core/global/LayoutRouteSetting";
import { sidebarContentVo, tagsVo } from "@/core/vo/LayoutVo";
import { Sidebar, AppMain, Navbar, TagsView } from "./components";
import LayoutMediator from "@/views/layout/mediator/LayoutMediator";
import UserDetail from "@/views/_user_detail/view/UserDetail.vue";
const { body } = document;
const WIDTH = 992;
@Component({
    components: {
        AppMain,
        Navbar,
        // RightPanel,
        // Settings,
        Sidebar,
        TagsView,
        UserDetail,
    },
})
export default class Layout extends AbstractView {
    public loading: boolean = false;

    public showLoading() {
        this.loading = true;
    }
    public hideLoading() {
        this.loading = false;
    }

    constructor() {
        super(LayoutMediator);
        this.key = this.$route.path;
    }
    private key = "";

    //////////////////////////////////////////////////////////////

    private sidebar = {
        opened: Number(window.localStorage.getItem("sidebarStatus"))
            ? Number(window.localStorage.getItem("sidebarStatus"))
            : true,
        withoutAnimation: false,
    };

    private handleCloseSideBar = (val: any) => {
        this.sidebar = Object.assign(this.sidebar, val);
        this.sidebar.opened = false;
        window.localStorage.setItem("sidebarStatus", "0");
    };

    private handleToggleSideBar = () => {
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.withoutAnimation = false;
        if (this.sidebar.opened) {
            window.localStorage.setItem("sidebarStatus", "1");
        } else {
            window.localStorage.setItem("sidebarStatus", "0");
        }
    };

    private app = {
        device: "desktop",
        size: window.localStorage.getItem("size") || "medium",
    };

    beforeMount() {
        window.addEventListener("resize", this.resizeHandler);
    }
    beforeDestroy() {
        window.removeEventListener("resize", this.resizeHandler);
    }
    mounted() {
        const isMobile = this.isMobile();
        if (isMobile) {
            this.toggleDevice("mobile");
            this.handleCloseSideBar({ withoutAnimation: false });
        }
    }

    isMobile() {
        const rect = body.getBoundingClientRect();
        return rect.width - 1 < WIDTH;
    }
    resizeHandler() {
        if (!document.hidden) {
            const isMobile = this.isMobile();
            this.toggleDevice(isMobile ? "mobile" : "desktop");
            if (isMobile) {
                this.handleCloseSideBar({ withoutAnimation: false });
            }
        }
    }
    toggleDevice(device: string) {
        this.app.device = device;
    }

    //tags-start//////////////////////////////////////////////////////////////////

    private needTagsView = true;
    private showSettings = true;

    private tags = {
        visitedViews: [] as tagsVo[],
        cachedViews: [] as tagsVo[],
    };

    addView(view: any) {
        this.addVisitedView(view);
        this.addCachedView(view);
    }
    addVisitedView(view: any) {
        if (view.name == "layout") return;
        if (this.tags.visitedViews.some(v => v.path === view.path)) return;
        this.tags.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title || view.name || "no-name",
            })
        );
    }
    addCachedView(view: any) {
        if (this.tags.cachedViews.includes(view.name)) return;
        if (!view.meta.noCache) {
            this.tags.cachedViews.push(view.name);
        }
    }
    delView(view: any) {
        return new Promise(resolve => {
            this.delVisitedView(view);
            this.delCachedView(view);

            resolve({
                visitedViews: [...this.tags.visitedViews],
                cachedViews: [...this.tags.cachedViews],
            });
        });
    }
    delVisitedView(view: any) {
        for (const [i, v] of this.tags.visitedViews.entries()) {
            if (v.path === view.path) {
                this.tags.visitedViews.splice(i, 1);
                break;
            }
        }
    }
    delCachedView(view: any) {
        return new Promise(resolve => {
            const index = this.tags.cachedViews.indexOf(view.name);
            index > -1 && this.tags.cachedViews.splice(index, 1);

            resolve({
                cachedViews: [...this.tags.cachedViews],
            });
        });
    }

    delOthersViews(view: any) {
        return new Promise(resolve => {
            this.delOthersVisitedViews(view);
            this.delOthersCachedViews(view);
            resolve({
                visitedViews: [...this.tags.visitedViews],
                cachedViews: [...this.tags.cachedViews],
            });
        });
    }
    delOthersVisitedViews(view: any) {
        this.tags.visitedViews = this.tags.visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path;
        });
    }
    delOthersCachedViews(view: any) {
        const index = this.tags.cachedViews.indexOf(view.name);
        if (index > -1) {
            this.tags.cachedViews = this.tags.cachedViews.slice(index, index + 1);
        } else {
            // if index = -1, there is no cached tags
            this.tags.cachedViews = [];
        }
    }
    delAllViews(view: any) {
        return new Promise(resolve => {
            this.delAllVisitedViews();
            this.delAllCachedViews();
            resolve({
                visitedViews: [...this.tags.visitedViews],
                cachedViews: [...this.tags.cachedViews],
            });
        });
    }
    delAllVisitedViews() {
        const affixTags = this.tags.visitedViews.filter(tag => tag.meta.affix);
        this.tags.visitedViews = affixTags;
    }
    delAllCachedViews() {
        this.tags.cachedViews = [];
    }
    updateVisitedView(view: any) {
        for (let v of this.tags.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view);
                break;
            }
        }
    }

    //tags-end/////////////////////////////////////////////////////////////////

    classObj() {
        return {
            hideSidebar: !this.sidebar.opened,
            openSidebar: this.sidebar.opened,
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.app.device === "mobile",
        };
    }

    handleClickOutside() {
        this.handleCloseSideBar({ withoutAnimation: false });
    }
}
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
</style>
