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
                    populate: [
                        "coverImage",
                        "category",
                        "users_permissions_user",
                    ],
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

            ctx.request.body.data.users_permissions_user = user.id;

            return await super.create(ctx);
        },
        async update(ctx) {
            const { id } = ctx.params;
            const user = ctx.state.user;

            const article = (await strapi.entityService.findOne(
                "api::article.article",
                id,
                { populate: ["users_permissions_user"] }
            )) as { id: number; users_permissions_user?: { id: number } };

            if (!article) return ctx.notFound("Статья не найдена");
            if (article.users_permissions_user?.id !== user.id)
                return ctx.forbidden("Вы не можете редактировать чужую статью");

            const updated = await strapi.entityService.update(
                "api::article.article",
                id,
                {
                    data: ctx.request.body.data,
                }
            );

            return this.transformResponse(updated);
        },

        async delete(ctx) {
            const { id } = ctx.params;
            const user = ctx.state.user;

            const article = (await strapi.entityService.findOne(
                "api::article.article",
                id,
                {
                    populate: ["users_permissions_user"],
                }
            )) as any;

            if (!article) {
                return ctx.notFound("Статья не найдена");
            }

            if (article.users_permissions_user?.id !== user.id) {
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
