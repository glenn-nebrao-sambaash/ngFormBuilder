module.exports = {
  permission: {
    create: { title: 'Create Permission' },
    read: { title: 'Read Permission' },
    update: { title: 'Update Permission' },
    delete: { title: 'Delete Permission' }
  },
  api: {
      GET_FORM_LIST : '/v2/forms/simpleList',
      GET_FORM_FIELDS : '/v2/forms/schema/$PARAM_1/fields',  // param 1 = form ID
      GET_SITES : '/v2/forms/sites',
      GET_SITE_ROLES : '/v2/forms/site/$PARAM_1/roles' // param 1 = site Id
  },
  template : {
      PLATFORM_CONFIG_TEMPLATE : {alias: "formio/components/platform/platform.html",
          content: '' +
          '<ng-form>' +
            '<section><h4>Permission</h4>'+      
                '<platform-permission></platform-permission>' +
            '</section>'+
            '<section><h4>Master Profile Mapping</h4>'+      
                '<platform-master-profile-mapping></platform-master-profile-mapping>' +
            '</section>'+
            '<section><h4>Logic</h4>'+      
              '<platform-on-change-logic></platform-on-change-logic>' +
              '<platform-on-form-load-logic></platform-on-form-load-logic>' +
              '<platform-on-populate-logic></platform-on-populate-logic>' +
            '</section>'+
          '</ng-form>'
      }
  }
};
