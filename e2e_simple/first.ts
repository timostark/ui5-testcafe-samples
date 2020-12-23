import { ui5Fixture, ui5Test, ui5 } from "ui5-testcafe-selector-utils";

ui5Fixture("Startseite", "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");

ui5Test('Product-Demo', async u => {
    await u.typeText(ui5().id("homeView--searchField"), "Flat Basic");
    await u.expect(ui5().id("homeView--productList")).tableLength().equal(1);
}); 