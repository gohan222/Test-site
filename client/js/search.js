'use strict';

var Mention = React.createClass({
  render: function() {
    return (
      <div className="mentionList">
        <span>{this.props.data.programName}</span>
      </div>
    );
  }
});

var MentionList = React.createClass({
  render: function() {
    var mentionNodes = this.props.data.map(function (mention) {
      return (
        <Mention data={mention}></Mention>
      );
    });
    return (
      <div className="mentionList">
        {mentionNodes}
      </div>
    );
  }
});

var MentionBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.records});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  render: function() {
    return (
      <MentionList data={this.state.data} />
    );
  }
});

React.render(
  <MentionBox url="http://localhost:9090/search?confidence=12&includeSnippet=true&limit=25&offset=0&q=lakers" />,
  document.getElementById('searchResult')
);
