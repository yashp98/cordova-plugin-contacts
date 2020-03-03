import {DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL} from '../constants';
import * as AndroidUtils from './android-utils';
import * as IosUtils from './ios-utils';

const SELECTORS = {
    ANDROID: {
        PERMISSION_ALLOW_BUTTON : 'id/permission_allow_button',
        PERMISSION_DENY_BUTTON: 'id/permission_deny_button',
        PERMISSION_OK_BUTTON: 'id/permission_allow_button', // equal to allow button
    },

    IOS: {
        PERMISSION_ALLOW_BUTTON: '~Allow',
        PERMISSION_DENY_BUTTON: "~Don’t Allow", // it has to have "" instead of ''
        PERMISSION_OK_BUTTON: '~OK',
    },
};

class PermissionAlert {

    /**
     * Wait for the alert to exist
     */

    public static waitForIsShown(isShown = true): void {
        if (browser.isAndroid) {
            try {
                $(SELECTORS.ANDROID.PERMISSION_ALLOW_BUTTON).waitForExist(DEFAULT_TIMEOUT, !isShown);
            } catch (err) {
                $(SELECTORS.ANDROID.PERMISSION_ALLOW_BUTTON).waitForExist(DEFAULT_TIMEOUT, !isShown);
            }
        } else {
            $(SELECTORS.IOS.PERMISSION_DENY_BUTTON).waitForExist(DEFAULT_TIMEOUT, !isShown);
        }
    }

    /**
     * Check if exists the alert
     * It checks wether the DENY button (for both iOS and Android) is there or not
     * If it's there, returns true if displayed
     * If it's not there, returns false
     */
    public static isShown(): boolean {
        const selector =  browser.isAndroid ?
            AndroidUtils.getElemByPartialId(SELECTORS.ANDROID.PERMISSION_DENY_BUTTON, false) :
            $(SELECTORS.IOS.PERMISSION_DENY_BUTTON);

        if (selector === undefined) {
            return false;
        } else {
            return selector.isDisplayed();
        }
    }

    /**
     * Allow or deny a permission request
     * @param {boolean} allow
     */

    // We are checking for the DENY button because the allow button can be OK/ALLOW in iOS, so the deny button is more accurate
    public static getPermissionDialog(): WebdriverIO.Element {
        const selector = browser.isAndroid ? SELECTORS.ANDROID.PERMISSION_DENY_BUTTON : SELECTORS.IOS.PERMISSION_DENY_BUTTON;
        return browser.isAndroid ?
            AndroidUtils.getElemByPartialId(selector, false) :
            $(selector);
    }

    public static getPermissionDialogWaitForDisplayed(): void {
        this.getPermissionDialog().waitForDisplayed(DEFAULT_TIMEOUT);
     }

     public static getPermissionDialogIsDisplayed(): void {
        this.getPermissionDialog().isDisplayed();
     }

    // There are two different permission functions: allowPermission and okPermission
    // This happens because iOS has two different permissions: ones with "OK" button, others with "ALLOW" button
    public static allowPermission(allow = true): void {
       this.getPermissionButton(allow).click();
    }

    public static getPermissionButton(allow = true): WebdriverIO.Element {
        const selectors = browser.isAndroid ? SELECTORS.ANDROID : SELECTORS.IOS;
        const buttonSelector = allow ? selectors.PERMISSION_ALLOW_BUTTON : selectors.PERMISSION_DENY_BUTTON;
        return browser.isAndroid ?
            AndroidUtils.getElemByPartialId(buttonSelector, false) :
            $(buttonSelector);
    }

    public static okPermission(allow = true): void {
        this.getPermissionOkButton(allow).click();
     }

     public static getPermissionOkButton(allow = true): WebdriverIO.Element {
        const selectors = browser.isAndroid ? SELECTORS.ANDROID : SELECTORS.IOS;
        const buttonSelector = allow ? selectors.PERMISSION_OK_BUTTON : selectors.PERMISSION_DENY_BUTTON;
        return browser.isAndroid ?
            AndroidUtils.getElemByPartialId(buttonSelector, false) :
            $(buttonSelector);
     }

    /**
     * Get the alert text
     *
     * @return {string}
     */
    public static text(): string {
        return browser.getAlertText();
    }
}

export default PermissionAlert;
