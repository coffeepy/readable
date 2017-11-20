import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsOrdered, changePostOrder  } from '../actions/posts'

class SelectOrder extends Component {
  render() {
    const { postOrder, changePostOrder } = this.props
    const onChange = (e)=> {
      console.log(e.target.value);
      this.props.changePostOrder(e)
      this.props.fetchPostOrdered(e)
    }
    return (
      <select defaultValue={postOrder} onChange={onChange}>
        <option value="timestamp">Date</option>
        <option value="voteScore">Vote Score</option>
      </select>
    )
  }
}

const mapStateToProps = (state) => (
  {
    postOrder: state.postOrder
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    changePostOrder: (e)=> dispatch(changePostOrder(e.target.value)),
    fetchPostOrdered: (e)=> dispatch(fetchPostsOrdered(e.target.value))
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(SelectOrder)
