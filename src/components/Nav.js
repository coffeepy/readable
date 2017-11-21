import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import LibraryBooksIcon from 'material-ui/svg-icons/av/library-books'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/content/add'

class Nav extends Component {
  render(){
    const { hideNewBtn } = this.props
    return (

      <AppBar
        iconElementLeft={
          <IconButton>
            <Link  to="/">
              <LibraryBooksIcon style={{color:"white"}}/>
            </Link>
          </IconButton>
        }
        iconElementRight={
          ! hideNewBtn ?
          <Link  to="/new" className="red">
            <FloatingActionButton
              mini={true}
              backgroundColor="white"
              iconStyle={{background:"red !important"}}
            >
              <Add style={{fill:"red"}} />
            </FloatingActionButton>
          </Link>
          : <div></div>
        }
        title={<Link style={{color:"white"}} to="/">Readable</Link>}
        style={
          {
            backgroundColor: "#F44336"
          }
        }
      >
      </AppBar>
    )
  }
}

export default Nav
