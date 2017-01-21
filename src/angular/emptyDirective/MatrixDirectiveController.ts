import {IMatrixDirectiveController} from "./IMatrixDirectiveController";
import {IMatrixDirectiveParams} from "./IMatrixDirectiveParams";

export class MatrixDirectiveController implements IMatrixDirectiveController {


    constructor(private scope: IMatrixDirectiveParams,
                private rootScope: ng.IRootScopeService) {



    }


}


