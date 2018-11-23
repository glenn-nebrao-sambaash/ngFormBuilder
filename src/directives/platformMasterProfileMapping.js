/**
* A directive for selecting the Platform's permission site.
*/

module.exports = ['PlatformUtils', 'PLATFORM_OPTIONS', '$http', 
    function(PlatformUtils, PLATFORM_OPTIONS, $http) 
{
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    template: '' +
      '<div>' +
        '<br>Select Master Profile Form:' +
        '<div ng-dropdown-multiselect="" options="_forms" selected-model="component.platform.profile.form"  extra-settings="extraSettingsFormsList" events="_formsEvent" ></div>' +
        '<br>Select Fields To Map:' +
        '<div ng-dropdown-multiselect="" options="_formFields" selected-model="component.platform.profile.mapping"  extra-settings="extraSettingsFieldsList"></div>' +
      '</div>',
    controller: [
      '$scope',
      function($scope) {
        var _retrieveForms = function() {
            $http.get(PlatformUtils.getApiUri(PLATFORM_OPTIONS.api.GET_FORM_LIST, [])).then( function(response) {
                $scope._forms = response.data;
            });            
        };
        
        var _retrieveFormFields = function(initialLoad) {
            if ($scope.component.platform.profile.form.length > 0) {
                if (!initialLoad) { // reset selected mapping
                    $scope.component.platform.profile.mapping = [];
                } 
                $http.get(PlatformUtils.getApiUri(PLATFORM_OPTIONS.api.GET_FORM_FIELDS, [$scope.component.platform.profile.form[0].htmlFormId])).then( function(response) {
                    $scope._formFields = response.data;
                });                
            } else {
                $scope._formFields = [];
            }
        };
        
        $scope.component.platform = $scope.component.platform || {};
        $scope.component.platform.profile = $scope.component.platform.profile || {};
        $scope.component.platform.profile.form = $scope.component.platform.profile.form || [];
        $scope.component.platform.profile.mapping = $scope.component.platform.profile.mapping || [];

        _retrieveForms();
        _retrieveFormFields(true);

        $scope.extraSettingsFormsList = { selectionLimit: 1, selectedToTop: true, showEnableSearchButton: true, 
          scrollable: true, styleActive:true, idProperty:"htmlFormId", 
          displayProp: "formName", searchField: "formName", closeOnSelect: true ,
          template: "{{option.formName}} ({{option.htmlFormId}})" 
        };       
        
        $scope._formsEvent = {
          onSelectionChanged: _retrieveFormFields
        };
        
        $scope.extraSettingsFieldsList = { selectedToTop: true, showEnableSearchButton: true, 
          scrollable: true, styleActive:true, idProperty:"id", 
          displayProp: "label", searchField: "label" ,
          template: "{{option.label}} ({{option.id}})"
        };

      }
    ]
  };
}];
