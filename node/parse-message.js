var saw = require('string-saw');
var _ = require('lodash');

var Parser = {
    _simpleQuery: function( msg ) {
        var $msg = saw(msg).match(/(\d+)\s+(?:\u0E08\u0E32\u0E01 ?)([\u0E01-\u0E4Da-zA-Z0-9\s]+)\s+([\u0E01-\u0E4Da-z]+)$/);
        var busNo = $msg.item(0).toString();
        if( !busNo ){
            return;
        }

        var origin = $msg.item(1).toString();
        var stopId = 761;
        var bound  = $msg.item(2).toString();
        return {
            busNo: busNo,
            // stopId: stopId, // Emporium
            bound: bound, // in
            origin: origin
        }
    },
    _parseBusNo: function( msg ){
        var busNo = saw( msg ).match(/สาย\s+(\d+)/).first().toString();
        if( !busNo ){ return }
        return {
          busNo: busNo
        }
    },
    _advanceQuery: function( msg ){
      var $msg = saw( msg );
      var matching = $msg.match(/จาก\s?(.+)\s?ไป\s?(.+)/);
      console.log( matching.toArray() );
      var busNetwork = {
        "Emporium": {
          "สยาม": [
            { busNo: "501", duration: 10, distance: 4 },
            { busNo: "40", duration: 15, distance: 2 },
            { busNo: "48", duration: 12, distance: 1.5}
           ]
        }
      };
      var origin = _.find( Object.keys( busNetwork ), function(k){
        var ori = matching.item(0).toString().trim();
        var check = saw(k).match( new RegExp(ori, "i") ).toBoolean();
        return check;
      });

      if( !origin ) { return }
      var to = _.find( Object.keys( busNetwork[origin] || [] ), function(k){
        var ori = matching.item(1).toString().trim();
        var check = saw(k).match( new RegExp(ori, "ig") ).toBoolean();
        return check;
      });

      if( !(to) ) {
        return;
      }
      return {
        origin: origin ,
        to: to,
        busNo: busNetwork[origin][to]
      }
    }
};

module.exports = Parser
