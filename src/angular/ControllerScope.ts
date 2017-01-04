import {Controller} from "./Controller";

export interface ControllerScope extends ng.IScope{
    model:Controller;
}