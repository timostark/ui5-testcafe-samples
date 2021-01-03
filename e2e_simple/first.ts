import { ui5Fixture, ui5Test, ui5, ui5TraceMismatchType, ui5Action } from "ui5-testcafe-selector-utils";

ui5Fixture("Startseite", "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");

ui5Test('Product-Demo', async u => {
    await u.typeText(ui5().id("homeView--searchField"), "Flat Basic").
        expect(ui5().id("homeView--productList")).tableLength().equal(1);

    const objectNumber = ui5().element('sap.m.ObjectNumber').context('ProductId', 'HT-1035');
    await u.expectProperty(objectNumber, "number").equal("399,00");
    await u.click(objectNumber);
}); 