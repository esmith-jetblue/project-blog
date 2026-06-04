const rss = require("rss");
const fs = require("fs/promises");
const path = require("path");

const fileHelpers = require("../src/helpers/file-helpers");
const constants = require("../src/constants");

// TODO: make dynamic based on some configuration
const URL = "http://localhost:3000";

async function buildRss() {
  const feed = new rss({
    title: constants.BLOG_TITLE,
    description: constants.BLOB_DESCRIPTION,
    generator: "https://www.npmjs.com/package/rss",
    feed_url: `${URL}/rss.xml`,
    site_url: URL,
    image_url: `${URL}/favicon.ico`,
    managingEditor: "esmith-jetblue",
    webMaster: "esmith-jetblue",
    copyright: `Copyright ${new Date().getFullYear()} ${constants.BLOG_TITLE}`,
    language: "en-US",
    categories: ["Software Engineering", "Programming", "Technology"],
    pubDate: new Date(),
    ttl: Infinity,
  });

  const blogPosts = await fileHelpers.getBlogPostList();

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `${URL}/${post.slug}`,
      guid: post.slug,
      date: post.date,
      author: "Josh W Comeau",
    });
  });

  const xml = feed.xml({ indent: true });

  await fs.writeFile(path.join(process.cwd(), "/public/rss.xml"), xml, "utf8");
}

buildRss().catch((err) => {
  console.error("Error building RSS feed: ", err);
  process.exit(1);
});
