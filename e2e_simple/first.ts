import { ui5Fixture, ui5Test, ui5, ui5TraceMismatchType, ui5Action } from "ui5-testcafe-selector-utils";

ui5Fixture("Startseite", "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");

ui5Test('Product-Demo', async (u, t) => {
    await u.typeText(ui5().id("homeView--searchField"), "Flat Basic");
    await u.expect(ui5().id("homeView--productList")).tableLength().equal(1);
    await u.expectProperty(ui5().element('sap.m.ObjectNumber').context('ProductId', 'HT-1035'), "number").equal("399,00")
}); 