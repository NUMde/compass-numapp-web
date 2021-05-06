/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RouterHistory } from "@stencil/router";
import { NotificationSeverity } from "services/notifier";
export namespace Components {
    interface AppRoot {
        "history": RouterHistory;
    }
    interface NumContainerAuthenticate {
    }
    interface NumContainerDashboard {
    }
    interface NumContainerQuestionnaire {
    }
    interface NumContainerWelcome {
    }
    interface NumNotification {
        "action": () => void;
        "actionKey": string;
        "close": () => void;
        "messageKey": string;
        "messageOptions"?: { [key: string]: any };
        "severity": NotificationSeverity;
    }
    interface NumNotifications {
    }
    interface NumQuestionnaireQuestion {
    }
    interface NumQuestionnaireTree {
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLNumContainerAuthenticateElement extends Components.NumContainerAuthenticate, HTMLStencilElement {
    }
    var HTMLNumContainerAuthenticateElement: {
        prototype: HTMLNumContainerAuthenticateElement;
        new (): HTMLNumContainerAuthenticateElement;
    };
    interface HTMLNumContainerDashboardElement extends Components.NumContainerDashboard, HTMLStencilElement {
    }
    var HTMLNumContainerDashboardElement: {
        prototype: HTMLNumContainerDashboardElement;
        new (): HTMLNumContainerDashboardElement;
    };
    interface HTMLNumContainerQuestionnaireElement extends Components.NumContainerQuestionnaire, HTMLStencilElement {
    }
    var HTMLNumContainerQuestionnaireElement: {
        prototype: HTMLNumContainerQuestionnaireElement;
        new (): HTMLNumContainerQuestionnaireElement;
    };
    interface HTMLNumContainerWelcomeElement extends Components.NumContainerWelcome, HTMLStencilElement {
    }
    var HTMLNumContainerWelcomeElement: {
        prototype: HTMLNumContainerWelcomeElement;
        new (): HTMLNumContainerWelcomeElement;
    };
    interface HTMLNumNotificationElement extends Components.NumNotification, HTMLStencilElement {
    }
    var HTMLNumNotificationElement: {
        prototype: HTMLNumNotificationElement;
        new (): HTMLNumNotificationElement;
    };
    interface HTMLNumNotificationsElement extends Components.NumNotifications, HTMLStencilElement {
    }
    var HTMLNumNotificationsElement: {
        prototype: HTMLNumNotificationsElement;
        new (): HTMLNumNotificationsElement;
    };
    interface HTMLNumQuestionnaireQuestionElement extends Components.NumQuestionnaireQuestion, HTMLStencilElement {
    }
    var HTMLNumQuestionnaireQuestionElement: {
        prototype: HTMLNumQuestionnaireQuestionElement;
        new (): HTMLNumQuestionnaireQuestionElement;
    };
    interface HTMLNumQuestionnaireTreeElement extends Components.NumQuestionnaireTree, HTMLStencilElement {
    }
    var HTMLNumQuestionnaireTreeElement: {
        prototype: HTMLNumQuestionnaireTreeElement;
        new (): HTMLNumQuestionnaireTreeElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "num-container-authenticate": HTMLNumContainerAuthenticateElement;
        "num-container-dashboard": HTMLNumContainerDashboardElement;
        "num-container-questionnaire": HTMLNumContainerQuestionnaireElement;
        "num-container-welcome": HTMLNumContainerWelcomeElement;
        "num-notification": HTMLNumNotificationElement;
        "num-notifications": HTMLNumNotificationsElement;
        "num-questionnaire-question": HTMLNumQuestionnaireQuestionElement;
        "num-questionnaire-tree": HTMLNumQuestionnaireTreeElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
        "history"?: RouterHistory;
    }
    interface NumContainerAuthenticate {
    }
    interface NumContainerDashboard {
    }
    interface NumContainerQuestionnaire {
    }
    interface NumContainerWelcome {
    }
    interface NumNotification {
        "action"?: () => void;
        "actionKey": string;
        "close": () => void;
        "messageKey": string;
        "messageOptions"?: { [key: string]: any };
        "severity": NotificationSeverity;
    }
    interface NumNotifications {
    }
    interface NumQuestionnaireQuestion {
        "onSwitchDisplayMode"?: (event: CustomEvent<any>) => void;
    }
    interface NumQuestionnaireTree {
        "onSwitchDisplayMode"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "num-container-authenticate": NumContainerAuthenticate;
        "num-container-dashboard": NumContainerDashboard;
        "num-container-questionnaire": NumContainerQuestionnaire;
        "num-container-welcome": NumContainerWelcome;
        "num-notification": NumNotification;
        "num-notifications": NumNotifications;
        "num-questionnaire-question": NumQuestionnaireQuestion;
        "num-questionnaire-tree": NumQuestionnaireTree;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "num-container-authenticate": LocalJSX.NumContainerAuthenticate & JSXBase.HTMLAttributes<HTMLNumContainerAuthenticateElement>;
            "num-container-dashboard": LocalJSX.NumContainerDashboard & JSXBase.HTMLAttributes<HTMLNumContainerDashboardElement>;
            "num-container-questionnaire": LocalJSX.NumContainerQuestionnaire & JSXBase.HTMLAttributes<HTMLNumContainerQuestionnaireElement>;
            "num-container-welcome": LocalJSX.NumContainerWelcome & JSXBase.HTMLAttributes<HTMLNumContainerWelcomeElement>;
            "num-notification": LocalJSX.NumNotification & JSXBase.HTMLAttributes<HTMLNumNotificationElement>;
            "num-notifications": LocalJSX.NumNotifications & JSXBase.HTMLAttributes<HTMLNumNotificationsElement>;
            "num-questionnaire-question": LocalJSX.NumQuestionnaireQuestion & JSXBase.HTMLAttributes<HTMLNumQuestionnaireQuestionElement>;
            "num-questionnaire-tree": LocalJSX.NumQuestionnaireTree & JSXBase.HTMLAttributes<HTMLNumQuestionnaireTreeElement>;
        }
    }
}
