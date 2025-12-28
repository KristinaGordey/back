export default {
  routes: [
    {
      method: 'POST',
      path: '/articles/:id/view',
      handler: 'article.incrementViews',
	  config: {
        auth: false,
      },
    },
	{
      method: 'GET',
      path: '/articles/popular',
      handler: 'article.popular',
      config: { 
		auth: false 
		},
    },
  ],
};
