import { ui5, ui5Action } from "ui5-testcafe-selector-utils";

interface CreditPaymentDetails {
    holder?: string,
    number?: string,
    cvn?: string,
    expiration?: string
}

interface AddressDetails {
    address?: string,
    city?: string,
    zip?: string,
    country?: string
}

class ProductDemo {
    readonly masterPage = {
        searchfield: ui5().id("homeView--searchField"),
        productList: ui5().id("homeView--productList"),
        productCatList: ui5().id("homeView--categoryList"),
        listEntry(productId: string) {
            return ui5().listItem().context("ProductId", productId)
        }
    }

    readonly detailPage = {
        addToCartButton: ui5().button().bindingPath('text', 'i18n>addToCartShort').parentId('product'),
        navtoCartButton: ui5().element('sap.m.ToggleButton').property('icon', 'sap-icon://cart').parentId('product')
    }

    readonly cardPage = {
        items: ui5().id('cartView--entryList'),
        proceedButton: ui5().id('cartView--proceedButton')
    }

    readonly checkoutView = {
        items: ui5().id('checkoutView--entryList'),
        nextStepButton: ui5().id('checkoutView--contentsStep-nextButton'),
    }

    readonly paymentView = {
        nextStepButton: ui5().id('checkoutView--paymentTypeStep-nextButton')
    }

    readonly creditCartView = {
        holder: ui5().id('checkoutView--creditCardHolderName'),
        number: ui5().id('checkoutView--creditCardNumber'),
        cvn: ui5().id('checkoutView--creditCardSecurityNumber'),
        expiration: ui5().id('checkoutView--creditCardExpirationDate'),
        nextButton: ui5().id('checkoutView--creditCardStep-nextButton')
    }

    readonly addressView = {
        address: ui5().id('checkoutView--invoiceAddressAddress'),
        city: ui5().id('checkoutView--invoiceAddressCity'),
        zip: ui5().id('checkoutView--invoiceAddressZip'),
        country: ui5().id('checkoutView--invoiceAddressCountry'),
        nextButton: ui5().id('checkoutView--invoiceStep-nextButton')
    }

    readonly deliveryView = {
        nextButton: ui5().id('checkoutView--deliveryTypeStep-nextButton')
    }

    readonly submitView = {
        submitButton: ui5().id('checkoutView--submitOrder'),
        confirm: ui5().button().property('text', 'Ja').parentElementName('sap.m.Dialog')
    }

    readonly completedView = {
        confText: ui5().element('sap.m.FormattedText').parentId('orderCompletedView')
    }

    async addToShoppingCart(productDescr: string, productId: string) {
        await ui5Action.expect(this.masterPage.productCatList).tableLength().greater(0, "Initially the product-list must be filled");
        await ui5Action.typeText(this.masterPage.searchfield, "Flat Basic", { replace: true }).
            click(this.masterPage.listEntry("HT-1035")).
            click(this.detailPage.addToCartButton);
    }

    async maintainCreditCart(details: CreditPaymentDetails) {
        if (details.holder) {
            await ui5Action.typeText(this.creditCartView.holder, details.holder, { replace: true, confirm: true });
        }

        if (details.number) {
            await ui5Action.typeText(this.creditCartView.number, details.number, { replace: true, confirm: true });
        }

        if (details.cvn) {
            await ui5Action.typeText(this.creditCartView.cvn, details.cvn, { replace: true, confirm: true });
        }

        if (details.expiration) {
            await ui5Action.typeText(this.creditCartView.expiration, details.expiration, { replace: true, confirm: true });
        }
    }

    async maintainAddress(details: AddressDetails) {
        if (details.address) {
            await ui5Action.typeText(this.addressView.address, details.address, { replace: true, confirm: true });
        }

        if (details.city) {
            await ui5Action.typeText(this.addressView.city, details.city, { replace: true, confirm: true });
        }

        if (details.country) {
            await ui5Action.typeText(this.addressView.country, details.country, { replace: true, confirm: true });
        }

        if (details.zip) {
            await ui5Action.typeText(this.addressView.zip, details.zip, { replace: true, confirm: true });
        }
    }
};

export default new ProductDemo();