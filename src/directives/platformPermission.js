/**
* A directive for editing a component's custom validation.
*/
var _camelCase = require('lodash/camelCase');
var _startCase = require('lodash/startCase');

module.exports = ['PlatformUtils', 'PLATFORM_OPTIONS', '$http', 
    function(PlatformUtils, PLATFORM_OPTIONS, $http) 
{
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    template: '' +
      '<div>' +
        '<br>Retrieve roles from site:' +
        '<div ng-dropdown-multiselect="" options="_sites" selected-model="component.platform.permission.site"  extra-settings="extraSettingsSitesList" events="_sitesListEvents" ></div>' +
        '<uib-accordion>' +
            '<div uib-accordion-group heading="Create Permission" class="panel panel-default">' +
                '<div ng-dropdown-multiselect="" options="_siteRoles" selected-model="component.platform.permission.create"  extra-settings="extraSettings"></div>' +
            '</div>' +
        '</uib-accordion>' +
        '<uib-accordion>' +
            '<div uib-accordion-group heading="Read Permission" class="panel panel-default">' +
                '<div ng-dropdown-multiselect="" options="_siteRoles" selected-model="component.platform.permission.read"  extra-settings="extraSettings"></div>' +
            '</div>' +
        '</uib-accordion>' +
        '<uib-accordion>' +
            '<div uib-accordion-group heading="Update Permission" class="panel panel-default">' +
                '<div ng-dropdown-multiselect="" options="_siteRoles" selected-model="component.platform.permission.update"  extra-settings="extraSettings"></div>' +
            '</div>' +
        '</uib-accordion>' +
        '<uib-accordion>' +
            '<div uib-accordion-group heading="Delete Permission" class="panel panel-default">' +
                '<div ng-dropdown-multiselect="" options="_siteRoles" selected-model="component.platform.permission.delete"  extra-settings="extraSettings"></div>' +
            '</div>' +
        '</uib-accordion>' +
       '</div>',
    controller: [
      '$scope','$attrs',
      function($scope, $attrs) {
        var _retrieveSites = function() {
            $http.get(PlatformUtils.getApiUri(PLATFORM_OPTIONS.api.GET_SITES, [])).then( function(response) {
                $scope._sites = response.data;
            });            
        };
        
        var _retrieveRoles = function(initialLoad) {
            if ($scope.component.platform.permission.site.length > 0){
                if (!initialLoad) { // reset selected mapping
                    $scope.component.platform.permission.create = [];
                    $scope.component.platform.permission.read = [];
                    $scope.component.platform.permission.update = [];
                    $scope.component.platform.permission.delete = [];
                }
                $http.get(PlatformUtils.getApiUri(PLATFORM_OPTIONS.api.GET_SITE_ROLES, [$scope.component.platform.permission.site[0].multiTenantSiteId])).then( function(response) {
                    $scope._siteRoles = response.data;
                });
            } else {
                $scope._siteRoles = [];
            }
        };
        
        $scope.component.platform = $scope.component.platform || {};
        $scope.component.platform.permission = $scope.component.platform.permission || {};
        $scope.component.platform.permission.site = $scope.component.platform.permission.site || [];
        $scope.component.platform.permission.create = $scope.component.platform.permission.create || [];
        $scope.component.platform.permission.read = $scope.component.platform.permission.read || [];
        $scope.component.platform.permission.update = $scope.component.platform.permission.update || [];
        $scope.component.platform.permission.delete = $scope.component.platform.permission.delete || [];
        
        $scope.extraSettingsSitesList = { selectionLimit: 1, selectedToTop: true, showEnableSearchButton: true, 
          scrollable: true, styleActive:true, idProperty:"multiTenantSiteId", 
          displayProp: "siteName", searchField: "siteName", closeOnSelect: true };        
      
        $scope.extraSettings = { selectedToTop: true, checkBoxes: true, showEnableSearchButton: true, 
          scrollable: true, styleActive:true, idProperty:"siteRoleId", 
          displayProp: "siteRoleName", searchField: "siteRoleName" };
        
        $scope._sitesListEvents = {
          onSelectionChanged: _retrieveRoles
        };

        _retrieveSites();
        
        _retrieveRoles(true);
          
      }
    ]
  };
}];
