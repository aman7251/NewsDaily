import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import './Loader.css';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
        }


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
    }

    async componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {
        this.setState({ loading: true });
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=01269c4d70d84ff4b669747400e94c9f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ 
            articles: parsedData.articles, 
            loading: false,
            totalResults: parsedData.totalResults 
        });
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.fetchNews);
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, this.fetchNews);
    }

    render() {
        return (
            <div className="container my-3 ">
                <div className="slide-container">
                     <h1 className="slide-text">NewsDaily - Top Headlines</h1>
                </div>
                 
                { this.state.loading && < Loader/>}
                <div className="row">
                    { !this.state.loading && this.state.articles && this.state.articles.length > 0 ? (
                        this.state.articles.map((element) => {
                            const title = (!element.title || element.title === '[Removed]') ? '.'.repeat(94) : (element.title.length > 40 ? element.title.slice(0, 40) + '...' : element.title);
                            const description = (!element.description || element.description === '[Removed]') ? '.'.repeat(177) : (element.description.length > 88 ? element.description.slice(0, 88) + '...' : element.description);
                            return (
                                <div className='col-md-3' key={element.url}>
                                    <NewsItem title={title} description={description} newsUrl={element.url} imageUrl={element.urlToImage} />
                                </div>
                            );
                        })
                    ) : (
                        <p>No news articles available</p>
                    )}
                </div>
                <div className="container d-flex justify-content-center">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary mx-2 my-2" onClick={this.handlePrevClick}>&#129120;</button>
                    <button 
                        disabled={this.state.page * 50 >= this.state.totalResults} 
                        type="button" 
                        className="btn btn-primary mx-2 my-2" 
                        onClick={this.handleNextClick}
                    >
                        &#129122;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
