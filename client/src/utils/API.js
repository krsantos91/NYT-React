import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/saved");
  },
  // Saves an Article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/saved", articleData);
  }
};
