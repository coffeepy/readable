import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsOrdered, changePostOrder  } from '../actions/posts'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
class SelectOrder extends Component {
  render() {
    const { postOrder, changePostOrder } = this.props
    const onChange = (e,idx,val)=> {
      this.props.changePostOrder(val)
      this.props.fetchPostOrdered(val)
    }
    return (
      <SelectField value={postOrder} onChange={onChange}>
        <MenuItem value="timestamp" primaryText="Date"/>
        <MenuItem value="voteScore" primaryText="Vote Score"/>
      </SelectField>
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
    changePostOrder: (val)=> dispatch(changePostOrder(val)),
    fetchPostOrdered: (val)=> dispatch(fetchPostsOrdered(val))
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(SelectOrder)
