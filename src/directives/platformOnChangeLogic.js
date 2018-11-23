/**
* A directive for setting platform logic when the form had loaded.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: '' +
      '<div>' +
      '<uib-accordion>' +
      '  <div uib-accordion-group heading="On Change Logic" class="panel panel-default">' +
      '    <small>' +
      '      <p>Execute custom validation logic with JSON and <a href="http://jsonlogic.com/">JsonLogic</a>.</p>' +
      '      <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
      '      <p><a href="http://formio.github.io/formio.js/app/examples/conditions.html" target="_blank">Click here for an example</a></p>' +
      '    </small>' +
      '    <textarea class="form-control" rows="5" id="onChangeLogic" name="onChangeLogic" json-input ng-model="component.platform.logic.change" placeholder=\'[{condition:{operator:[data1,data2...dataN]},actions:[{type:typeName,params:{paramKey1:paramValue1...paramKeyN:paramValueN}}]}]\'></textarea>' +
      '  </div>' +
      '</uib-accordion>' +
      '</div>'
  };
};
