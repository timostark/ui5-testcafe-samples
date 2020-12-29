import { ui5Fixture, ui5Test } from "ui5-testcafe-selector-utils";
import productDemo from "../pages/productDemo";

ui5Fixture("Startseite", "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");

ui5Test('Product-Demo', async u => {
    await u.expect(productDemo.masterPage.productCatList).tableLength().greater(0, "Initially the product-list must be filled");

    await u.typeText(productDemo.masterPage.searchfield, "Flat Basic");

    const data = await productDemo.masterPage.productList.data();

    await u.expectAny(data.tableData.data[0].ProductId).equal('HT-1035', "There is only one product with Flat-Basic - this should be found");
    await u.expect(productDemo.masterPage.productList).dynamic((e) => e.tableData.data[0].ProductId).equal("HT-1035");
    await u.expect(productDemo.masterPage.productList).tableLength().equal(1);
}); 