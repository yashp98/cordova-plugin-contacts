import {DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL} from '../constants';

const SELECTORS = {
    ANDROID: {
        PERMISSION_DIALOG : '*//android.widget.LinearLayout[@resource-id="com.android.packageinstaller:id/dialog_container"]',
        PERMISSION_ALLOW_BUTTON : '*//android.widget.Button[@resource-id="com.android.packageinstaller:id/permission_allow_button"]',
        PERMISSION_DENY_BUTTON: '*//android.widget.Button[@resource-id="com.android.packageinstaller:id/permission_deny_button"]'    
    },

    IOS: {
        PERMISSION_DIALOG: '*//XCUIElementTypeAlert',
    },
};

class PermissionAlert {

    /**
     * Wait for the alert to exist
     */
    public static waitForIsShown(isShown = true, driver): void {
        const selector = driver.isAndroid ? SELECTORS.ANDROID.PERMISSION_DIALOG : SELECTORS.IOS.PERMISSION_DIALOG;
        $(selector).waitForExist(DEFAULT_TIMEOUT, !isShown); 
    }

    /**
     * Check if exists the alert
     */
    public static isShown(isShown = true, driver): boolean {
        const selector = driver.isAndroid ? SELECTORS.ANDROID.PERMISSION_DIALOG : SELECTORS.IOS.PERMISSION_DIALOG;
        return $(selector).isDisplayed();
    }

 
    public static allowPermission(allow = true, driver): void {
        
        let buttonSelector = undefined;
        if(driver.isAndroid){
            buttonSelector = allow ? SELECTORS.ANDROID.PERMISSION_ALLOW_BUTTON : SELECTORS.ANDROID.PERMISSION_DENY_BUTTON;
        }
        else{
            buttonSelector = undefined; // TODO
        }

        const permissionButton = $(buttonSelector);

        permissionButton.click();
    }


    /**
     * Get the alert text
     *
     * @return {string}
     */
    public static text(driver): string {
        return driver.getAlertText();
    }
}

export default PermissionAlert;
