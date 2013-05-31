ItemView = Backbone.View.extend({
	className: '.item',

  initialize: function() {
    Handlebars.registerHelper('itemImage', function() {
      return this.image || '/images/dummy.jpg' ;
    });
  },

  /*
  	see stackoverflow/questions/11932125
  	searched for backbone.js dynamic events
  */
	events: function() {
		var _events = {};
		_events["click #" + this.model.cid] = 'displayProduct';
		return _events;
	},

	displayProduct: function(){
		hawkerboard.navigate("product/"+this.model.cid, {trigger: true});
	},

	render: function() {
		var source = $("#item-template").html();
		var template = Handlebars.compile(source);
		var context = this.model.toJSON();
		var cid = this.model.cid;
		context['cid'] = cid;
		var html = template(context);
		this.$el.append(html);
		//this.vintageIt();
	},

	vintageIt: function() {
		 var options = {
     };
     var effect = {
        vignette: 0.4,
        sepia: true
     };
     $('#'+this.model.cid+" header img").vintage(options, effect);
	}
});


ItemCardView = Backbone.View.extend({
	render: function() {
		var source = $("#product-template").html();
		var template = Handlebars.compile(source);
		var context = this.model.toJSON();
		var cid = this.model.cid;
		context['cid'] = cid;
		var html = template(context);
		this.$el.html(html);
	},
});

AddItemFormView = Backbone.View.extend({
  events: {
    'click #add-item': 'submit',
    'click #btn-upload': 'upload'
  },

  render: function() {
    var source = $("#add-item-form-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(source);
  },
  submit: function() {
  	  var fileElement = document.getElementById('content_file');
  		var file = fileElement.files[0];
  		console.log(file.name);
  		console.log(file);

  	$.post('/upload', { file: file }, function(data){
/*
  		this.collection.create({
      title: $('#item_name').val(),
      price: $('#item_price').val(),
      description: $('#item_description').val(),
      tags: $('#item_tags').val(),
      image: data.image
    	});
			hawkerboard.navigate("/", true);
			*/
  	});
  }
});


IndexView = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.collection, 'sync', this.render);
	},

	render: function() {
		$('#container').html('');
		this.collection.forEach(this.renderItem);
    $('#searchbox').on('keyup', $.proxy(this.search, this));
		$('#add-item-button').on('click', this.displayAddItem);
	},

	displayAddItem: function(){
		hawkerboard.navigate("additem", {trigger: true});
	},

	renderItem: function(item) {
		var itemView = new ItemView({el: "#container", model: item});
		itemView.render();
	},

  search: function() {
    $('#container').html('');
    var searchQuery = $('#searchbox').val();
    var result = this.collection._.filter({title: searchQuery});
    //var result = this.collection.where({title: searchQuery});
    _.each(result, this.renderItem);
  }
});


ProductView = Backbone.View.extend({
	renderItem: function(item) {
		var itemCardView = new ItemCardView({el: "#container", model: item});
		itemCardView.render();
	}
});

AddItemView = Backbone.View.extend({
	render: function() {
		var addItemForm = new AddItemFormView({el: "#container", collection: this.collection})
		addItemForm.render();
	}
});

