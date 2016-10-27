// project component
var ProjectList = React.createClass({

  // {this.props.data}
  render: function() {
    var projectNodes = this.props.data.map( function(project) {
      return (
        <Project project={ project } ></Project>
      );
    });
    return (
      <div className="row thumbs">
        {projectNodes}
      </div>
    );

  }
});

var Project = React.createClass({
  render: function() {
    return (
      <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6 project" data-project={ this.props.project.id }>

        <ProjectPreview thumb={ this.props.project.preview } />

        <div className="project-info hidden">
          <span className="project-image">{ this.props.project.image }</span>
          <span className="project-title">{ this.props.project.title }</span>
          <span className="project-company">{ this.props.project.company }</span>
          <ProjectDescription text={ this.props.project.description } />
          <span className="project-link">{ this.props.project.link }</span>
          <span className="project-code">{ this.props.project.code }</span>
        </div>

      </div>
    );
  }
});

var ProjectPreview = React.createClass({
  render: function() {
    return (
      <img src={ this.props.thumb } />
    );
  }
});

var ProjectDescription = React.createClass({
  render: function() {
    return (
      <div className="project-description">
        { this.props.text }
      </div>
    );
  }
});

var ProjectThumbs = React.createClass({
  render: function() {
    return (
      <div className="project_thumbs">
        thumbs.
      </div>
    );
  }
});

// render
ReactDOM.render(
  <ProjectList data={projects} />,
  document.getElementById('projects')
);

$(function() {

  NG.FeatureSelector.init();

});
