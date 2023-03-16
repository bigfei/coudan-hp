function filterItems(json) {
    const items = [];

    function traverse(obj) {
        if (obj !== null && typeof obj === "object") {
            Object.keys(obj).forEach(key => {
                if (key === "item" && obj[key] && typeof obj[key] === "object" && obj[key].ImgUrl) {
                    const { Id, Name, Price, Num } = obj[key];
                    items.push({ Id, Name, Price, Num });
                } else {
                    traverse(obj[key]);
                }
            });
        }
    }

    traverse(json);
    return items;
}

function getIpLoc() {

}

function getUserKey() {

}

function getCartJson() {
    let req = {
        functionId: "pcCart_jc_getCurrentCart",
        appid: "JDC_mall_cart",
        body: {
            serInfo: {
                area: getIpLoc(),
                "user-key": getUserKey()
            },
            cartExt: {
                specialId: 1
            }
        }
    }
    
}