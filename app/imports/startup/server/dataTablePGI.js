import { Meteor } from "meteor/meteor";
import { DataTablePGI } from "../../api/data/dataTablePGI.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  DataTablePGI.insert(data);
}

/** Initialize the collection if empty. */
if (DataTablePGI.find().count() === 0) {
  if (Meteor.settings.defaultDataTablePGI) {
    console.log("Creating default data table PGI.");
    Meteor.settings.defaultDataTablePGI.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("DataTablePGI", function publish() {
  if (this.userId) {
    return DataTablePGI.find();
  }
  return this.ready();
});
