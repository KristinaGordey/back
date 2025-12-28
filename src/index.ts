import type { Core } from "@strapi/strapi";
import readingTime from "reading-time";

export default {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register(/* { strapi }: { strapi: Core.Strapi } */) {},

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap({ strapi }: { strapi: Core.Strapi }) {
        strapi.db.lifecycles.subscribe({
            models: ["api::article.article"],
            async beforeCreate(event: any) {
                const { data } = event.params;

                if (data.content) {
                    const stats = readingTime(data.content as string);
                    data.readingTime = Math.ceil(stats.minutes);
                }
            },
            async beforeUpdate(event: any) {
                const { data } = event.params;
                if (data.content) {
                    const stats = readingTime(data.content as string);
                    data.readingTime = Math.ceil(stats.minutes);
                }
            },
        });
    },
};
