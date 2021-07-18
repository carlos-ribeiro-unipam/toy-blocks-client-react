import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/blocks";
import Block from "../components/Block";
import { Box, Typography } from "@material-ui/core";

export class Blocks extends React.Component {
  componentDidMount() {
    if (this.props.expandedNodeURL) {
      this.props.actions.getBlocks(this.props.expandedNodeURL);
    }
  }

  renderData() {
    const { blocks } = this.props;
    const data = blocks.data;

    return (
      <Box>
        {data
          ? data.map(block => (
            <Block
              key={block.id}
              id={block.id}
              description={block.description}
            />
          ))
          : <Typography>No data!</Typography>
        }
      </Box>
    );
  }

  render() {
    return (
      <Box width="100%">
        {!this.props.blocks.loading
          ? this.renderData()
          : <Typography>Loading...</Typography>
        }
      </Box>
    );
  }
}

Blocks.propTypes = {
  actions: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    blocks: state.blocks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
