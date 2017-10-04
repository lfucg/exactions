import React from 'react';
import { connect } from 'react-redux';
import { map } from 'ramda';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import {
    getUploadContent,
    postUpload,
} from '../actions/apiActions';

import {
    formUpdate,
} from '../actions/formActions';

class Uploads extends React.Component {
    componentDidMount() {
        this.props.onComponentDidMount({
            file_content_type: this.props.file_content_type,
            file_object_id: this.props.file_object_id,
        });
    }


    render() {
        const {
            activeForm,
            uploads,
            fileUploading,
        } = this.props;

        const uploadsList = uploads.length > 0 && (map((single_upload) => {
            return (
                <div key={single_upload.id} >
                    <div className="row">
                        <h5>
                            <div className="col-sm-3">
                                {single_upload.date}
                            </div>
                            <div className="col-sm-8">
                                <a href={single_upload.upload} >
                                    {single_upload.upload}
                                </a>
                            </div>
                        </h5>
                    </div>
                    <hr aria-hidden="true" />
                </div>
            );
        })(uploads));

        return (
            <div className="container uploads-page">
                {uploads &&
                    <div>
                        <div className="row">
                            <h2>Existing Uploads</h2>
                        </div>
                        <div className="row">
                            <h4>
                                <div className="col-sm-3">Date</div>
                                <div className="col-sm-8">Uploads</div>
                            </h4>
                        </div>
                        <div className="row existing-uploads">
                            {uploadsList}
                        </div>
                    </div>
                }
                <Dropzone onDrop={fileUploading} style={{}} >
                    <button className="btn btn-lex">Add File</button>
                </Dropzone>
            </div>
        );
    }
}

Uploads.propTypes = {
    activeForm: PropTypes.object,
    uploads: PropTypes.object,
    onComponentDidMount: PropTypes.func,
    file_content_type: PropTypes.string,
    file_object_id: PropTypes.number,
    fileUploading: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        activeForm: state.activeForm,
        uploads: state.uploads,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onComponentDidMount(pass_props) {
            if (pass_props.file_content_type) {
                const update_content = {};

                update_content.file_content_type = pass_props.file_content_type;
                update_content.file_object_id = pass_props.file_object_id;

                dispatch(formUpdate(update_content));
                dispatch(getUploadContent());
            }
        },
        fileUploading(files) {
            return dispatch(postUpload(files));
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Uploads);
