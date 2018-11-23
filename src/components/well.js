module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('well', {
        fbtemplate: 'formio/formbuilder/well.html',
        icon: 'fa fa-square-o',
        documentation: 'http://help.form.io/userguide/#well',
        noDndOverlay: true,
        confirmRemove: true,
        views: [
          {
            name: 'Display',
            template: 'formio/components/well/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          },
          {
            name: 'Platform',
            template: 'formio/components/platform/platform.html'
          }
        ]
      });
    }
  ]);
  app.run([
    '$templateCache',
    'PLATFORM_OPTIONS',
    function($templateCache, PLATFORM_OPTIONS) {
      $templateCache.put('formio/formbuilder/well.html',
        '<div class="well">' +
          '<form-builder-list component="component" form="form" options="options" formio="::formio"></form-builder-list>' +
        '</div>'
      );
      $templateCache.put('formio/components/well/display.html',
        '<ng-form>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '<ng-form>'
      );
      
      $templateCache.put(
            PLATFORM_OPTIONS.template.PLATFORM_CONFIG_TEMPLATE.alias,
            PLATFORM_OPTIONS.template.PLATFORM_CONFIG_TEMPLATE.content
      );
      
    }
  ]);
};
