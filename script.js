//Backbone Model

var Blog=Backbone.Model.extend({
	defaults:{
		author:'',
		title:'',
		url:''
	}
})

//controller
var Blogs = Backbone.Collection.extend({
  url: '/blogs'
});