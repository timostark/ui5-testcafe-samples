import { ui5 } from "ui5-testcafe-selector-utils";

class ProductDemo {
    readonly masterPage = {
        searchfield: ui5().id("homeView--searchField"),
        productList: ui5().id("homeView--productList"),
        productCatList: ui5().id("homeView--categoryList")
    }
};

export default new ProductDemo();