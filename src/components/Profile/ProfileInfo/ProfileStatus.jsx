import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status 
    }
    activateEditMode = () => {
        //console.log(this.state.editMode);
         this.setState ( {
        editMode: true
        } )
        //console.log(this.state.editMode);
        // будет два false в консоле, потому-что setState асинхронный запрос, похож на Ajax
    }
    
    deactivateEditMode = () => {
        this.setState ( {
        editMode: false
        } );
        this.props.updateStatus(this.state.status) 
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        }); 
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode } >{this.props.status || "No status"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.deactivateEditMode} 
                        value={this.state.status} type="text" />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;