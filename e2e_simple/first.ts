import { ui5Fixture, ui5Test, ui5, ui5TraceMismatchType, ui5Action } from "ui5-testcafe-selector-utils";

ui5Fixture("Startseite", "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");

ui5Test('Product-Demo', async (u, t) => {
    await u.typeText(ui5().id("homeView--searchField"), "Flat Basic");

    await u.expect(ui5().element('sap.m.ObjectNumber').context('ProductId', 'HT-1035')).property("number").equal("399,00");

    await u.click(ui5().element('sap.m.ObjectNumber').context('ProductId', 'HT-1035'));

    const button = ui5().button().bindingPath('text', 'i18n>addToCartShort').parentId('product');
    await u.click(button);
    const toggleButton = ui5().element('sap.m.ToggleButton').property('icon', 'sap-icon://cart');
    await u.click(toggleButton);
    const button1 = ui5().id('cartView--proceedButton');
    await u.click(button1);
}); 