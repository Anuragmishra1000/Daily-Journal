//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
let posts = [];

const homeStartingContent = "Welcome to DAILY JOURNAL! Express Yourself,Certainly! Share Your Stories, and Connect with a Community of Creativity. [Your Blog Name] is a platform dedicated to empowering individuals to freely express themselves, unleash their creativity, and connect with like-minded individuals from around the world. Whether you're a seasoned writer, an aspiring poet, a passionate photographer, or simply someone with a story to share, this is the place for you. Join our community and enjoy the freedom of expression as you write captivating articles, share insightful opinions, showcase your photography, or publish your own short stories or poetry. Connect with others, engage in conversations, and find inspiration in a safe and inclusive space. Sign up now and let your ideas take flight in a space where every voice is valued and every story matters. ";
const aboutContent = "Welcome to our blog! We are a vibrant community of passionate individuals who believe in the power of words and the freedom of expression. Our blog is a space where you can unleash your creativity and share your thoughts with the world. Whether you're an aspiring writer, a seasoned expert, or simply someone with a story to tell, this platform is for you. At our blog, we embrace diversity and encourage a wide range of topics and perspectives. We believe that everyone has a unique voice and something valuable to contribute. From personal anecdotes to informative articles, thought-provoking essays to entertaining stories, we celebrate the richness and diversity of human experiences. Our team is dedicated to curating a platform that fosters meaningful connections and inspires intellectual growth. We value authenticity, honesty, and respect, and we strive to create a safe and inclusive environment for all our readers and contributors. We believe in the power of dialogue and aim to cultivate thoughtful discussions through our comment sections, where ideas can be exchanged, perspectives can be challenged, and new insights can be gained. We also understand the importance of staying informed and up-to-date in this rapidly evolving world. Our blog covers a wide range of topics, including but not limited to technology, arts, culture, science, lifestyle, and current events. We aim to provide informative and engaging content that not only entertains but also educates our readers. As a contributor, you have the freedom to express yourself without limitations. We encourage you to let your creativity soar, to share your unique experiences and expertise, and to engage with our vibrant community. We believe that by empowering individuals to express themselves, we can collectively create a more enlightened and compassionate society. Thank you for being a part of our blog community. Together, let's celebrate the beauty of diverse voices, explore new ideas, and make a positive impact. Join us on this exciting journey of self-expression, connection, and discovery. We can't wait to read what you have to share!";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// route for home page
app.get('/', function (req, res) {

  res.render("home", { HomeContent: homeStartingContent, posts: posts });

});

// route to about page
app.get('/about', function (req, res) {

  res.render("about", { AboutContent: aboutContent });

});

// route to contact page
app.get('/contact', function (req, res) {

  res.render("contact", { ContactContent: contactContent });

});

// route to Compose page
app.get('/compose', function (req, res) {

  res.render("compose");

});

app.post('/compose', function (req, res) {

  const post = {

    Title: req.body.PostTitle,
    Content: req.body.PostBody

  }
  posts.push(post);

  res.redirect("/");

});




// route for parameters
app.get("/posts/:postName", function (req, res) {

  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.Title);
    const storedContent = post.Content;

    if (storedTitle === requestedTitle) {
      res.render("post", { Title: storedTitle, Content: storedContent });
    }

  });

})











app.listen(3000, function () {
  console.log("Server started on port 3000");
});
