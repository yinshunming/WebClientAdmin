module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	env : {
		options : {
			/* Shared Options Hash */
			//globalOption : 'foo'
		},
		dev: {

			NODE_ENV : 'DEVELOPMENT'
		},
		prod : {
			NODE_ENV : 'PRODUCTION'
		}

	},
	preprocess : {

		dev : {
           files: {
			 'develop/mainFrame.jsp':['source/mainFrame.jsp'],
			 'develop/historyBugs.jsp':['source/historyBugs.jsp'],
			 'develop/logout.jsp':['source/logout.jsp'],
			 'develop/navigation.jsp':['source/navigation.jsp'],		 
		   },
		},

		prod : {
		   files: {
			 'release/<%= pkg.version %>/mainFrame.jsp':['source/mainFrame.jsp'],
			 'release/<%= pkg.version %>/historyBugs.jsp':['source/historyBugs.jsp'],
			 'release/<%= pkg.version %>/logout.jsp':['source/logout.jsp'],
			 'release/<%= pkg.version %>/register.jsp':['source/register.jsp'],
			 'release/<%= pkg.version %>/navigation.jsp':['source/navigation.jsp'],		 
		   },
			options : {

				context : {
					name : '<%= pkg.name %>',
					version : '<%= pkg.version %>',
					now : '<%= now %>',
					ver : '<%= ver %>'
				}

			}

		}

	},
    concat: {
      options: {
        separator: '\n'
      },
	 
	  prod:{
		files: {
			"release/<%= pkg.version %>/assets/js/common.js":[
												"source/assets/js/jquery-1.10.2.min.js",
												"source/assets/js/jquery.validate.min.js",
												"source/assets/js/jquery.placeholder.js",
												"source/assets/js/bootstrap.min.js",
												"source/assets/js/alertify.min.js",
												"source/assets/js/custom.navigation.js",
											 ],
			"release/<%= pkg.version %>/assets/js/mainFrame.js":[
												"source/assets/js/jquery.dataTables.js",
												"source/assets/js/jquery.dataTables.editable.js",
												"source/assets/js/jquery.jeditable.js",
												"source/assets/js/jquery.dataTables.rowGrouping.js",
												"source/assets/js/jquery.dataTables.colReorderWithResize.js",
												"source/assets/js/custom.mainFrame.js"
											 ],
						
			"release/<%= pkg.version %>/assets/js/historyBugs.js":[
												"source/assets/js/jquery.dataTables.js",
												"source/assets/js/jquery.dataTables.rowGrouping.js",
												"source/assets/js/jquery.dataTables.colReorderWithResize.js",
												"source/assets/js/custom.historyBugs.js"
											 ],
	
			"release/<%= pkg.version %>/assets/js/logout.js":[
												"source/assets/js/custom.logout.js"
											 ],

			"release/<%= pkg.version %>/assets/js/register.js":[
												"source/assets/js/custom.register.js"
											 ],
											 
			"release/<%= pkg.version %>/assets/js/ltIE9.js":[
												"source/assets/js/custom.html5.js",
												"source/assets/js/custom.respond.min.js"
											 ],		
			"release/<%= pkg.version %>/assets/css/common.css":[
												"source/assets/css/bootstrap.min.css",
												"source/assets/css/bootstrap.validation.css",
												"source/assets/css/custom.placeholder.css",
												"source/assets/css/alertify.core.css",
												"source/assets/css/alertify.default.css",
											 ],										 
			"release/<%= pkg.version %>/assets/css/datatable.css":[
												"source/assets/css/jquery.dataTables.demo_page.css",
												"source/assets/css/jquery.dataTables.demo_table_jui.css",
												"source/assets/css/jquery.ui-1.8.4.custom.css",
											 ],		
												
		}
	  },

    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

	  prod:{
        files: {
		  'release/<%= pkg.version %>/assets/js/common.min.js': ['release/<%= pkg.version %>/assets/js/common.js'], 
          'release/<%= pkg.version %>/assets/js/mainFrame.min.js': ['release/<%= pkg.version %>/assets/js/mainFrame.js'],  
		  'release/<%= pkg.version %>/assets/js/historyBugs.min.js': ['release/<%= pkg.version %>/assets/js/historyBugs.js'],
		  'release/<%= pkg.version %>/assets/js/logout.min.js': ['release/<%= pkg.version %>/assets/js/logout.js'],
		  'release/<%= pkg.version %>/assets/js/register.min.js': ['release/<%= pkg.version %>/assets/js/register.js'],
		  'release/<%= pkg.version %>/assets/js/ltIE9.min.js': ['release/<%= pkg.version %>/assets/js/ltIE9.js'],
        }
	  },
	  
      
    },
	cssmin: {
	  options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

	  prod:{
        files: {		  
		  'release/<%= pkg.version %>/assets/css/common.min.css': ['release/<%= pkg.version %>/assets/css/common.css'],
		  'release/<%= pkg.version %>/assets/css/datatable.min.css': ['release/<%= pkg.version %>/assets/css/datatable.css'],
        }
	  },
	  
	},
    jshint: {
      files: ['gruntfile.js', 'WebRoot/assets/**/*.js'],
      options: {
        //这里是覆盖JSHint默认配置的选项
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
	clean: {
	  dev: [ "release/<%= pkg.version %>/*",'WebRoot/*'],
	  prod: ["develop/*", "WebRoot/*"]
	},
	copy: {
	  dev: {
		files: [
		  // includes files within path and its sub-directories
		  {expand: true, cwd:'source/assets/',src: ['**'], dest: 'WebRoot/assets/'},
		  {expand: true, cwd:'source/META-INF/',src: ['**'], dest: 'WebRoot/META-INF/'},
		  {expand: true, cwd:'source/WEB-INF/',src: ['**'], dest: 'WebRoot/WEB-INF/'},
		  {expand: true, cwd:'develop/',src: ['**'], dest: 'WebRoot/'},
		]
	  },
	  prod: {
		files: [
		  // includes files within path
		  {expand: true, cwd:'source/assets/fonts/', src: ['**'], dest: 'WebRoot/assets/fonts/'},
		  {expand: true, cwd:'source/assets/images/',src: ['**'], dest: 'WebRoot/assets/images/'},
		  {expand: true, cwd:'source/META-INF/',src: ['**'], dest: 'WebRoot/META-INF/'},
		  {expand: true, cwd:'source/WEB-INF/',src: ['**'], dest: 'WebRoot/WEB-INF/'},
		  {expand: true, cwd:'release/<%= pkg.version %>/',src: ['**'], dest: 'WebRoot/'},
		]
	  }
	}
  });
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  

  grunt.registerTask('preprod', ['env:prod','preprocess:prod','copy:dev']);
  grunt.registerTask('default', [ 'concat:prod', 'uglify']);
  grunt.registerTask('dev', ['env:dev','preprocess:dev', 'clean:dev','copy:dev']);
  grunt.registerTask('prod', [ 'env:prod','preprocess:prod','clean:prod', 'concat:prod', 'uglify',"cssmin:prod",'copy:prod']);

};