import React from 'react';
import { Link } from 'react-router-dom';
import CreateItemForm from './create_item_form';
import './pins.css';

class PinsIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { _id, imageUrl, linkUrl, title } = this.props.pin;
    const pinLink = linkUrl === '' ? imageUrl : linkUrl;

    return (
      <div className='pins-index-item-holder'>
        <CreateItemForm className='pins-index-item-create' pinId={_id} />
        <a className='pins-index-item-link' href={pinLink} target="_blank">
          <div className='pins-index-item-container'>
            <div className='pins-index-item-bg'>
              <div className='pins-index-item'>
                <div className='pins-index-item-image-container'>
                  <img className='pins-index-item-image' src={`${imageUrl}`} />
                  <div className='pins-index-item-image-overlay' />
                  {/* put save item */}
                </div>
                <div className='pins-index-item-tail-container'>
                  <div className='pins-index-item-tail'>
                    <div className='pins-index-item-title'>{title}</div>
                  </div>
                  <div className='pins-index-item-menu-container'>
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default PinsIndexItem;
