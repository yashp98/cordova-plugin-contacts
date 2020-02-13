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
import PermissionAlert from '../../helpers/PermissionAlert';
import nativeContactList from '../../screenobjects/ContactsScreen';
import * as ContactsScreen from '../../screenobjects/ContactsScreen';

describe('[TestSuite, Description("Add Contact and find it")]', () => {

    beforeAll(() => {

        browser.reset();

        // Wait for webview to load
        Context.waitForWebViewContextLoaded();

        // Switch the context to WEBVIEW
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Wait for Home Screen
        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

    });

    xit('[Test, Description("1. Add contact with all parameters, find test and delete"), Priority="P0"]', () => {

        // Enter Add Contact Screen
        const addContactScreenButton = ContactsScreen.getAddContactScreen();
        addContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactScreenButton.click();

        // Wait for Add Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.ADD_CONTACT);

        // Setup of the test
        const setupContactButton = ContactsScreen.SetupContactAllParameters();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Test: click to create the contact
        const addContactButton = ContactsScreen.getAddContactButton();
        addContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton.click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowPermissionIfNeeded(true);

        // The expected result is for the contact to be created (message text = true)
        const successCard = ContactsScreen.getSuccessCard();
        successCard.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        const successMessageAddText = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText).toEqual('Contact successfully added.');

        backToHomeScreen();

        const removeContactScreenButton = ContactsScreen.getRemoveContactScreen();
        removeContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        removeContactScreenButton.click();

        waitForScreen(ContactsScreen.SCREENTITLES.REMOVE_SCREEN);

        const setupFindContactToRemove = ContactsScreen.setupNameRemove();
        setupFindContactToRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        setupFindContactToRemove.click();

        const findContactButton = ContactsScreen.getFindContactButton();
        findContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // findContactButton.scrollIntoView();
        findContactButton.click();

        const contactListItem = ContactsScreen.getContactList();
        const contactListItemText = ContactsScreen.getContactList().getText();
        contactListItem.waitForDisplayed(DEFAULT_TIMEOUT);
        // contactListItem.scrollIntoView();
        expect(contactListItemText).toContain('Test app - Name1 Last1');
        contactListItem.click();

        const removeButton = ContactsScreen.getRemoveContactButton();
        removeButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // removeButton.scrollIntoView();
        removeButton.click();

        const successMessageRemove = ContactsScreen.getSuccessMessage();
        const successMessageRemoveText = ContactsScreen.getSuccessMessage().getText();
        successMessageRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();
        expect(successMessageRemoveText).toEqual('Removed successfully!');

        const successPopup = ContactsScreen.getMessagePopup();
        if (successPopup.isDisplayed()) {
            successPopup.click();
}

    });

    xit('[Test, Description("2. Add contact with different number"), Priority="P2"]', () => {

        // Back To Home Screen
        backToHomeScreen();

        // Enter Add Contact Screen
        const addContactScreenButton = ContactsScreen.getAddContactScreen();
        addContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactScreenButton.click();

        // Wait for Add Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.ADD_CONTACT);

        // ______________ SETUP 1________________
        const setupContactButton1 = ContactsScreen.SetupContactAllParameters();
        setupContactButton1.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton1.click();

        // Test: click to create the contact
        const addContactButton1 = ContactsScreen.getAddContactButton();
        addContactButton1.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton1.click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowPermissionIfNeeded(true);

        // The expected result is for the contact to be created (message text = true)
        const successCard1 = ContactsScreen.getSuccessCard();
        successCard1.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        const successMessageAddText1 = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText1).toEqual('Contact successfully added.');

        // ______________SETUP 2________________
        const setupContactButton2 = ContactsScreen.SetupContactDifferentPhone();
        setupContactButton2.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton2.click();

        // Test: click to create the contact
        const addContactButton2 = ContactsScreen.getAddContactButton();
        addContactButton2.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton2.click();

        // The expected result is for the contact to be created (message text = true)
        const successCard2 = ContactsScreen.getSuccessCard();
        successCard2.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        const successMessageAddText2 = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText2).toEqual('Contact successfully added.');

    });

    xit('[Test, Description("3. Find Contact by First Name"), Priority="P0"]', () => {

        // Back To Home Screen
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
        allowPermissionIfNeeded(true);

        // Wait for the list to be displayed and click in the first result
        const findContactResultList = ContactsScreen.getFindContactResultList();
        findContactResultList.waitForDisplayed(DEFAULT_TIMEOUT);
        // findContactResultList.scrollIntoView();
        findContactResultList.click();

        // Validate all the information in the contact
        waitForScreen(ContactsScreen.SCREENTITLES.DETAIL_SCREEN);
        ContactsScreen.getValidateFirstName().waitForDisplayed(DEFAULT_TIMEOUT);
        expect(ContactsScreen.getValidateFirstName().getText()).toEqual('Test app - Name1');
        expect(ContactsScreen.getValidateLastName().getText()).toEqual('Last1');
        if (browser.isAndroid) {
            expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351000000000');
            expect(ContactsScreen.getValidatePhoneNumber2().getText()).toEqual('+351111111111');
        } else {
            expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351111111111');
        }
        expect(ContactsScreen.getValidateEmail().getText()).toEqual('email1@outsystems.com');

        // Click Back to previous screen
        backPreviousScreen();
        waitForScreen(ContactsScreen.SCREENTITLES.FIND_CONTACT);

    });

    // TODO
    it('[Test, Description("4. Pick Contact by First Name"), Priority="P0"]', () => {

        // Back To Home Screen
        backToHomeScreen();

        // Enter Add Contact Screen
        const addContactScreenButton = ContactsScreen.getAddContactScreen();
        addContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactScreenButton.click();

        // Wait for Add Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.ADD_CONTACT);

        // Setup of the test
        const setupContactButton = ContactsScreen.SetupContactAllParameters();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Test: click to create the contact
        const addContactButton = ContactsScreen.getAddContactButton();
        addContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton.click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowPermissionIfNeeded(true);

        // The expected result is for the contact to be created (message text = true)
        const successCardAdd = ContactsScreen.getSuccessCard();
        successCardAdd.waitForDisplayed(DEFAULT_TIMEOUT);
        // successCard.scrollIntoView();

        // Back To Home Screen
        backToHomeScreen();

        // Enter Pind Contact Screen
        const pickContactScreenButton = ContactsScreen.getPickContactScreen();
        pickContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        pickContactScreenButton.click();

        // Go to Pick Contact screen
        waitForScreen(ContactsScreen.SCREENTITLES.PICK_CONTACT);

        // Setup of the test
        /*const setupContactButton = ContactsScreen.SetupFindFirstName();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();*/

        // Test: click to pick the contact
        const pickContactButton = ContactsScreen.getPickContactButton();
        pickContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        // pickContactButton.scrollIntoView();
        pickContactButton.click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowPermissionIfNeeded(true);

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        // const findNativeContactList = nativeContactList.findNativeContactList(browser);
        // findNativeContactList.waitForDisplayed(DEFAULT_TIMEOUT);

        // const getNativeContact = nativeContactList.nativeContact(browser);
        // getNativeContact.waitForDisplayed(DEFAULT_TIMEOUT);
        nativeContactList.nativeContact(browser).scrollIntoView();
        nativeContactList.clickNativeContact(browser);

        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Validate all the information in the contact
        waitForScreen(ContactsScreen.SCREENTITLES.DETAIL_SCREEN);

        ContactsScreen.getValidateFirstName().waitForDisplayed(DEFAULT_TIMEOUT);
        expect(ContactsScreen.getValidateFirstName().getText()).toEqual('Test app - Name1');
        expect(ContactsScreen.getValidateLastName().getText()).toEqual('Last1');
        expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351000000000');
        expect(ContactsScreen.getValidateEmail().getText()).toEqual('email1@outsystems.com');

        const removeButton = ContactsScreen.getRemoveContactButton();
        removeButton.waitForDisplayed(DEFAULT_TIMEOUT);
        removeButton.click();

        const successCardRemove = ContactsScreen.getSuccessCard();
        const successCardRemoveText = ContactsScreen.getSuccessCard().getText();
        successCardRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        expect (successCardRemoveText).toContain('Removed successfully!');

        const successPopup = ContactsScreen.getMessagePopup();
        if (successPopup.isDisplayed()) {
            successPopup.click();
}

    });

    // xit('[Test, Description("5. Remove contact"), Priority="P0"]', () => {

    // });

    /**
     * UTILS
     */
    const allowPermissionIfNeeded = (allow: boolean) => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (PermissionAlert.isShown(browser)) {
            PermissionAlert.allowPermission(allow, browser);
            // PermissionAlert.waitForIsShown(false, browser);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
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
