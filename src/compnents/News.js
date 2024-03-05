import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Loading from './Loading';
export default class News extends Component {

    constructor(){
        super();
        this.state = {
            articles : [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=98e9ffce75414c09b3936d2dcb39f79d&page=1&pageSize=8";
        let data = await fetch(url);
        let parseData = await data.json()
        console.log("ParseData");
        this.setState({articles: parseData.articles, totalResults:parseData.totalResults})
        
    }
    handlePre = async ()=>{
      console.log("Previous");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=98e9ffce75414c09b3936d2dcb39f79d&page=${this.state.page - 1}&pageSize=8`;
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
          page: this.state.page - 1,
        articles: parseData.articles
        })
    }
    handleNxt = async ()=>{
      console.log("Next");
      if(Math.ceil(this.state.page + 1>this.state.totalResults/9)){

      }
      else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=98e9ffce75414c09b3936d2dcb39f79d&page=${this.state.page + 1}&pageSize=8`;
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
          page:this.state.page + 1,
          articles: parseData.articles
        })
      }
    }

  render() {
    return (
        <div className="container my-5">
          <Loading/>
      <div className='row'>
        {this.state.articles.map((element)=>{
            return <div className="col-md-3" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} linkUrl={element.url}/>
          </div>
        })}
      </div>
      <div className='d-flex justify-content-between my-2'>
  <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePre}>&larr; Previous</button>
  <button disabled={this.state.page + 1>this.state.totalResults/9} type="button" className="btn btn-dark" onClick={this.handleNxt}>Next &rarr;</button>
  </div>
        </div>

    )
  }
}
