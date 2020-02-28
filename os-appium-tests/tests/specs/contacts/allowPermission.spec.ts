// Import constants and classes needed
import 'jasmine';
import { DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL } from '../../constants';
import * as Context from '../../helpers/Context';
import Gestures from '../../helpers/Gestures';
import PermissionAlert from '../../helpers/PermissionAlert';
// import nativeContactList from '../../screenobjects/ContactsScreen';
import nativeContactList, * as ContactsScreen from '../../screenobjects/ContactsScreen';

describe('[TestSuite, Description("Add Contact and find it")]', () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;

    beforeAll(() => {
        // Wait for webview to load
        Context.waitForNativeContextLoaded();
        Context.waitForWebViewContextLoaded();

        // Switch the context to WEBVIEW
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Wait for Home Screen
        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

        // Switch the context to NATIVE
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (browser.isIOS) {
            browser.pause(3000);
            allowPermissionIfNeeded(true);
        }

        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

    });

    it('[Test, Description("1. Allow permission"), Priority="P0", ID="CO0002 + CO0003"]', () => {

        // Reset the device
        // Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        // browser.reset();
        // Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // **************************** TESTE ****************************

        // Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        // if (browser.isAndroid) {
        //     browser.reset();
        // } else {
        //     browser.removeApp('com.outsystems.rd.ContactsSampleApp', 'com.outsystems.rd.ContactsSampleApp');
        //     browser.installApp();
        // }

        // browser.removeApp();
        // installApp(appPath: string): undefined;
        // removeApp(appId: string[], bundleId: string[]): undefined;

        // **************************** TESTE ****************************

        // Wait for homepage
        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

        // Go to Pick Contact screen
        const pickContactScreenButton = ContactsScreen.getPickContactScreen();
        pickContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        pickContactScreenButton.click();

        // Wait for Pick Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.PICK_CONTACT);

        // Wait for the button "Pick" to appear and click on it
        const pickContactButton = ContactsScreen.getPickContactButton();
        pickContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        pickContactButton.click();

        // Click Allow/Ok in permission
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        const permissionAlert = PermissionAlert.getPermissionDialog(browser);
        permissionAlert.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(permissionAlert.isDisplayed());
        PermissionAlert.okPermission(true, browser);

        // Expect device to open the native Contacts Screen
        expect(nativeContactList.findNativeContactList(browser).isDisplayed());

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.closeApp();

        // Reset application and go back to the homepage
        // browser.reset();
        // Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        // waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

    });

    /**
     * UTILS
     */

    const allowPermissionIfNeeded = (allow: boolean) => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (PermissionAlert.isShown(browser) === true) {
            PermissionAlert.allowPermission(allow, browser);
            // PermissionAlert.waitForIsShown(false, browser);
            console.log('Ines: clicou');
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    };

    const allowOkPermissionIfNeeded = (allow: boolean) => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (PermissionAlert.isShown(browser)) {
            PermissionAlert.okPermission(allow, browser);
            // PermissionAlert.waitForIsShown(false, browser);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    };

    const addContact = () => {
        // Starting from Homepage, enter Contact Screen
        const addContactScreenButton = ContactsScreen.getAddContactScreen();
        addContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactScreenButton.click();

        // Wait for Add Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.ADD_CONTACT);

        // Fill the contact parameters
        const setupContactButton = ContactsScreen.SetupContactAllParameters();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Click to create the contact
        const addContactButton = ContactsScreen.getAddContactButton();
        addContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton.click();
    };

    const removeContact = (Homepage: boolean) => {

        // Homepage = true, if the user is in the Homepage and wants to go to Remove Contact Screen
        // Homepage = false, if the user is in Contact Details Screen, where the contact is already selected

        if (Homepage) {

        // Enter remove contact screen
        const removeContactScreenButton = ContactsScreen.getRemoveContactScreen();
        removeContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        removeContactScreenButton.click();

        waitForScreen(ContactsScreen.SCREENTITLES.REMOVE_SCREEN);

        // Find contact to remove
        const setupFindContactToRemove = ContactsScreen.setupNameRemove();
        setupFindContactToRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        setupFindContactToRemove.click();

        const findContactButton = ContactsScreen.getFindContactButton();
        findContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // findContactButton.scrollIntoView();
        findContactButton.click();

        // Click in the contact, on the finding list
        const contactListItem = ContactsScreen.getContactList();
        const contactListItemText = ContactsScreen.getContactList().getText();
        contactListItem.waitForDisplayed(DEFAULT_TIMEOUT);
        // contactListItem.scrollIntoView();
        expect(contactListItemText).toContain('Test app - Name1 Last1');
        contactListItem.click();

        // Remove contact
        const removeButton = ContactsScreen.getRemoveContactButton();
        removeButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // removeButton.scrollIntoView();
        removeButton.click();

        } else {
            const removeButton = ContactsScreen.getRemoveContactButton();
            removeButton.waitForDisplayed(DEFAULT_TIMEOUT);
            removeButton.click();
        }

    };

    const waitForScreen = (title: string) => {
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);
        const screenTitle: string = ContactsScreen.getTitle().getText();
        expect(screenTitle).toContain(title);
    };

    const backPreviousScreen = () => {
        const backButton = ContactsScreen.getBackButton();
        backButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // if (!backButton.isDisplayedInViewport()) {
        //     backButton.scrollIntoView();
        // }
        backButton.click();
    };

    const backToHomeScreen = () => {
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        // const successPopup = ContactsScreen.getMessagePopup();
        // if (successPopup.isDisplayed()) {
        //     successPopup.click();
        // }

        const menuButton = ContactsScreen.getAppMenu();
        menuButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // if (!menuButton.isDisplayedInViewport()) {
        //     menuButton.scrollIntoView();
        // }
        menuButton.click();

        const menuList = ContactsScreen.getHomeScreenMenuEntry();
        menuList.waitForDisplayed(DEFAULT_TIMEOUT);
        menuList.click();

        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);
    };
});
