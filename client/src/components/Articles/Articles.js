import React, { Component } from "react";
import SaveBtn from "../SaveBtn";
import Jumbotron from "../Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from "../Form";
import axios from "axios"

class Articles extends Component {

  // establish stateful components
  state = {
    articles: [],
    savedarticles:[],
    topic: "",
    startyear: "",
    endyear: ""
  };


  // Event handlers
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      //define query variables
      const apiKey = "e497d9b362d54fbfa57fcc3c48800b95";
      let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${this.state.topic}`;
      
      axios.get(queryURL)
        .then(res=>{
          let queryResults = []
          res.data.response.docs.map(article=>{
            if(article.pub_date){
              let entry = {
                title: article.headline.print_headline,
                url: article.web_url,
                date: article.pub_date,
                summary: article.snippet
              }
              queryResults.push(entry)
            }
          })
          this.setState({articles : queryResults})
        })
        .catch(err=>{
          console.log(err)
        })
    }
  };

  // API functions
  SaveArticle = article => {
    API.saveArticle(article)
    .then(dbarticle=>{
      this.getArticles()
    })
  };

  getArticles = () => {
    API.getArticles()
    .then(res=>{
      this.setState({savedarticles: res.data})
    })
  }

  // Lifecycle functions
  componentDidMount(){
    this.getArticles()
  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="xs-12">
            <Jumbotron>
              <h1>Search for an Article</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Search (required)"
              />
              <Input
                type="number"
                min="1950"
                max="2017"
                value={this.state.startyear}
                onChange={this.handleInputChange}
                name="startyear"
                placeholder="Start year (optional)"
              />
              <Input
                type="number"
                min="1950"
                max="2017"
                value={this.state.endyear}
                onChange={this.handleInputChange}
                name="endyear"
                placeholder="End year (optional)"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="xs-12">
            <Jumbotron>
              <h1>Results </h1>
            </Jumbotron>
            {this.state.articles.length > 0
              ?(
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article.url}>
                      <h3>
                        {article.title}
                      </h3>
                      <SaveBtn onClick={() => this.SaveArticle(article)} /><br/>
                      <strong>Summary:</strong> {article.summary}
                  </ListItem>
                ))}
              </List>
              ) 
              :("")
            }            
          </Col>
          <Col size="xs-12">
            <Jumbotron>
              <h1>Your Saved Articles</h1>
            </Jumbotron>
            {this.state.savedarticles.length > 0
              ?(
              <List>
                {this.state.savedarticles.map(article => (
                  <ListItem title={article.title} key={article.url} date={article.date}>
                      <strong>
                        {article.title}
                      </strong>
                  </ListItem>
                ))}
              </List>
              ) 
              :("")
            }  
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
