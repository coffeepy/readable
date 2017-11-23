import React from 'react'
import Meh from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import Nav from './Nav'
const post404 = (props)=> {
  return <div>
            <Nav />
            <h3 className="post-not-found"><Meh />UHOH! We cant find this Post! Sorry!! </h3>
          </div>
}

export default post404
