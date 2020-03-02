// Import constants and classes needed
import 'jasmine';
import { DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL } from '../../constants';
import * as Context from '../../helpers/context';
import PermissionAlert from '../../helpers/permission-alert';
import nativeContactList, * as ContactsScreen from '../../screen-objects/contacts-screen';

describe('[TestSuite, Description("Add Contact and find it")]', () => {

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

        allowOkPermissionIfNeeded(true);

        const successAddCard = ContactsScreen.getSuccessCard();
        successAddCard.waitForDisplayed(DEFAULT_TIMEOUT);

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
        pickContactButton.click();

        allowOkPermissionIfNeeded(true);

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        expect(nativeContactList.findNativeContactList(browser).isDisplayed());

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

    afterAll(() => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.closeApp();
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
