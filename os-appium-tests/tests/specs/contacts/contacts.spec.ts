/*
After each test scenario (or each suite of tests), the test should have a teardown where all contacts created are deleted
However, this one doesn't have teardown, because the plugin can't delete contacts and, with appium, we can't access the native contacts and delete them

Leaving the contacts after each test could have impact in the result of the remaining tests and, in the worst scenario, lead to false positives.
We should be careful while creating new contacts and new tests to not overlay with the already existent contacts.
For example, new contacts created should have a different name than the already existent ones.
*/

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
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.reset();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

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

        // Reset application and go back to the homepage
        browser.reset();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

    });

    it('[Test, Description("2. Deny permission"), Priority="P0", ID="CO0004"]', () => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.reset();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

        const pickContactScreenButton = ContactsScreen.getPickContactScreen();
        pickContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        pickContactScreenButton.click();

        // Go to Pick Contact screen
        waitForScreen(ContactsScreen.SCREENTITLES.PICK_CONTACT);

        const pickContactButton = ContactsScreen.getPickContactButton();
        pickContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // pickContactButton.scrollIntoView();
        pickContactButton.click();

        // Click Deny in permission
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        const permissionAlert = PermissionAlert.getPermissionDialog(browser);
        permissionAlert.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(permissionAlert.isDisplayed());
        PermissionAlert.okPermission(false, browser);

        // Check if error message is received
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        const messagePopUp = ContactsScreen.getMessagePopup();
        expect(messagePopUp.isDisplayed());
        expect(messagePopUp.getText()).toContain('ErrorMessage: Could not pick contact');

        // Reset application and go back to the homepage
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.reset();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

    });

    it('[Test, Description("3. Add contact with all parameters and Remove contact"), Priority="P0", ID="CO0005"]', () => {
        backToHomeScreen();

        addContact();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowOkPermissionIfNeeded(true);

        // The expected result is for the contact to be created (message text = true)
        const successAddCard = ContactsScreen.getSuccessCard();
        successAddCard.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        const successMessageAddText = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText).toEqual('Contact successfully added.');

        backToHomeScreen();

        removeContact(true);

        const successMessageRemove = ContactsScreen.getSuccessMessage();
        const successMessageRemoveText = ContactsScreen.getSuccessMessage().getText();
        successMessageRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        expect(successMessageRemoveText).toEqual('Removed successfully!');

    });

    it('[Test, Description("4. Find Contact"), Priority="P0", ID="CO0012"]', () => {

        // Back To Home Screen
        backToHomeScreen();

        addContact();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowOkPermissionIfNeeded(true);

        // The expected result is for the contact to be created (message text = true)
        const successAddCard = ContactsScreen.getSuccessCard();
        successAddCard.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        const successMessageAddText = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText).toEqual('Contact successfully added.');

        backToHomeScreen();

        // Enter Find Contact Screen
        const findContactScreenButton = ContactsScreen.getFindContactScreen();
        findContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactScreenButton.click();

        // Go to Find Contact screen
        waitForScreen(ContactsScreen.SCREENTITLES.FIND_CONTACT);

        // Setup of the test
        const setupContactButton = ContactsScreen.SetupFindFirstName();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Test: click to find the contact
        const findContactButton = ContactsScreen.getFindContactButton();
        findContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // findContactButton.scrollIntoView();
        findContactButton.click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowOkPermissionIfNeeded(true);

        // Wait for the list to be displayed and click in the first result
        const findContactResultList = ContactsScreen.getFindContactResultList();
        findContactResultList.waitForDisplayed(DEFAULT_TIMEOUT);
        // findContactResultList.scrollIntoView();
        findContactResultList.click();

        // Validate all the information in the contact
        waitForScreen(ContactsScreen.SCREENTITLES.DETAIL_SCREEN);

        const findFirstName = ContactsScreen.getValidateFirstName();
        const findLastName = ContactsScreen.getValidateLastName();
        const findPhone = ContactsScreen.getValidatePhoneNumber();
        const findEmail = ContactsScreen.getValidateEmail();

        findFirstName.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(findFirstName.getText()).toEqual('Test app - Name1');
        expect(findLastName.getText()).toEqual('Last1');
        expect(findPhone.getText()).toEqual('+351000000000');
        expect(findEmail.getText()).toEqual('email1@outsystems.com');

        // expect(ContactsScreen.getValidateFirstName().getText()).toEqual('Test app - Name1');
        // expect(ContactsScreen.getValidateLastName().getText()).toEqual('Last1');
        // expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351000000000');
        // expect(ContactsScreen.getValidateEmail().getText()).toEqual('email1@outsystems.com');

        removeContact(false);

        const successCardRemove = ContactsScreen.getSuccessCard();
        const successCardRemoveText = ContactsScreen.getSuccessCard().getText();
        successCardRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        expect (successCardRemoveText).toContain('Removed successfully!');

        const backButton = ContactsScreen.getBackButton();
        backButton.waitForDisplayed(DEFAULT_TIMEOUT);
        backButton.click();

    });

    it('[Test, Description("5. Pick Contact"), Priority="P0", ID="CO0017"]', () => {
        // Back To Home Screen
        backToHomeScreen();

        addContact();

        // Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowOkPermissionIfNeeded(true);
        // NativeAlert.pressButton('OK', browser);
        // PermissionAlert.OkPermission(true, browser);
        // Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // The expected result is for the contact to be created (message text = true)
        const successAddCard = ContactsScreen.getSuccessCard();
        successAddCard.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        const successMessageAddText = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText).toEqual('Contact successfully added.');

        // Back To Home Screen
        backToHomeScreen();

        // Enter Pind Contact Screen
        const pickContactScreenButton = ContactsScreen.getPickContactScreen();
        pickContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        pickContactScreenButton.click();

        // Go to Pick Contact screen
        waitForScreen(ContactsScreen.SCREENTITLES.PICK_CONTACT);

        // Test: click to pick the contact
        const pickContactButton = ContactsScreen.getPickContactButton();
        pickContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // pickContactButton.scrollIntoView();
        pickContactButton.click();

        allowOkPermissionIfNeeded(true);

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        expect(nativeContactList.findNativeContactList(browser).isDisplayed());

        // console.log('ines_findNativeContactList');
        // console.log(nativeContactList.findNativeContactList(browser));
        // console.log(nativeContactList.nativeContact(browser));

        nativeContactList.clickNativeContact(browser);

        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Validate all the information in the contact
        waitForScreen(ContactsScreen.SCREENTITLES.DETAIL_SCREEN);

        const findFirstName = ContactsScreen.getValidateFirstName();
        const findLastName = ContactsScreen.getValidateLastName();
        const findPhone = ContactsScreen.getValidatePhoneNumber();
        const findEmail = ContactsScreen.getValidateEmail();

        findFirstName.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(findFirstName.getText()).toEqual('Test app - Name1');
        expect(findLastName.getText()).toEqual('Last1');
        expect(findPhone.getText()).toEqual('+351000000000');
        expect(findEmail.getText()).toEqual('email1@outsystems.com');

        removeContact(false);

        const successCardRemove = ContactsScreen.getSuccessCard();
        const successCardRemoveText = ContactsScreen.getSuccessCard().getText();
        successCardRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        expect (successCardRemoveText).toContain('Removed successfully!');

        const backButton = ContactsScreen.getBackButton();
        backButton.waitForDisplayed(DEFAULT_TIMEOUT);
        backButton.click();
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
