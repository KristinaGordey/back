import category from "../src/api/category/controllers/category";

export default {
    slugger: {
        enabled: true,
        config: {
            slugConfig: {
                article: { sourceField: "title", slugField: "slug" },
                category: { sourceField: "name", slugField: "slug" },
            },
        },
    },
};
