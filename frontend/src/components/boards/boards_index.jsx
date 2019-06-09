import React, { Component } from 'react';
import BoardsIndexItem from './boards_index_item';
import './boards.css';

class BoardsIndex extends Component {
  componentDidMount() {
    this.props.fetchUserBoards(this.props.match.params.userId);
  }

  render() {
    const { boards, openModal } = this.props;
    if (!this.props.boards) return null;

    const boardItems = boards.map(board => {
      return (
        <div key={ board._id }>
          <BoardsIndexItem board={ board } />
        </div>
      );
    });

    return (
      <div className='boards-index-container'>
        <div className='boards-index-buttons'>
          <i className='fas fa-plus' onClick={() => openModal('createBoard')} />
        </div>
        <div className='boards-index'>
          { boardItems }
        </div>
      </div>
    );
  }
}

export default BoardsIndex;
