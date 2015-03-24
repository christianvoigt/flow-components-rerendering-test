Greetings = new Mongo.Collection(null);
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Greetings.insert({text:"Hallo!"});
  Greetings.insert({text:"Hi!"});
  Greetings.insert({text:"Guten Tag!"});
  Greetings.insert({text:"Bienvenu"});
  Greetings.insert({text:"Welcome!"});

  var parentComponent = FlowComponents.define('parent-component',function(props){
  });
  parentComponent.state.greetings = function(){
    //return Greetings.find().fetch(); //doesn't cause rerendering of complete list if items are added
    return Greetings.find().fetch(); //doesn't cause rerendering of complete list if items are added
  };

  Template.parentTemplate.helpers({
    greetings : function(){
      //return Greetings.find(); //doesn't cause rerendering of complete list if items are added
      return Greetings.find().fetch(); //causes rerendering of complete list if items are added
    }
  });

  var greetingComponent = FlowComponents.define('greeting-component',function(props){
    this.set("greetingText",props.greetingText);

    console.log("greeting component created");
    
    this.onRendered(function(){
      console.log("greeting component rendered");
    });
    
    this.onDestroyed(function(){
      console.log("greeting component destroyed");      
    });
  });

  Template.greetingTemplate.created = function(){
    console.log("greeting template created.");
  };
  Template.greetingTemplate.rendered = function(){
    console.log("greeting template rendered.");
  };
  Template.greetingTemplate.destroyed = function(){
    console.log("greeting template destroyed");
  };

  UI.body.events({
    "click #add-greeting": function(){
      Greetings.insert({text:"Buon giorno!"});
      return false;
    },
    "click #change-greeting": function(){
      Greetings.update({text:"Guten Tag!"},{$set:{text:"Buon giorno!"}});
      return false;
    }
  });
}
