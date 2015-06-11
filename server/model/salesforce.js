'use strict';
var config = require('../config');
var SF_APP_NAMESPACE = config.appNamespace;

function formatField(field) {
  if(SF_APP_NAMESPACE === ''){
    return field + '__c';
  }
  else{
    return SF_APP_NAMESPACE + '__' + field + '__c';
  }

}

function formatJson(mention) {
  var replacementMention = {};
  for (var key in mention) {
    if (mention.hasOwnProperty(key)) {
      replacementMention[formatField(key)] = mention[key];
    }
  }

  return replacementMention;
}

var oauthMapping = {
  copy: function(obj) {
    var replacement = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        replacement[key] = obj[key];
      }
    }

    return replacement;
  },
  copyFromDb: function(dbObj){
    var replacement = {
      accessToken: dbObj.access_token,
      instanceUrl: dbObj.instance_url,
      uuid: dbObj.uuid,
      refreshToken: dbObj.refresh_token,
      organizationId: dbObj.organization_id
    };

    return replacement;

  },
  copyFromMentionToSfMention: function(dbObj){
    var tempMention = {
  'Mention_Id': dbObj.mentionId,    
  'Tracking_Unit_Id':dbObj.trackingUnitId,
  'File_Location':dbObj.fileLocation,
  'Media_Id': dbObj.mediaId,
  'Program_Id': dbObj.programId,
  'Program_Name': dbObj.programName,
  'Program_Image': dbObj.programImage,
  'Program_Live_Image': dbObj.programLiveImage,
  'Mention_Date': dbObj.mentionDate,
  'File_Type':dbObj.fileType,
  'Media_Source_Type_Id':dbObj.mediaSourceTypeId,
  'Media_Source_Id': dbObj.mediaSourceId,
  'Mention_Snippet': dbObj.mentionSnippet,
  'Media_Duration':dbObj.mediaDuration,
  'Transcript_File_Location': dbObj.transcriptFileLocation
  };

  var sfMention = formatJson(tempMention);
  return sfMention;

  }
};

module.exports = oauthMapping;
