import { ui5, ui5Fixture, ui5Launchpad, ui5Test } from "ui5-testcafe-selector-utils";
import productDemo from "../pages/productDemo";

ui5Fixture('Startseite', "SAP", "https://localhost:8443/index.html");

ui5Test('Product-Demo', 'Testcase-1', async u => {
    await u.expect(productDemo.masterPage.productCatList).tableLength().greater(0, "Initially the product-list must be filled");

    await u.typeText(productDemo.masterPage.searchfield, "Flat Basic");

    const data = await productDemo.masterPage.productList.data();

    await u.expectValue(data.tableData.data[0].ProductId).equal('HT-1035', "There is only one product with Flat-Basic - this should be found");
    await u.expectElement(productDemo.masterPage.productList, (e) => e.tableData.data[0].ProductId).equal("HT-1035");
    await u.expect(productDemo.masterPage.productList).tableLength().equal(1);
}); 