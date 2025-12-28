/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::article.article",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;

            const entity = await strapi.entityService.findOne(
                "api::article.article",
                id,
                {
                    populate: ["coverImage", "category", "user"],
                }
            );

            await strapi.entityService.update("api::article.article", id, {
                data: {
                    views: (entity.views || 0) + 1,
                },
            });

            entity.views = (entity.views || 0) + 1;

            return this.transformResponse(entity);
        },
        async create(ctx) {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized("Вы не авторизованы");
            }

            ctx.request.body.data.user = user.id;

            return await super.create(ctx);
        },
        async delete(ctx) {
            const { id } = ctx.params;
            const user = ctx.state.user;

            const article = (await strapi.entityService.findOne(
                "api::article.article",
                id,
                {
                    populate: ["user"],
                }
            )) as any;

            if (!article) {
                return ctx.notFound("Статья не найдена");
            }

            if (article.user?.id !== user.id) {
                return ctx.forbidden("Вы не можете удалить чужую статью");
            }

            const deleted = await strapi.entityService.delete(
                "api::article.article",
                id
            );
            return this.transformResponse(deleted);
        },
    })
);
