"use strict";
exports.__esModule = true;
var site_metadata_1 = require("@/lib/site-metadata");
function robots() {
    var baseUrl = site_metadata_1.siteMetadata.siteUrl.replace(/\/$/, "");
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/"
            },
        ],
        sitemap: [baseUrl + "/sitemap.xml"]
    };
}
exports["default"] = robots;
