import IModule = angular.IModule;
import {MatrixDirectiveController} from "./MatrixDirectiveController";
import {IMatrixDirectiveParams} from "./IMatrixDirectiveParams";


export class MatrixDirective implements ng.IDirective {
    restrict = 'EA';
    templateUrl = "./directives/d3/matrix/matrix.html";
    replace = false;
    controller = MatrixDirectiveController;
    controllerAs = 'model';
   /* bindToController = {
        useForce:"@"
    };*/
    scope = {
        useForce:"=",
        nodes:"=",
        edges:"=",
        colorSettings:"=",
        resourceRoot:"@",
        defaultNodeRadius:"="
    };


    constructor() {
        MatrixDirectiveController.$inject = ['$scope',"$rootScope"];
    }

    link = (scope: IMatrixDirectiveParams, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: MatrixDirectiveController) => {

    };

    static register(app: IModule): void {
        app.directive('matrix', MatrixDirective.factory());
    }


    static factory(): ng.IDirectiveFactory {
        const directive = () => new MatrixDirective();
        directive.$inject = ["$rootScope"];
        return directive;
    }
}

