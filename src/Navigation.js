export default {
  items: [
    {
      name: "Home",
      url: "/home",
      icon: "fa fa-home",
      adminOnly: false
    },
    {
      name: "Player Tools",
      icon: "fa fa-cog",
      adminOnly: false,
      children: [
        {
          name: "Character Generation",
          url: "/charactergeneration",
          icon: "fa fa-tasks"
        }
      ]
    },
    {
      name: "Game Master Tools",
      icon: "fa fa-cogs",
      adminOnly: true,
      children: [
        {
          name: "Books",
          url: "/books",
          icon: "fa fa-book"
        },
        {
          name: "Book Formats",
          url: "/bookformats",
          icon: "fa fa-book"
        },
        {
          name: "Games",
          url: "/games",
          icon: "fa fa-gamepad"
        },
        {
          name: "Game Systems",
          url: "/gamesystems",
          icon: "fa fa-gamepad"
        },
        {
          name: "Organizations",
          url: "/organizations",
          icon: "fa fa-sitemap"
        },
        {
          name: "Publishers",
          url: "/publishers",
          icon: "fa fa-building"
        },
        {
         name: "People",
         url: "/people",
         icon: "fa fa-users"
        },
        {
         name: "Schemas",
         url: "/schemas",
         icon: "fa fa-file"
        }
      ]
    }
  ]
};
