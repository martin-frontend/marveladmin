import GlobalEventType from "@/core/global/GlobalEventType";
import RequestStartCMD from "@/core/command/RequestStartCMD";
import RequestEndCMD from "@/core/command/RequestEndCMD";
import IOErrorCMD from "@/core/command/IOErrorCMD";
import RequestErrorCMD from "@/core/command/RequestErrorCMD";
import SelfModel from "@/core/model/SelfModel";
import ApiVersionUpdateCMD from "./command/ApiVersionUpdateCMD";
import ShowUserDetailCMD from "./command/ShowUserDetailCMD";

export default class AppFacade {
    private static _instance: AppFacade;
    public static get inst(): AppFacade {
        return this._instance || (this._instance = new AppFacade());
    }

    public facade: puremvc.IFacade = puremvc.Facade.getInstance();

    public startUp(): void {
        this.initModel();
        this.initCommand();
    }

    // register model
    private initModel() {
        this.facade.registerProxy(new SelfModel());
    }
    // register command
    private initCommand() {
        this.facade.registerCommand(GlobalEventType.REQUEST_START, RequestStartCMD);
        this.facade.registerCommand(GlobalEventType.REQUEST_END, RequestEndCMD);
        this.facade.registerCommand(GlobalEventType.IO_ERROR, IOErrorCMD);
        this.facade.registerCommand(GlobalEventType.REQUEST_ERROR, RequestErrorCMD);
        this.facade.registerCommand(GlobalEventType.API_VERSION_UPDATE, ApiVersionUpdateCMD);
        this.facade.registerCommand(GlobalEventType.SHOW_USER_DETAIL, ShowUserDetailCMD);
    }
}
