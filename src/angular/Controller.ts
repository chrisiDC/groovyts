import {ControllerScope} from "./ControllerScope";
import * as $ from "jquery";
import * as toastr from "toastr";
import postal =require("postal");

export abstract class Controller {

    private subscription:ISubscriptionDefinition<any>;

    constructor($scope: ControllerScope) {
        $scope.model = this;
        toastr.options.closeButton = false;
        toastr.options.debug = false;
        toastr.options.newestOnTop = false;
        toastr.options.progressBar = false;
        toastr.options.positionClass = "toast-top-right";
        toastr.options.preventDuplicates = false;
        toastr.options.onclick = null;
        toastr.options.showDuration = 300;
        toastr.options.hideDuration = 500;
        toastr.options.timeOut = 5000;
        toastr.options.extendedTimeOut = 1000;
        toastr.options.showEasing = "swing";
        toastr.options.hideEasing = "linear";
        toastr.options.showMethod = "fadeIn";
        toastr.options.hideMethod = "fadeOut";

        this.subscription = postal.subscribe({
            channel: "application",
            topic: "error",
            callback: (data, envelope)=> {
                console.log(JSON.stringify(data));
            }
        });
    }

    public info = (msg: string)=> {
        toastr.info(msg);
    };

    public error = (msg: string)=> {
        toastr.error(msg);
    };

    public warning = (msg: string)=> {
        toastr.warning(msg);
    };

    public success = (msg: string)=> {
        toastr.success(msg);
    };

}