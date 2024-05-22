/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";


import Newsitem from "./Newsitem";

import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";



const News= (props)=> {
  const[articles,setArticles]= useState([])
  const[loading,setLoading]= useState(true)
  const[ page,setPage]= useState(1)
  const[ totalResults,setTotalResults]= useState(0)





  
 
  const capitlizeText = (string) => 
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
 

   const updateNews=  async()=>  {
    props.setProgress(10);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey} &page=${page}&pageSize=${props.pageSize}`;
 
  setLoading(true)
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false)
  props.setProgress(100);

  }
useEffect(() => {
  document.title =`${capitlizeText(props.category)} - News`;

  updateNews(); 
  
},[] )



//  const handlePrevClick = async () => {
//   setPage(page - 1)
//   updateNews();


//   }
//  const handleNextClick = async () => {
//    setPage(page + 1)
//    updateNews();

 


//   }
 const  fetchMoreData = async () => {
  
   
   const url =
   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page + 1)

 let data = await fetch(url);
 let parsedData = await data.json();
 console.log(parsedData);
 setArticles(articles.concat(parsedData.articles))
 setTotalResults(parsedData.totalResults);
  };
    return (
      <div className="container my-3">
        <h1 className="text-center " style={{ margin:'95px 0px', }}>News from {capitlizeText(props.category)}</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
         

        <div className="row">
          { articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 88) : ""}
                  description={element.description ? element.description.slice(0, 66) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt}
                />
              </div>

            );
          })}  
          </div>
        </div>
        </InfiniteScroll>
        
       </div>
    );
  
}
News.defaultProps = {
  country: 'us',
  pageSize:8,
  category: 'general',
 }
 News.propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string,

 }

export default News;
