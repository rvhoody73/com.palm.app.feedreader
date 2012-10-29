enyo.kind({
  name: "MyApps.FeedReader",
  kind: enyo.VFlexBox,
  components: [
       {name: "getFeed", kind: "WebService",
            	      onSuccess: "gotFeed",
            	      onFailure: "gotFeedFailure"},
            	      
      {kind: "PageHeader", content: "Enyo FeedReaderdebug"},
      {kind: "RowGroup", caption: "Feed URL", components: [
          {kind: "InputBox", components: [
              {name: "feedUrl", kind: "Input", flex: 1, value: "http://feeds.bbci.co.uk/news/rss.xml"},
              {name: "b1", kind: "Button", caption: "Get Feed", onclick: "btnClick"}
          ]}
      ]},
      {kind: "Scroller", flex: 1, components: [
                                               {name: "list", kind: "VirtualRepeater", onSetupRow: "getListItem",
                                                   components: [
                                                       {kind: "Item", layoutKind: "VFlexLayout", components: [
                                                           {name: "title", kind: "Divider"},
                                                           {name: "description"}
                                                       ]}
                                                   ]
                                               }
                                           ]} 
  ],
  create: function() {
	  this.inherited(arguments);
	  this.results = [];
   },
	
  btnClick: function() {
	  this.$.b1.setCaption("hi ");
	  var url = "http://query.yahooapis.com/v1/public/yql?q=select"
	      + "%20title%2C%20description%20from%20rss%20where%20url%3D%22"
	      + this.$.feedUrl.getValue() + "%22&format=json&callback=";
	  this.$.b1.setCaption("btnfunction -var");
	  this.$.getFeed.setUrl(url);
	  this.$.b1.setCaption("btnfunction -url");
	  this.$.getFeed.call();
	  this.$.b1.setCaption("btnfunction call");
  },
  getListItem: function(inSender, inIndex) {
	  var r = this.results[inIndex];
	  if (r) {
	      this.$.title.setCaption(r.title);
	      this.$.description.setContent(r.description);
	      return true;
	  }
	},
  gotFeed: function(inSender, inResponse) {
	  this.results = inResponse.query.results.item;
	  this.$.list.render();
	  this.$.b1.setCaption("Success");
  },
  gotFeedFailure: function(inSender, inResponse) {
	  enyo.log("got failure from getFeed");
	  this.$.b1.setCaption("Failure");
  }
});
