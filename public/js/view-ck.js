ItemView=Backbone.View.extend({className:".item",initialize:function(){Handlebars.registerHelper("itemImage",function(){return this.image||"/images/dummy.jpg"})},events:function(){var e={};e["click #"+this.model.cid]="displayProduct";return e},displayProduct:function(){hawkerboard.navigate("product/"+this.model.cid,{trigger:!0})},render:function(){var e=$("#item-template").html(),t=Handlebars.compile(e),n=this.model.toJSON(),r=this.model.cid;n.cid=r;var i=t(n);this.$el.append(i)},vintageIt:function(){var e={},t={vignette:.4,sepia:!0};$("#"+this.model.cid+" header img").vintage(e,t)}});ItemCardView=Backbone.View.extend({render:function(){var e=$("#product-template").html(),t=Handlebars.compile(e),n=this.model.toJSON(),r=this.model.cid;n.cid=r;var i=t(n);this.$el.html(i)}});AddItemFormView=Backbone.View.extend({events:{"click #add-item":"submit","click #btn-upload":"upload"},render:function(){var e=$("#add-item-form-template").html(),t=Handlebars.compile(e);this.$el.html(e)},submit:function(){var e=new FormData,t=document.getElementById("content_file").files[0];e.append(t.name,t);var n=new XMLHttpRequest;n.open("POST","/upload",!0);n.send(e)}});IndexView=Backbone.View.extend({initialize:function(){this.listenTo(this.collection,"sync",this.render)},render:function(){$("#container").html("");this.collection.forEach(this.renderItem);$("#searchbox").on("keyup",$.proxy(this.search,this));$("#add-item-button").on("click",this.displayAddItem)},displayAddItem:function(){hawkerboard.navigate("additem",{trigger:!0})},renderItem:function(e){var t=new ItemView({el:"#container",model:e});t.render()},search:function(){$("#container").html("");var e=$("#searchbox").val(),t=this.collection._.filter({title:e});_.each(t,this.renderItem)}});ProductView=Backbone.View.extend({renderItem:function(e){var t=new ItemCardView({el:"#container",model:e});t.render()}});AddItemView=Backbone.View.extend({render:function(){var e=new AddItemFormView({el:"#container",collection:this.collection});e.render()}});