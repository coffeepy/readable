import React, { Component } from 'react'
import CommentForm from './CommentForm'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'

class Comment extends Component {
  state = {
    edit: false
  }
  handleSubmit = (e, id) => {
    this.props.handleSubmit(e, id).then(()=> this.setState({edit:false}))
  }
  render() {
    const { del, comment, handleSubmit, vote} = this.props
    const { edit } = this.state
    return(
      <div>
        {
          edit
            ? <CommentForm id={comment.id} handleSubmit={this.handleSubmit}/>
            : <ListItem
                leftIcon={
                  <IconMenu
                    open={this.state.IconMenuOpen}
                    className="commentMenu"
                    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                    >
                    <MenuItem onClick={()=>{this.setState({edit: true})}}>Edit</MenuItem>
                    <MenuItem onClick={()=> del(comment.id)}>Delete</MenuItem>
                  </IconMenu>
                }
                rightIconButton ={
                  <span>
                    <ThumbUp onClick={()=> vote(comment.id, 'upVote')}/>
                      <FloatingActionButton mini={true}>
                          {comment.voteScore}
                      </FloatingActionButton>

                    <ThumbDown onClick={()=> vote(comment.id, 'downVote')} />
                  </span> }
                primaryText={
                  comment.body
                }
                secondaryText={
                  <p>
                    {`-  ${comment.author}`}
                    <span>{`(${comment.voteScore})`}</span>
                  </p>
                  }
              >
              </ListItem>
        }
      </div>
    )
  }
}

export default Comment
