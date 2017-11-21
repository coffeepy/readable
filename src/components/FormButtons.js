import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

class FormButtons extends Component {
  render() {
    const { id, formType, handleCancel } = this.props
    return (
      <div>
        <FlatButton label= {id ? `Edit ${formType}` : `Submit ${formType}` }
          hoverColor="#90CAF9"
          type="submit"
          >
        </FlatButton>
        {
          handleCancel ? <FlatButton onClick={handleCancel} label="Cancel" hoverColor="#FF8A80"></FlatButton>
          :<Link to="/"><FlatButton label="Cancel" hoverColor="#FF8A80"></FlatButton></Link>
        }

      </div>
    )
  }
}

export default FormButtons
