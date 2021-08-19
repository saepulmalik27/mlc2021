const path = require('path');

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  siteMetadata: {
    title: `Mandiri Learning Carnival`,
    description: `Mandiri Learning Carnival 2021`,
    image: `https://cdn.inspigo.id/public/mlc2021/Illu/logo_mlc.png`,
    author: `Inspigo Team`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        components: path.join(__dirname, 'src/components'),
        sections : path.join(__dirname, 'src/sections'),
        content : path.join(__dirname,'content')
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
          id: "GTM-M7PSV69", 
          includeInDevelopment: false,
          routeChangeEventName: "route-change"
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mandiri Learning Carnival`,
        short_name: `MLC`,
        start_url: `/`,
        background_color: `#29AAE3`,
        theme_color: `#29AAE3`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
