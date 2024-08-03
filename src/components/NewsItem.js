import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="card my-1 news-card"  >
        <img 
            src={imageUrl?imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrIuFW7NeWsGsABRfHpMPTYnrIgZcPVCuPOA&s"} 
            className="card-img-top" 
            alt="..." 
            style={{ height: '150px', objectFit: 'cover' }} // Set height and object-fit to cover
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text news-description">{description}</p>
            <a href={newsUrl} target="_blank" className="btn btn-dark" rel="noopener noreferrer">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
