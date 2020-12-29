import { ui5, ui5Fixture, ui5Test } from "ui5-testcafe-selector-utils";
import productDemo from "../pages/productDemo";

ui5Fixture("Shop-App", "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");

ui5Test('Create and Order Shopping-Cart', async u => {
    //add HT-1035 to shopping-cart
    await productDemo.addToShoppingCart("Flat Basic", "HT-1035");

    //navigate to cart / checkout section
    await u.click(productDemo.detailPage.navtoCartButton);
    await u.expect(productDemo.cardPage.items).tableLength().equal(1);
    await u.click(productDemo.cardPage.proceedButton);

    //validate shopping-basket and navigate to payment
    await u.expect(productDemo.checkoutView.items).tableLength().equal(1);
    await u.click(productDemo.checkoutView.nextStepButton).
        click(productDemo.paymentView.nextStepButton);

    //maintain payment -> at least once enter incorrect information
    await productDemo.maintainCreditCart({ holder: "Max Mustermann", number: "1234", cvn: "123", expiration: "10/2022" });
    await u.expect(productDemo.creditCartView.number).property('valueState').equal('Error');
    await u.expectExists(productDemo.creditCartView.nextButton).notOK();
    await productDemo.maintainCreditCart({ number: "1234567891234567" });
    await u.expect(productDemo.creditCartView.number).property('valueState').equal('None');
    await u.click(productDemo.creditCartView.nextButton);

    //maintain address
    await productDemo.maintainAddress({ address: "Address", city: "Munich", country: "Germany", zip: "12345" });
    await u.click(productDemo.addressView.nextButton);

    await u.click(productDemo.deliveryView.nextButton);

    await u.click(productDemo.submitView.submitButton).
        click(productDemo.submitView.confirm);

    await u.expect(productDemo.completedView.confText).exists().ok();
}); 